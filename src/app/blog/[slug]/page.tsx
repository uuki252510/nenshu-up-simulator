import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title}｜年収UPシミュレーター`,
    description: post.description,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Organization", name: "年収UPシミュレーター" },
    publisher: { "@type": "Organization", name: "合同会社Nexia" },
    mainEntityOfPage: `https://nenshu-up-simulator.vercel.app/blog/${post.slug}`,
  };

  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-10">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <nav className="text-[11px] text-navy-600" aria-label="パンくずリスト">
          <Link href="/" className="hover:text-gold-600">
            TOP
          </Link>
          <span className="mx-1.5">/</span>
          <Link href="/blog" className="hover:text-gold-600">
            転職コラム
          </Link>
        </nav>
        <article className="mt-4">
          <time className="text-[12px] text-navy-600" dateTime={post.date}>
            {post.date.replaceAll("-", ".")}
          </time>
          <h1 className="mt-2 text-[22px] font-bold leading-snug text-navy-900">
            {post.title}
          </h1>
          <div className="mt-6 space-y-1">
            <ReactMarkdown
              components={{
                h2: (props) => (
                  <h2
                    className="mt-9 border-l-2 border-gold-400 pl-3 text-[17px] font-bold text-navy-900"
                    {...props}
                  />
                ),
                h3: (props) => (
                  <h3
                    className="mt-6 text-[15px] font-bold text-navy-900"
                    {...props}
                  />
                ),
                p: (props) => (
                  <p
                    className="mt-3.5 text-[14px] leading-[1.9] text-navy-700"
                    {...props}
                  />
                ),
                ul: (props) => (
                  <ul
                    className="mt-3.5 list-disc space-y-1.5 pl-5 text-[14px] leading-relaxed text-navy-700"
                    {...props}
                  />
                ),
                ol: (props) => (
                  <ol
                    className="mt-3.5 list-decimal space-y-2 pl-5 text-[14px] leading-relaxed text-navy-700"
                    {...props}
                  />
                ),
                strong: (props) => (
                  <strong className="font-bold text-navy-900" {...props} />
                ),
                a: (props) => (
                  <a
                    className="font-semibold text-gold-600 underline underline-offset-4"
                    {...props}
                  />
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </article>

        <div className="mt-10 rounded-3xl border border-gold-300/60 bg-gold-50 p-6 text-center">
          <p className="font-display text-[10px] tracking-[0.28em] text-gold-600">
            FREE SIMULATION
          </p>
          <p className="mt-2 text-[16px] font-bold text-navy-900">
            あなたの想定年収レンジを無料でチェック
          </p>
          <p className="mt-1.5 text-[12.5px] text-navy-600">
            年齢・年収・学歴・業種を選ぶだけ。登録不要・約30秒。
          </p>
          <Link
            href="/"
            className="mt-4 inline-flex h-12 w-full max-w-xs items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-navy-900 to-navy-800 text-[14px] font-bold text-white transition-all hover:brightness-110"
          >
            年収アップ可能性を診断する
            <svg className="size-3.5" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="m6 3.5 4.5 4.5L6 12.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>

        <div className="mt-8">
          <Link
            href="/blog"
            className="text-[13px] font-semibold text-navy-800 underline underline-offset-4 hover:text-gold-600"
          >
            コラム一覧に戻る
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
