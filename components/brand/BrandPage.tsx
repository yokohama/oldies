"use client";

import { useRouter } from "next/navigation";
import Header from "../ui/Header";
import Footer from "../ui/Footer";
import Image from "next/image";
import { useBrands } from "@/hooks/useBrands";

const BrandPage = () => {
  const router = useRouter();
  const { brands, loading, error } = useBrands();

  const handleBrandClick = (brandId: number) => {
    router.push(`/product?brandId=${brandId}`);
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
        <div className="flex justify-center items-center h-64">
          <div className="h-16 w-16 relative">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#7a6b59]"></div>
            <div className="absolute inset-0 flex items-center justify-center text-[#5c4d3c] font-serif">
              読込中
            </div>
          </div>
        </div>
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
        <div className="text-center py-10 border-2 border-dashed border-[#d3c7a7] rounded-md">
          <p className="text-lg text-[#7a6b59] italic">
            エラーが発生しました。再度お試しください。
          </p>
        </div>
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
        <div className="text-center py-10 border-2 border-dashed border-[#d3c7a7] rounded-md">
          <p className="text-lg text-[#7a6b59] italic">
            ブランドが見つかりませんでした。
          </p>
        </div>
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

export default BrandPage;
