import type { SimulatorResult } from "@/lib/simulator";

export default function ResultCard({ result }: { result: SimulatorResult }) {
  return (
    <section className="animate-rise-in mx-auto max-w-2xl px-4">
      <div className="overflow-hidden rounded-3xl border border-navy-100 bg-white shadow-[0_16px_40px_-20px_rgba(13,27,42,0.25)]">
        <div className="bg-navy-900 px-5 py-4 text-center">
          <p className="font-display text-[12px] tracking-[0.34em] text-gold-300">
            SIMULATION RESULT
          </p>
        </div>

        <div className="px-5 py-6 sm:px-7">
          <div className="flex flex-wrap justify-center gap-2">
            {result.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-navy-50 px-3 py-1 text-[12px] font-semibold text-navy-800"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="mt-6 text-center text-[13px] font-bold text-gold-600">
            想定年収レンジ
          </p>
          <p className="mt-1 text-center leading-none text-navy-900">
            <span className="font-numeric text-[44px] font-extrabold tracking-tight sm:text-[52px]">
              {result.lower}
            </span>
            <span className="text-[15px] font-bold">万円</span>
            <span className="mx-1.5 text-[22px] font-light text-navy-600">
              〜
            </span>
            <span className="font-numeric text-[44px] font-extrabold tracking-tight sm:text-[52px]">
              {result.upper}
            </span>
            <span className="text-[15px] font-bold">万円</span>
          </p>

          <div className="mt-6 flex items-stretch overflow-hidden rounded-2xl border border-navy-100">
            <div className="flex-1 bg-navy-50/60 px-3 py-3.5 text-center">
              <p className="text-[11px] text-navy-600">現在の年収レンジ</p>
              <p className="mt-1 text-[14px] font-bold text-navy-800">
                {result.currentIncomeLabel}
              </p>
            </div>
            <div className="flex items-center bg-navy-50/60 pr-1 text-navy-600">
              <svg className="size-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M3 8h9M9.5 4.5 13 8l-3.5 3.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex-1 bg-gold-50 px-3 py-3.5 text-center">
              <p className="text-[11px] text-gold-600">目安年収</p>
              <p className="mt-1 text-[14px] font-bold text-navy-900">
                <span className="font-numeric text-[17px]">{result.estimate}</span>
                万円
              </p>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3 rounded-2xl border border-gold-300/60 bg-gold-50 px-4 py-3.5">
            <div className="flex size-12 shrink-0 flex-col items-center justify-center rounded-xl border border-gold-400 bg-white">
              <span className="font-display text-[8px] tracking-[0.18em] text-gold-600">
                GRADE
              </span>
              <span className="font-numeric text-[20px] font-extrabold leading-none text-navy-900">
                {result.grade}
              </span>
            </div>
            <p className="text-[13px] font-semibold leading-snug text-navy-800">
              {result.gradeMessage}
            </p>
          </div>

          <div className="mt-4 rounded-2xl bg-navy-50/60 px-4 py-4">
            <p className="text-[11px] font-bold tracking-wide text-navy-600">
              診断コメント
            </p>
            <p className="mt-1.5 text-[13px] leading-relaxed text-navy-800">
              {result.comment}
            </p>
          </div>

          <p className="mt-4 text-center text-[10.5px] leading-relaxed text-navy-600/70">
            ※本シミュレーターは一般的な傾向に基づく参考値です。
            実際の年収は経験・スキル・企業条件により異なります。
          </p>
        </div>
      </div>
    </section>
  );
}
