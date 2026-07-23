import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto bg-navy-900 text-white">
      <div className="mx-auto max-w-2xl px-4 py-8 text-center">
        <p className="font-display text-[11px] tracking-[0.3em] text-gold-300">
          SALARY UP SIMULATOR
        </p>
        <p className="mt-2 text-[13px] font-semibold">年収UPシミュレーター</p>
        <nav className="mt-4 flex justify-center gap-5 text-[12px] text-white/70">
          <Link href="/privacy" className="transition-colors hover:text-gold-300">
            プライバシーポリシー
          </Link>
          <Link href="/about" className="transition-colors hover:text-gold-300">
            運営者情報
          </Link>
        </nav>
        <p className="mt-4 text-[11px] leading-relaxed text-white/50">
          本サービスは一般的な傾向に基づく参考値を表示するものであり、
          <br className="hidden sm:block" />
          年収や転職結果を保証するものではありません。
        </p>
        <p className="mt-4 text-[11px] text-white/40">
          &copy; {new Date().getFullYear()} 合同会社Nexia
        </p>
      </div>
    </footer>
  );
}
