"use client";

import { useState } from "react";
import type { SimulatorResult } from "@/lib/simulator";

export default function ShareButton({ result }: { result: SimulatorResult }) {
  const [copied, setCopied] = useState(false);

  const shareText =
    `年収UPシミュレーターを試したら、想定年収は${result.lower}万円〜${result.upper}万円でした。\n` +
    `自分の市場価値をチェックしてみる`;
  const shareUrl = typeof window !== "undefined" ? window.location.origin : "";
  const xUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;

  const copyResult = () => {
    navigator.clipboard.writeText(`${shareText}\n${shareUrl}`).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="space-y-2.5">
      <a
        href={xUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-13 w-full items-center justify-center gap-2 rounded-2xl bg-navy-950 text-[14px] font-bold text-white transition-all hover:brightness-125 active:scale-[0.99]"
      >
        <svg className="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.213 5.567 5.95-5.567Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        結果をXでシェアする
      </a>
      <button
        type="button"
        onClick={copyResult}
        className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-navy-100 bg-white text-[13px] font-semibold text-navy-800 transition-colors hover:bg-navy-50"
      >
        {copied ? (
          <svg className="size-4 text-gold-600" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="m3.5 8.5 3 3 6-6"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg className="size-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <rect
              x="5.5"
              y="5.5"
              width="8"
              height="8"
              rx="1.5"
              stroke="currentColor"
              strokeWidth="1.4"
            />
            <path
              d="M10.5 3.5v-1a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h1"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
        )}
        {copied ? "コピーしました" : "結果をコピーする"}
      </button>
    </div>
  );
}
