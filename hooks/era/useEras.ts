import { useState, useEffect } from "react";
import { API } from "@/lib/api";
import { ProductEra, Product } from "@/lib/types";

interface UseErasOptions {
  productId?: number | null;
  initialSelectedIndex?: number;
}

interface UseErasReturn {
  productEras: ProductEra[];
  product: Product | null | undefined;
  isLoading: boolean;
  isLoadingProduct: boolean;
  error: string | null;
  productError: string | null;
  selectedEraIndex: number;
  setSelectedEraIndex: (index: number) => void;
  handleEraIndexChange: (index: number) => void;
}

export function useEras({
  productId = null,
  initialSelectedIndex = 0,
}: UseErasOptions = {}): UseErasReturn {
  const [product, setProduct] = useState<Product | null>();
  const [productEras, setProductEras] = useState<ProductEra[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingProduct, setIsLoadingProduct] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [productError, setProductError] = useState<string | null>(null);
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

      try {
        const productData = await API.getProduct(productId);
        setProduct(productData);
      } catch (err) {
        console.error("製品情報の取得に失敗しました:", err);
        setProductError("製品情報の取得に失敗しました");
      } finally {
        setIsLoadingProduct(false);
      }
    };

    fetchProductEras();
  }, [productId]);

  // インデックスが変更されたときの処理
  const handleEraIndexChange = (index: number) => {
    setSelectedEraIndex(index);
  };

  return {
    productEras,
    product,
    isLoading,
    isLoadingProduct,
    error,
    productError,
    selectedEraIndex,
    setSelectedEraIndex,
    handleEraIndexChange,
  };
}
