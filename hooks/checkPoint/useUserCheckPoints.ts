import { useState, useEffect } from "react";
import { CheckPoint } from "@/lib/types";
import { API } from "@/lib/api";

export const useUserCheckPoints = (userId: string | undefined) => {
  const [checkPoints, setCheckPoints] = useState<CheckPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserCheckPoints = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        // API クラスを使用してチェックポイントを取得
        const userCheckPoints = await API.getUserCheckPoints(userId);
        setCheckPoints(userCheckPoints);
      } catch (err) {
        console.error("チェックポイントの取得に失敗しました:", err);
        setError("チェックポイントの取得に失敗しました");
      } finally {
        setLoading(false);
      }
    };

    fetchUserCheckPoints();
  }, [userId]);

  return { checkPoints, loading, error };
};
