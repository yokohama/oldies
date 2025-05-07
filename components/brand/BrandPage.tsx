"use client";

import { brands } from "@/lib/sample-data";
import { useRouter } from "next/navigation";
import Header from "../ui/Header";

const BrandPage = () => {
  const router = useRouter();

  const handleBrandClick = (brandId: number) => {
    router.push(`/product?brandId=${brandId}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6">
      <Header />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {brands.map((brand) => (
          <div
            key={brand.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => handleBrandClick(brand.id)}
          >
            <div className="h-48 overflow-hidden">
              <img
                src={brand.imageUrl}
                alt={brand.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold">{brand.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandPage;
