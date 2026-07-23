"use client";

import { Buildings, LockKey, RocketLaunch } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import type { CompanyMatchResult, CompanySalary } from "@/lib/companies";
import { LINE_OFFICIAL_URL } from "@/lib/config";
import type { SimulatorResult } from "@/lib/simulator";

function CompanyRow({ company }: { company: CompanySalary }) {
  return (
    <li className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3">
      <span className="text-[13px] font-bold text-navy-900">{company.name}</span>
      <span className="shrink-0 font-numeric text-[13px] font-extrabold text-navy-800">
        約{company.avgSalary}
        <span className="ml-0.5 text-[10px] font-semibold text-slate-500">万円</span>
      </span>
    </li>
  );
}

export default function CompanyMatch({
  result,
  industry,
  occupation,
}: {
  result: SimulatorResult;
  industry: string;
  occupation?: string;
}) {
  const [match, setMatch] = useState<CompanyMatchResult | null>(null);
  const gated = Boolean(LINE_OFFICIAL_URL);

  useEffect(() => {
    const controller = new AbortController();
    const query = new URLSearchParams({
      lower: String(result.lower),
      upper: String(result.upper),
      estimate: String(result.estimate),
      industry,
      occupation: occupation ?? "",
    });
    fetch(`/api/companies?${query}`, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => data && setMatch(data))
      .catch(() => {
        /* 取得失敗時はセクション非表示のまま */
      });
    return () => controller.abort();
  }, [result.lower, result.upper, result.estimate, industry, occupation]);

  if (!match || (match.fit.length === 0 && match.challenge.length === 0)) {
    return null;
  }
  const { fit, challenge } = match;

  return (
    <section className="mx-auto mt-16 max-w-6xl px-5 sm:px-9" aria-labelledby="company-match-title">
      <div className="max-w-2xl">
        <p className="text-xs font-bold tracking-[0.18em] text-gold-600">
          COMPANY REPORT
        </p>
        <h2
          id="company-match-title"
          className="mt-3 font-display text-2xl font-semibold text-navy-900 sm:text-3xl"
        >
          あなたのレンジと、企業の現在地。
        </h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          {match.poolNote
            ? `全上場企業の有価証券報告書(約3,700社)から、${match.poolNote}を照合しています。`
            : "全上場企業の有価証券報告書(約3,700社)から、あなたの想定レンジに近い企業を照合しています。"}
        </p>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        {fit.length > 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
            <div className="flex items-center gap-2 text-navy-800">
              <Buildings className="size-5" weight="duotone" aria-hidden="true" />
              <h3 className="text-sm font-bold tracking-[0.04em]">
                レンジが合う企業例
              </h3>
            </div>
            <p className="mt-2 text-xs leading-5 text-slate-500">
              平均年間給与があなたの想定レンジ({result.lower}〜{result.upper}
              万円)と重なる企業です。
            </p>
            <ul className="mt-4 space-y-2.5">
              {fit.map((company) => (
                <CompanyRow key={company.name} company={company} />
              ))}
            </ul>
          </div>
        )}

        {challenge.length > 0 && (
          <div className="relative overflow-hidden rounded-2xl border border-gold-300 bg-gold-50/60 p-5 sm:p-6">
            <div className="flex items-center gap-2 text-gold-600">
              <RocketLaunch className="size-5" weight="duotone" aria-hidden="true" />
              <h3 className="text-sm font-bold tracking-[0.04em] text-navy-900">
                チャレンジレンジの企業例
              </h3>
            </div>
            <p className="mt-2 text-xs leading-5 text-slate-500">
              想定レンジの一段上。スキル次第で挑戦の視野に入る水準の企業です。
            </p>
            <ul
              className={`mt-4 space-y-2.5 ${gated ? "pointer-events-none select-none blur-[6px]" : ""}`}
              aria-hidden={gated}
            >
              {challenge.map((company) => (
                <CompanyRow key={company.name} company={company} />
              ))}
            </ul>
            {gated && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white/55 px-6 text-center">
                <LockKey className="size-6 text-navy-800" weight="bold" aria-hidden="true" />
                <p className="text-[13px] font-bold text-navy-900">
                  チャレンジ企業の詳細はLINEで受け取れます
                </p>
                <a
                  href={LINE_OFFICIAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 items-center justify-center rounded-xl bg-[#06C755] px-6 text-sm font-bold text-white transition-colors hover:bg-[#05b34c]"
                >
                  LINEで詳細レポートを受け取る(無料)
                </a>
              </div>
            )}
          </div>
        )}
      </div>

      <p className="mt-4 text-[11px] leading-5 text-slate-400">
        ※平均年間給与は各社の有価証券報告書(EDINET)に基づく目安値(10万円単位で丸め)であり、年度・職種・年齢構成により実際の水準は異なります。
        {match.poolNote &&
          "会社全体の平均値のため、専門職としての給与水準そのものではありません。"}
        最新の数値は各社の開示資料をご確認ください。掲載企業は例示であり、転職先として推奨・保証するものではありません。
      </p>
    </section>
  );
}
