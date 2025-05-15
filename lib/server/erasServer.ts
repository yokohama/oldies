import { API } from "@/lib/api";
import { cache } from "react";

// サーバーコンポーネントでデータを取得するための関数（キャッシュ対応）
export const getErasData = cache(async (productId: number) => {
  try {
    // 製品情報を取得
    const product = await API.getProduct(productId);

    if (!product) {
      return {
        product: null,
        productEras: [],
        brand: null,
        error: "製品が見つかりませんでした",
      };
    }

    // ブランド情報を取得
    const brand = await API.getBrand(product.brandId);

    if (!brand) {
      return {
        product,
        productEras: [],
        brand: null,
        error: "ブランドが見つかりませんでした",
      };
    }

    // 製品に関連する時代情報を取得
    const productEras = await API.getProductErasByProductId(productId);

    // 製造開始年でソート
    const sortedProductEras = [...productEras].sort(
      (a, b) => a.manufacturing_start_year - b.manufacturing_start_year,
    );

    return {
      product,
      productEras: sortedProductEras,
      brand,
      error: null,
    };
  } catch (error) {
    console.error("時代データの取得に失敗しました:", error);
    return {
      product: null,
      productEras: [],
      brand: null,
      error: "時代データの取得に失敗しました",
    };
  }
});
