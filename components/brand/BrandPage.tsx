"use client";

import { API } from "@/lib/api";
import { Brand } from "@/lib/types";
import { useRouter } from "next/navigation";
import Header from "../ui/Header";
import { useEffect, useState } from "react";
import Image from "next/image";

const BrandPage = () => {
  const router = useRouter();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const brandsData = await API.getBrands();
        setBrands(brandsData);
      } catch (error) {
        console.error("ブランドの取得に失敗しました:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  const handleBrandClick = (brandId: number) => {
    router.push(`/product?brandId=${brandId}`);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6">
        <Header />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6">
      <Header />
      {brands.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-lg text-gray-600">
            ブランドが見つかりませんでした。
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              onClick={() => handleBrandClick(brand.id)}
            >
              <div className="h-48 overflow-hidden relative">
                <Image
                  src={brand.imageUrl}
                  alt={brand.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold">{brand.name}</h2>
              </div>
              <div>{brand.description}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BrandPage;
