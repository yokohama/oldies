import { useState, useEffect } from "react";
import { ProductEraCheckPoint, UserProfile } from "@/lib/types";
import { API } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

interface UseCheckPointInteractionsProps {
  checkPoint: ProductEraCheckPoint;
  showProductEraCheckPoint: (checkPoint: ProductEraCheckPoint) => void;
  isOwnCheckPoint?: boolean;
  userProfile?: UserProfile;
}

interface UseCheckPointInteractionsReturn {
  liked: boolean;
  likeCount: number;
  displayName: string;
  avatarUrl: string;
  handleLike: (e: React.MouseEvent) => void;
  handleShare: (e: React.MouseEvent) => void;
  handleCheckPointClick: () => void;
  isLikeLoading: boolean;
}

export function useCheckPointInteractions({
  checkPoint,
  showProductEraCheckPoint,
  userProfile,
}: UseCheckPointInteractionsProps): UseCheckPointInteractionsReturn {
  const { user } = useAuth();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isLikeLoading, setIsLikeLoading] = useState(false);

  // チェックポイントのいいね状態を取得
  useEffect(() => {
    const fetchLikeStatus = async () => {
      if (!user || !checkPoint.id) return;

      try {
        const isLiked = await API.isCheckPointLiked(
          user.id as string,
          checkPoint.id,
        );
        setLiked(isLiked);
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
        const count = await API.getCheckPointLikesCount(checkPoint.id);
        setLikeCount(count);
      } catch (err) {
        console.error("いいね数の取得に失敗:", err);
      }
    };

    fetchLikeCount();
  }, [checkPoint.id]);

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!user || !checkPoint.id || isLikeLoading) return;

    setIsLikeLoading(true);

    try {
      if (liked) {
        // いいねを削除
        await API.unlikeCheckPoint(user.id as string, checkPoint.id);
        setLiked(false);
        setLikeCount((prev) => Math.max(0, prev - 1));
      } else {
        // いいねを追加
        await API.likeCheckPoint(user.id as string, checkPoint.id);
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
    handleLike,
    handleShare,
    handleCheckPointClick,
    isLikeLoading,
  };
}
