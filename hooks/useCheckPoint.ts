import { useState, useEffect } from "react";
import { ProductEraCheckPoint, UserProfile } from "@/lib/types";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";

interface UseCheckPointProps {
  checkPoint: ProductEraCheckPoint;
  showProductEraCheckPoint: (checkPoint: ProductEraCheckPoint) => void;
  isOwnCheckPoint?: boolean;
  onDelete?: (checkPoint: ProductEraCheckPoint) => void;
  userProfile?: UserProfile;
}

interface UseCheckPointReturn {
  liked: boolean;
  likeCount: number;
  displayName: string;
  avatarUrl: string;
  handleDelete: (e: React.MouseEvent) => void;
  handleLike: (e: React.MouseEvent) => void;
  handleShare: (e: React.MouseEvent) => void;
  handleCheckPointClick: () => void;
  isLikeLoading: boolean;
}

export function useCheckPoint({
  checkPoint,
  showProductEraCheckPoint,
  onDelete,
  userProfile,
}: UseCheckPointProps): UseCheckPointReturn {
  const { user } = useAuth();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isLikeLoading, setIsLikeLoading] = useState(false);

  // チェックポイントのいいね状態を取得
  useEffect(() => {
    const fetchLikeStatus = async () => {
      if (!user || !checkPoint.id) return;

      try {
        // 現在のユーザーがこのチェックポイントにいいねしているか確認
        // api.tsのパターンに合わせて修正
        const { data, error } = await supabase
          .from("check_point_likes")
          .select("*")
          .eq("user_id", user.id as string)
          .eq("check_point_id", checkPoint.id)
          .maybeSingle(); // single()の代わりにmaybeSingle()を使用

        if (error) {
          console.error("いいね状態の取得エラー:", error);
          return;
        }

        setLiked(!!data);
      } catch (err) {
        console.error("いいね状態の取得に失敗:", err);
      }
    };

    fetchLikeStatus();
  }, [user, checkPoint.id]);

  // チェックポイントのいいね数を取得
  useEffect(() => {
    const fetchLikeCount = async () => {
      if (!checkPoint.id) return;

      try {
        const { count, error } = await supabase
          .from("check_point_likes")
          .select("*", { count: "exact", head: true })
          .eq("check_point_id", checkPoint.id);

        if (error) {
          console.error("いいね数の取得エラー:", error);
          return;
        }

        setLikeCount(count || 0);
      } catch (err) {
        console.error("いいね数の取得に失敗:", err);
      }
    };

    fetchLikeCount();
  }, [checkPoint.id]);

  // イベントハンドラー
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(checkPoint);
    }
  };

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!user || !checkPoint.id || isLikeLoading) return;

    setIsLikeLoading(true);

    try {
      if (liked) {
        // いいねを削除
        const { error } = await supabase
          .from("check_point_likes")
          .delete()
          .eq("user_id", user.id as string)
          .eq("check_point_id", checkPoint.id);

        if (error) throw error;

        setLiked(false);
        setLikeCount((prev) => Math.max(0, prev - 1));
      } else {
        // いいねを追加
        const { error } = await supabase.from("check_point_likes").insert({
          user_id: user.id as string,
          check_point_id: checkPoint.id,
        });

        if (error) throw error;

        setLiked(true);
        setLikeCount((prev) => prev + 1);
      }
    } catch (err) {
      console.error("いいね操作に失敗:", err);
    } finally {
      setIsLikeLoading(false);
    }
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    // シェア機能の実装（将来的に実装）
    alert("シェア機能は現在開発中です");
  };

  const handleCheckPointClick = () => {
    showProductEraCheckPoint(checkPoint);
  };

  // ユーザープロフィール情報の処理
  const defaultAvatar =
    "https://api.dicebear.com/7.x/initials/svg?seed=" +
    (checkPoint.userId || "anonymous");

  const displayName = userProfile?.name ?? "ユーザー";
  const avatarUrl = userProfile?.avatarUrl ?? defaultAvatar;

  return {
    liked,
    likeCount,
    displayName,
    avatarUrl,
    handleDelete,
    handleLike,
    handleShare,
    handleCheckPointClick,
    isLikeLoading,
  };
}
