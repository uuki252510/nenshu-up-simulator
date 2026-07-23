"use client";

import { ChartBarHorizontal } from "@phosphor-icons/react";
import { getBenchmarks, STATS_SOURCE } from "@/lib/stats";
import type { SimulatorInput, SimulatorResult } from "@/lib/simulator";

export default function StatBenchmark({
  input,
  result,
}: {
  input: SimulatorInput;
  result: SimulatorResult;
}) {
  const benchmarks = getBenchmarks(input.age, input.industry, input.occupation);
  if (benchmarks.length === 0) return null;

  const rows = [
    { label: "あなたの目安年収", value: result.estimate, highlight: true },
    ...benchmarks.map((b) => ({ ...b, highlight: false })),
  ];
  const max = Math.max(...rows.map((r) => r.value));

  return (
    <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-center gap-2 text-navy-700">
        <ChartBarHorizontal className="size-5" weight="duotone" aria-hidden="true" />
        <p className="text-xs font-bold tracking-[0.08em]">公的統計との比較</p>
      </div>
      <ul className="mt-4 space-y-3.5">
        {rows.map((row) => (
          <li key={row.label}>
            <div className="flex items-baseline justify-between gap-3">
              <span
                className={`text-xs ${row.highlight ? "font-bold text-navy-900" : "text-slate-600"}`}
              >
                {row.label}
              </span>
              <span
                className={`font-numeric text-sm font-extrabold ${row.highlight ? "text-gold-600" : "text-navy-800"}`}
              >
                {row.value}
                <span className="ml-0.5 text-[10px] font-semibold text-slate-500">
                  万円
                </span>
              </span>
            </div>
            <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className={`h-full rounded-full ${row.highlight ? "bg-gold-500" : "bg-navy-700/60"}`}
                style={{ width: `${Math.max(4, (row.value / max) * 100)}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-[10.5px] leading-4 text-slate-400">
        ※{STATS_SOURCE}。雇用形態等の異なる給与所得者を含む統計のため、参考比較用の数値です。
      </p>
    </div>
  );
}
