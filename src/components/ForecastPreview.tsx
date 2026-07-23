import Image from "next/image";
import {
  ArrowUpRight,
  ChartLineUp,
  LockKey,
  Path,
} from "@phosphor-icons/react/dist/ssr";
import type { SimulatorResult } from "@/lib/simulator";

export default function ForecastPreview({
  result,
}: {
  result?: SimulatorResult | null;
}) {
  return (
    <aside className="animate-rise-in stagger-2 flex h-full flex-col border-t border-slate-200 bg-white px-5 py-9 sm:px-9 lg:border-t-0 lg:border-l lg:px-12 lg:py-12">
      <div className="flex items-center justify-center gap-3 text-xs font-bold tracking-[0.12em] text-gold-600">
        <span className="h-px w-8 bg-gold-300" />
        想定年収レンジ
        <span className="h-px w-8 bg-gold-300" />
      </div>

      <div className="relative mx-auto mt-4 aspect-square w-full max-w-[460px]">
        <Image
          src="/assets/forecast-dial.png"
          alt=""
          fill
          priority
          sizes="(min-width: 1024px) 460px, 80vw"
          className="forecast-dial-image object-contain"
        />
        <div
          className="absolute inset-0 flex flex-col items-center justify-center px-12 text-center"
          aria-live="polite"
        >
          {result ? (
            <>
              <ChartLineUp
                className="size-8 text-gold-600"
                weight="duotone"
                aria-hidden="true"
              />
              <p className="mt-3 text-sm font-bold text-navy-700">診断結果</p>
              <p className="mt-2 font-numeric text-[32px] font-extrabold tracking-[-0.05em] text-navy-900 sm:text-[40px]">
                {result.lower}
                <span className="mx-2 text-xl font-medium text-slate-400">—</span>
                {result.upper}
                <span className="ml-1 text-base font-bold tracking-normal">万円</span>
              </p>
            </>
          ) : (
            <>
              <LockKey
                className="size-8 text-gold-600"
                weight="duotone"
                aria-hidden="true"
              />
              <p className="mt-3 text-sm font-bold text-navy-700">診断後に表示</p>
              <p className="mt-4 font-numeric text-[34px] font-extrabold tracking-[0.18em] text-navy-900 sm:text-[42px]">
                --- <span className="text-lg tracking-normal">万円</span>
              </p>
            </>
          )}
        </div>
      </div>

      <div className="mt-auto divide-y divide-dashed divide-slate-200 border-y border-dashed border-slate-200">
        <div className="flex gap-4 py-5">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-gold-500 text-gold-600">
            <ArrowUpRight className="size-5" weight="bold" aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-[15px] font-bold text-navy-900">
              あなたの市場価値を可視化
            </h2>
            <p className="mt-1 text-[13px] leading-6 text-slate-600">
              転職市場での想定年収レンジを診断します。
            </p>
          </div>
        </div>
        <div className="flex gap-4 py-5">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-gold-500 text-gold-600">
            <Path className="size-5" weight="bold" aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-[15px] font-bold text-navy-900">
              強みと可能性をレコメンド
            </h2>
            <p className="mt-1 text-[13px] leading-6 text-slate-600">
              年収アップにつながる次の一手を提案します。
            </p>
          </div>
        </div>
      </div>

      <p className="mt-5 text-[11px] leading-5 text-slate-500">
        ※本シミュレーターは入力内容をもとにした推定結果であり、
        実際の年収を保証するものではありません。
      </p>
    </aside>
  );
}
