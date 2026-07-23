import type { Metadata } from "next";
import { Manrope, Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import "./globals.css";

const notoSansJp = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
});

const notoSerifJp = Noto_Serif_JP({
  variable: "--font-noto-serif-jp",
  weight: ["500", "600", "700"],
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nenshu-up-simulator.vercel.app"),
  title: "年収UPシミュレーター｜あなたの年収アップ可能性を無料でチェック",
  description:
    "年齢・年収・学歴・業種を選ぶだけで、転職した場合の想定年収レンジとおすすめの転職サービスを無料で診断。登録不要・約30秒で自分の市場価値をチェックできます。",
  openGraph: {
    title: "年収UPシミュレーター",
    description:
      "年齢・年収・学歴・業種を選ぶだけで、転職時の想定年収レンジをチェック。登録不要・約30秒。",
    type: "website",
    locale: "ja_JP",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${notoSansJp.variable} ${notoSerifJp.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
