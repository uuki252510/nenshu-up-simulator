import { ChartLineUp } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 sm:h-20 sm:px-9">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-md text-navy-900 transition-opacity hover:opacity-70"
          aria-label="年収UPシミュレーター ホーム"
        >
          <ChartLineUp
            className="size-6 text-gold-600 sm:size-7"
            weight="duotone"
            aria-hidden="true"
          />
          <span className="text-[15px] font-bold tracking-[0.02em] sm:text-lg">
            年収UPシミュレーター
          </span>
        </Link>
        <span className="rounded-lg border border-gold-500 bg-white px-3 py-1.5 text-[11px] font-bold tracking-[0.08em] text-gold-600 sm:px-4 sm:text-xs">
          登録不要・無料
        </span>
      </div>
    </header>
  );
}
