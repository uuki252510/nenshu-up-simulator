"use client";

import { FirstAidKit } from "@phosphor-icons/react";

type Tendency = "高め" | "やや高め" | "標準" | "控えめ";

const ROWS: { style: string; tendency: Tendency; note: string }[] = [
  {
    style: "病棟勤務(夜勤あり)",
    tendency: "高め",
    note: "夜勤手当が加算され、日勤のみより年収が上がりやすい",
  },
  {
    style: "美容クリニック",
    tendency: "高め",
    note: "インセンティブで上振れしやすい一方、歩合の比重が大きい",
  },
  {
    style: "訪問看護",
    tendency: "やや高め",
    note: "オンコール手当あり。経験者は好条件が出やすい",
  },
  {
    style: "介護施設・老健",
    tendency: "標準",
    note: "医療処置は少なめ。夜勤の有無で年収差が出る",
  },
  {
    style: "外来・クリニック(日勤)",
    tendency: "控えめ",
    note: "夜勤がないぶん年収は下がりやすいが、生活リズムは安定",
  },
  {
    style: "保育園・企業内看護師",
    tendency: "控えめ",
    note: "求人が少なく人気。年収より働きやすさ重視の選択肢",
  },
];

const TENDENCY_STYLE: Record<Tendency, string> = {
  高め: "bg-gold-100 text-gold-600 border-gold-300",
  やや高め: "bg-gold-50 text-gold-600 border-gold-200",
  標準: "bg-slate-100 text-slate-600 border-slate-200",
  控えめ: "bg-white text-slate-500 border-slate-200",
};

export default function NurseWorkStyle() {
  return (
    <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-center gap-2 text-navy-700">
        <FirstAidKit className="size-5" weight="duotone" aria-hidden="true" />
        <p className="text-xs font-bold tracking-[0.08em]">
          看護師の働き方別・年収の傾向
        </p>
      </div>
      <ul className="mt-4 space-y-3">
        {ROWS.map((row) => (
          <li key={row.style} className="flex items-start gap-3">
            <span
              className={`mt-0.5 shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-bold ${TENDENCY_STYLE[row.tendency]}`}
            >
              {row.tendency}
            </span>
            <div>
              <p className="text-[13px] font-bold text-navy-900">{row.style}</p>
              <p className="mt-0.5 text-xs leading-5 text-slate-500">
                {row.note}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-[10.5px] leading-4 text-slate-400">
        ※一般的な傾向をまとめた参考情報です。実際の年収は地域・施設・経験により異なります。
      </p>
    </div>
  );
}
