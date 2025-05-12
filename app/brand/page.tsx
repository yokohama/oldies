import { Suspense } from "react";
import BrandPage from "@/components/brand/BrandPage";

export default function Brand() {
  return (
    <main className="min-h-screen bg-stone-50">
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-64">
            <div className="h-16 w-16 relative">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#7a6b59]"></div>
              <div className="absolute inset-0 flex items-center justify-center text-[#5c4d3c] font-serif">
                読込中
              </div>
            </div>
          </div>
        }
      >
        <BrandPage />
      </Suspense>
    </main>
  );
}
