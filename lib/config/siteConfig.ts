// サイト全体の設定を一元管理するファイル
export const siteConfig = {
  // サイト基本情報
  name: "US古着 Hacking",
  subtitle: "hoge",
  description:
    "アメカジ好き必見！US古着・ヴィンテージのタグ・仕様・年代別特徴を大量データ＆専門コメントの日本最大データベース(を目指す笑)。ビギナーでも簡単に見分け方が身につき、さらにアメカジへの愛が深まる情報サイト",
  url: "https://champion-vintage.example.com",

  // ソーシャルメディア
  social: {
    twitter: "@champion_vintage",
  },

  // SEO関連
  seo: {
    titleTemplate: "%s | hoge",
    defaultTitle: "moge | ビンテージアパレル",
  },

  // ロケール設定
  locale: "ja_JP",

  // 画像パス
  images: {
    homeBanner: "/images/home-banner.jpg",
    defaultOgImage: "/images/og-default.jpg",
    defaultProfileAvatar: "/images/default-avatar.jpg",
  },
};

// 各種URLを生成するヘルパー関数
export const siteUrls = {
  home: () => "/",
  brand: (brandId: number) => `/brands/${brandId}`,
  product: (brandId: number, productId: number) =>
    `/brands/${brandId}/products/${productId}`,
  era: (brandId: number, productId: number, eraId: number) =>
    `/brands/${brandId}/products/${productId}/eras/${eraId}`,
  profile: (profileId: string) => `/profile/${profileId}`,
  favorites: () => "/favorites",
};
