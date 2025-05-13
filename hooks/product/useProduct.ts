"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { API } from "@/lib/api";
import { Brand, Product } from "@/lib/types";

export const useProduct = () => {
  const params = useParams();
  const [brand, setBrand] = useState<Brand | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // パスパラメータからIDを取得（存在する場合）
  const id = params?.brandId;

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        setError("ブランドIDが指定されていません");
        setLoading(false);
        return;
      }

      try {
        // 文字列をnumber型に変換
        const brandId =
          typeof id === "string"
            ? parseInt(id, 10)
            : Array.isArray(id)
              ? parseInt(id[0], 10)
              : 0;

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
  }, [id]);

  return { brand, products, loading, error };
};
