"use client";

import { useSearchParams } from "next/navigation";
import Header from "../ui/Header";
import Footer from "../ui/Footer";
//import ProductTitle from "../ui/ProductTitle";
//import EraSelector from "./EraSelector";
import ProductEraCarousel from "./ProductEraCarousel";
import { useProductEras } from "@/hooks/useProductEras";

const ProductEraCheckPointPage = () => {
  const searchParams = useSearchParams();
  const productIdParam = searchParams.get("productId");
  const productNameParam = searchParams.get("productName");
  const productId = productIdParam ? parseInt(productIdParam, 10) : null;

  const {
    productEras,
    isLoading,
    error,
    selectedEraIndex,
    setSelectedEraIndex,
  } = useProductEras({ productId });

  // インデックスが変更されたときの処理
  const handleEraIndexChange = (index: number) => {
    setSelectedEraIndex(index);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 bg-[#f9f6f0]">
      <Header />
      <div className="text-center mb-8">
        <h1 className="text-3xl font-serif text-[#5c4d3c] mb-2">
          {productNameParam || "製品詳細"}
        </h1>
        <div className="w-24 h-1 bg-[#d3c7a7] mx-auto"></div>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="h-16 w-16 relative">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#7a6b59]"></div>
            <div className="absolute inset-0 flex items-center justify-center text-[#5c4d3c] font-serif">
              読込中
            </div>
          </div>
        </div>
      ) : error ? (
        <div className="text-center py-10 border-2 border-dashed border-[#d3c7a7] rounded-md">
          <p className="text-lg text-[#7a6b59] italic">{error}</p>
        </div>
      ) : productEras.length === 0 ? (
        <div className="text-center py-10 border-2 border-dashed border-[#d3c7a7] rounded-md">
          <p className="text-lg text-[#7a6b59] italic">
            この製品の時代情報はありません
          </p>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          {/*
          <EraSelector
            productEras={productEras}
            selectedEraIndex={selectedEraIndex}
            onEraIndexChange={handleEraIndexChange}
          />
          */}
          <ProductEraCarousel
            productEras={productEras}
            selectedEraIndex={selectedEraIndex}
            onEraIndexChange={handleEraIndexChange}
          />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default ProductEraCheckPointPage;
