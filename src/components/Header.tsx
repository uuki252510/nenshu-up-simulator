export default function Header() {
  return (
    <header className="bg-navy-900 text-white">
      <div className="mx-auto flex h-14 max-w-2xl items-center justify-between px-4">
        <div className="flex items-center gap-2.5">
          <svg
            className="size-6 text-gold-400"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M4 19V11M9.5 19V5M15 19v-8M20 19V8"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            <path
              d="M16.5 4.5 20 8l-3.5 1"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-[15px] font-bold tracking-wide">
            年収UPシミュレーター
          </span>
        </div>
        <span className="rounded-full bg-gold-400 px-2.5 py-0.5 font-display text-[11px] font-semibold tracking-[0.14em] text-navy-900">
          FREE
        </span>
      </div>
    </header>
  );
}
