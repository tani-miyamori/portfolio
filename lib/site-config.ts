/**
 * サイト全体のダミー／実値を 1 箇所に集約した設定。
 * 本番公開前に以下を実値へ置換する（spec.md 7.3 参照）。
 * これらは言語非依存のため i18n ではなくここで管理する。
 */
export const siteConfig = {
  /** 公開サイトの本番 URL（OG・canonical 等に利用）。 */
  url: "https://portfolio-ju1n.vercel.app/",
  /** 問い合わせ受信メールアドレス。 TODO: 実アドレスへ置換。 */
  email: "tbase.n28@gmail.com",
  /** ロゴ／著作者表示名。 TODO: 実名へ置換。 */
  author: "T-base",
  /** SNS リンク。 TODO: 実 URL へ置換（"#" はダミー）。 */
  social: {
    github: "#",
    linkedin: "#",
    twitter: "#",
  },
  /**
   * Formspree の送信先エンドポイント。
   * NEXT_PUBLIC_FORMSPREE_ENDPOINT が設定されていればそれを使う。
   * 未設定の場合は空文字（フォームは送信不可の旨を表示）。
   */
  formspreeEndpoint: process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ?? "",
} as const;
