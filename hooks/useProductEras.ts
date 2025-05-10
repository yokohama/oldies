import { useState, useEffect } from "react";
import { API } from "@/lib/api";
import { ProductEra } from "@/lib/types";

interface UseProductErasOptions {
  productId?: number | null;
  initialSelectedIndex?: number;
}

interface UseProductErasReturn {
  productEras: ProductEra[];
  isLoading: boolean;
  error: string | null;
  selectedEraIndex: number;
  setSelectedEraIndex: (index: number) => void;
}

export function useProductEras({
  productId = null,
  initialSelectedIndex = 0,
}: UseProductErasOptions = {}): UseProductErasReturn {
  const [productEras, setProductEras] = useState<ProductEra[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedEraIndex, setSelectedEraIndex] =
    useState(initialSelectedIndex);

  useEffect(() => {
    const fetchProductEras = async () => {
      if (!productId) {
        setError("製品IDが指定されていません");
        setIsLoading(false);
        return;
      }

      try {
        const data = await API.getProductErasByProductId(productId);

        // 製造開始年でソート
        const sortedData = [...data].sort(
          (a, b) => a.manufacturing_start_year - b.manufacturing_start_year,
        );

        setProductEras(sortedData);
        setIsLoading(false);
      } catch (err) {
        console.error("製品時代の取得に失敗しました:", err);
        setError("製品時代の取得に失敗しました");
        setIsLoading(false);
      }
    };

    fetchProductEras();
  }, [productId]);

  return {
    productEras,
    isLoading,
    error,
    selectedEraIndex,
    setSelectedEraIndex,
  };
}
