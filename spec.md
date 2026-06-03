# ポートフォリオサイト 仕様書

> 本仕様書は「サイトを完成に持っていくための設計書」です。
> 1〜6章は現状実装（as-is）と確定済みの設計を記述し、7章「実装ロードマップ」で
> 未完成項目の方針・受け入れ条件（Done の定義）を定義します。
> 実装は Claude Code が担当する前提です。

## 1. 概要

クリエイティブデベロッパー向けの **ポートフォリオサイト**。ダークテーマ専用のミニマルなデザインで、幾何学的な背景アニメーションとスクロール連動アニメーションを特徴とする。日本語／英語の言語切り替えに対応する。

- データベースなし（works などの掲載データはコンポーネント／i18n 内にハードコード）。
- ルート構成: 主要コンテンツはトップ（`app/page.tsx`）に集約し、実績の全件一覧のみ別ルート（`/works`）に分離する 2 ルート構成。
- メール送信は外部サービス（Formspree）を利用し、自前のサーバーサイド送信処理は持たない。

## 2. 技術スタック

| 分類 | 採用技術 |
| --- | --- |
| フレームワーク | Next.js 15（App Router） |
| UI ライブラリ | React 19 |
| 言語 | TypeScript 5 |
| スタイリング | Tailwind CSS 3.4 |
| アニメーション | Framer Motion 11 |
| アイコン | lucide-react |
| ユーティリティ | clsx + tailwind-merge（`cn()`） |
| フォント | Geist Sans / Geist Mono（`next/font/google`） |
| 画像 | next/image |
| ビルド | Turbopack（dev） |
| フォーム送信 | Formspree（外部サービス） |
| デプロイ | Vercel（Netlify も可） |

### コマンド

```bash
pnpm dev       # 開発サーバー（Turbopack, localhost:3000）
pnpm build     # 本番ビルド
pnpm lint      # ESLint（next lint）
```

### 環境変数

| キー | 用途 | 備考 |
| --- | --- | --- |
| `NEXT_PUBLIC_FORMSPREE_ENDPOINT` | 問い合わせフォームの送信先 | Formspree で発行されるエンドポイント URL |

## 3. 画面構成

### 3.1 ルート

| ルート | 内容 |
| --- | --- |
| `/`（[app/page.tsx](app/page.tsx)） | トップページ。全セクションを縦に積む。 |
| `/works`（[app/works/page.tsx](app/works/page.tsx)） | 実績の全件一覧ページ。 |
| 404（[app/not-found.tsx](app/not-found.tsx)） | 存在しないルート。トップへ戻る導線のみの簡易ページ。 |

トップページのセクション構成:

```
GeometricBackground（固定背景）
 └ Header（固定ヘッダー）
 └ HeroSection      #（トップ）
 └ WorksSection     #works
 └ AboutSection     #about
 └ SkillsSection    #skills
 └ ContactSection   #contact
 └ Footer
```

セクション内ナビはアンカーリンク（`#works` 等）によるページ内スクロール。`/works` への遷移は通常のルート遷移。

### 3.2 GeometricBackground — [components/geometric-background.tsx](components/geometric-background.tsx)
- 画面全体に固定配置（`pointer-events-none`）の装飾背景。
- 構成要素: グリッドパターン、SVG 幾何図形（三角形・円・矩形・六角形・対角線・破線円・十字）、ノイズオーバーレイ。
- 図形は `float` / `pulse-slow` / `draw-line` のカスタムアニメーションで動く（`animationDelay` で時間差）。
- **`prefers-reduced-motion: reduce` 指定時はアニメーションを停止／静止表示**（7.5 参照）。

### 3.3 Header — [components/header.tsx](components/header.tsx)
- 画面上部に固定（`fixed top-0`, `z-50`）。
- ロゴ「Portfolio」＋ナビ（実績／私について／スキル／お問い合わせ）。
- **言語切り替え**: 地球アイコン付きドロップダウン（日本語／English）。外側クリックで閉じる。
- **モバイル対応**: ハンバーガーメニュー（開閉アニメーション）、モバイル用言語切り替えを内包。

### 3.4 HeroSection — [components/hero-section.tsx](components/hero-section.tsx)
- 画面高さいっぱい（`min-h-screen`）の中央寄せ。
- ラベル → 大見出し（2 行）→ 説明文 → CTA ボタン2つ（実績を見る／お問い合わせ）→ スクロールインジケーター。
- 各要素は `initial → animate` で時間差フェードイン。

### 3.5 WorksSection（トップ） — [components/works-section.tsx](components/works-section.tsx)
- 「厳選プロジェクト」見出し＋**スクリーンショット主体**の抜粋表示。
- 表示対象は `featured: true` のプロジェクト（3 件程度を想定）。
- 各カード: スクリーンショット画像（`next/image`）／タイトル／カテゴリ／年。
- カードのクリックで**詳細モーダル**（3.10）を開く。
- 「すべてのプロジェクトを見る」リンク → `/works`（3.9）へ遷移。

### 3.6 AboutSection — [components/about-section.tsx](components/about-section.tsx)
- 2 カラム（見出し／本文3段落）＋下部に統計（4項目: 経験年数・完了プロジェクト・クライアント・全力度）。

### 3.7 SkillsSection — [components/skills-section.tsx](components/skills-section.tsx)
- 背景 `bg-card/30` で区切り。3 カラム（開発／デザイン／ツール）。
- 各項目はホバーで先頭の罫線が伸びるインタラクション。

### 3.8 ContactSection — [components/contact-section.tsx](components/contact-section.tsx)
- 2 カラム。左: 見出し・説明・メールリンク・SNS リンク（GitHub / LinkedIn / Twitter）。
- 右: 問い合わせフォーム（名前・メール・メッセージ・送信ボタン）。Formspree 経由で送信（7.1 参照）。

### 3.9 WorksPage（全件一覧） — [app/works/page.tsx](app/works/page.tsx)
- 全プロジェクトを**スクリーンショット＋サイト名**でグリッド表示（`next/image`）。
- 各カードのクリックで詳細モーダル（3.10）を開く。
- ヘッダー・フッターはトップと共通。トップへ戻る導線を設ける。
- ページ個別の metadata（title / description）を設定（3.12 参照）。
- ルート遷移時の簡易ローディング（[app/works/loading.tsx](app/works/loading.tsx)）を用意。

### 3.10 ProjectModal（詳細モーダル） — [components/project-modal.tsx](components/project-modal.tsx)
- トップの WorksSection（3.5）と全件一覧（3.9）の**両方から開く共通コンポーネント**。
- 表示内容: スクリーンショット・タイトル・カテゴリ・年・説明・「公開サイトを見る」ボタン。
- 「公開サイトを見る」: `target="_blank"` + `rel="noopener noreferrer"` で外部遷移。
- **公開 URL が無い（`url` が `null`）プロジェクトはボタンを非活性表示**（または非表示）。
- 閉じる手段: 閉じるボタン／背景クリック／Esc キー。
- 開いている間は背面スクロールを固定。フォーカストラップを行い、閉じたら元の要素へフォーカスを戻す（7.5 参照）。

### 3.11 Footer — [components/footer.tsx](components/footer.tsx)
- ロゴ／コピーライト（年は `new Date().getFullYear()` で動的）／トップへ戻るリンク。

### 3.12 メタデータ・OG・アイコン
- トップ・`/works` それぞれにページ個別の metadata（title / description）を設定。
- OG 画像は Next.js の動的生成（[app/opengraph-image.tsx](app/opengraph-image.tsx)）でコード生成。サイズ 1200×630。サイト名＋肩書き＋ダーク背景のシンプル構成。
- favicon と apple-touch-icon を用意。

## 4. データモデル

プロジェクトデータは i18n（[lib/i18n.ts](lib/i18n.ts)）内に言語非依存のメタ情報と言語依存のテキストを分けて保持する。

### Project 型

| フィールド | 型 | 説明 |
| --- | --- | --- |
| `id` | `string`（スラッグ） | 一意の識別子。モーダル特定・key・将来の個別ページに利用（例 `"my-blog"`）。 |
| `category` | 固定ユニオン型 | 自由文字列ではなく型で定義（typo 防止・将来の絞り込み用）。 |
| `year` | `string` | 表示用の年。 |
| `screenshot` | `string` | 画像パス（`public/works/` 配下）。 |
| `url` | `string \| null` | 公開サイト URL。無い場合は `null`（モーダルの遷移ボタンを非活性）。 |
| `featured` | `boolean` | トップ抜粋に表示するか。 |
| タイトル・説明 | i18n（ja / en） | 言語依存テキストは `translations` 側で管理。 |

### スクリーンショット仕様
- アスペクト比 16:10。
- 形式 WebP。
- 幅 1280px 目安。
- 配置先 `public/works/`。

## 5. 多言語対応（i18n）

[lib/i18n.ts](lib/i18n.ts) + [components/language-provider.tsx](components/language-provider.tsx) による独自実装（外部ライブラリ不使用）。

- 対応言語: `ja`（デフォルト）／`en`。
- 全テキストは `translations` オブジェクトに `Translation` 型で定義。
- `LanguageProvider` が React Context で `language` / `setLanguage` / `t`（現在言語の翻訳）を供給。
- 各セクションは `useLanguage()` フック経由で翻訳を取得。
- 言語変更時に `document.documentElement.lang` を同期更新。

### 言語の永続化（cookie ベース）
- 選択言語は **cookie**（キー: `portfolio-language`）に保存する。
- サーバーサイドで cookie を読み取り、初期レンダー時点で正しい言語を確定する（SSR とクライアントの不一致＝ちらつきを排除）。
- cookie が無い場合は `ja`（デフォルト）でレンダーする。

> 旧実装（localStorage ＋ マウント後更新）は、英語利用者に初回ロード時に日本語が一瞬見える問題があったため cookie ベースへ移行する（7.4 参照）。

## 6. デザインシステム

### 6.1 カラートークン
[app/globals.css](app/globals.css) で HSL CSS 変数として定義し、[tailwind.config.ts](tailwind.config.ts) のセマンティックエイリアス（`bg-background`, `text-foreground`, `text-muted-foreground`, `border-border`, `bg-secondary` 等）経由で利用する。

- ダーク専用のグレースケール基調（`--background: 0 0% 3%` ほぼ黒）。
- 角丸なし（`--radius: 0rem`）。
- **ルール**: 色・余白は常に Tailwind ユーティリティで指定し、値の直書きは禁止。条件付きクラスは `cn()` を使用。

### 6.2 フォント
- Geist Sans（`--font-geist-sans`） / Geist Mono（`--font-geist-mono`）を `app/layout.tsx` で読み込み CSS 変数化。
- 連番・年・ロゴ等は等幅（`font-mono`）。

### 6.3 アニメーション方針
- スクロール連動は Framer Motion の `whileInView` ＋ `viewport={{ once: true }}`（1回のみ発火）。
- パターン: `initial → whileInView`、リストは `delay` で段階表示（スタガー）。
- `prefers-reduced-motion: reduce` 指定時は動きを抑制する（7.5 参照）。

### 6.4 画像方針
- 画像はすべて `next/image` を使用（遅延読み込み・サイズ指定必須）。
- 読み込み中は `blur` placeholder でレイアウトシフトを抑制。

## 7. 実装ロードマップ（完成条件）

各項目は方針が確定済み。受け入れ条件（Done）を満たした時点でトップの「現状」へ繰り上げる。

### 7.1 問い合わせフォーム送信
- **方針**: Formspree（外部サービス）。自前のサーバーサイド処理は持たない。受信先は既存メールアドレス（新規ドメイン・DNS 設定不要）。
- **実装**:
  - `onSubmit` で `fetch` により Formspree エンドポイント（`NEXT_PUBLIC_FORMSPREE_ENDPOINT`）へ POST。
  - 送信中はボタンをスピナー＋無効化に変更し二重送信を防止。
  - スパム対策として honeypot フィールドを設置。
- **バリデーション**: 名前・メール・メッセージは必須。メールは形式チェック。
- **送信結果 UI**: 同ページでインライン完了メッセージを表示しフォームをクリア。失敗時はエラーメッセージを表示。
- **無料枠**: Formspree 無料枠は月 50 件。超過時はフォーム側でエラー表示として扱う（月数件想定のため通常は到達しない）。
- **i18n**: 成功／失敗／バリデーションの全文言を `translations`（ja / en）に追加。
- **Done**:
  - [ ] 実フォームから送信し、受信先メールに届くこと。
  - [ ] 成功・失敗・バリデーションエラーの各表示が ja / en で正しく出ること。
  - [ ] 二重送信が防止されていること。
- **要オーナー作業**: Formspree 登録、フォーム作成、エンドポイント URL の提供。

### 7.2 プロジェクト実績・全件一覧・詳細モーダル
- **方針**: トップは `featured` 抜粋（スクショ 3 件程度）、`/works` で全件、詳細はモーダル、外部公開サイトへ遷移（3.5 / 3.9 / 3.10）。今後プロジェクトを追加していく前提で一覧ページを設ける。
- **データ構造**: 4 章の Project 型に従う（`id` / `category` / `year` / `screenshot` / `url` / `featured` ＋ i18n テキスト）。
- **挙動**: `url` が `null` のプロジェクトはモーダルの遷移ボタンを非活性。
- **Done**:
  - [ ] トップに `featured` のスクショ抜粋が表示され、クリックでモーダルが開くこと。
  - [ ] 「すべてのプロジェクトを見る」で `/works` に遷移し全件が表示されること。
  - [ ] `/works` のカードからもモーダルが開くこと。
  - [ ] モーダルが Esc／背景クリック／閉じるボタンで閉じ、背面スクロールが固定されること。
  - [ ] `url` 有無で遷移ボタンの活性／非活性が切り替わること。
  - [ ] 画像が `next/image` で表示され、レイアウトシフトがないこと。
- **要オーナー作業**: 掲載サイトのスクリーンショット画像の用意・配置（4 章の仕様準拠）、各プロジェクトの公開 URL の洗い出し、`featured` 指定。

### 7.3 ダミー値の差し替えチェックリスト
本番公開前に以下を実値へ置換する。実値が未確定のものは項目として残す。

- [ ] 問い合わせ受信メールアドレス（現状 `hello@example.com`）
- [ ] SNS リンク GitHub（現状 `#`）
- [ ] SNS リンク LinkedIn（現状 `#`）
- [ ] SNS リンク Twitter（現状 `#`）
- [ ] メタ情報 `authors`（[app/layout.tsx](app/layout.tsx)）
- [ ] About セクションの統計値（経験年数・完了プロジェクト・クライアント・全力度）
- [ ] 各プロジェクトの公開 URL（7.2 と連動）
- [ ] 「すべてのプロジェクトを見る」周辺の文言確認

### 7.4 i18n の cookie 化
- **方針**: localStorage ＋ マウント後更新から cookie ベースへ移行し、SSR で言語を確定してちらつきを解消（5 章参照）。
- **Done**:
  - [ ] 英語選択状態で初回ロードしても日本語が一瞬も表示されないこと。
  - [ ] リロード後も選択言語が維持されること。
  - [ ] `<html lang>` が選択言語と一致すること。

### 7.5 アクセシビリティ・非機能要件（最低ライン）
完成の最低条件として以下を満たす。

- **アクセシビリティ**:
  - [ ] 主要な操作（ナビ・言語切替・ハンバーガー・モーダル・フォーム）がキーボードのみで操作可能。
  - [ ] フォーカスが視覚的に分かること（フォーカスリング）。
  - [ ] ドロップダウン・ハンバーガー・モーダルに適切な aria 属性を付与。
  - [ ] モーダルはフォーカストラップし、閉じたら元の要素へフォーカスを戻す。
  - [ ] `prefers-reduced-motion: reduce` 時に背景・スクロール連動アニメーションを抑制。
- **非機能**:
  - [ ] Lighthouse（モバイル）で Performance / Accessibility / Best Practices / SEO が概ね 90 以上を目安。
  - [ ] 主要モダンブラウザ（Chrome / Safari / Firefox / Edge の最新版）で表示崩れがないこと。
  - [ ] レスポンシブ: モバイル・タブレット・デスクトップで主要セクションが破綻しないこと。

### 7.6 ルート補助・メタ
- **方針**: 404・ローディング・OG・アイコンを最小実装で用意（3.1 / 3.9 / 3.12）。
- **Done**:
  - [ ] 存在しないルートで `not-found.tsx` が表示され、トップへ戻れること。
  - [ ] `/works` 遷移時にローディングが表示されること。
  - [ ] URL を SNS に貼ると動的生成の OG 画像が表示されること。
  - [ ] favicon / apple-touch-icon が設定されていること。
  - [ ] トップ・`/works` に個別の title / description が設定されていること。

## 8. スコープ外

以下は今回の完成対象に含めない。実装側で勝手に追加しない。

| 項目 | 備考 |
| --- | --- |
| テスト（unit / E2E） | 静的ポートフォリオには過剰 |
| CMS 化・ブログ／記事機能 | データ少数、ハードコードで足りる |
| ライトテーマ | ダーク専用を維持 |
| アクセス解析 | 入れる場合は別途検討 |
| `/works/[id]` 個別ページ | モーダルで代替。将来 `id` スラッグから拡張可能 |

## 9. 確定済みの仕様変更点（旧仕様からの差分）

| 項目 | 旧 | 新 |
| --- | --- | --- |
| ルート構成 | 単一ルート | `/` ＋ `/works` ＋ 404 |
| 実績の見せ方 | リスト形式 | スクショ主体＋詳細モーダル（`featured` 抜粋） |
| プロジェクトリンク | `#` プレースホルダ | 外部公開サイトへ遷移（無い場合は非活性） |
| データ構造 | 暗黙 | Project 型を明文化（id / category / url / featured 等） |
| 画像 | 素の img 想定 | next/image（blur placeholder） |
| フォーム送信 | 未実装 | Formspree 経由で実装（インライン完了表示） |
| 言語の永続化 | localStorage（ちらつきあり） | cookie ベース（SSR 確定） |
| OG 画像 | 未定 | 動的生成（opengraph-image.tsx） |
| 404 / ローディング | なし | not-found.tsx / loading.tsx |
| a11y / 非機能 | 記述なし | 最低ラインを Done として明記 |

---

*実装は本ロードマップの Done 条件を基準に進める。各項目が完了し次第、1〜6 章の現状記述へ反映する。*
