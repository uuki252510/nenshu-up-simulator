export interface SelectOption {
  value: string;
  label: string;
  /** 補正率(加算方式)。サンプル結果に合わせて係数調整済み */
  adj: number;
}

export interface IncomeOption {
  value: string;
  label: string;
  /** レンジの代表値(万円) */
  median: number;
}

export const AGE_OPTIONS: SelectOption[] = [
  { value: "20-24", label: "20〜24歳", adj: 0.01 },
  { value: "25-29", label: "25〜29歳", adj: 0.03 },
  { value: "30-34", label: "30〜34歳", adj: 0.04 },
  { value: "35-40", label: "35〜40歳", adj: 0.05 },
  { value: "41-50", label: "41〜50歳", adj: 0.01 },
  { value: "51+", label: "51歳以上", adj: 0 },
];

export const INCOME_OPTIONS: IncomeOption[] = [
  { value: "u300", label: "300万円未満", median: 250 },
  { value: "300-400", label: "300〜400万円", median: 350 },
  { value: "400-600", label: "400〜600万円", median: 500 },
  { value: "600-800", label: "600〜800万円", median: 700 },
  { value: "800-1000", label: "800〜1000万円", median: 900 },
  { value: "1000-1500", label: "1000〜1500万円", median: 1250 },
  { value: "1500+", label: "1500万円以上", median: 1600 },
];

export const EDUCATION_OPTIONS: SelectOption[] = [
  { value: "highschool", label: "高卒", adj: 0 },
  { value: "vocational", label: "専門学校", adj: 0.01 },
  { value: "university", label: "大学", adj: 0.02 },
  { value: "graduate", label: "大学院", adj: 0.06 },
];

export const INDUSTRY_OPTIONS: SelectOption[] = [
  { value: "it-web", label: "IT・Web", adj: 0.05 },
  { value: "sales", label: "営業", adj: 0.03 },
  { value: "consulting", label: "コンサル", adj: 0.12 },
  { value: "corporate", label: "管理部門", adj: 0.02 },
  { value: "manufacturer", label: "メーカー", adj: 0.02 },
  { value: "medical", label: "医療・福祉", adj: 0.01 },
  { value: "finance", label: "金融", adj: 0.08 },
  { value: "other", label: "その他", adj: 0.01 },
];

export const REASON_OPTIONS: SelectOption[] = [
  { value: "raise-income", label: "年収を上げたい", adj: 0.03 },
  { value: "skill-up", label: "スキルアップしたい", adj: 0.01 },
  { value: "work-style", label: "働き方を変えたい", adj: 0 },
  { value: "reset-relations", label: "人間関係をリセットしたい", adj: 0 },
  { value: "growth", label: "成長できる環境がほしい", adj: 0.01 },
];

/** 転職理由による補正の上限 */
export const REASON_ADJ_CAP = 0.03;
