"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { API } from "@/lib/api";
import { Brand, Product } from "@/lib/types";
import Header from "../ui/Header";
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
    <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6">
      <Header />
      <BrandTitle brandName={brand?.name} />

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : error ? (
        <div className="text-center py-10">
          <p className="text-lg text-red-600">{error}</p>
          <Link
            href="/brand"
            className="mt-4 inline-block text-blue-600 hover:underline"
          >
            ブランド一覧に戻る
          </Link>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-lg text-gray-600">
            このブランドの年代情報が見つかりませんでした。
          </p>
          <Link
            href="/brand"
            className="mt-4 inline-block text-blue-600 hover:underline"
          >
            ブランド一覧に戻る
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link
              href={`/product-era-check-point?productId=${product.id}&productName=${product.name}`}
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="h-48 overflow-hidden relative">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <p className="text-gray-600 mt-2 line-clamp-3">
                  {product.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductPage;
