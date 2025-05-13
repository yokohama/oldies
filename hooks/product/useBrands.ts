"use client";

import { useState, useEffect } from "react";
import { API } from "@/lib/api";
import { Brand } from "@/lib/types";

export const useBrands = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const brandsData = await API.getBrands();
        setBrands(brandsData);
        setError(null);
      } catch (err) {
        console.error("ブランドの取得に失敗しました:", err);
        setError(
          err instanceof Error
            ? err
            : new Error("ブランドの取得に失敗しました"),
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  return { brands, loading, error };
};
