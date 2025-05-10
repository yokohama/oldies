"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { API } from "@/lib/api";
import { Brand, Product } from "@/lib/types";
import Header from "../ui/Header";
import Footer from "../ui/Footer";
import BrandTitle from "../ui/BrandTitle";
import Link from "next/link";
import Image from "next/image";

const ProductPage = () => {
  const searchParams = useSearchParams();
  const brandIdParam = searchParams.get("brandId");
  const brandId = brandIdParam ? parseInt(brandIdParam, 10) : null;

  const [brand, setBrand] = useState<Brand | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!brandId) {
        setError("ブランドIDが指定されていません");
        setLoading(false);
        return;
      }

      try {
        // ブランド情報を取得
        const brandData = await API.getBrand(brandId);
        setBrand(brandData);

        // ブランドに関連する製品を取得
        const productsData = await API.getProductsByBrandId(brandId);
        setProducts(productsData);
      } catch (err) {
        console.error("データの取得に失敗しました:", err);
        setError("データの取得に失敗しました");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [brandId]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 bg-[#f9f6f0]">
      <Header />
      <BrandTitle brandName={brand?.name} />

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="h-16 w-16 relative">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#7a6b59]"></div>
            <div className="absolute inset-0 flex items-center justify-center text-[#5c4d3c] font-serif">
              読込中
            </div>
          </div>
        </div>
      ) : error ? (
        <div className="text-center py-10 border-2 border-dashed border-[#d3c7a7] rounded-md">
          <p className="text-lg text-[#a85751] font-serif italic">{error}</p>
          <Link
            href="/brand"
            className="mt-4 inline-block text-[#5c4d3c] hover:text-[#7a6b59] border-b border-[#d3c7a7] font-serif"
          >
            ブランド一覧に戻る
          </Link>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-10 border-2 border-dashed border-[#d3c7a7] rounded-md">
          <p className="text-lg text-[#7a6b59] font-serif italic">
            このブランドの年代情報が見つかりませんでした。
          </p>
          <Link
            href="/brand"
            className="mt-4 inline-block text-[#5c4d3c] hover:text-[#7a6b59] border-b border-[#d3c7a7] font-serif"
          >
            ブランド一覧に戻る
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Link
              href={`/product-era-check-point?productId=${product.id}&productName=${product.name}`}
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

export default ProductPage;
