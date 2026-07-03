import { INCOME_OPTIONS } from "./options";
import type { SimulatorInput } from "./simulator";

export interface RecruitService {
  slug: string;
  name: string;
  description: string;
  strengths: [string, string, string];
  ctaLabel: string;
  /** 本番前に実アフィリエイトURLへ差し替える(仮URL) */
  affiliateUrl: string;
}

export const SERVICES: Record<string, RecruitService> = {
  "career-rise": {
    slug: "career-rise",
    name: "Career Rise",
    description: "年収アップを目指す方向けのハイクラス転職サービス",
    strengths: ["高年収求人に強い", "非公開求人あり", "面接対策サポート"],
    ctaLabel: "無料相談する",
    affiliateUrl: "https://example.com/affiliate/career-rise",
  },
  "tech-career-agent": {
    slug: "tech-career-agent",
    name: "＠PRO人",
    description: "IT・Web・ゲーム業界専門、未経験からのIT転職に強い転職エージェント",
    strengths: ["IT/Web/ゲーム求人に特化", "未経験からのIT転職に対応", "年収アップ率82%の実績"],
    ctaLabel: "無料でキャリア相談する",
    affiliateUrl: "https://px.a8.net/svt/ejp?a8mat=3N8DIR+4ASQ2A+4GWI+BZVU9",
  },
  "work-shift-plus": {
    slug: "work-shift-plus",
    name: "Work Shift Plus",
    description: "働き方を変えたい人向けの総合転職サービス",
    strengths: ["リモート求人あり", "未経験相談も可能", "キャリア相談無料"],
    ctaLabel: "無料登録する",
    affiliateUrl: "https://example.com/affiliate/work-shift-plus",
  },
  "high-class-agent": {
    slug: "high-class-agent",
    name: "High Class Agent",
    description: "年収800万円以上向けのエグゼクティブ転職サービス",
    strengths: ["ハイクラス求人専門", "ヘッドハンターからスカウト", "経営層への転職も支援"],
    ctaLabel: "無料相談する",
    affiliateUrl: "https://example.com/affiliate/high-class-agent",
  },
  "remote-career": {
    slug: "remote-career",
    name: "Remote Career",
    description: "リモートワーク求人に特化した転職サービス",
    strengths: ["フルリモート求人多数", "地方在住でも応募できる", "柔軟な働き方を提案"],
    ctaLabel: "求人を見る",
    affiliateUrl: "https://example.com/affiliate/remote-career",
  },
};

export function getServiceBySlug(slug: string): RecruitService | undefined {
  return SERVICES[slug];
}

/**
 * 出し分けルール(優先順): 現在年収800万円以上 > 働き方を変えたい > IT・Web > デフォルト
 */
export function recommendServices(input: SimulatorInput): RecruitService[] {
  const median =
    INCOME_OPTIONS.find((o) => o.value === input.income)?.median ?? 0;

  let slugs: string[];
  if (median >= 900) {
    // 800〜1000万円帯以上
    slugs = ["career-rise", "high-class-agent", "tech-career-agent"];
  } else if (input.reasons.includes("work-style")) {
    slugs = ["work-shift-plus", "remote-career", "career-rise"];
  } else if (input.industry === "it-web") {
    slugs = ["tech-career-agent", "career-rise", "work-shift-plus"];
  } else {
    slugs = ["career-rise", "work-shift-plus", "tech-career-agent"];
  }
  return slugs.map((s) => SERVICES[s]);
}
