import type { SimulatorInput } from "./simulator";

/**
 * 診断入力に応じて「年収を上げる打ち手」を返すルールベースのアドバイスエンジン。
 * 断定表現は使わない(景表法配慮)。articleSlug は実在するコラムのslugのみ指定する。
 */
export interface AdviceItem {
  title: string;
  body: string;
  articleSlug?: string;
  articleLabel?: string;
}

export function getAdvice(input: SimulatorInput): AdviceItem[] {
  const items: AdviceItem[] = [];
  const age30Plus = ["30-34", "35-40", "41-50", "51+"].includes(input.age);

  // 1. 職種特化(医療系)
  if (input.occupation === "nurse") {
    items.push({
      title: "働き方(夜勤・専門性)を見直す",
      body: "看護師の年収は夜勤手当と専門性で大きく変わります。夜勤の有無、認定資格、施設の給与水準を軸に求人を比較すると、条件を上げやすくなります。",
      articleSlug: "kangoshi-tenshoku-nenshu-ageru",
      articleLabel: "看護師の働き方別・年収の傾向",
    });
  } else if (input.occupation === "pharmacist") {
    items.push({
      title: "勤務先タイプを見直す",
      body: "薬剤師は調剤薬局・ドラッグストア・病院・企業のどこで働くかで年収傾向が変わります。地方の方が好条件になりやすい逆転現象も、選択肢に入れる価値があります。",
      articleSlug: "yakuzaishi-tenshoku-nenshu",
      articleLabel: "薬剤師の勤務先タイプ別の傾向",
    });
  } else if (input.occupation === "care-worker") {
    items.push({
      title: "資格を一段上げる",
      body: "介護職は初任者研修→実務者研修→介護福祉士と、資格の段階に応じて年収が階段状に上がりやすい構造です。次の資格取得が最も確実性の高い打ち手になります。",
      articleSlug: "kaigoshoku-tenshoku-nenshu",
      articleLabel: "介護職の資格ステップと年収",
    });
  }

  // 2. マネジメント経験なし×30代以上
  if (input.management === "none" && age30Plus) {
    items.push({
      title: "マネジメント経験を作る・言語化する",
      body: "役職の有無は年収レンジに直結しやすい要素です。少人数のリーダー経験や後輩育成も、規模と中身を言語化できれば評価対象になります。",
      articleSlug: "kanrishoku-tenshoku-management-apiiru",
      articleLabel: "マネジメント経験の伝え方",
    });
  }

  // 3. 企業規模が小さい
  if (input.companySize === "u50" || input.companySize === "50-299") {
    items.push({
      title: "企業規模を上げる転職を検討する",
      body: "同じ仕事でも、企業規模が変わると給与テーブルごと変わることがあります。経験を活かせる大手・中堅企業への転職は、年収レンジを底上げしやすい選択肢です。",
      articleSlug: "chuushou-kigyo-tenshoku-nenshu",
      articleLabel: "企業規模と年収の関係",
    });
  }

  // 4. 事務職 → 専門事務へ
  if (input.occupation === "back-office") {
    items.push({
      title: "専門性のある事務職へ軸足を移す",
      body: "一般事務から経理・人事・法務などの専門事務へ進むと、経験がそのまま市場価値になりやすく、年収の伸びしろが変わります。",
      articleSlug: "keiri-tenshoku-nenshu",
      articleLabel: "経理のキャリアロードマップ",
    });
  }

  // 5. 給与水準の低い業種×持ち運べる職種
  const lowPayIndustry = ["medical", "other", "corporate", "manufacturer"].includes(
    input.industry,
  );
  const portableOccupation = ["sales-job", "engineer", "planning-marketing"].includes(
    input.occupation,
  );
  if (lowPayIndustry && portableOccupation) {
    items.push({
      title: "給与水準の高い業種へ職種スライドする",
      body: "同じ職種でも業種が変わると給与レンジが変わります。今のスキルを持ち込める、給与水準の高い業種(IT・金融など)への転職は有力な選択肢です。",
      articleSlug: "tenshoku-nenshu-agaru",
      articleLabel: "年収が上がりやすい人の特徴",
    });
  }

  // 6. 交渉(理由に「年収を上げたい」がある場合は優先)
  if (input.reasons.includes("raise-income")) {
    items.push({
      title: "内定後の条件交渉を設計しておく",
      body: "年収交渉が最も動きやすいのは内定後・入社承諾前です。相場の把握と実績の数字化を済ませておくと、交渉の説得力が変わります。",
      articleSlug: "nenshu-kosho-kiridashikata",
      articleLabel: "年収交渉の切り出し方",
    });
  }

  // ベース施策(全員向け・不足分を埋める)
  items.push(
    {
      title: "実績を数字で語れるようにする",
      body: "職務経歴書と面接では「何をしたか」より「数字で示せる成果」が評価されます。売上・人数・件数など、事実として語れる数字を棚卸ししておきましょう。",
      articleSlug: "shokumu-keirekisho-kakikata",
      articleLabel: "職務経歴書の書き方",
    },
    {
      title: "複数の選択肢を比較してから決める",
      body: "1社だけでは提示条件の良し悪しを判断できません。複数のオファーやスカウトを比較することで、相場観と交渉の余地が生まれます。",
      articleSlug: "fukusu-naitei-hikaku-houhou",
      articleLabel: "複数内定の比較方法",
    },
  );

  // 重複slugを除いて最大4件
  const seen = new Set<string>();
  return items
    .filter((item) => {
      const key = item.articleSlug ?? item.title;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, 4);
}
