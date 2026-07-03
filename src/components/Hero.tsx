export default function Hero() {
  return (
    <section className="mx-auto max-w-2xl px-4 pt-10 pb-6 text-center">
      <p className="font-display text-[12px] tracking-[0.3em] text-gold-600">
        SALARY SIMULATION
      </p>
      <h1 className="mt-3 text-[26px] font-bold leading-snug text-navy-900 sm:text-3xl">
        あなたの年収アップ可能性を
        <br className="sm:hidden" />
        診断
      </h1>
      <p className="mx-auto mt-3 max-w-md text-[13.5px] leading-relaxed text-navy-600">
        年齢・年収・学歴・業種を選ぶだけで、転職時の想定年収レンジと
        おすすめサービスをチェックできます。
      </p>
      <div className="mx-auto mt-5 h-px w-16 bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
    </section>
  );
}
