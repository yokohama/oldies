import { API } from "@/lib/api";

// サーバーコンポーネントでデータを取得するための関数
export async function getBrandsData() {
  try {
    const brands = await API.getBrands();
    return { brands, error: null };
  } catch (error) {
    console.error("ブランドの取得に失敗しました:", error);
    return { brands: [], error: "ブランドの取得に失敗しました" };
  }
}
