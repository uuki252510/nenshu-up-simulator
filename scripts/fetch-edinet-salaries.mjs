/**
 * EDINET API v2 から全上場企業の有価証券報告書を走査し、
 * 「平均年間給与」を抽出して src/lib/companies-data.json を再生成するスクリプト。
 *
 * 使い方:
 *   node --env-file=.env scripts/fetch-edinet-salaries.mjs
 *   (.env に EDINET_API_KEY=xxxx を設定)
 *
 * 特徴:
 *   - 進捗を scripts/.edinet-cache.json に日次で保存し、中断しても再実行で続きから走る
 *   - 全日程走査済みになると companies-data.json を全上場企業分に置き換える
 *     (既存エントリの industry 分類は企業名一致で引き継ぎ。新規企業は "other")
 *   - 実行途中でも、その時点までの取得分で companies-data.json を更新する
 */

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { unzipSync } from "fflate";

const API_KEY = process.env.EDINET_API_KEY;
if (!API_KEY) {
  console.error("EDINET_API_KEY 環境変数を設定してください。");
  process.exit(1);
}

const BASE = "https://api.edinet-fsa.go.jp/api/v2";
const OUT_PATH = new URL("../src/lib/companies-data.json", import.meta.url);
const CACHE_PATH = new URL("./.edinet-cache.json", import.meta.url);
const DAYS = 365;
const SALARY_ELEMENT =
  "jpcrp_cor:AverageAnnualSalaryInformationAboutReportingCompanyInformationAboutEmployees";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status}`);
  return res.json();
}

async function fetchZip(url) {
  const res = await fetch(url);
  if (!res.ok) return null;
  const buf = new Uint8Array(await res.arrayBuffer());
  if (buf[0] === 0x7b) return null; // JSON応答=エラー
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
      // 要素IDが完全一致し、当期・提出会社(単体)の時点値のみ採用
      if (cols[0] !== SALARY_ELEMENT) continue;
      if (!cols[2]?.startsWith("CurrentYearInstant")) continue;
      const value = Number(cols.at(-1));
      if (Number.isFinite(value) && value > 0) return value;
    }
  }
  return null;
}

function loadJson(path, fallback) {
  try {
    return JSON.parse(readFileSync(path, "utf-8"));
  } catch {
    return fallback;
  }
}

function writeOutput(resultsObj, industryByName) {
  const out = Object.entries(resultsObj)
    .map(([name, avgSalary]) => ({
      name,
      industry: industryByName.get(name) ?? "other",
      avgSalary,
    }))
    .sort((a, b) => a.name.localeCompare(b.name, "ja"));
  writeFileSync(OUT_PATH, `${JSON.stringify(out, null, 2)}\n`);
  return out.length;
}

async function main() {
  // 既存データの industry 分類を引き継ぐ(初回のキュレーション分も含む)
  const previous = loadJson(OUT_PATH, []);
  const industryByName = new Map(previous.map((c) => [c.name, c.industry]));

  const cache = loadJson(CACHE_PATH, { scannedDates: [], results: {} });
  const scanned = new Set(cache.scannedDates);
  const results = cache.results; // filerName -> avgSalary(万円)

  const today = new Date();
  const targetDates = [];
  for (let i = 0; i < DAYS; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    targetDates.push(d.toISOString().slice(0, 10));
  }
  const remaining = targetDates.filter((d) => !scanned.has(d));
  console.log(
    `全${DAYS}日中 残り${remaining.length}日を走査します(取得済み ${Object.keys(results).length} 社)`,
  );

  for (const date of remaining) {
    let list;
    try {
      list = await fetchJson(
        `${BASE}/documents.json?date=${date}&type=2&Subscription-Key=${API_KEY}`,
      );
    } catch (e) {
      console.warn(`skip ${date}: ${e.message}`);
      await sleep(1000);
      continue; // 未走査のまま残す(次回リトライ)
    }
    const docs = (list.results ?? []).filter(
      (doc) =>
        doc.docTypeCode === "120" &&
        doc.csvFlag === "1" &&
        doc.filerName &&
        doc.secCode,
    );

    for (const doc of docs) {
      if (results[doc.filerName] !== undefined) continue;
      await sleep(150);
      const zip = await fetchZip(
        `${BASE}/documents/${doc.docID}?type=5&Subscription-Key=${API_KEY}`,
      );
      if (!zip) continue;
      const yen = extractSalaryFromZip(zip);
      if (!yen) continue;
      const man = Math.round(yen / 10000 / 10) * 10;
      if (man < 100 || man > 5000) continue;
      results[doc.filerName] = man;
    }

    scanned.add(date);
    cache.scannedDates = [...scanned];
    cache.results = results;
    writeFileSync(CACHE_PATH, JSON.stringify(cache));

    const idx = targetDates.indexOf(date);
    if (idx % 10 === 0) {
      console.log(
        `${date} 走査済み(${scanned.size}/${DAYS}日) / 取得 ${Object.keys(results).length} 社`,
      );
    }
    await sleep(150);
  }

  const count = writeOutput(results, industryByName);
  console.log(
    `完了: ${scanned.size}/${DAYS}日走査済み、${count} 社を companies-data.json に書き出しました。`,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
