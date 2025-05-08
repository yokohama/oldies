"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Header from "../ui/Header";
import ProductTitle from "../ui/ProductTitle";
import EraSelector from "./EraSelector";
import ProductEraCarousel from "./ProductEraCarousel";
import { supabase } from "@/lib/supabase";
import { ProductEra } from "@/lib/types";

// Supabaseから取得するデータの型定義
interface SupabaseProductEra {
  id: number;
  product_id: number;
  manufacturing_start_year: number;
  manufacturing_end_year: number;
  image_url: string;
  description: string | null;
  product_era_check_points: SupabaseProductEraCheckPoint[];
}

interface SupabaseProductEraCheckPoint {
  id: number;
  product_era_id: number;
  point: string;
  image_url: string;
  description: string | null;
  user_id: string | null;
}

const ProductEraCheckPointPage = () => {
  const searchParams = useSearchParams();
  const productIdParam = searchParams.get("productId");
  const productNameParam = searchParams.get("productName");
  const productId = productIdParam ? parseInt(productIdParam, 10) : null;
  const [selectedEraIndex, setSelectedEraIndex] = useState(0); // 初期値は最初のアイテム
  const [productEras, setProductEras] = useState<ProductEra[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // productIdを使ってproduct_erasテーブルからデータを取得
  useEffect(() => {
    const fetchProductEras = async () => {
      if (!productId) {
        setError("製品IDが指定されていません");
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("product_eras")
          .select(
            `
            *,
            product_era_check_points(*)
          `,
          )
          .eq("product_id", productId)
          .is("deleted_at", null);

        if (error) throw error;

        // データをProductEra型に変換
        const mappedData: ProductEra[] = (data || []).map(
          (era: SupabaseProductEra) => ({
            id: era.id,
            productId: era.product_id,
            manufacturing_start_year: era.manufacturing_start_year,
            manufacturing_end_year: era.manufacturing_end_year,
            imageUrl: era.image_url,
            description: era.description || "",
            checkPoints:
              era.product_era_check_points?.map(
                (checkPoint: SupabaseProductEraCheckPoint) => ({
                  id: checkPoint.id,
                  productEraId: checkPoint.product_era_id,
                  point: checkPoint.point,
                  imageUrl: checkPoint.image_url,
                  description: checkPoint.description || "",
                  userId: checkPoint.user_id,
                }),
              ) || [],
          }),
        );

        setProductEras(mappedData);
        setIsLoading(false);
      } catch (err) {
        console.error("製品時代の取得に失敗しました:", err);
        setError("製品時代の取得に失敗しました");
        setIsLoading(false);
      }
    };

    fetchProductEras();
  }, [productId]);

  // インデックスが変更されたときの処理
  const handleEraIndexChange = (index: number) => {
    setSelectedEraIndex(index);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-6 sm:px-6">
      <Header />
      <ProductTitle productName={productNameParam} />
      {isLoading ? (
        <div className="text-center py-10">
          <p>読み込み中...</p>
        </div>
      ) : error ? (
        <div className="text-center py-10 text-red-500">
          <p>{error}</p>
        </div>
      ) : productEras.length === 0 ? (
        <div className="text-center py-10">
          <p>この製品の時代情報はありません</p>
        </div>
      ) : (
        <>
          <EraSelector
            productEras={productEras}
            selectedEraIndex={selectedEraIndex}
            onEraIndexChange={handleEraIndexChange}
          />
          <ProductEraCarousel
            productEras={productEras}
            selectedEraIndex={selectedEraIndex}
            onEraIndexChange={handleEraIndexChange}
          />
        </>
      )}
    </div>
  );
};

export default ProductEraCheckPointPage;
