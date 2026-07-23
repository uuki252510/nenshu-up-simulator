"use client";

import { Check, Copy, XLogo } from "@phosphor-icons/react";
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
    <div className="grid gap-3 sm:grid-cols-2">
      <a
        href={xUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-13 items-center justify-center gap-2 rounded-xl bg-navy-950 text-sm font-bold text-white transition-colors hover:bg-navy-700"
      >
        <XLogo className="size-4" weight="bold" aria-hidden="true" />
        結果をXでシェア
      </a>
      <button
        type="button"
        onClick={copyResult}
        className="flex h-13 cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white text-sm font-bold text-navy-800 transition-colors hover:bg-slate-50"
      >
        {copied ? (
          <Check className="size-4 text-gold-600" weight="bold" aria-hidden="true" />
        ) : (
          <Copy className="size-4" weight="bold" aria-hidden="true" />
        )}
        {copied ? "コピーしました" : "結果をコピー"}
      </button>
    </div>
  );
}
