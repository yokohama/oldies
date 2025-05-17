import { API } from "@/lib/api";
import { cache } from "react";

export const getCheckpointsData = cache(async () => {
  try {
    const checkPoints = await API.getCheckPoints();

    return { checkPoints, error: null };
  } catch (error) {
    console.error("チェックポイントのデータの取得に失敗しました:", error);
    return {
      checkPoints: null,
      error: "チェックポイントのデータの取得に失敗しました",
    };
  }
});
