export type Language = "ja" | "en";

export const languages: { code: Language; label: string }[] = [
  { code: "ja", label: "日本語" },
  { code: "en", label: "English" },
];

export const defaultLanguage: Language = "ja";

/** 選択言語を保存する cookie のキー。サーバー（layout）と provider の両方から参照する。 */
export const LANGUAGE_COOKIE = "portfolio-language";

/**
 * プロジェクト掲載データ（言語非依存のメタ情報）。
 * 新しいプロジェクトを追加するときは、この配列に 1 件足し、
 * 各言語の `works.projectsText` に同じ `id` のタイトル・説明を追加するだけでよい。
 * 画像は `public/works/<id>.svg`（後で実スクリーンショットに差し替え）。
 */
export type ProjectCategory =
  | "web-development"
  | "web-application"
  | "design-system"
  | "ui-ux-design";

export type Project = {
  /** 一意の識別子（スラッグ）。モーダル特定・key・将来の個別ページに利用。 */
  id: string;
  category: ProjectCategory;
  year: string;
  /** 画像パス（public/works/ 配下）。16:10 / WebP / 幅 1280px 目安。 */
  screenshot: string;
  /** 公開サイト URL。無い場合は null（モーダルの遷移ボタンを非活性）。 */
  url: string | null;
  /** トップ抜粋（WorksSection）に表示するか。 */
  featured: boolean;
};

/** プロジェクトデータ */
export const projects: Project[] = [
  {
    id: "001_wagashi_sample",
    category: "design-system",
    year: "2026",
    screenshot: "/works/001_wagashi_sample.png",
    url: "https://lpwagashi.vercel.app/",
    featured: true,
  },
  {
    id: "002_historymuseum_sample",
    category: "design-system",
    year: "2026",
    screenshot: "/works/002_historymuseum_sample.png",
    url: "https://lp-historymuseum.vercel.app/",
    featured: true,
  },
  {
    id: "003_themepark_sample",
    category: "design-system",
    year: "2026",
    screenshot: "/works/003_themepark_sample.png",
    url: "https://lp-themepark.vercel.app/",
    featured: true,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

type ProjectText = {
  title: string;
  description: string;
};

type SkillGroup = {
  category: string;
  items: string[];
};

type Stat = {
  value: string;
  label: string;
};

export type Translation = {
  a11y: {
    openMenu: string;
    closeMenu: string;
    changeLanguage: string;
    closeModal: string;
    skipToContent: string;
  };
  nav: {
    works: string;
    about: string;
    skills: string;
    contact: string;
  };
  hero: {
    label: string;
    headingLine1: string;
    headingLine2: string;
    description1: string;
    description2: string;
    viewWorks: string;
    getInTouch: string;
    scroll: string;
  };
  categories: Record<ProjectCategory, string>;
  works: {
    label: string;
    title: string;
    viewAll: string;
    viewLiveSite: string;
    noLiveSite: string;
    allLabel: string;
    allTitle: string;
    allDescription: string;
    backToHome: string;
    projectsText: Record<string, ProjectText>;
  };
  about: {
    label: string;
    headingLine1: string;
    headingLine2: string;
    leadEmphasis: string;
    lead: string;
    paragraph2: string;
    paragraph3: string;
    stats: Stat[];
  };
  skills: {
    label: string;
    title: string;
    groups: SkillGroup[];
  };
  contact: {
    label: string;
    headingLine1: string;
    headingLine2: string;
    description: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    send: string;
    sending: string;
    successTitle: string;
    successBody: string;
    errorTitle: string;
    errorBody: string;
    notConfigured: string;
    errorRequiredName: string;
    errorRequiredEmail: string;
    errorInvalidEmail: string;
    errorRequiredMessage: string;
  };
  footer: {
    rights: string;
    backToTop: string;
  };
  notFound: {
    title: string;
    description: string;
    backToHome: string;
  };
};

export const translations: Record<Language, Translation> = {
  ja: {
    a11y: {
      openMenu: "メニューを開く",
      closeMenu: "メニューを閉じる",
      changeLanguage: "言語を変更",
      closeModal: "閉じる",
      skipToContent: "本文へスキップ",
    },
    nav: {
      works: "実績",
      about: "私について",
      skills: "スキル",
      contact: "お問い合わせ",
    },
    hero: {
      label: "クリエイティブデベロッパー",
      headingLine1: "アイデアを",
      headingLine2: "かたちにする",
      description1: "企画からデザイン、実装まで。一貫してプロダクトを形にします。",
      description2: "細部までこだわり、心地よい体験を届けます。",
      viewWorks: "実績を見る",
      getInTouch: "お問い合わせ",
      scroll: "スクロール",
    },
    categories: {
      "web-development": "ウェブ開発",
      "web-application": "ウェブアプリケーション",
      "design-system": "デザインシステム",
      "ui-ux-design": "UI/UXデザイン",
    },
    works: {
      label: "プロジェクト",
      title: "実績",
      viewAll: "すべてのプロジェクトを見る",
      viewLiveSite: "公開サイトを見る",
      noLiveSite: "公開サイトは準備中です",
      allLabel: "すべての実績",
      allTitle: "プロジェクト一覧",
      allDescription: "これまでに手がけたプロジェクトの一覧です。各プロジェクトをクリックすると詳細を表示します。",
      backToHome: "トップへ戻る",
      projectsText: {
        "003_themepark_sample": {
          title: "テーマパークHP（サンプル）",
          description:
            "家族で楽しめるテーマパークを想定したブランドサイト。鮮やかな配色と躍動感のあるレイアウトで、ワクワク感とアトラクションの魅力を伝えるデザインシステムのサンプル。",
        },
        "002_historymuseum_sample": {
          title: "歴史館LP（サンプル）",
          description:
            "地域の歴史博物館を想定したブランドLP。重厚感のある配色とタイポグラフィで、収蔵品の価値と館の趣を伝えるデザインシステムのサンプル。",
        },
        "001_wagashi_sample": {
          title: "和菓子屋LP（サンプル）",
          description:
            "創業明治三十年の老舗和菓子店を想定したブランドLP。落ち着いた緑を基調に、季節感と凛とした佇まいを表現したデザインシステムのサンプル。",
        },
        "ecommerce-platform": {
          title: "Eコマースプラットフォーム",
          description:
            "シームレスなユーザー体験と高速なパフォーマンスを実現したモダンなEコマースソリューション。",
        },
        "brand-identity-system": {
          title: "ブランドアイデンティティシステム",
          description:
            "フィンテックスタートアップ向けの包括的なデザインシステム。コンポーネントとガイドラインを含む。",
        },
        "interactive-dashboard": {
          title: "インタラクティブダッシュボード",
          description:
            "データ可視化と直感的な操作を備えたリアルタイム分析ダッシュボード。",
        },
        "mobile-app-ui": {
          title: "モバイルアプリUI",
          description:
            "生産性アプリ向けの、クリーンでミニマルなモバイルインターフェースデザイン。",
        },
      },
    },
    about: {
      label: "私について",
      headingLine1: "理想を形にする、",
      headingLine2: "クリエイティブ。",
      leadEmphasis: "インターフェースに、理想を。",
      lead: "思い描いたイメージを、そのまま手に取れる体験へと届けたい。そんな思いで、ソフトウェアやウェブを細部までこだわって形にしています。",
      paragraph2:
        "見た目の美しさと使いやすさ、その両方を大切にしています。細やかなディテールや表示の速さ、そして使う人の気持ちまで丁寧に考えながら、一つひとつ制作しています。",
      paragraph3:
        "フロントエンド開発、UI/UXデザイン、クリエイティブコーディング。これまで培ってきた知見を活かし、アイデアを理想のかたちへと丁寧に仕上げていきます。",
      stats: [
        { value: "5+", label: "年の経験" },
        { value: "50+", label: "完了プロジェクト" },
        { value: "30+", label: "満足いただいたクライアント" },
        { value: "100%", label: "全力" },
      ],
    },
    skills: {
      label: "専門分野",
      title: "スキル & ツール",
      groups: [
        {
          category: "開発",
          items: ["React / Next.js", "TypeScript", "Node.js", "Python"],
        },
        {
          category: "デザイン",
          items: ["Figma", "UI/UXデザイン", "デザインシステム", "プロトタイピング"],
        },
        {
          category: "ツール",
          items: ["Git / GitHub", "Vercel", "Docker", "AWS"],
        },
      ],
    },
    contact: {
      label: "お問い合わせ",
      headingLine1: "まずは",
      headingLine2: "お話しから",
      description:
        "進行中のプロジェクトはもちろん、まだ漠然としたアイデアでも大歓迎です。お気軽にメッセージをお送りください。",
      nameLabel: "お名前",
      namePlaceholder: "お名前",
      emailLabel: "メールアドレス",
      emailPlaceholder: "your@email.com",
      messageLabel: "メッセージ",
      messagePlaceholder: "プロジェクトについてお聞かせください...",
      send: "送信する",
      sending: "送信中...",
      successTitle: "送信が完了しました",
      successBody: "お問い合わせありがとうございます。折り返しご連絡いたします。",
      errorTitle: "送信に失敗しました",
      errorBody: "時間をおいて再度お試しいただくか、メールで直接ご連絡ください。",
      notConfigured: "フォームの送信先が設定されていません。メールで直接ご連絡ください。",
      errorRequiredName: "お名前を入力してください。",
      errorRequiredEmail: "メールアドレスを入力してください。",
      errorInvalidEmail: "メールアドレスの形式が正しくありません。",
      errorRequiredMessage: "メッセージを入力してください。",
    },
    footer: {
      rights: "All rights reserved.",
      backToTop: "トップへ戻る ↑",
    },
    notFound: {
      title: "ページが見つかりません",
      description: "お探しのページは存在しないか、移動した可能性があります。",
      backToHome: "トップへ戻る",
    },
  },
  en: {
    a11y: {
      openMenu: "Open menu",
      closeMenu: "Close menu",
      changeLanguage: "Change language",
      closeModal: "Close",
      skipToContent: "Skip to content",
    },
    nav: {
      works: "Works",
      about: "About",
      skills: "Skills",
      contact: "Contact",
    },
    hero: {
      label: "Creative Developer",
      headingLine1: "Turning ideas",
      headingLine2: "into reality",
      description1: "From concept to design to code — I build products end to end.",
      description2: "Sweating the details to deliver experiences that feel right.",
      viewWorks: "View Works",
      getInTouch: "Get in Touch",
      scroll: "Scroll",
    },
    categories: {
      "web-development": "Web Development",
      "web-application": "Web Application",
      "design-system": "Design System",
      "ui-ux-design": "UI/UX Design",
    },
    works: {
      label: "Selected Projects",
      title: "Works",
      viewAll: "View All Projects",
      viewLiveSite: "View Live Site",
      noLiveSite: "Live site coming soon",
      allLabel: "All Works",
      allTitle: "Projects",
      allDescription:
        "A complete list of projects I've worked on. Click any project to see details.",
      backToHome: "Back to Home",
      projectsText: {
        "003_themepark_sample": {
          title: "Theme Park Website (Sample)",
          description:
            "A brand website for a family-friendly theme park. A design-system sample that conveys excitement and the appeal of its attractions through a vivid color palette and a dynamic layout.",
        },
        "002_historymuseum_sample": {
          title: "History Museum LP (Sample)",
          description:
            "A brand landing page for a regional history museum. A design-system sample that conveys the value of the collection and the museum's dignified atmosphere through a weighty color palette and typography.",
        },
        "001_wagashi_sample": {
          title: "Wagashi Shop LP (Sample)",
          description:
            "A brand landing page for a long-established wagashi confectionery founded in 1897. A design-system sample built around a calm green palette, expressing seasonal beauty and a refined, serene presence.",
        },
        "ecommerce-platform": {
          title: "E-Commerce Platform",
          description:
            "A modern e-commerce solution with seamless user experience and fast performance.",
        },
        "brand-identity-system": {
          title: "Brand Identity System",
          description:
            "Comprehensive design system for a fintech startup, including components and guidelines.",
        },
        "interactive-dashboard": {
          title: "Interactive Dashboard",
          description:
            "Real-time analytics dashboard with data visualization and intuitive controls.",
        },
        "mobile-app-ui": {
          title: "Mobile App UI",
          description:
            "Clean and minimal mobile interface design for a productivity application.",
        },
      },
    },
    about: {
      label: "About Me",
      headingLine1: "Giving form",
      headingLine2: "to the ideal.",
      leadEmphasis: "An ideal in every interface.",
      lead: "I want to turn the picture in your mind into an experience you can reach out and touch. That belief drives how I craft software and the web, down to the finest details.",
      paragraph2:
        "I care about beauty and usability in equal measure. Every piece is made with attention to subtle details, fast performance, and how the people using it actually feel.",
      paragraph3:
        "Frontend development, UI/UX design, and creative coding — I draw on the experience I've built to carefully shape ideas into their ideal form.",
      stats: [
        { value: "5+", label: "Years Experience" },
        { value: "50+", label: "Projects Completed" },
        { value: "30+", label: "Happy Clients" },
        { value: "100%", label: "Dedication" },
      ],
    },
    skills: {
      label: "Expertise",
      title: "Skills & Tools",
      groups: [
        {
          category: "Development",
          items: ["React / Next.js", "TypeScript", "Node.js", "Python"],
        },
        {
          category: "Design",
          items: ["Figma", "UI/UX Design", "Design Systems", "Prototyping"],
        },
        {
          category: "Tools",
          items: ["Git / GitHub", "Vercel", "Docker", "AWS"],
        },
      ],
    },
    contact: {
      label: "Get in Touch",
      headingLine1: "Start with",
      headingLine2: "a conversation",
      description:
        "Whether it's a live project or a half-formed idea, I'd love to hear it. Drop me a message anytime.",
      nameLabel: "Name",
      namePlaceholder: "Your name",
      emailLabel: "Email",
      emailPlaceholder: "your@email.com",
      messageLabel: "Message",
      messagePlaceholder: "Tell me about your project...",
      send: "Send Message",
      sending: "Sending...",
      successTitle: "Message sent",
      successBody: "Thanks for reaching out. I'll get back to you soon.",
      errorTitle: "Failed to send",
      errorBody: "Please try again later, or contact me directly by email.",
      notConfigured: "The form endpoint is not configured. Please contact me directly by email.",
      errorRequiredName: "Please enter your name.",
      errorRequiredEmail: "Please enter your email address.",
      errorInvalidEmail: "Please enter a valid email address.",
      errorRequiredMessage: "Please enter a message.",
    },
    footer: {
      rights: "All rights reserved.",
      backToTop: "Back to top ↑",
    },
    notFound: {
      title: "Page Not Found",
      description: "The page you're looking for doesn't exist or may have moved.",
      backToHome: "Back to Home",
    },
  },
};
