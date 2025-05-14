"use client";

import { useParams } from "next/navigation";
import Header from "../ui/Header";
import Footer from "../ui/Footer";
import Spinner from "../ui/Spinner";
import Error from "../ui/Error";
import NotFound from "../ui/NotFound";
import ErasCarousel from "./ErasCarousel";
import { useEras } from "@/hooks";

const ProductEraCheckPointPage = () => {
  const params = useParams();
  const productId = params?.productId
    ? parseInt(params.productId as string, 10)
    : undefined;

  const {
    productEras,
    isLoading: isLoadingEras,
    isLoadingProduct,
    error: erasError,
    productError: productError,
    selectedEraIndex,
    handleEraIndexChange,
    product: product,
  } = useEras({ productId });

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 bg-[#f9f6f0]">
      <Header />
      <div className="text-center mb-8">
        <h1 className="text-3xl font-serif text-[#5c4d3c] mb-2">
          {product?.name || "製品詳細"}
        </h1>
        <div className="w-24 h-1 bg-[#d3c7a7] mx-auto"></div>
      </div>
      {isLoadingProduct || isLoadingEras ? (
        <Spinner size="lg" />
      ) : productError || erasError ? (
        <Error />
      ) : productEras.length === 0 ? (
        <NotFound text="この製品の時代情報はありません" />
      ) : (
        <div className="max-w-4xl mx-auto">
          <ErasCarousel
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
