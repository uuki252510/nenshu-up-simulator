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
    <div
      className={`rounded-3xl border bg-white p-5 shadow-[0_12px_30px_-18px_rgba(13,27,42,0.3)] ${
        isTop ? "border-gold-400" : "border-navy-100"
      }`}
    >
      <div className="flex items-center gap-3">
        <span
          className={`flex size-8 shrink-0 items-center justify-center rounded-full font-numeric text-[15px] font-extrabold ${
            isTop
              ? "bg-gradient-to-br from-gold-300 to-gold-500 text-navy-900"
              : "bg-navy-800 text-white"
          }`}
        >
          {rank}
        </span>
        <p className="text-[16px] font-bold text-navy-900">{service.name}</p>
        {service.isAffiliate && (
          <span className="ml-auto shrink-0 rounded border border-navy-100 px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-navy-600">
            PR
          </span>
        )}
      </div>
      <p className="mt-2.5 text-[12.5px] leading-relaxed text-navy-600">
        {service.description}
      </p>
      <ul className="mt-3 space-y-1.5">
        {service.strengths.map((s) => (
          <li
            key={s}
            className="flex items-center gap-2 text-[13px] font-medium text-navy-800"
          >
            <svg
              className="size-4 shrink-0 text-gold-500"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.4" />
              <path
                d="m5 8 2 2 4-4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {s}
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
        className={`mt-4 flex h-12 w-full items-center justify-center gap-1.5 rounded-xl text-[14px] font-bold transition-all hover:brightness-110 active:scale-[0.99] ${
          isTop
            ? "bg-gradient-to-r from-gold-500 to-gold-400 text-navy-950"
            : "bg-navy-900 text-white"
        }`}
      >
        {service.ctaLabel}
        <svg className="size-3.5" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="m6 3.5 4.5 4.5L6 12.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </div>
  );
}
