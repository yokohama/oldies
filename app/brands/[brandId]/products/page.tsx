import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { baseMetadata, generateProductsMetadata } from "@/lib/metadata";
import { getProductsDataByBrandId } from "@/lib/server/productsServer";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import PageTitle from "@/components/ui/PageTitle";
import Spinner from "@/components/ui/Spinner";
import Error from "@/components/ui/Error";
import NotFound from "@/components/ui/NotFound";
import { siteConfig } from "@/lib/config/siteConfig";

// 動的メタデータの生成
export async function generateMetadata({
  params,
}: {
  params: { brandId: string };
}): Promise<Metadata> {
  const brandId = parseInt(params.brandId, 10);
  const { brand } = await getProductsDataByBrandId(brandId);

  if (!brand) {
    return {
      ...baseMetadata,
    };
  }

  return generateProductsMetadata(brand);
}

export default async function ProductsPage({
  params,
}: {
  params: { brandId: string };
}) {
  // サーバーサイドでデータを取得（React Cacheによって同じリクエストは再利用される）
  const brandId = parseInt(params.brandId, 10);
  const { brand, products, error } = await getProductsDataByBrandId(brandId);

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
                  href={`/brands/${brand?.id}/products/${product.id}`}
                  key={product.id}
                  className="oldies-card-interactive"
                >
                  <div className="h-48 overflow-hidden relative">
                    <div className="absolute inset-0 border-b border-[var(--oldies-border-primary)] z-10"></div>
                    <Image
                      src={product.imageUrl}
                      alt={`${product.name} | ${brand?.name}コレクション | ${siteConfig.name}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover sepia-[0.2] brightness-[0.95]"
                      priority={product.id === products[0]?.id}
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
