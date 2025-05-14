import { Suspense } from "react";
import BrandsPage from "@/components/brands/BrandsPage";

export default function Brands() {
  return (
    <main className="min-h-screen oldies-bg-primary">
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-64">
            <div className="h-16 w-16 relative">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[var(--oldies-text-secondary)]"></div>
              <div className="absolute inset-0 flex items-center justify-center oldies-text-primary font-serif">
                読込中
              </div>
            </div>
          </div>
        }
      >
        <BrandsPage />
      </Suspense>
    </main>
  );
}
