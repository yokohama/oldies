import { useState, useEffect } from "react";
import { ProductEraCheckPoint } from "@/lib/types";
import { supabase } from "@/lib/supabase";

export const useUserCheckPoints = (userId: string | undefined) => {
  const [checkPoints, setCheckPoints] = useState<ProductEraCheckPoint[]>([]);
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

        // ユーザーIDに基づいてチェックポイントを取得
        const { data, error } = await supabase
          .from("product_era_check_points")
          .select("*")
          .eq("user_id", userId)
          .order("created_at", { ascending: false });

        if (error) {
          throw error;
        }

        // データベースのスネークケースのカラム名をキャメルケースに変換
        const formattedData = data.map((item) => ({
          ...item,
          userId: item.user_id,
          productEraId: item.product_era_id,
          createdAt: item.created_at,
          imageUrl: item.image_url,
        }));

        setCheckPoints(formattedData as ProductEraCheckPoint[]);
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
