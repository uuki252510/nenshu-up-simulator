"use client";

import { ArrowRight, Lightbulb } from "@phosphor-icons/react";
import Link from "next/link";
import { getAdvice } from "@/lib/advice";
import type { SimulatorInput } from "@/lib/simulator";

export default function AdviceSection({ input }: { input: SimulatorInput }) {
  const advice = getAdvice(input);
  if (advice.length === 0) return null;

  return (
    <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-center gap-2 text-navy-700">
        <Lightbulb className="size-5 text-gold-600" weight="duotone" aria-hidden="true" />
        <p className="text-xs font-bold tracking-[0.08em]">
          あなたの条件で年収を上げる打ち手
        </p>
      </div>
      <ol className="mt-4 space-y-4">
        {advice.map((item, index) => (
          <li key={item.title} className="flex gap-3.5">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-gold-100 font-numeric text-[13px] font-extrabold text-gold-600">
              {index + 1}
            </span>
            <div className="min-w-0">
              <p className="text-[14px] font-bold leading-6 text-navy-900">
                {item.title}
              </p>
              <p className="mt-1 text-[13px] leading-6 text-slate-600">
                {item.body}
              </p>
              {item.articleSlug && (
                <Link
                  href={`/blog/${item.articleSlug}`}
                  className="mt-1.5 inline-flex items-center gap-1 text-[12.5px] font-semibold text-gold-600 hover:underline"
                >
                  {item.articleLabel}
                  <ArrowRight className="size-3.5" weight="bold" aria-hidden="true" />
                </Link>
              )}
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-4 text-[10.5px] leading-4 text-slate-400">
        ※入力条件に基づく一般的な打ち手の提案であり、効果を保証するものではありません。
      </p>
    </div>
  );
}
