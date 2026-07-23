"use client";

import { ArrowRight, CaretDown, LockKey } from "@phosphor-icons/react";
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
      <span className="mb-2 block text-[14px] font-bold text-navy-900">
        {label}
      </span>
      <span className="relative block">
        <select
          value={value}
          required
          aria-label={label}
          onChange={(event) => onChange(event.target.value)}
          className={`h-14 w-full cursor-pointer appearance-none rounded-xl border bg-white px-4 pr-11 text-[15px] font-medium outline-none transition-[border-color,box-shadow,color] duration-200 focus:border-navy-700 focus:ring-4 focus:ring-blue-100 sm:h-16 ${
            value
              ? "border-slate-300 text-navy-900"
              : "border-slate-300 text-slate-500"
          }`}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <CaretDown
          className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-navy-700"
          weight="bold"
          aria-hidden="true"
        />
      </span>
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
        ? value.reasons.filter((item) => item !== reason)
        : [...value.reasons, reason],
    });
  };

  return (
    <section className="animate-rise-in stagger-1 mt-9" aria-labelledby="form-title">
      <div className="flex items-center gap-4" aria-label={`入力状況 ${answered}/5`}>
        <span className="shrink-0 font-numeric text-[12px] font-extrabold tracking-[0.1em] text-navy-900">
          STEP 0 / 5
        </span>
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-blue-700 transition-[width] duration-500 ease-out"
            style={{ width: `${(answered / 5) * 100}%` }}
          />
        </div>
        <span className="font-numeric text-sm font-extrabold text-navy-900">
          {answered}/5
        </span>
      </div>

      <h2 id="form-title" className="mt-9 text-lg font-bold text-navy-900 sm:text-xl">
        あなたについて教えてください
      </h2>

      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
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

        <fieldset className="sm:col-span-2">
          <legend className="text-[14px] font-bold text-navy-900">
            転職を考える理由
            <span className="ml-2 text-xs font-medium text-slate-500">
              複数選択可
            </span>
          </legend>
          <div className="mt-3 flex max-w-[540px] flex-wrap gap-2.5">
            {REASON_OPTIONS.map((option) => {
              const active = value.reasons.includes(option.value);
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => toggleReason(option.value)}
                  aria-pressed={active}
                  className={`min-h-11 cursor-pointer rounded-full border px-4 py-2 text-[13px] font-semibold transition-[background-color,border-color,color,transform] duration-200 active:scale-[0.98] ${
                    active
                      ? "border-blue-800 bg-blue-800 text-white"
                      : "border-blue-700 bg-white text-navy-800 hover:bg-blue-50"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </fieldset>

        <div className="pt-1 sm:col-span-2">
          <button
            data-testid="diagnosis-submit"
            type="button"
            onClick={onSubmit}
            disabled={!ready}
            aria-describedby="submit-helper"
            className="flex h-16 w-full cursor-pointer items-center justify-center gap-3 rounded-xl bg-blue-800 px-5 text-[15px] font-bold text-white shadow-[0_12px_28px_-16px_rgba(30,58,138,0.65)] transition-[background-color,box-shadow,transform] duration-200 enabled:hover:bg-blue-900 enabled:hover:shadow-[0_16px_32px_-16px_rgba(30,58,138,0.8)] enabled:active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-blue-800"
          >
            {!ready && <LockKey className="size-5" weight="bold" aria-hidden="true" />}
            年収アップ可能性を診断する
            {ready && <ArrowRight className="size-5" weight="bold" aria-hidden="true" />}
          </button>
          <p id="submit-helper" className="mt-4 text-center text-xs text-slate-500">
            入力内容は診断のみに使用されます
          </p>
        </div>
      </div>
    </section>
  );
}
