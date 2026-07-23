import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "運営者情報｜年収UPシミュレーター",
  description: "年収UPシミュレーターの運営者情報です。",
};

const ROWS: { label: string; value: string }[] = [
  { label: "サイト名", value: "年収UPシミュレーター" },
  { label: "運営者", value: "合同会社Nexia" },
  { label: "代表者", value: "代表社員 吉澤 雄貴" },
  {
    label: "所在地",
    value:
      "〒651-0084 兵庫県神戸市中央区磯辺通1丁目1番18号 カサベラ国際プラザビル707号室",
  },
  { label: "事業内容", value: "Webサービス・Webサイトの企画・開発・運営" },
  {
    label: "サイトURL",
    value: "https://nenshu-up-simulator.vercel.app",
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-10">
        <p className="font-display text-[11px] tracking-[0.3em] text-gold-600">
          ABOUT
        </p>
        <h1 className="mt-2 text-[22px] font-bold text-navy-900">運営者情報</h1>
        <div className="mt-6 overflow-hidden rounded-2xl border border-navy-100 bg-white">
          <dl>
            {ROWS.map((row, i) => (
              <div
                key={row.label}
                className={`flex flex-col gap-1 px-5 py-4 sm:flex-row sm:gap-6 ${
                  i > 0 ? "border-t border-navy-50" : ""
                }`}
              >
                <dt className="shrink-0 text-[12px] font-bold text-navy-600 sm:w-24 sm:pt-0.5">
                  {row.label}
                </dt>
                <dd className="text-[13.5px] leading-relaxed text-navy-900">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <p className="mt-6 text-[12.5px] leading-relaxed text-navy-700">
          本サイトは、転職を検討している方向けに、想定年収レンジの簡易シミュレーションと
          転職サービスの紹介を行う情報サイトです。掲載内容には広告(アフィリエイトリンク)を
          含む場合があります。詳細は
          <Link
            href="/privacy"
            className="mx-0.5 underline underline-offset-4 hover:text-gold-600"
          >
            プライバシーポリシー
          </Link>
          をご覧ください。
        </p>
        <div className="mt-8">
          <Link
            href="/"
            className="text-[13px] font-semibold text-navy-800 underline underline-offset-4 hover:text-gold-600"
          >
            トップに戻る
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
