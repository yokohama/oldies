"use client";

import { useState, useEffect } from "react";
import { API } from "@/lib/api";
import { LikedCheckPointType } from "@/lib/types";
import { useAuth } from "@/contexts/AuthContext";

export const useLikedCheckPoints = () => {
  const [likedCheckPoints, setLikedCheckPoints] = useState<
    LikedCheckPointType[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchLikedCheckPoints = async () => {
      if (!user) {
        setLikedCheckPoints([]);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const data = await API.getLikedCheckPoints(user.id);
        setLikedCheckPoints(data);
        setError(null);
      } catch (err) {
        console.error("いいねした鑑定ポイントの取得に失敗しました", err);
        setError(
          err instanceof Error
            ? err
            : new Error("いいねした鑑定ポイントの取得に失敗しました"),
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchLikedCheckPoints();
  }, [user]);

  const likeCheckPoint = async (checkPointId: number) => {
    if (!user) return;

    try {
      await API.likeCheckPoint(user.id, checkPointId);
      // いいね一覧を再取得
      const updatedLikes = await API.getLikedCheckPoints(user.id);
      setLikedCheckPoints(updatedLikes);
    } catch (err) {
      console.error("いいねの追加に失敗しました", err);
      throw err;
    }
  };

  const unlikeCheckPoint = async (checkPointId: number) => {
    if (!user) return;

    try {
      await API.unlikeCheckPoint(user.id, checkPointId);
      // いいね一覧から削除
      setLikedCheckPoints((prev) =>
        prev.filter((cp) => cp.id !== checkPointId),
      );
    } catch (err) {
      console.error("いいねの削除に失敗しました", err);
      throw err;
    }
  };

  return {
    likedCheckPoints,
    isLoading,
    error,
    likeCheckPoint,
    unlikeCheckPoint,
  };
};
