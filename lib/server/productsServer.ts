import { API } from "@/lib/api";
import { cache } from "react";

// サーバーコンポーネントでデータを取得するための関数（キャッシュ対応）
export const getProductsData = cache(async (brandId: number) => {
  try {
    // ブランド情報を取得
    const brand = await API.getBrand(brandId);

    if (!brand) {
      return {
        brand: null,
        products: [],
        error: "ブランドが見つかりませんでした",
      };
    }

    // ブランドに関連する製品を取得
    const products = await API.getProductsByBrandId(brandId);

    return { brand, products, error: null };
  } catch (error) {
    console.error("製品データの取得に失敗しました:", error);
    return {
      brand: null,
      products: [],
      error: "製品データの取得に失敗しました",
    };
  }
});
