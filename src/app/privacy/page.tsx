import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "プライバシーポリシー｜年収UPシミュレーター",
  description:
    "年収UPシミュレーターのプライバシーポリシー・広告掲載・免責事項について説明しています。",
};

const SECTIONS: { heading: string; body: string[] }[] = [
  {
    heading: "個人情報の取り扱いについて",
    body: [
      "本サイトの診断機能は、選択された条件をブラウザ内でのみ処理しており、氏名・連絡先などの個人情報の入力・送信を求めることはありません。診断内容がサーバーに保存されることもありません。",
    ],
  },
  {
    heading: "広告について",
    body: [
      "本サイトは、アフィリエイトプログラム(A8.netほか)に参加しており、紹介しているサービスには広告(PRリンク)が含まれる場合があります。広告リンクには「PR」の表記を行っています。",
      "リンク先のサービスへの登録・利用に関するお申し込み・契約は、利用者と各サービス提供事業者との間で行われるものであり、本サイトはその内容について責任を負いません。",
    ],
  },
  {
    heading: "Cookie(クッキー)について",
    body: [
      "広告の成果計測のため、アフィリエイトサービスプロバイダがCookieを利用する場合があります。Cookieに個人を特定する情報は含まれません。ブラウザの設定によりCookieを無効にすることができます。",
      "また、本サイトはアクセス状況の把握のためにアクセス解析ツールを利用する場合があります。利用する場合、データは匿名で収集され、個人を特定するものではありません。",
    ],
  },
  {
    heading: "LINE公式アカウントについて",
    body: [
      "本サイトは、診断結果の補足情報(企業年収レポート等)の配信のためにLINE公式アカウントを利用する場合があります。友だち追加は任意であり、いつでもブロック・解除できます。取得した情報を配信目的以外に使用することはありません。",
    ],
  },
  {
    heading: "診断結果について(免責事項)",
    body: [
      "本サイトの診断は、入力内容と一般的な転職市場の傾向に基づくルールベースの簡易ロジックによる参考値であり、AIによる個別分析ではありません。実際の年収や転職結果を保証するものではありません。",
      "本サイトの情報を利用して生じたいかなる損害についても、当方は責任を負いかねます。最終的な判断はご自身の責任で行ってください。",
    ],
  },
  {
    heading: "本ポリシーの変更",
    body: [
      "本ポリシーの内容は、法令の改正やサービス内容の変更に応じて、予告なく改定されることがあります。改定後のポリシーは本ページに掲載した時点で効力を生じます。",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-10">
        <p className="font-display text-[11px] tracking-[0.3em] text-gold-600">
          PRIVACY POLICY
        </p>
        <h1 className="mt-2 text-[22px] font-bold text-navy-900">
          プライバシーポリシー
        </h1>
        <div className="mt-6 space-y-6">
          {SECTIONS.map((s) => (
            <section key={s.heading}>
              <h2 className="border-l-2 border-gold-400 pl-3 text-[15px] font-bold text-navy-900">
                {s.heading}
              </h2>
              {s.body.map((p) => (
                <p
                  key={p.slice(0, 20)}
                  className="mt-2.5 text-[13px] leading-relaxed text-navy-700"
                >
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>
        <p className="mt-8 text-[12px] text-navy-600">制定日: 2026年7月23日</p>
        <div className="mt-8 flex gap-4 text-[13px] font-semibold text-navy-800">
          <Link href="/" className="underline underline-offset-4 hover:text-gold-600">
            トップに戻る
          </Link>
          <Link
            href="/about"
            className="underline underline-offset-4 hover:text-gold-600"
          >
            運営者情報
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
