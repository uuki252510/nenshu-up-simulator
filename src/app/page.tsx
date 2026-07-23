"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SimulatorForm from "@/components/SimulatorForm";
import LoadingScreen from "@/components/LoadingScreen";
import ResultCard from "@/components/ResultCard";
import RecommendationCard from "@/components/RecommendationCard";
import ShareButton from "@/components/ShareButton";
import Confetti from "@/components/Confetti";
import Disclaimer from "@/components/Disclaimer";
import Footer from "@/components/Footer";
import { simulate, type SimulatorInput, type SimulatorResult } from "@/lib/simulator";
import { recommendServices, type RecruitService } from "@/lib/services";

type Step = "form" | "loading" | "result";

const EMPTY_INPUT: SimulatorInput = {
  age: "",
  income: "",
  education: "",
  industry: "",
  reasons: [],
};

export default function Home() {
  const [step, setStep] = useState<Step>("form");
  const [input, setInput] = useState<SimulatorInput>(EMPTY_INPUT);
  const [result, setResult] = useState<SimulatorResult | null>(null);
  const [services, setServices] = useState<RecruitService[]>([]);

  const startDiagnosis = () => {
    setStep("loading");
    window.scrollTo({ top: 0 });
    setTimeout(() => {
      setResult(simulate(input));
      setServices(recommendServices(input));
      setStep("result");
      window.scrollTo({ top: 0 });
    }, 1900);
  };

  const retry = () => {
    setStep("form");
    window.scrollTo({ top: 0 });
  };

  return (
    <>
      <Header />
      <main className="flex-1 pb-6">
        {step === "form" && (
          <>
            <Hero />
            <SimulatorForm value={input} onChange={setInput} onSubmit={startDiagnosis} />
            <section className="mx-auto max-w-2xl px-4 pb-4">
              <a
                href="/blog"
                className="flex items-center justify-between rounded-2xl border border-navy-100 bg-white/80 px-5 py-4 transition-colors hover:border-gold-400"
              >
                <div>
                  <p className="font-display text-[10px] tracking-[0.24em] text-gold-600">
                    COLUMN
                  </p>
                  <p className="mt-1 text-[13.5px] font-bold text-navy-900">
                    転職と年収の基礎知識を読む
                  </p>
                </div>
                <svg
                  className="size-4 shrink-0 text-navy-600"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="m6 3.5 4.5 4.5L6 12.5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </section>
          </>
        )}

        {step === "loading" && <LoadingScreen />}

        {step === "result" && result && (
          <div className="pt-8">
            <Confetti />
            <ResultCard result={result} />

            <section className="mx-auto mt-10 max-w-2xl px-4">
              <h2 className="text-center text-[19px] font-bold text-navy-900">
                あなたにおすすめの転職サービス
              </h2>
              <div className="mx-auto mt-2 h-px w-12 bg-gold-400" />
              {services.some((s) => s.isAffiliate) && (
                <p className="mt-3 text-center text-[11px] text-navy-600/80">
                  ※本セクションには広告(PRリンク)を含みます
                </p>
              )}
              <div className="mt-6 space-y-4">
                {services.map((service, i) => (
                  <RecommendationCard key={service.slug} service={service} rank={i + 1} />
                ))}
              </div>
            </section>

            <section className="mx-auto mt-10 max-w-2xl px-4">
              <ShareButton result={result} />
              <button
                type="button"
                onClick={retry}
                className="mt-2.5 flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-navy-800 bg-white text-[13px] font-bold text-navy-900 transition-colors hover:bg-navy-50"
              >
                <svg className="size-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M13.5 8a5.5 5.5 0 1 1-1.6-3.9M13.5 2.5v2.6h-2.6"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                条件を変えてもう一度診断する
              </button>
            </section>
          </div>
        )}
      </main>
      {step !== "loading" && <Disclaimer />}
      <Footer />
    </>
  );
}
