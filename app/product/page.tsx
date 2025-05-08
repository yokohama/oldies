import { Suspense } from "react";
import ProductPage from "@/components/product/ProductPage";

export default function Product() {
  return (
    <main className="min-h-screen bg-stone-50">
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        }
      >
        <ProductPage />
      </Suspense>
    </main>
  );
}
