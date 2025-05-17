import { API } from "@/lib/api";
import { cache } from "react";

export const getCheckpointsData = cache(async () => {
  try {
    const checkPoints = await API.getCheckPoints();

    return { checkPoints, error: null };
  } catch (error) {
    return {
      checkPoints: null,
      error: "鑑定ポイントのデータの取得に失敗しました",
    };
  }
});

export const getCheckpointData = cache(async (checkPointId: number) => {
  try {
    const checkPoint = await API.getCheckPoint(checkPointId);

    return { checkPoint, error: null };
  } catch (error) {
    return {
      checkPoints: null,
      error: "鑑定ポイントのデータの取得に失敗しました",
    };
  }
});
