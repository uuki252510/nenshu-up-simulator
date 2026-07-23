/**
 * EDINET API v2 から全上場企業の有価証券報告書を走査し、
 * 「平均年間給与」を抽出して src/lib/companies-data.json を再生成するスクリプト。
 *
 * 使い方:
 *   1. https://api.edinet-fsa.go.jp/ でアカウント登録し、APIキー(無料)を取得
 *   2. 環境変数に設定して実行:
 *        EDINET_API_KEY=xxxx node scripts/fetch-edinet-salaries.mjs
 *   3. 完了後、src/lib/companies-data.json が全上場企業分に置き換わる
 *      (既存エントリの industry 分類は企業名一致で引き継がれる。新規企業は "other")
 *
 * 注意:
 *   - 直近365日分の提出書類を日次で走査するため、実行に30分〜1時間程度かかる
 *   - EDINETのレート制限に配慮して各リクエスト間に200msのウェイトを入れている
 *   - 取得値は円単位 → 万円に変換し、10万円単位に丸めて保存する
 */

import { readFileSync, writeFileSync } from "node:fs";
import { unzipSync, strFromU8 } from "fflate";

const API_KEY = process.env.EDINET_API_KEY;
if (!API_KEY) {
  console.error("EDINET_API_KEY 環境変数を設定してください。");
  process.exit(1);
}

const BASE = "https://api.edinet-fsa.go.jp/api/v2";
const OUT_PATH = new URL("../src/lib/companies-data.json", import.meta.url);
const DAYS = 365;
const SALARY_ELEMENT =
  "jpcrp_cor:AverageAnnualSalaryInformationAboutReportingCompanyInformationAboutEmployees";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.json();
}

async function fetchZip(url) {
  const res = await fetch(url);
  if (!res.ok) return null;
  const buf = new Uint8Array(await res.arrayBuffer());
  // JSONが返ってきた場合はエラー応答
  if (buf[0] === 0x7b) return null;
  return buf;
}

/** EDINETのCSV(UTF-16LE・タブ区切り)から平均年間給与(円)を抽出 */
function extractSalaryFromZip(zipBuf) {
  let files;
  try {
    files = unzipSync(zipBuf);
  } catch {
    return null;
  }
  for (const [path, data] of Object.entries(files)) {
    if (!/XBRL_TO_CSV\/jpcrp.*\.csv$/i.test(path)) continue;
    const text = new TextDecoder("utf-16le").decode(data);
    for (const line of text.split(/\r?\n/)) {
      if (!line.includes(SALARY_ELEMENT)) continue;
      const cols = line.split("\t").map((c) => c.replaceAll('"', "").trim());
      // 列構成: 要素ID, 項目名, コンテキストID, 相対年度, 連結・個別, 期間・時点, ユニットID, 単位, 値
      if (!cols[2]?.includes("FilingDateInstant")) continue;
      const value = Number(cols.at(-1));
      if (Number.isFinite(value) && value > 0) return value;
    }
  }
  return null;
}

async function main() {
  // 既存データの industry 分類を企業名で引き継ぐ
  let previous = [];
  try {
    previous = JSON.parse(readFileSync(OUT_PATH, "utf-8"));
  } catch {
    /* 初回実行 */
  }
  const industryByName = new Map(previous.map((c) => [c.name, c.industry]));

  const results = new Map(); // filerName -> avgSalary(万円)
  const today = new Date();

  for (let i = 0; i < DAYS; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const date = d.toISOString().slice(0, 10);

    let list;
    try {
      list = await fetchJson(
        `${BASE}/documents.json?date=${date}&type=2&Subscription-Key=${API_KEY}`,
      );
    } catch (e) {
      console.warn(`skip ${date}: ${e.message}`);
      continue;
    }
    const docs = (list.results ?? []).filter(
      (doc) =>
        doc.docTypeCode === "120" && // 有価証券報告書
        doc.csvFlag === "1" &&
        doc.filerName &&
        doc.secCode, // 上場企業(証券コードあり)のみ
    );

    for (const doc of docs) {
      if (results.has(doc.filerName)) continue; // 直近提出分を優先
      await sleep(200);
      const zip = await fetchZip(
        `${BASE}/documents/${doc.docID}?type=5&Subscription-Key=${API_KEY}`,
      );
      if (!zip) continue;
      const yen = extractSalaryFromZip(zip);
      if (!yen) continue;
      const man = Math.round(yen / 10000 / 10) * 10; // 万円・10万円丸め
      if (man < 100 || man > 5000) continue; // 異常値ガード
      results.set(doc.filerName, man);
    }

    if (i % 20 === 0) {
      console.log(`${date} まで走査済み / 取得 ${results.size} 社`);
    }
    await sleep(200);
  }

  const out = [...results.entries()]
    .map(([name, avgSalary]) => ({
      name,
      industry: industryByName.get(name) ?? "other",
      avgSalary,
    }))
    .sort((a, b) => a.name.localeCompare(b.name, "ja"));

  writeFileSync(OUT_PATH, `${JSON.stringify(out, null, 2)}\n`);
  console.log(`完了: ${out.length} 社を ${OUT_PATH.pathname} に書き出しました。`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
