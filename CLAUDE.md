# nenshu-up-simulator — 年収UPシミュレーター(転職アフィリエイトLP)

年齢・年収・学歴・業種・転職理由を入力すると、ルールベースで想定年収レンジ+グレードを診断し、結果に応じた転職サービス3件をアフィリエイトリンク付きで提案するシングルページアプリ。自社MVP。ログイン不要・DB不要・フロントのみで完結。

## スタック
Next.js 16 (App Router / Turbopack) / TypeScript / Tailwind CSS v4 / canvas-confetti

## コマンド
- dev: `npm run dev`(port 3000)
- build: `npm run build`
- lint: `npm run lint`

## デプロイ
- 未デプロイ(Vercel想定。実行前にユーザー確認)

## 設計ルール
- 診断ロジックは `src/lib/simulator.ts` の純関数に集約。UIにロジックを書かない
- 選択肢と補正係数は `src/lib/options.ts`。係数は仕様のサンプル結果に合わせて調整済み(勝手に変えない)
- 転職サービスのマスタは `src/lib/services.ts` のみ。実サービスへの差し替え・アフィリエイトURL変更はこのファイルだけで完結させる
- アフィリエイトリンクは `/go/[slug]` 経由(route handler で302リダイレクト)
- 断定表現(「必ず上がる」「絶対」)は禁止。「AI」と表記する場合は Disclaimer にルールベース診断である旨を残す
- UIに絵文字を使わない(自作SVGアイコン)。配色トークンは `globals.css` の @theme に定義済み(navy/gold)

## 環境変数
なし(.env 不使用)

## 現在のフェーズ / 未実装
- MVP完成: 入力→ローディング→結果→おすすめ→Xシェア→再診断まで動作
- 未実装: 実アフィリエイトURL差し替え、OGP画像、デプロイ
