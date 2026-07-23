import companiesData from "./companies-data.json";
import type { SimulatorResult } from "./simulator";

/**
 * 上場企業の平均年間給与データ(有価証券報告書ベースの目安値)。
 * 値は10万円単位に丸めた「目安」であり、年度により変動する。
 * データ本体は companies-data.json。手修正のほか、
 * scripts/fetch-edinet-salaries.mjs で EDINET API から全上場企業分を再生成できる。
 */
export interface CompanySalary {
  name: string;
  /** options.ts の INDUSTRY_OPTIONS.value に対応 */
  industry: string;
  /** 平均年間給与の目安(万円、10万円単位丸め) */
  avgSalary: number;
}

export const COMPANIES: CompanySalary[] = companiesData as CompanySalary[];

export interface CompanyMatchResult {
  /** 想定レンジと重なる企業(レンジが合う企業例) */
  fit: CompanySalary[];
  /** レンジ上限より上の企業(チャレンジレンジの企業例) */
  challenge: CompanySalary[];
}

/**
 * 診断結果の年収レンジに対して、レンジが合う企業とチャレンジ企業を抽出する。
 * 同業種を優先して並べ、各カテゴリ最大6社まで返す。
 */
export function matchCompanies(
  result: SimulatorResult,
  industry: string,
): CompanyMatchResult {
  const fitMin = result.lower * 0.95;
  const fitMax = result.upper * 1.05;
  const challengeMax = result.upper * 1.45;

  const byIndustryFirst = (a: CompanySalary, b: CompanySalary) => {
    const aSame = a.industry === industry ? 0 : 1;
    const bSame = b.industry === industry ? 0 : 1;
    if (aSame !== bSame) return aSame - bSame;
    return (
      Math.abs(a.avgSalary - result.estimate) -
      Math.abs(b.avgSalary - result.estimate)
    );
  };

  const fit = COMPANIES.filter(
    (c) => c.avgSalary >= fitMin && c.avgSalary <= fitMax,
  )
    .sort(byIndustryFirst)
    .slice(0, 6);

  const challenge = COMPANIES.filter(
    (c) => c.avgSalary > fitMax && c.avgSalary <= challengeMax,
  )
    .sort(byIndustryFirst)
    .slice(0, 6);

  return { fit, challenge };
}
