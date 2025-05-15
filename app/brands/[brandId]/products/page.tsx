import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { baseMetadata } from "@/lib/metadata";
import { getProductsData } from "@/lib/server/productsServer";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import PageTitle from "@/components/ui/PageTitle";
import Spinner from "@/components/ui/Spinner";
import Error from "@/components/ui/Error";
import NotFound from "@/components/ui/NotFound";

// 動的メタデータの生成
export async function generateMetadata({
  params,
}: {
  params: { brandId: string };
}): Promise<Metadata> {
  const brandId = parseInt(params.brandId, 10);
  const { brand } = await getProductsData(brandId);

  if (!brand) {
    return {
      ...baseMetadata,
      title: "ブランド詳細",
      description: "ブランド詳細ページ",
    };
  }

  // 製品一覧ページ用のメタデータを生成
  return {
    ...baseMetadata,
    title: `${brand.name}の製品一覧`,
    description: `${brand.name}のヴィンテージアパレル製品コレクション`,
    openGraph: {
      ...baseMetadata.openGraph,
      title: `${brand.name}の製品一覧 | Champion リバースウィーブ`,
      description: `${brand.name}のヴィンテージアパレル製品コレクション`,
      images: [
        {
          url: brand.imageUrl,
          width: 1200,
          height: 630,
          alt: `${brand.name}の製品一覧`,
        },
      ],
    },
    alternates: {
      canonical: `/brands/${brand.id}/products`,
    },
  };
}

export default async function Products({
  params,
}: {
  params: { brandId: string };
}) {
  // サーバーサイドでデータを取得（React Cacheによって同じリクエストは再利用される）
  const brandId = parseInt(params.brandId, 10);
  const { brand, products, error } = await getProductsData(brandId);

  return (
    <main className="min-h-screen oldies-bg-primary">
      <div className="oldies-container">
        <Header />
        <PageTitle title={brand?.name || "ブランド詳細"} />
        <Suspense fallback={<Spinner />}>
          {error ? (
            <Error label="ブランド一覧に戻る" returnUrl="/brands" />
          ) : products.length === 0 ? (
            <div className="text-center py-10 oldies-border-dashed rounded-md">
              <NotFound text="このブランドの製品情報が見つかりませんでした。" />
              <Link
                href="/brands"
                className="mt-4 inline-block oldies-text-primary hover:oldies-text-secondary border-b border-[var(--oldies-border-primary)] font-serif"
              >
                ブランド一覧に戻る
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <Link
                  href={`/brands/${brand?.id}/products/${product.id}/eras`}
                  key={product.id}
                  className="oldies-card-interactive"
                >
                  <div className="h-48 overflow-hidden relative">
                    <div className="absolute inset-0 border-b border-[var(--oldies-border-primary)] z-10"></div>
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover sepia-[0.2] brightness-[0.95]"
                    />
                  </div>
                  <div className="oldies-card-content">
                    <h2 className="oldies-section-title">{product.name}</h2>
                    <p className="oldies-text-secondary font-light italic mt-2 line-clamp-3">
                      {product.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </Suspense>
        <Footer />
      </div>
    </main>
  );
}
