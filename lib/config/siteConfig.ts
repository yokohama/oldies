// サイト全体の設定を一元管理するファイル
export const siteConfig = {
  // サイト基本情報
  name: "Oldies",
  description:
    "このサイトの説明このサイトの説明このサイトの説明このサイトの説明このサイトの説明",
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
