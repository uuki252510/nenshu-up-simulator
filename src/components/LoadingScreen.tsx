"use client";

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
      setIndex((i) => Math.min(i + 1, MESSAGES.length - 1));
    }, 650);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="animate-rise-in mx-auto flex max-w-2xl flex-col items-center px-4 py-24">
      <div className="relative size-16">
        <svg className="animate-spin-slow size-16" viewBox="0 0 48 48" aria-hidden="true">
          <circle
            cx="24"
            cy="24"
            r="20"
            fill="none"
            stroke="#dde6f0"
            strokeWidth="5"
          />
          <path
            d="M24 4a20 20 0 0 1 20 20"
            fill="none"
            stroke="#d9ad4b"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <p
        key={index}
        className="animate-rise-in mt-8 text-[15px] font-semibold text-navy-800"
        role="status"
      >
        {MESSAGES[index]}
      </p>
      <p className="mt-2 text-[12px] text-navy-600">少々お待ちください</p>
      <div className="mt-10 h-1 w-48 overflow-hidden rounded-full bg-navy-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-navy-800 to-gold-400"
          style={{ animation: "bar-fill 1.9s ease-out forwards" }}
        />
      </div>
    </div>
  );
}
