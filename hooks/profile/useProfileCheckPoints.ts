import { useState, useEffect } from "react";
import { API } from "@/lib/api";
import { ProductEraCheckPoint } from "@/lib/types";

interface UseProfileCheckPointsProps {
  userId: string;
}

export const useProfileCheckPoints = ({
  userId,
}: UseProfileCheckPointsProps) => {
  const [checkPoints, setCheckPoints] = useState<ProductEraCheckPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [selectedCheckPoint, setSelectedCheckPoint] =
    useState<ProductEraCheckPoint | null>(null);

  // チェックポイントの取得
  useEffect(() => {
    const fetchCheckPoints = async () => {
      try {
        setLoading(true);
        const data = await API.getUserCheckPoints(userId);

        // 少し遅延を入れてローディング状態をシミュレート
        setTimeout(() => {
          setCheckPoints(data);
          setLoading(false);
        }, 500);
      } catch (err) {
        setError(
          err instanceof Error
            ? err
            : new Error("チェックポイントの取得に失敗しました"),
        );
        setLoading(false);
      }
    };

    fetchCheckPoints();
  }, [userId]);

  return {
    checkPoints,
    setCheckPoints,
    loading,
    error,
    selectedCheckPoint,
    setSelectedCheckPoint,
  };
};
