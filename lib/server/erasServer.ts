import { API } from "@/lib/api";

// サーバーコンポーネントでデータを取得するための関数（キャッシュなし）
export const getProductDataById = async (productId: number) => {
  try {
    // 製品情報を取得
    const product = await API.getProduct(productId);

    if (!product) {
      return {
        product: null,
        error: "製品が見つかりませんでした",
      };
    }

    // 製造開始年でソート
    product.eras = [...product.eras].sort(
      (a, b) => a.manufacturing_start_year - b.manufacturing_start_year,
    );

    return {
      product,
      error: null,
    };
  } catch (error) {
    console.error("時代データの取得に失敗しました:", error);
    return {
      product: null,
      error: "時代データの取得に失敗しました",
    };
  }
};
