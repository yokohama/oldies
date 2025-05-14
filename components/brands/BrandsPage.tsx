"use client";

import { useRouter } from "next/navigation";
import Header from "../ui/Header";
import Footer from "../ui/Footer";
import Image from "next/image";
import PageTitle from "../ui/PageTitle";
import Spinner from "../ui/Spinner";
import Error from "../ui/Error";
import NotFound from "../ui/NotFound";

import { useBrands } from "@/hooks";

const BrandsPage = () => {
  const router = useRouter();
  const { brands, loading, error } = useBrands();

  const handleBrandClick = (brandId: number) => {
    router.push(`/brands/${brandId}/products`);
  };

  if (loading) {
    return (
      <div className="oldies-container">
        <Header />
        <PageTitle title="ブランドコレクション" />
        <Spinner size="lg" />
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="oldies-container">
        <Header />
        <PageTitle title="ブランドコレクション" />
        <Error />
        <Footer />
      </div>
    );
  }

  return (
    <div className="oldies-container">
      <Header />
      <div className="text-center mb-8">
        <h1 className="oldies-page-title">ブランドコレクション</h1>
        <div className="oldies-title-underline"></div>
      </div>
      {brands.length === 0 ? (
        <NotFound text="ブランドが見つかりませんでした。" />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="oldies-card-interactive"
              onClick={() => handleBrandClick(brand.id)}
            >
              <div className="h-48 overflow-hidden relative">
                <div className="absolute inset-0 border-b border-[var(--oldies-border-primary)] z-10"></div>
                <Image
                  src={brand.imageUrl}
                  alt={brand.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover sepia-[0.2] brightness-[0.95]"
                />
              </div>
              <div className="oldies-card-content">
                <h2 className="oldies-section-title">{brand.name}</h2>
                <div className="oldies-text-secondary font-light italic">
                  {brand.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default BrandsPage;
