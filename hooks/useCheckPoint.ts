import { useState } from "react";
import { ProductEraCheckPoint } from "@/lib/types";

interface UserProfile {
  id: string;
  name: string;
  avatarUrl: string;
}

interface UseCheckPointProps {
  checkPoint: ProductEraCheckPoint;
  showProductEraCheckPoint: (checkPoint: ProductEraCheckPoint) => void;
  isOwnCheckPoint?: boolean;
  onDelete?: (checkPoint: ProductEraCheckPoint) => void;
  userProfile?: UserProfile;
}

interface UseCheckPointReturn {
  liked: boolean;
  displayName: string;
  avatarUrl: string;
  handleDelete: (e: React.MouseEvent) => void;
  handleLike: (e: React.MouseEvent) => void;
  handleShare: (e: React.MouseEvent) => void;
  handleCheckPointClick: () => void;
}

export function useCheckPoint({
  checkPoint,
  showProductEraCheckPoint,
  isOwnCheckPoint = false,
  onDelete,
  userProfile,
}: UseCheckPointProps): UseCheckPointReturn {
  const [liked, setLiked] = useState(false);

  // イベントハンドラー
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(checkPoint);
    }
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked(!liked);
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

  const displayName = userProfile?.name || "ユーザー";
  const avatarUrl = userProfile?.avatarUrl || defaultAvatar;

  return {
    liked,
    displayName,
    avatarUrl,
    handleDelete,
    handleLike,
    handleShare,
    handleCheckPointClick,
  };
}
