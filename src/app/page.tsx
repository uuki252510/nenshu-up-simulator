"use client";

import { useState } from "react";
import { ArrowCounterClockwise } from "@phosphor-icons/react";
import CompanyMatch from "@/components/CompanyMatch";
import Confetti from "@/components/Confetti";
import Disclaimer from "@/components/Disclaimer";
import Footer from "@/components/Footer";
import ForecastPreview from "@/components/ForecastPreview";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import LoadingScreen from "@/components/LoadingScreen";
import NurseWorkStyle from "@/components/NurseWorkStyle";
import RecommendationCard from "@/components/RecommendationCard";
import ResultCard from "@/components/ResultCard";
import ShareButton from "@/components/ShareButton";
import SimulatorForm from "@/components/SimulatorForm";
import StatBenchmark from "@/components/StatBenchmark";
import { recommendServices, type RecruitService } from "@/lib/services";
import { simulate, type SimulatorInput, type SimulatorResult } from "@/lib/simulator";

type Step = "form" | "loading" | "result";

const EMPTY_INPUT: SimulatorInput = {
  age: "",
  income: "",
  education: "",
  industry: "",
  occupation: "",
  companySize: "",
  management: "",
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
      <main className="flex-1">
        {step === "form" && (
          <div className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-[1440px] grid-cols-1 lg:min-h-[calc(100svh-5rem)] lg:grid-cols-[minmax(0,1.08fr)_minmax(430px,0.92fr)]">
            <div className="px-5 py-10 sm:px-9 sm:py-12 lg:px-14 lg:py-14">
              <Hero />
              <SimulatorForm
                value={input}
                onChange={setInput}
                onSubmit={startDiagnosis}
              />
            </div>
            <ForecastPreview />
          </div>
        )}

        {step === "loading" && <LoadingScreen />}

        {step === "result" && result && (
          <div className="pb-16">
            <Confetti />
            <div className="mx-auto grid max-w-[1440px] grid-cols-1 lg:grid-cols-[minmax(0,1.08fr)_minmax(430px,0.92fr)]">
              <div className="px-5 py-10 sm:px-9 lg:px-14 lg:py-14">
                <ResultCard result={result} />
                <StatBenchmark input={input} result={result} />
                {input.occupation === "nurse" && <NurseWorkStyle />}
              </div>
              <ForecastPreview result={result} />
            </div>

            <CompanyMatch
              result={result}
              industry={input.industry}
              occupation={input.occupation}
            />

            <section className="mx-auto mt-16 max-w-6xl px-5 sm:px-9">
              <div className="max-w-2xl">
                <p className="text-xs font-bold tracking-[0.18em] text-gold-600">
                  NEXT ACTION
                </p>
                <h2 className="mt-3 font-display text-2xl font-semibold text-navy-900 sm:text-3xl">
                  可能性を、具体的な一歩へ。
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  診断条件に合うサービスを、強みと使い方で比較できます。
                </p>
              </div>
              {services.some((service) => service.isAffiliate) && (
                <p className="mt-4 text-xs text-slate-500">
                  ※このセクションには広告（PRリンク）を含みます。
                </p>
              )}
              <div className="mt-8 grid gap-5 lg:grid-cols-3">
                {services.map((service, index) => (
                  <RecommendationCard
                    key={service.slug}
                    service={service}
                    rank={index + 1}
                  />
                ))}
              </div>
            </section>

            <section className="mx-auto mt-14 max-w-2xl px-5 sm:px-9">
              <ShareButton result={result} />
              <button
                type="button"
                onClick={retry}
                className="mt-3 flex h-13 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white text-[13px] font-bold text-navy-900 transition-colors hover:bg-slate-50"
              >
                <ArrowCounterClockwise className="size-4" weight="bold" aria-hidden="true" />
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
