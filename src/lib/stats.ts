/**
 * 公的統計との比較用データ。
 * 出典: 国税庁「民間給与実態統計調査」(令和5年分)の平均給与を基にした概数(万円)。
 * 統計には雇用形態等の異なる給与所得者が含まれるため、あくまで参考比較用。
 * 更新時は国税庁の最新の調査結果を確認して数値を差し替えること。
 */

export const STATS_SOURCE =
  "国税庁「民間給与実態統計調査」(令和5年分)を基にした概数";

/** 給与所得者全体の平均給与(万円) */
export const OVERALL_AVG = 460;

/** 年齢階級別の平均給与(万円)。サイトの年齢バンドに合わせて丸めた概数 */
const AGE_AVG: Record<string, number> = {
  "20-24": 273,
  "25-29": 389,
  "30-34": 431,
  "35-40": 466,
  "41-50": 511,
  "51+": 537,
};

/** 業種別の平均給与(万円)。統計上の産業分類に読み替えた概数 */
const INDUSTRY_AVG: Record<string, { label: string; value: number }> = {
  "it-web": { label: "情報通信業", value: 649 },
  finance: { label: "金融業・保険業", value: 652 },
  manufacturer: { label: "製造業", value: 533 },
  medical: { label: "医療・福祉", value: 404 },
  consulting: { label: "学術研究・専門技術サービス業", value: 551 },
  sales: { label: "卸売業・小売業", value: 387 },
  corporate: { label: "給与所得者全体", value: OVERALL_AVG },
  other: { label: "給与所得者全体", value: OVERALL_AVG },
};

export interface BenchmarkRow {
  label: string;
  value: number;
}

/** 診断結果と並べて表示する公的統計の比較行を返す */
export function getBenchmarks(age: string, industry: string): BenchmarkRow[] {
  const rows: BenchmarkRow[] = [];
  const ageAvg = AGE_AVG[age];
  const ageLabel = age === "51+" ? "51歳以上" : "同年代";
  if (ageAvg) rows.push({ label: `${ageLabel}の平均給与`, value: ageAvg });

  const ind = INDUSTRY_AVG[industry];
  if (ind && ind.label !== "給与所得者全体") {
    rows.push({ label: `${ind.label}の平均給与`, value: ind.value });
  }

  rows.push({ label: "給与所得者全体の平均", value: OVERALL_AVG });
  return rows;
}
