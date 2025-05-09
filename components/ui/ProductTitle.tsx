import { Brand } from "@/lib/types";

interface ProductTitleProps {
  productName: string | undefined;
}

const ProductTitle = ({ productName }: ProductTitleProps) => {
  return (
    <header className="mb-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium text-stone-600 font-playfair pb-1">
          {productName}
        </h1>
      </div>
    </header>
  );
};

export default ProductTitle;
