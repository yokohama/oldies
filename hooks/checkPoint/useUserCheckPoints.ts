import { useState, useEffect } from "react";
import { CheckPointType } from "@/lib/types";
import { API } from "@/lib/api";

export const useUserCheckPoints = (userId: string | undefined) => {
  const [checkPoints, setCheckPoints] = useState<CheckPointType[]>([]);
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

        // API クラスを使用して鑑定ポイントを取得
        const userCheckPoints = await API.getUserCheckPoints(userId);
        setCheckPoints(userCheckPoints);
      } catch (err) {
        console.error("鑑定ポイントの取得に失敗しました:", err);
        setError("鑑定ポイントの取得に失敗しました");
      } finally {
        setLoading(false);
      }
    };

    fetchUserCheckPoints();
  }, [userId]);

  return { checkPoints, loading, error };
};
