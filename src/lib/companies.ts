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
  /** 職種特化プールでマッチした場合の説明ラベル */
  poolNote?: string;
}

/**
 * 職種特化の企業プール(社名キーワード)。
 * 病院等の非上場が主戦場の職種でも、関連する上場チェーンを表示するために使う。
 */
const OCCUPATION_POOLS: Record<string, { pattern: RegExp; note: string }> = {
  pharmacist: {
    pattern:
      /調剤|ドラッグ|薬局|ウエルシア|ツルハ|マツキヨ|サンドラッグ|スギホールディングス|クリエイトSDホールディングス|アインホールディングス|クオール|メディカルシステムネットワーク|カワチ薬品|ゲンキー|クスリのアオキ|ファーマライズ/,
    note: "調剤薬局・ドラッグストア等の上場チェーン",
  },
  "care-worker": {
    pattern:
      /介護|ケア(サービス|ネット|21)|セントケア|ツクイ|ソラスト|ユニマット|ロングライフ|シダー|エス・エム・エス|ベネッセ/,
    note: "介護関連の上場企業",
  },
};

/**
 * 診断結果の年収レンジに対して、レンジが合う企業とチャレンジ企業を抽出する。
 * 同業種を優先して並べ、各カテゴリ最大6社まで返す。
 * 職種特化プールがある場合(薬剤師・介護職)はそちらを優先する。
 */
export function matchCompanies(
  result: SimulatorResult,
  industry: string,
  occupation?: string,
): CompanyMatchResult {
  const fitMin = result.lower * 0.95;
  const fitMax = result.upper * 1.05;
  const challengeMax = result.upper * 1.45;

  // 看護師は主な勤務先(病院・クリニック)が非上場のため、企業マッチは表示しない
  // (結果画面では働き方別の年収傾向テーブルが代わりに出る)
  if (occupation === "nurse") {
    return { fit: [], challenge: [] };
  }

  const pool = occupation ? OCCUPATION_POOLS[occupation] : undefined;
  if (pool) {
    const byDistance = (a: CompanySalary, b: CompanySalary) =>
      Math.abs(a.avgSalary - result.estimate) -
      Math.abs(b.avgSalary - result.estimate);
    const candidates = COMPANIES.filter((c) => pool.pattern.test(c.name));
    const fit = candidates
      .filter((c) => c.avgSalary <= fitMax)
      .sort(byDistance)
      .slice(0, 6);
    const challenge = candidates
      .filter((c) => c.avgSalary > fitMax && c.avgSalary <= challengeMax * 1.2)
      .sort(byDistance)
      .slice(0, 6);
    if (fit.length + challenge.length >= 3) {
      return { fit, challenge, poolNote: pool.note };
    }
    // 該当が少なすぎる場合は通常マッチにフォールバック
  }

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
