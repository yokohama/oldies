"use client";

import { useSearchParams } from "next/navigation";
import Header from "../ui/Header";
import Footer from "../ui/Footer";
import Spinner from "../ui/Spinner";
import Error from "../ui/Error";
import NotFound from "../ui/NotFound";
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
        <Spinner size="lg" />
      ) : error ? (
        <Error />
      ) : productEras.length === 0 ? (
        <NotFound text="この製品の時代情報はありません" />
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
