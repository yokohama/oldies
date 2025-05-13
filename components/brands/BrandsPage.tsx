"use client";

import { useRouter } from "next/navigation";
import Header from "../ui/Header";
import Footer from "../ui/Footer";
import Image from "next/image";
import { useBrands } from "@/hooks/product/useBrands";
import Spinner from "../ui/Spinner";
import Error from "../ui/Error";
import NotFound from "../ui/NotFound";

const BrandsPage = () => {
  const router = useRouter();
  const { brands, loading, error } = useBrands();

  const handleBrandClick = (brandId: number) => {
    router.push(`/brands/${brandId}/products`);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 bg-[#f9f6f0]">
        <Header />
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif text-[#5c4d3c] mb-2">
            ブランドコレクション
          </h1>
          <div className="w-24 h-1 bg-[#d3c7a7] mx-auto"></div>
        </div>
        <Spinner size="lg" />
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 bg-[#f9f6f0]">
        <Header />
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif text-[#5c4d3c] mb-2">
            ブランドコレクション
          </h1>
          <div className="w-24 h-1 bg-[#d3c7a7] mx-auto"></div>
        </div>
        <Error />
        <Footer />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 bg-[#f9f6f0]">
      <Header />
      <div className="text-center mb-8">
        <h1 className="text-3xl font-serif text-[#5c4d3c] mb-2">
          ブランドコレクション
        </h1>
        <div className="w-24 h-1 bg-[#d3c7a7] mx-auto"></div>
      </div>
      {brands.length === 0 ? (
        <NotFound text="ブランドが見つかりませんでした。" />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="bg-[#f8f3e6] border-2 border-[#d3c7a7] rounded-sm overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_20px_rgba(122,95,67,0.3)]"
              onClick={() => handleBrandClick(brand.id)}
            >
              <div className="h-48 overflow-hidden relative">
                <div className="absolute inset-0 border-b-2 border-[#d3c7a7] z-10"></div>
                <Image
                  src={brand.imageUrl}
                  alt={brand.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover sepia-[0.2] brightness-[0.95]"
                />
              </div>
              <div className="p-5">
                <h2 className="text-xl font-serif text-[#5c4d3c] mb-2 border-b border-[#d3c7a7] pb-2">
                  {brand.name}
                </h2>
                <div className="text-[#7a6b59] font-light italic">
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
