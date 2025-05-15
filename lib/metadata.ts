import { Metadata } from "next";
import { Brand, Product, ProductEra, UserProfile } from "./types";
import { siteConfig, siteUrls } from "./config/siteConfig";

// サイト全体のベースとなるメタデータ
export const baseMetadata: Metadata = {
  title: {
    template: siteConfig.seo.titleTemplate,
    default: siteConfig.seo.defaultTitle,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.seo.defaultTitle,
    images: [
      {
        url: siteConfig.images.defaultOgImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: siteConfig.social.twitter,
  },
  alternates: {
    canonical: siteUrls.home(),
  },
  robots: {
    index: true,
    follow: true,
  },
};

export function generateProductsMetadata(brand: Brand): Metadata {
  return {
    title: `${brand.name}の名作一覧`,
    description: `${brand.name}の今でも多くの人に愛されるアパレルコレクション`,
    openGraph: {
      title: `${brand.name}の名作一覧 | ${siteConfig.name}`,
      description: `${brand.name}の今での多くの人に愛されるアパレルコレクション`,
      images: [
        {
          url: brand.imageUrl,
          width: 1200,
          height: 630,
          alt: `${brand.name}の名作一覧`,
        },
      ],
    },
    alternates: {
      canonical: siteUrls.brand(brand.id) + "/products",
    },
  };
}

// 商品ページのメタデータ生成
export function generateProductMetadata(
  product: Product,
  brand: Brand,
): Metadata {
  return {
    title: `${product.name} - ${brand.name}`,
    description:
      product.description ||
      `${brand.name}の${product.name}ヴィンテージアパレル`,
    openGraph: {
      title: `${product.name} - ${brand.name} | ${siteConfig.name}`,
      description:
        product.description ||
        `${brand.name}の${product.name}ヴィンテージアパレル`,
      images: [
        {
          url: product.imageUrl,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
    twitter: {
      images: [
        {
          url: product.imageUrl,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
    alternates: {
      canonical: siteUrls.product(brand.id, product.id),
    },
  };
}

// プロフィールページのメタデータ生成
export function generateProfileMetadata(profile: UserProfile): Metadata {
  return {
    title: `${profile.name || "ユーザー"}のプロフィール`,
    description: `${profile.name || "ユーザー"}の${siteConfig.name}コレクション`,
    openGraph: {
      title: `${profile.name || "ユーザー"}のプロフィール | ${siteConfig.name}`,
      description: `${profile.name || "ユーザー"}の${siteConfig.name}コレクション`,
      images: profile.avatarUrl
        ? [
            {
              url: profile.avatarUrl,
              width: 500,
              height: 500,
              alt: `${profile.name || "ユーザー"}のプロフィール画像`,
            },
          ]
        : [],
    },
    alternates: {
      canonical: siteUrls.profile(profile.id),
    },
  };
}

// お気に入りページのメタデータ
export const favoritesMetadata: Metadata = {
  title: "お気に入り",
  description: `あなたがお気に入りに登録した${siteConfig.name}のチェックポイント`,
  alternates: {
    canonical: siteUrls.favorites(),
  },
};
