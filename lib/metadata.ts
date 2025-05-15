import { Metadata } from "next";
import { Brand, Product, ProductEra, UserProfile } from "./types";

// サイト全体のベースとなるメタデータ
export const baseMetadata: Metadata = {
  title: {
    template: "%s | Champion リバースウィーブ",
    default: "Champion リバースウィーブ | ビンテージアパレル",
  },
  description:
    "50年代から90年代のChampionリバースウィーブウェアを展示するヴィンテージアパレルストア",
  metadataBase: new URL("https://champion-vintage.example.com"),
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "Champion リバースウィーブ | ビンテージアパレル",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@champion_vintage",
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// ブランドページのメタデータ生成
export function generateBrandMetadata(brand: Brand): Metadata {
  return {
    title: `${brand.name}`,
    description:
      brand.description || `${brand.name}のヴィンテージアパレルコレクション`,
    openGraph: {
      title: `${brand.name} | Champion リバースウィーブ`,
      description:
        brand.description || `${brand.name}のヴィンテージアパレルコレクション`,
      images: [
        {
          url: brand.imageUrl,
          width: 1200,
          height: 630,
          alt: brand.name,
        },
      ],
    },
    twitter: {
      images: [
        {
          url: brand.imageUrl,
          width: 1200,
          height: 630,
          alt: brand.name,
        },
      ],
    },
    alternates: {
      canonical: `/brands/${brand.id}`,
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
      title: `${product.name} - ${brand.name} | Champion リバースウィーブ`,
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
      canonical: `/brands/${brand.id}/products/${product.id}`,
    },
  };
}

// 時代ページのメタデータ生成
export function generateEraMetadata(
  era: ProductEra,
  product: Product,
  brand: Brand,
): Metadata {
  const eraYears = `${era.manufacturing_start_year}年〜${era.manufacturing_end_year}年`;
  return {
    title: `${eraYears} ${product.name} - ${brand.name}`,
    description:
      era.description ||
      `${eraYears}の${brand.name} ${product.name}ヴィンテージアパレル`,
    openGraph: {
      title: `${eraYears} ${product.name} - ${brand.name} | Champion リバースウィーブ`,
      description:
        era.description ||
        `${eraYears}の${brand.name} ${product.name}ヴィンテージアパレル`,
      images: [
        {
          url: era.imageUrl,
          width: 1200,
          height: 630,
          alt: `${eraYears} ${product.name}`,
        },
      ],
    },
    twitter: {
      images: [
        {
          url: era.imageUrl,
          width: 1200,
          height: 630,
          alt: `${eraYears} ${product.name}`,
        },
      ],
    },
    alternates: {
      canonical: `/brands/${brand.id}/products/${product.id}/eras/${era.id}`,
    },
  };
}

// プロフィールページのメタデータ生成
export function generateProfileMetadata(profile: UserProfile): Metadata {
  return {
    title: `${profile.name || "ユーザー"}のプロフィール`,
    description: `${profile.name || "ユーザー"}のChampion リバースウィーブコレクション`,
    openGraph: {
      title: `${profile.name || "ユーザー"}のプロフィール | Champion リバースウィーブ`,
      description: `${profile.name || "ユーザー"}のChampion リバースウィーブコレクション`,
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
      canonical: `/profile/${profile.id}`,
    },
  };
}

// お気に入りページのメタデータ
export const favoritesMetadata: Metadata = {
  title: "お気に入り",
  description:
    "あなたがお気に入りに登録したChampion リバースウィーブのチェックポイント",
  alternates: {
    canonical: "/favorites",
  },
};
