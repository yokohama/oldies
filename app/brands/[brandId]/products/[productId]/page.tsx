import { Suspense } from "react";
import type { Metadata } from "next";
import { baseMetadata, generateProductMetadata } from "@/lib/metadata";
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
  const { product, brand, error } = await getErasData(productId);

  if (!product || !brand || error) {
    return {
      ...baseMetadata,
    };
  }

  return generateProductMetadata(product, brand);
}

export default async function ProductEras({
  params,
}: {
  params: { brandId: string; productId: string };
}) {
  // サーバーサイドでデータを取得
  const productId = parseInt(params.productId, 10);
  const { brand, product, productEras, error } = await getErasData(productId);

  // ブランドや製品が見つからない場合は404ページを表示
  if ((!product && !error) || !brand) {
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
              <ErasCarousel
                brand={brand}
                product={product}
                productEras={productEras}
              />
            </div>
          )}
        </Suspense>
        <Footer />
      </div>
    </main>
  );
}
