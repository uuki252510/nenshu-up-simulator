export default function Disclaimer() {
  return (
    <section className="border-t border-slate-200 bg-slate-50/70">
      <div className="mx-auto max-w-[1440px] px-5 py-7 text-[11px] leading-5 text-slate-500 sm:px-9">
        <p>
          本シミュレーターは、入力内容と一般的な転職市場の傾向に基づく参考値です。
          実際の年収や転職結果を保証するものではありません。診断はルールベースの
          簡易ロジックで行っており、AIによる個別分析ではありません。
        </p>
        <p className="mt-2">
          紹介しているサービスには広告・アフィリエイトリンクが含まれる場合があります。
        </p>
      </div>
    </section>
  );
}
