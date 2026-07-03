export default function Disclaimer() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-6">
      <div className="rounded-2xl border border-navy-100 bg-white/70 p-5 text-[11.5px] leading-relaxed text-navy-600">
        <p>
          本シミュレーターは、入力内容と一般的な転職市場の傾向に基づく参考値です。
          実際の年収や転職結果を保証するものではありません。診断はルールベースの
          簡易ロジックで行っており、AIによる個別分析ではありません。
        </p>
        <p className="mt-2.5">
          紹介しているサービスには広告・アフィリエイトリンクが含まれる場合があります。
        </p>
      </div>
    </section>
  );
}
