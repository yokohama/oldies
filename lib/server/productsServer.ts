import { API } from "@/lib/api";
import { cache } from "react";

// サーバーコンポーネントでデータを取得するための関数（キャッシュ対応）
export const getProductsDataByBrandId = cache(async (brandId: number) => {
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

    return { brand, products: brand.products, error: null };
  } catch (error) {
    console.error("製品データの取得に失敗しました:", error);
    return {
      brand: null,
      products: [],
      error: "製品データの取得に失敗しました",
    };
  }
});
