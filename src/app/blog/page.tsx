import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "転職コラム｜年収UPシミュレーター",
  description:
    "転職と年収に関する一般的な傾向やノウハウをまとめたコラムです。年代別の年収傾向、市場価値の把握方法などを解説します。",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-10">
        <p className="font-display text-[11px] tracking-[0.3em] text-gold-600">
          COLUMN
        </p>
        <h1 className="mt-2 text-[22px] font-bold text-navy-900">転職コラム</h1>
        <p className="mt-2 text-[13px] leading-relaxed text-navy-600">
          転職と年収にまつわる一般的な傾向・考え方をまとめています。
        </p>
        <div className="mt-6 space-y-4">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block rounded-2xl border border-navy-100 bg-white p-5 shadow-[0_10px_24px_-18px_rgba(13,27,42,0.3)] transition-colors hover:border-gold-400"
            >
              <time className="text-[11px] text-navy-600" dateTime={post.date}>
                {post.date.replaceAll("-", ".")}
              </time>
              <h2 className="mt-1.5 text-[15.5px] font-bold leading-snug text-navy-900">
                {post.title}
              </h2>
              <p className="mt-2 line-clamp-2 text-[12.5px] leading-relaxed text-navy-600">
                {post.description}
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-[12.5px] font-semibold text-gold-600">
                続きを読む
                <svg className="size-3.5" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="m6 3.5 4.5 4.5L6 12.5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
          ))}
        </div>
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
