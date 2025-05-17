import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { baseMetadata } from "@/lib/metadata";
import { getBrandsData } from "@/lib/server/brandsServer";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import PageTitle from "@/components/ui/PageTitle";
import Spinner from "@/components/ui/Spinner";
import Error from "@/components/ui/Error";
import NotFound from "@/components/ui/NotFound";
import { siteConfig } from "@/lib/config/siteConfig";

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
                <div key={brand.id} className="oldies-card-interactive">
                  <Link
                    href={`/brands/${brand?.id}/products`}
                    className="oldies-card-interactive"
                  >
                    <div className="h-48 overflow-hidden relative">
                      <div className="absolute inset-0 border-b border-[var(--oldies-border-primary)] z-10"></div>
                      <Image
                        src={brand.imageUrl}
                        alt={`${brand.name} | ヴィンテージブランドコレクション | ${siteConfig.name}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="object-cover sepia-[0.2] brightness-[0.95]"
                        priority={true}
                      />
                    </div>
                    <div className="oldies-card-content">
                      <h2 className="oldies-section-title">{brand.name}</h2>
                      <div className="oldies-text-secondary font-light italic">
                        {brand.description}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </Suspense>
        <Footer />
      </div>
    </main>
  );
}
