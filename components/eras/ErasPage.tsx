"use client";

import { useParams } from "next/navigation";
import Header from "../ui/Header";
import Footer from "../ui/Footer";
import PageTitle from "../ui/PageTitle";
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
    <div className="oldies-container">
      <Header />
      <PageTitle title={product?.name || "製品詳細"} />
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
