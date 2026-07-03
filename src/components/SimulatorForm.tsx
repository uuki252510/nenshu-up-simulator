"use client";

import {
  AGE_OPTIONS,
  EDUCATION_OPTIONS,
  INCOME_OPTIONS,
  INDUSTRY_OPTIONS,
  REASON_OPTIONS,
  type SelectOption,
} from "@/lib/options";
import type { SimulatorInput } from "@/lib/simulator";

interface Props {
  value: SimulatorInput;
  onChange: (value: SimulatorInput) => void;
  onSubmit: () => void;
}

function SelectField({
  label,
  value,
  options,
  placeholder,
  onChange,
}: {
  label: string;
  value: string;
  options: Pick<SelectOption, "value" | "label">[];
  placeholder: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-bold text-navy-800">
        {label}
      </span>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`h-13 w-full appearance-none rounded-xl border bg-white px-4 pr-10 text-[15px] font-medium outline-none transition-colors focus:border-gold-400 focus:ring-2 focus:ring-gold-300/40 ${
            value ? "border-navy-100 text-navy-900" : "border-navy-100 text-navy-600/60"
          }`}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <svg
          className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-navy-600"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="m4 6 4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </label>
  );
}

export default function SimulatorForm({ value, onChange, onSubmit }: Props) {
  const answered =
    [value.age, value.income, value.education, value.industry].filter(Boolean)
      .length + (value.reasons.length > 0 ? 1 : 0);
  const ready = Boolean(
    value.age && value.income && value.education && value.industry,
  );

  const toggleReason = (reason: string) => {
    onChange({
      ...value,
      reasons: value.reasons.includes(reason)
        ? value.reasons.filter((r) => r !== reason)
        : [...value.reasons, reason],
    });
  };

  return (
    <section className="animate-rise-in mx-auto max-w-2xl px-4 pb-10">
      <div className="rounded-3xl border border-navy-100 bg-white p-5 shadow-[0_16px_40px_-20px_rgba(13,27,42,0.25)] sm:p-7">
        <div className="mb-5">
          <div className="flex items-center justify-between text-[11px] font-semibold text-navy-600">
            <span className="font-display tracking-[0.2em]">STEP</span>
            <span className="font-numeric">{answered}/5</span>
          </div>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-navy-50">
            <div
              className="h-full rounded-full bg-gradient-to-r from-navy-800 to-gold-400 transition-all duration-500"
              style={{ width: `${(answered / 5) * 100}%` }}
            />
          </div>
        </div>

        <h2 className="text-[17px] font-bold text-navy-900">
          あなたについて教えてください
        </h2>

        <div className="mt-5 space-y-4">
          <SelectField
            label="年齢"
            value={value.age}
            options={AGE_OPTIONS}
            placeholder="年齢を選択"
            onChange={(age) => onChange({ ...value, age })}
          />
          <SelectField
            label="現在の年収"
            value={value.income}
            options={INCOME_OPTIONS}
            placeholder="現在の年収を選択"
            onChange={(income) => onChange({ ...value, income })}
          />
          <SelectField
            label="最終学歴"
            value={value.education}
            options={EDUCATION_OPTIONS}
            placeholder="最終学歴を選択"
            onChange={(education) => onChange({ ...value, education })}
          />
          <SelectField
            label="現在の業種"
            value={value.industry}
            options={INDUSTRY_OPTIONS}
            placeholder="現在の業種を選択"
            onChange={(industry) => onChange({ ...value, industry })}
          />

          <div>
            <span className="mb-1.5 block text-[13px] font-bold text-navy-800">
              転職を考える理由
              <span className="ml-1.5 font-normal text-navy-600/70">
                (複数選択可)
              </span>
            </span>
            <div className="flex flex-wrap gap-2">
              {REASON_OPTIONS.map((o) => {
                const active = value.reasons.includes(o.value);
                return (
                  <button
                    key={o.value}
                    type="button"
                    onClick={() => toggleReason(o.value)}
                    aria-pressed={active}
                    className={`min-h-11 rounded-full border px-4 py-2 text-[13px] font-medium transition-colors ${
                      active
                        ? "border-navy-800 bg-navy-800 text-white"
                        : "border-navy-100 bg-white text-navy-700 hover:border-navy-600/40"
                    }`}
                  >
                    {o.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onSubmit}
          disabled={!ready}
          className="mt-7 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-navy-900 to-navy-800 text-[15px] font-bold text-white shadow-[0_10px_24px_-10px_rgba(13,27,42,0.6)] transition-all enabled:hover:brightness-110 enabled:active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-40"
        >
          年収アップ可能性を診断する
          <svg className="size-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="m6 3.5 4.5 4.5L6 12.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <p className="mt-3 text-center text-[11px] text-navy-600/80">
          登録不要・無料・約30秒で完了
        </p>
      </div>
    </section>
  );
}
