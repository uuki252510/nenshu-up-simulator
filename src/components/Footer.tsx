import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-[1440px] gap-7 px-5 py-9 sm:px-9 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="font-display text-sm font-semibold text-navy-900">
            年収UPシミュレーター
          </p>
          <p className="mt-2 max-w-xl text-[11px] leading-5 text-slate-500">
            本サービスは一般的な傾向に基づく参考値を表示するものであり、
            年収や転職結果を保証するものではありません。
          </p>
          <p className="mt-3 text-[11px] text-slate-400">
            &copy; {new Date().getFullYear()} 合同会社Nexia
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-5 gap-y-3 text-xs font-semibold text-slate-600" aria-label="フッターナビゲーション">
          <Link href="/blog" className="transition-colors hover:text-navy-900">
            転職コラム
          </Link>
          <Link href="/privacy" className="transition-colors hover:text-navy-900">
            プライバシーポリシー
          </Link>
          <Link href="/about" className="transition-colors hover:text-navy-900">
            運営者情報
          </Link>
        </nav>
      </div>
    </footer>
  );
}
