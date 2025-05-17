import { Metadata } from "next";
import { BrandType, ProductType, UserProfileType } from "./types";
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

export function generateProductsMetadata(brand: BrandType): Metadata {
  const title = `${brand.name}の名作一覧 | ${siteConfig.name}`;
  const description = `${brand.name}の今でも多くの人に愛されるアパレルコレクション`;

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      images: [
        {
          url: brand.imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    alternates: {
      canonical: siteUrls.brand(brand.id) + "/products",
    },
  };
}

// 商品ページのメタデータ生成
export function generateProductMetadata(product: ProductType): Metadata {
  const title = `${product.name} - ${product.brand.name} | ${siteConfig.name}`;
  const description = `${product.brand.name}の${product.name}ヴィンテージアパレル`;

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
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
      canonical: siteUrls.product(product.brand.id, product.id),
    },
  };
}

export function generateCheckpointsMetadata() {
  const title = `US古着鑑定ポイント一覧 | ${siteConfig.name}`;
  const description = "みんなでシェアするUS古着鑑定ポイント一覧";

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      images: [
        {
          url: siteConfig.images.homeBanner,
          width: 1200,
          height: 630,
          alt: `${title} | ${siteConfig.name}`,
        },
      ],
    },
    alternates: {
      canonical: siteUrls.checkpoints,
    },
  };
}

// プロフィールページのメタデータ生成
export function generateProfileMetadata(profile: UserProfileType): Metadata {
  const title = `${profile.name || "ユーザー"}のプロフィール | ${siteConfig.name}`;
  const description = `${profile.name || "ユーザー"}のプロフィール | ${siteConfig.name}`;
  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
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
