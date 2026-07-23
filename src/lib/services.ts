import { INCOME_OPTIONS } from "./options";
import type { SimulatorInput } from "./simulator";

export interface RecruitService {
  slug: string;
  name: string;
  description: string;
  strengths: [string, string, string];
  ctaLabel: string;
  /** true: ASP計測リンク(提携承認済み) / false: 公式サイトへの直リンク(未提携) */
  isAffiliate: boolean;
  /** 遷移先URL。提携承認が下りた枠から順にASPリンクへ差し替える */
  url: string;
}

export const SERVICES: Record<string, RecruitService> = {
  bizreach: {
    slug: "bizreach",
    name: "ビズリーチ",
    description: "スカウト型のハイクラス転職サイト",
    strengths: [
      "管理職・専門職などハイクラス求人が中心",
      "企業やヘッドハンターからスカウトが届く",
      "職務経歴書を登録して待つ使い方ができる",
    ],
    ctaLabel: "公式サイトを見る",
    isAffiliate: false,
    url: "https://www.bizreach.jp/",
  },
  "recruit-direct-scout": {
    slug: "recruit-direct-scout",
    name: "リクルートダイレクトスカウト",
    description: "リクルートが運営するハイクラス向けスカウトサービス",
    strengths: [
      "登録・利用が無料",
      "ヘッドハンターに転職活動を任せられる",
      "高年収帯の求人が豊富",
    ],
    ctaLabel: "公式サイトを見る",
    isAffiliate: false,
    url: "https://directscout.recruit.co.jp/",
  },
  "at-projin": {
    slug: "at-projin",
    name: "＠PRO人",
    description: "IT・Web・ゲーム業界専門、未経験からのIT転職に強い転職エージェント",
    strengths: [
      "IT/Web/ゲーム求人に特化",
      "未経験からのIT転職に対応",
      "年収アップ率82%の実績(公式サイトより)",
    ],
    ctaLabel: "無料でキャリア相談する",
    isAffiliate: true,
    url: "https://px.a8.net/svt/ejp?a8mat=3N8DIR+4ASQ2A+4GWI+BZVU9",
  },
  miidas: {
    slug: "miidas",
    name: "ミイダス",
    description: "市場価値診断からはじめられる転職アプリ",
    strengths: [
      "質問に答えるだけで想定年収がわかる",
      "企業から面接確約オファーが届く",
      "診断だけの利用もできる",
    ],
    ctaLabel: "無料で市場価値を診断",
    isAffiliate: false,
    url: "https://miidas.jp/",
  },
  "rikunabi-next": {
    slug: "rikunabi-next",
    name: "リクナビNEXT",
    description: "リクルートが運営する転職サイト",
    strengths: [
      "掲載求人数が多い",
      "リモートワークなど働き方の条件で検索できる",
      "自己分析ツールを無料で使える",
    ],
    ctaLabel: "求人を見る",
    isAffiliate: false,
    url: "https://next.rikunabi.com/",
  },
  "leverwell-kango": {
    slug: "leverwell-kango",
    name: "レバウェル看護",
    description: "看護師向けの転職支援サービス",
    strengths: [
      "看護師求人に特化",
      "職場の内部情報にくわしい",
      "夜勤・働き方の相談ができる",
    ],
    ctaLabel: "公式サイトを見る",
    isAffiliate: false,
    url: "https://kango-oshigoto.jp/",
  },
  "job-medley": {
    slug: "job-medley",
    name: "ジョブメドレー",
    description: "医療・介護・福祉に特化した求人サイト",
    strengths: [
      "医療・介護職の求人数が多い",
      "スカウトが届く",
      "自分のペースで応募できる",
    ],
    ctaLabel: "求人を見る",
    isAffiliate: false,
    url: "https://job-medley.com/",
  },
  "pharma-staff": {
    slug: "pharma-staff",
    name: "ファルマスタッフ",
    description: "薬剤師向けの転職支援サービス",
    strengths: [
      "薬剤師求人に特化",
      "調剤薬局・病院・企業に対応",
      "派遣・パートの相談もできる",
    ],
    ctaLabel: "公式サイトを見る",
    isAffiliate: false,
    url: "https://www.38-8931.com/",
  },
  "leverwell-kaigo": {
    slug: "leverwell-kaigo",
    name: "レバウェル介護",
    description: "介護職向けの転職支援サービス",
    strengths: [
      "介護職の求人に特化",
      "資格取得の相談ができる",
      "未経験・無資格の求人もある",
    ],
    ctaLabel: "公式サイトを見る",
    isAffiliate: false,
    url: "https://job.kiracare.jp/",
  },
};

export function getServiceBySlug(slug: string): RecruitService | undefined {
  return SERVICES[slug];
}

/**
 * 出し分けルール(優先順):
 * 医療系職種(看護師/薬剤師/介護職) > 現在年収800万円以上 > 働き方を変えたい > IT・Web > デフォルト
 */
export function recommendServices(input: SimulatorInput): RecruitService[] {
  const median =
    INCOME_OPTIONS.find((o) => o.value === input.income)?.median ?? 0;

  let slugs: string[];
  if (input.occupation === "nurse") {
    slugs = ["leverwell-kango", "job-medley", "rikunabi-next"];
  } else if (input.occupation === "pharmacist") {
    slugs = ["pharma-staff", "job-medley", "rikunabi-next"];
  } else if (input.occupation === "care-worker") {
    slugs = ["leverwell-kaigo", "job-medley", "rikunabi-next"];
  } else if (median >= 900) {
    // 800〜1000万円帯以上
    slugs = ["bizreach", "recruit-direct-scout", "at-projin"];
  } else if (input.reasons.includes("work-style")) {
    slugs = ["miidas", "rikunabi-next", "bizreach"];
  } else if (input.industry === "it-web") {
    slugs = ["at-projin", "bizreach", "miidas"];
  } else {
    slugs = ["rikunabi-next", "miidas", "bizreach"];
  }
  return slugs.map((s) => SERVICES[s]);
}
