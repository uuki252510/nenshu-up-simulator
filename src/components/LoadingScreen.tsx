"use client";

import { CircleNotch } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

const MESSAGES = [
  "条件を分析しています…",
  "相性の良い転職サービスを照合中…",
  "想定年収レンジを計算中…",
];

export default function LoadingScreen() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((current) => Math.min(current + 1, MESSAGES.length - 1));
    }, 650);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="animate-rise-in mx-auto flex min-h-[calc(100svh-4rem)] max-w-2xl flex-col items-center justify-center px-5 py-24 lg:min-h-[calc(100svh-5rem)]">
      <span className="flex size-18 items-center justify-center rounded-full border border-gold-300 bg-gold-50 text-gold-600">
        <CircleNotch className="animate-spin-slow size-9" weight="bold" aria-hidden="true" />
      </span>
      <p
        key={index}
        className="animate-rise-in mt-7 text-[15px] font-bold text-navy-800"
        role="status"
        aria-live="polite"
      >
        {MESSAGES[index]}
      </p>
      <p className="mt-2 text-xs text-slate-500">少々お待ちください</p>
      <div className="mt-9 h-1.5 w-52 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-blue-800"
          style={{ animation: "bar-fill 1.9s ease-out forwards" }}
        />
      </div>
    </div>
  );
}
