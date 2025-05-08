import { Brand } from "@/lib/types";

interface ProductTitleProps {
  brand: Brand | null;
  loading: boolean;
}

const ProductTitle = ({ brand, loading }: ProductTitleProps) => {
  if (loading) {
    return (
      <header className="mb-6">
        <div className="flex items-center justify-between">
          <div className="h-8 bg-gray-200 animate-pulse rounded w-64"></div>
        </div>
      </header>
    );
  }

  if (!brand) {
    return (
      <header className="mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-medium text-stone-600 font-playfair pb-1">
            ブランドが見つかりません
          </h1>
        </div>
      </header>
    );
  }

  return (
    <header className="mb-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium text-stone-600 font-playfair pb-1">
          {brand.name}
        </h1>
      </div>
    </header>
  );
};

export default ProductTitle;
