import { Suspense } from "react";
import type { Metadata } from "next";
import { baseMetadata, generateEraMetadata } from "@/lib/metadata";
import { getErasData } from "@/lib/server/erasServer";
import Spinner from "@/components/ui/Spinner";
import NotFound from "@/components/ui/NotFound";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import PageTitle from "@/components/ui/PageTitle";
import Error from "@/components/ui/Error";
import ErasCarousel from "@/components/eras/ErasCarousel";

// 動的メタデータの生成
export async function generateMetadata({
  params,
}: {
  params: { brandId: string; productId: string };
}): Promise<Metadata> {
  const productId = parseInt(params.productId, 10);
  const { product, productEras, brand, error } = await getErasData(productId);

  if (!product || !brand || error) {
    return {
      ...baseMetadata,
      title: "製品時代詳細",
      description: "製品の時代別詳細ページ",
    };
  }

  // 最初の時代情報があればそれを使用、なければ製品情報のみ
  if (productEras.length > 0) {
    return generateEraMetadata(productEras[0], product, brand);
  }

  return {
    ...baseMetadata,
    title: `${product.name} - ${brand.name}の時代情報`,
    description: `${brand.name}の${product.name}の時代別詳細情報`,
    openGraph: {
      title: `${product.name} - ${brand.name}の時代情報 | Champion リバースウィーブ`,
      description: `${brand.name}の${product.name}の時代別詳細情報`,
      images: [
        {
          url: product.imageUrl,
          width: 1200,
          height: 630,
          alt: `${product.name}の時代情報`,
        },
      ],
    },
    alternates: {
      canonical: `/brands/${brand.id}/products/${product.id}/eras`,
    },
  };
}

export default async function ProductEras({
  params,
}: {
  params: { brandId: string; productId: string };
}) {
  // サーバーサイドでデータを取得
  const productId = parseInt(params.productId, 10);
  const { product, productEras, error } = await getErasData(productId);

  // 製品が見つからない場合は404ページを表示
  if (!product && !error) {
    return <NotFound />;
  }

  return (
    <main className="min-h-screen oldies-bg-primary">
      <div className="oldies-container">
        <Header />
        <PageTitle title={product?.name || "製品詳細"} />
        <Suspense fallback={<Spinner />}>
          {error ? (
            <Error />
          ) : productEras.length === 0 ? (
            <NotFound text="この製品の時代情報はありません" />
          ) : (
            <div className="max-w-4xl mx-auto">
              <ErasCarousel productEras={productEras} />
            </div>
          )}
        </Suspense>
        <Footer />
      </div>
    </main>
  );
}
