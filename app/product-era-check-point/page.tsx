import { Suspense } from "react";
import ProductEraCheckPointPage from "@/components/product_era_check_points/ProductEraCheckPointPage";

export default function ProductEraCheckPoint() {
  return (
    <main className="min-h-screen bg-stone-50">
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        }
      >
        <ProductEraCheckPointPage />
      </Suspense>
    </main>
  );
}
