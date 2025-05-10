"use client";

import { useSearchParams } from "next/navigation";
import Header from "../ui/Header";
import Footer from "../ui/Footer";
import ProductTitle from "../ui/ProductTitle";
import EraSelector from "./EraSelector";
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
    <div className="max-w-md mx-auto px-4 py-6 sm:px-6">
      <Header />
      <ProductTitle productName={productNameParam || undefined} />
      {isLoading ? (
        <div className="text-center py-10">
          <p>読み込み中...</p>
        </div>
      ) : error ? (
        <div className="text-center py-10 text-red-500">
          <p>{error}</p>
        </div>
      ) : productEras.length === 0 ? (
        <div className="text-center py-10">
          <p>この製品の時代情報はありません</p>
        </div>
      ) : (
        <>
          <EraSelector
            productEras={productEras}
            selectedEraIndex={selectedEraIndex}
            onEraIndexChange={handleEraIndexChange}
          />
          <ProductEraCarousel
            productEras={productEras}
            selectedEraIndex={selectedEraIndex}
            onEraIndexChange={handleEraIndexChange}
          />
        </>
      )}
      <Footer />
    </div>
  );
};

export default ProductEraCheckPointPage;
