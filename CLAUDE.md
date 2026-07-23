# nenshu-up-simulator — 年収UPシミュレーター(転職アフィリエイトLP)

年齢・年収・学歴・業種・転職理由を入力すると、ルールベースで想定年収レンジ+グレードを診断し、結果に応じた転職サービス3件をアフィリエイトリンク付きで提案するシングルページアプリ。自社MVP。ログイン不要・DB不要・フロントのみで完結。

## スタック
Next.js 16 (App Router / Turbopack) / TypeScript / Tailwind CSS v4 / canvas-confetti

## コマンド
- dev: `npm run dev`(port 3000)
- build: `npm run build`
- lint: `npm run lint`

## デプロイ
- 本番: https://nenshu-up-simulator.vercel.app (Vercel、GitHub連携済み。master へ push で自動デプロイ)
- リポジトリ: https://github.com/uuki252510/nenshu-up-simulator (Public)

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
- MVP完成・本番デプロイ済み・ASP審査対応済み: 全サービスが実在サービス(＠PRO人のみA8アフィリエイト、他は公式直リンク)
- services.ts の isAffiliate フラグでPR表記とrel=sponsoredを自動制御。提携承認が下りたら url をASPリンクに差し替え+isAffiliate:true にするだけ
- /privacy(プライバシーポリシー)・/about(運営者情報: 合同会社Nexia名義)あり
- 未実装: OGP画像、お問い合わせ手段の記載(必要になったら/aboutに追記)
