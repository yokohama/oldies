import { Suspense } from "react";
import type { Metadata } from "next";
import { baseMetadata } from "@/lib/metadata";
import { getBrandsData } from "@/lib/server/brandsServer";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import PageTitle from "@/components/ui/PageTitle";
import Spinner from "@/components/ui/Spinner";
import Error from "@/components/ui/Error";
import NotFound from "@/components/ui/NotFound";
import BrandCard from "@/components/brands/BrandCard";

// 動的メタデータの生成
export async function generateMetadata(): Promise<Metadata> {
  return baseMetadata;
}

export default async function Home() {
  // サーバーサイドでデータを取得
  const { brands, error } = await getBrandsData();

  return (
    <main className="min-h-screen oldies-bg-primary">
      <div className="oldies-container">
        <Header />
        <PageTitle title="ブランド一覧" />
        <Suspense fallback={<Spinner />}>
          {error ? (
            <Error />
          ) : brands.length === 0 ? (
            <NotFound text="ブランドが見つかりませんでした。" />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {brands.map((brand) => (
                <BrandCard key={brand.id} brand={brand} />
              ))}
            </div>
          )}
        </Suspense>
        <Footer />
      </div>
    </main>
  );
}
