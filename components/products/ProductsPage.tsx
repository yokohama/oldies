"use client";

import { useProduct } from "@/hooks/product/useProduct";
import Header from "../ui/Header";
import Footer from "../ui/Footer";
import BrandTitle from "../ui/BrandTitle";
import Link from "next/link";
import Image from "next/image";
import Spinner from "../ui/Spinner";
import Error from "../ui/Error";
import NotFound from "../ui/NotFound";

const ProductsPage = () => {
  const { brand, products, loading, error } = useProduct();

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 bg-[#f9f6f0]">
      <Header />
      <BrandTitle brandName={brand?.name} />

      {loading ? (
        <Spinner size="lg" />
      ) : error ? (
        <Error label="ブランド一覧に戻る" returnUrl="/brands" />
      ) : products.length === 0 ? (
        <div className="text-center py-10 border-2 border-dashed border-[#d3c7a7] rounded-md">
          <NotFound text="このブランドの年代情報が見つかりませんでした。" />
          <Link
            href="/brands"
            className="mt-4 inline-block text-[#5c4d3c] hover:text-[#7a6b59] border-b border-[#d3c7a7] font-serif"
          >
            ブランド一覧に戻る
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Link
              href={`/brands/${brand?.id}/products/${product.id}/eras`}
              key={product.id}
              className="bg-[#f8f3e6] border-2 border-[#d3c7a7] rounded-sm overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_20px_rgba(122,95,67,0.3)]"
            >
              <div className="h-48 overflow-hidden relative">
                <div className="absolute inset-0 border-b-2 border-[#d3c7a7] z-10"></div>
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover sepia-[0.2] brightness-[0.95]"
                />
              </div>
              <div className="p-5">
                <h2 className="text-xl font-serif text-[#5c4d3c] mb-2 border-b border-[#d3c7a7] pb-2">
                  {product.name}
                </h2>
                <p className="text-[#7a6b59] font-light italic mt-2 line-clamp-3">
                  {product.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default ProductsPage;
