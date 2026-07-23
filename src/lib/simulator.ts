import {
  AGE_OPTIONS,
  COMPANY_SIZE_OPTIONS,
  EDUCATION_OPTIONS,
  INCOME_OPTIONS,
  INDUSTRY_OPTIONS,
  MANAGEMENT_OPTIONS,
  OCCUPATION_OPTIONS,
  REASON_ADJ_CAP,
  REASON_OPTIONS,
  TOTAL_ADJ_MAX,
  TOTAL_ADJ_MIN,
} from "./options";

export interface SimulatorInput {
  age: string;
  income: string;
  education: string;
  industry: string;
  occupation: string;
  companySize: string;
  management: string;
  reasons: string[];
}

export type Grade = "A+" | "A" | "B" | "C" | "D";

export interface SimulatorResult {
  /** 想定年収レンジ下限(万円) */
  lower: number;
  /** 想定年収レンジ上限(万円) */
  upper: number;
  /** 目安年収(万円) */
  estimate: number;
  grade: Grade;
  gradeMessage: string;
  comment: string;
  /** 入力条件の表示用タグ(例: 41〜50歳 / 大学 / IT・Web / エンジニア・技術職) */
  tags: string[];
  /** 現在の年収レンジ表示用(例: 800〜1000万円) */
  currentIncomeLabel: string;
}

function gradeOf(estimate: number): Grade {
  if (estimate >= 1200) return "A+";
  if (estimate >= 1000) return "A";
  if (estimate >= 700) return "B";
  if (estimate >= 500) return "C";
  return "D";
}

const GRADE_MESSAGES: Record<Grade, string> = {
  "A+": "年収アップの可能性がとても高い傾向です",
  A: "年収アップの可能性が高い傾向です",
  B: "年収アップの可能性が高い傾向です",
  C: "条件次第で年収アップが狙える傾向です",
  D: "まずは市場価値の整理から始めるのがおすすめです",
};

export function simulate(input: SimulatorInput): SimulatorResult {
  const age = AGE_OPTIONS.find((o) => o.value === input.age);
  const income = INCOME_OPTIONS.find((o) => o.value === input.income);
  const education = EDUCATION_OPTIONS.find((o) => o.value === input.education);
  const industry = INDUSTRY_OPTIONS.find((o) => o.value === input.industry);
  const occupation = OCCUPATION_OPTIONS.find(
    (o) => o.value === input.occupation,
  );
  const companySize = COMPANY_SIZE_OPTIONS.find(
    (o) => o.value === input.companySize,
  );
  const management = MANAGEMENT_OPTIONS.find(
    (o) => o.value === input.management,
  );
  if (
    !age ||
    !income ||
    !education ||
    !industry ||
    !occupation ||
    !companySize ||
    !management
  ) {
    throw new Error("Invalid simulator input");
  }

  const reasonAdj = Math.min(
    REASON_ADJ_CAP,
    REASON_OPTIONS.filter((o) => input.reasons.includes(o.value)).reduce(
      (sum, o) => sum + o.adj,
      0,
    ),
  );

  // 職種・企業規模・マネジメント経験を主役に、業種・年齢・学歴で補正する
  const rawAdj =
    occupation.adj +
    companySize.adj +
    management.adj +
    industry.adj +
    age.adj +
    education.adj +
    reasonAdj;
  const totalAdj = Math.min(TOTAL_ADJ_MAX, Math.max(TOTAL_ADJ_MIN, rawAdj));
  const estimate = Math.round(income.median * (1 + totalAdj));

  // 下限 ×0.96 / 上限 ×1.04 を基準に、上振れ・下振れ幅を軽くランダムに持たせる
  const lower = Math.round(estimate * (0.96 - Math.random() * 0.015));
  const upper = Math.round(estimate * (1.04 + Math.random() * 0.015));

  const grade = gradeOf(estimate);

  const comment =
    `${age.label}・${industry.label}(${occupation.label})の場合、条件次第で年収${lower}万円〜${upper}万円が目安です。` +
    `マネジメント経験や企業規模の伝え方次第で、さらに上振れも期待できます。` +
    `転職理由を言語化できると、条件交渉で有利になりやすいです。`;

  return {
    lower,
    upper,
    estimate,
    grade,
    gradeMessage: GRADE_MESSAGES[grade],
    comment,
    tags: [age.label, education.label, industry.label, occupation.label],
    currentIncomeLabel: income.label,
  };
}
