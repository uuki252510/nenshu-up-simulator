import { ArrowRight, SealCheck, TrendUp } from "@phosphor-icons/react/dist/ssr";
import type { SimulatorResult } from "@/lib/simulator";

export default function ResultCard({ result }: { result: SimulatorResult }) {
  return (
    <section className="animate-rise-in" aria-labelledby="result-title">
      <p className="text-xs font-bold tracking-[0.18em] text-gold-600">
        SIMULATION RESULT
      </p>
      <h1 id="result-title" className="mt-3 font-display text-3xl font-semibold text-navy-900 sm:text-[40px]">
        あなたの年収アップ可能性
      </h1>

      <div className="mt-5 flex flex-wrap gap-2">
        {result.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-navy-800"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-8 border-y border-slate-200 py-7">
        <p className="text-sm font-bold text-gold-600">想定年収レンジ</p>
        <p className="mt-2 flex flex-wrap items-end gap-x-2 font-numeric text-navy-900">
          <span className="text-[46px] font-extrabold tracking-[-0.06em] sm:text-[60px]">
            {result.lower}
          </span>
          <span className="mb-2 text-sm font-bold">万円</span>
          <span className="mb-2 text-2xl font-light text-slate-400">—</span>
          <span className="text-[46px] font-extrabold tracking-[-0.06em] sm:text-[60px]">
            {result.upper}
          </span>
          <span className="mb-2 text-sm font-bold">万円</span>
        </p>
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center border-b border-slate-200 py-5">
        <div>
          <p className="text-xs text-slate-500">現在の年収レンジ</p>
          <p className="mt-1 text-sm font-bold text-navy-800">
            {result.currentIncomeLabel}
          </p>
        </div>
        <ArrowRight className="mx-4 size-5 text-slate-400" weight="bold" aria-hidden="true" />
        <div className="text-right">
          <p className="text-xs text-slate-500">目安年収</p>
          <p className="mt-1 font-numeric text-xl font-extrabold text-navy-900">
            {result.estimate}<span className="ml-1 text-xs">万円</span>
          </p>
        </div>
      </div>

      <div className="mt-6 flex gap-4 rounded-2xl border border-gold-300 bg-gold-50 p-4 sm:p-5">
        <span className="flex size-13 shrink-0 flex-col items-center justify-center rounded-xl border border-gold-400 bg-white">
          <span className="text-[9px] font-bold tracking-[0.16em] text-gold-600">GRADE</span>
          <span className="font-numeric text-xl font-extrabold text-navy-900">{result.grade}</span>
        </span>
        <div>
          <div className="flex items-center gap-2 text-gold-600">
            <SealCheck className="size-5" weight="duotone" aria-hidden="true" />
            <p className="text-xs font-bold tracking-[0.08em]">診断評価</p>
          </div>
          <p className="mt-1 text-sm font-bold leading-6 text-navy-900">
            {result.gradeMessage}
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-2xl bg-slate-50 p-5">
        <div className="flex items-center gap-2 text-navy-700">
          <TrendUp className="size-5" weight="duotone" aria-hidden="true" />
          <p className="text-xs font-bold tracking-[0.08em]">診断コメント</p>
        </div>
        <p className="mt-2 text-sm leading-7 text-slate-700">{result.comment}</p>
      </div>
    </section>
  );
}
