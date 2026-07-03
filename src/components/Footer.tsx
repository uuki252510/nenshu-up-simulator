export default function Footer() {
  return (
    <footer className="mt-auto bg-navy-900 text-white">
      <div className="mx-auto max-w-2xl px-4 py-8 text-center">
        <p className="font-display text-[11px] tracking-[0.3em] text-gold-300">
          SALARY UP SIMULATOR
        </p>
        <p className="mt-2 text-[13px] font-semibold">年収UPシミュレーター</p>
        <p className="mt-3 text-[11px] leading-relaxed text-white/50">
          本サービスは一般的な傾向に基づく参考値を表示するものであり、
          <br className="hidden sm:block" />
          年収や転職結果を保証するものではありません。
        </p>
        <p className="mt-4 text-[11px] text-white/40">
          &copy; {new Date().getFullYear()} 年収UPシミュレーター
        </p>
      </div>
    </footer>
  );
}
