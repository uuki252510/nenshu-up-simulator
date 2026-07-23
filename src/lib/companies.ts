import type { SimulatorResult } from "./simulator";

/**
 * 上場企業の平均年間給与データ(有価証券報告書ベースの目安値)。
 * 値は10万円単位に丸めた「目安」であり、年度により変動する。
 * 追加・更新するときは各社の最新の有価証券報告書(EDINET)を確認すること。
 */
export interface CompanySalary {
  name: string;
  /** options.ts の INDUSTRY_OPTIONS.value に対応 */
  industry: string;
  /** 平均年間給与の目安(万円、10万円単位丸め) */
  avgSalary: number;
}

export const COMPANIES: CompanySalary[] = [
  // IT・Web
  { name: "NTTデータグループ", industry: "it-web", avgSalary: 870 },
  { name: "富士通", industry: "it-web", avgSalary: 960 },
  { name: "NEC", industry: "it-web", avgSalary: 840 },
  { name: "野村総合研究所", industry: "it-web", avgSalary: 1240 },
  { name: "SCSK", industry: "it-web", avgSalary: 750 },
  { name: "伊藤忠テクノソリューションズ", industry: "it-web", avgSalary: 940 },
  { name: "オービック", industry: "it-web", avgSalary: 930 },
  { name: "サイバーエージェント", industry: "it-web", avgSalary: 820 },
  { name: "LINEヤフー", industry: "it-web", avgSalary: 1070 },
  { name: "楽天グループ", industry: "it-web", avgSalary: 790 },
  { name: "KDDI", industry: "it-web", avgSalary: 950 },
  { name: "ソフトバンク", industry: "it-web", avgSalary: 810 },
  // メーカー
  { name: "トヨタ自動車", industry: "manufacturer", avgSalary: 900 },
  { name: "ソニーグループ", industry: "manufacturer", avgSalary: 1110 },
  { name: "日立製作所", industry: "manufacturer", avgSalary: 940 },
  { name: "パナソニックHD", industry: "manufacturer", avgSalary: 910 },
  { name: "三菱電機", industry: "manufacturer", avgSalary: 830 },
  { name: "デンソー", industry: "manufacturer", avgSalary: 830 },
  { name: "村田製作所", industry: "manufacturer", avgSalary: 800 },
  { name: "キーエンス", industry: "manufacturer", avgSalary: 2280 },
  { name: "ファナック", industry: "manufacturer", avgSalary: 1280 },
  { name: "信越化学工業", industry: "manufacturer", avgSalary: 870 },
  // 商社(営業)
  { name: "三菱商事", industry: "sales", avgSalary: 2090 },
  { name: "三井物産", industry: "sales", avgSalary: 1900 },
  { name: "伊藤忠商事", industry: "sales", avgSalary: 1830 },
  { name: "住友商事", industry: "sales", avgSalary: 1760 },
  { name: "丸紅", industry: "sales", avgSalary: 1660 },
  // 金融
  { name: "三菱UFJフィナンシャル・グループ", industry: "finance", avgSalary: 880 },
  { name: "三井住友フィナンシャルグループ", industry: "finance", avgSalary: 890 },
  { name: "野村ホールディングス", industry: "finance", avgSalary: 1440 },
  { name: "東京海上ホールディングス", industry: "finance", avgSalary: 910 },
  { name: "オリックス", industry: "finance", avgSalary: 900 },
  // コンサル
  { name: "ベイカレント", industry: "consulting", avgSalary: 1120 },
  { name: "シグマクシス・ホールディングス", industry: "consulting", avgSalary: 1180 },
  // 医療・製薬
  { name: "エムスリー", industry: "medical", avgSalary: 880 },
  { name: "中外製薬", industry: "medical", avgSalary: 1160 },
  { name: "武田薬品工業", industry: "medical", avgSalary: 1080 },
  // その他(人材・広告など)
  { name: "リクルートホールディングス", industry: "other", avgSalary: 1140 },
  { name: "電通グループ", industry: "other", avgSalary: 1340 },
  { name: "博報堂DYホールディングス", industry: "other", avgSalary: 1070 },
];

export interface CompanyMatchResult {
  /** 想定レンジと重なる企業(レンジが合う企業例) */
  fit: CompanySalary[];
  /** レンジ上限より上の企業(チャレンジレンジの企業例) */
  challenge: CompanySalary[];
}

/**
 * 診断結果の年収レンジに対して、レンジが合う企業とチャレンジ企業を抽出する。
 * 同業種を優先して並べ、各カテゴリ最大4社まで返す。
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
    .slice(0, 4);

  const challenge = COMPANIES.filter(
    (c) => c.avgSalary > fitMax && c.avgSalary <= challengeMax,
  )
    .sort(byIndustryFirst)
    .slice(0, 4);

  return { fit, challenge };
}
