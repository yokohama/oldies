"use client";

import { useState, useEffect } from "react";
import { API } from "@/lib/api";
import { Brand, Product } from "@/lib/types";

export const useProduct = (brandId: number | null) => {
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

  return { brand, products, loading, error };
};
