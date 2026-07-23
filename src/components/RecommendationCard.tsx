import { ArrowUpRight, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import type { RecruitService } from "@/lib/services";

export default function RecommendationCard({
  service,
  rank,
}: {
  service: RecruitService;
  rank: number;
}) {
  const isTop = rank === 1;
  return (
    <article
      className={`flex h-full flex-col rounded-2xl border bg-white p-5 transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-1 hover:shadow-[0_18px_40px_-28px_rgba(15,23,42,0.5)] ${
        isTop ? "border-gold-400" : "border-slate-200"
      }`}
    >
      <div className="flex items-center gap-3">
        <span
          className={`flex size-8 shrink-0 items-center justify-center rounded-full font-numeric text-sm font-extrabold ${
            isTop ? "bg-gold-100 text-gold-600" : "bg-slate-100 text-navy-800"
          }`}
        >
          {rank}
        </span>
        <h3 className="text-base font-bold text-navy-900">{service.name}</h3>
        {service.isAffiliate && (
          <span className="ml-auto rounded border border-slate-300 px-1.5 py-0.5 text-[10px] font-semibold text-slate-500">
            PR
          </span>
        )}
      </div>
      <p className="mt-3 text-[13px] leading-6 text-slate-600">
        {service.description}
      </p>
      <ul className="mt-4 space-y-2.5">
        {service.strengths.map((strength) => (
          <li key={strength} className="flex items-start gap-2 text-[13px] leading-5 text-navy-800">
            <CheckCircle
              className="mt-0.5 size-4 shrink-0 text-gold-600"
              weight="fill"
              aria-hidden="true"
            />
            {strength}
          </li>
        ))}
      </ul>
      <a
        href={`/go/${service.slug}`}
        target="_blank"
        rel={
          service.isAffiliate
            ? "noopener noreferrer nofollow sponsored"
            : "noopener noreferrer nofollow"
        }
        className={`mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl text-sm font-bold transition-colors ${
          isTop
            ? "bg-gold-600 text-white hover:bg-gold-500"
            : "bg-navy-900 text-white hover:bg-navy-700"
        }`}
      >
        {service.ctaLabel}
        <ArrowUpRight className="size-4" weight="bold" aria-hidden="true" />
      </a>
    </article>
  );
}
