/**
 * EDINETコードリスト(提出者業種付き)を取得し、companies-data.json の
 * industry を自動分類する後処理スクリプト。あわせて表示用に社名から
 * 「株式会社」等を除去する。
 *
 * 使い方: node scripts/classify-industries.mjs
 */

import { readFileSync, writeFileSync } from "node:fs";
import { unzipSync } from "fflate";

const OUT_PATH = new URL("../src/lib/companies-data.json", import.meta.url);
const CODELIST_URLS = [
  "https://disclosure2dl.edinet-fsa.go.jp/searchdocument/codelist/Edinetcode.zip",
  "https://disclosure2.edinet-fsa.go.jp/searchdocument/codelist/Edinetcode.zip",
];

/** EDINET 33業種 → サイトの8業種 */
const INDUSTRY_MAP = {
  "情報・通信業": "it-web",
  "卸売業": "sales",
  "銀行業": "finance",
  "証券、商品先物取引業": "finance",
  "保険業": "finance",
  "その他金融業": "finance",
  "医薬品": "medical",
  "食料品": "manufacturer",
  "繊維製品": "manufacturer",
  "パルプ・紙": "manufacturer",
  "化学": "manufacturer",
  "石油・石炭製品": "manufacturer",
  "ゴム製品": "manufacturer",
  "ガラス・土石製品": "manufacturer",
  "鉄鋼": "manufacturer",
  "非鉄金属": "manufacturer",
  "金属製品": "manufacturer",
  "機械": "manufacturer",
  "電気機器": "manufacturer",
  "輸送用機器": "manufacturer",
  "精密機器": "manufacturer",
  "その他製品": "manufacturer",
  // サービス業・小売業・建設業・不動産業・運輸・電気ガス等 → other のまま
};

/** 名前ベースの手動補正(コードリストの業種では拾えない分類) */
const OVERRIDES = [
  [/ベイカレント/, "consulting"],
  [/シグマクシス/, "consulting"],
  [/M&Aセンター/, "consulting"],
  [/M&Aキャピタルパートナーズ/, "consulting"],
  [/ドリームインキュベータ/, "consulting"],
  [/アビームコンサルティング/, "consulting"],
  [/野村総合研究所/, "it-web"],
];

function stripCorpSuffix(name) {
  return name
    .normalize("NFKC")
    .replace(/株式会社|合同会社|有限会社/g, "")
    .replace(/^\s+|\s+$/g, "");
}

async function fetchCodelist() {
  for (const url of CODELIST_URLS) {
    try {
      const res = await fetch(url);
      if (!res.ok) continue;
      const buf = new Uint8Array(await res.arrayBuffer());
      const files = unzipSync(buf);
      const csvEntry = Object.entries(files).find(([p]) => /\.csv$/i.test(p));
      if (!csvEntry) continue;
      return new TextDecoder("shift_jis").decode(csvEntry[1]);
    } catch (e) {
      console.warn(`codelist fetch failed: ${url} (${e.message})`);
    }
  }
  throw new Error("EDINETコードリストを取得できませんでした");
}

async function main() {
  const csv = await fetchCodelist();
  const lines = csv.split(/\r?\n/);
  // 1行目はメタ行、2行目がヘッダー
  const header = lines[1].split(",").map((c) => c.replaceAll('"', "").trim());
  const nameIdx = header.findIndex((h) => h === "提出者名");
  const indIdx = header.findIndex((h) => h === "提出者業種");
  if (nameIdx < 0 || indIdx < 0) {
    throw new Error(`ヘッダー解析失敗: ${header.join("|")}`);
  }

  const industryByName = new Map();
  for (const line of lines.slice(2)) {
    const cols = line.split(",").map((c) => c.replaceAll('"', "").trim());
    if (cols.length <= Math.max(nameIdx, indIdx)) continue;
    industryByName.set(cols[nameIdx], cols[indIdx]);
  }
  console.log(`コードリスト読込: ${industryByName.size} 提出者`);

  const companies = JSON.parse(readFileSync(OUT_PATH, "utf-8"));
  let classified = 0;
  const stats = {};
  const out = companies.map((c) => {
    const raw = industryByName.get(c.name);
    let industry = INDUSTRY_MAP[raw] ?? "other";
    const displayName = stripCorpSuffix(c.name);
    for (const [re, forced] of OVERRIDES) {
      if (re.test(displayName)) industry = forced;
    }
    if (raw) classified++;
    stats[industry] = (stats[industry] ?? 0) + 1;
    return { name: displayName, industry, avgSalary: c.avgSalary };
  });

  writeFileSync(OUT_PATH, `${JSON.stringify(out, null, 2)}\n`);
  console.log(`業種突合: ${classified}/${companies.length} 社`);
  console.log("分類結果:", JSON.stringify(stats));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
