"use client";

import Image from "next/image";
import Link from "next/link";
import { CheckPoint, UserProfile } from "@/lib/types";
import { Trash2, Heart, Share2 } from "lucide-react";
import { useCheckPointActions } from "@/hooks";
import { Brand, Product } from "@/lib/types";
import { getAvatarUrl } from "@/lib/config/siteConfig";

interface CheckPointCardProps {
  brand: Brand;
  product: Product;
  checkPoint: CheckPoint;
  setCheckPoints: React.Dispatch<React.SetStateAction<CheckPoint[]>>;
  showCheckPoint: (
    brand: Brand,
    product: Product,
    checkPoint: CheckPoint,
  ) => void;
  isOwnCheckPoint?: boolean;
  userProfile?: UserProfile;
}

const CheckPointCard = ({
  brand,
  product,
  checkPoint,
  setCheckPoints,
  showCheckPoint,
  isOwnCheckPoint = false,
  userProfile,
}: CheckPointCardProps) => {
  const {
    liked = false,
    likeCount = 0,
    displayName = "ユーザー",
    avatarUrl = getAvatarUrl(),
    handleLike = () => {},
    handleShare = () => {},
    handleCheckPointClick = () => {},
    isLikeLoading = false,
    handleDeleteCheckPoint,
  } = useCheckPointActions({
    brand,
    product,
    checkPoint,
    showCheckPoint,
    isOwnCheckPoint,
    userProfile,
  });

  const handleDeleteClickPoint = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (window.confirm("このチェックポイントを削除してもよろしいですか？")) {
      const success = await handleDeleteCheckPoint(checkPoint.id);
      if (success) {
        setCheckPoints((prev) => prev.filter((cp) => cp.id !== checkPoint.id));
      }
    }
  };

  return (
    <div
      className="oldies-card cursor-pointer flex flex-col h-full"
      onClick={handleCheckPointClick}
    >
      {isOwnCheckPoint && (
        <button
          onClick={handleDeleteClickPoint}
          className="absolute top-2 right-2 text-[var(--oldies-accent-primary)] hover:text-[var(--oldies-accent-secondary)] transition-colors z-10"
          aria-label="削除"
        >
          <Trash2 size={18} />
        </button>
      )}
      <div className="flex items-start p-3 flex-grow">
        {checkPoint.imageUrl && (
          <div className="relative h-16 w-16 mr-3 flex-shrink-0 oldies-bg-accent rounded-sm overflow-hidden oldies-border">
            <Image
              src={checkPoint.imageUrl}
              alt={checkPoint.point}
              fill
              sizes="(max-width: 768px) 100vw, 64px"
              className="object-cover sepia-[0.15] brightness-[0.98]"
              priority={true}
            />
          </div>
        )}
        <div className="flex-1">
          <h4 className="oldies-card-header">{checkPoint.point}</h4>
          <p className="text-xs oldies-text-secondary font-light italic">
            {checkPoint.description}
          </p>
        </div>
      </div>

      {/* フッター部分（SNS領域） */}
      <div className="oldies-card-footer mt-auto">
        <div className="flex items-center justify-between space-x-2">
          {/* 投稿者情報 - クリックでプロフィールページへ */}
          <Link
            href={`/profile/${checkPoint.userId}`}
            className="flex items-center gap-2 group"
            onClick={(e) => e.stopPropagation()} // 親要素のクリックイベントを停止
          >
            <div className="flex-shrink-0 w-6 h-6 rounded-full overflow-hidden">
              <Image
                src={avatarUrl}
                alt={displayName}
                width={24}
                height={24}
                className="object-cover w-full h-full"
                unoptimized={avatarUrl.includes("api.dicebear.com")}
              />
            </div>
            <span className="text-xs oldies-text-primary font-medium group-hover:text-[var(--oldies-accent-primary)] transition-colors truncate max-w-[100px]">
              {displayName}
            </span>
          </Link>

          {/* インタラクションボタン */}
          <div className="flex items-center space-x-3">
            <button
              onClick={(e) => {
                e.stopPropagation(); // 親要素のクリックイベントを停止
                handleLike(e);
              }}
              className={`flex items-center text-xs ${liked ? "oldies-text-accent" : "oldies-text-secondary"} hover:oldies-text-accent transition-colors ${isLikeLoading ? "opacity-50 cursor-wait" : ""}`}
              aria-label="いいね"
              disabled={isLikeLoading}
            >
              <Heart
                size={14}
                className={liked ? "fill-[var(--oldies-accent-primary)]" : ""}
              />
              <span className="ml-1">{likeCount}</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation(); // 親要素のクリックイベントを停止
                handleShare(e);
              }}
              className="flex items-center text-xs oldies-text-secondary hover:oldies-text-primary transition-colors"
              aria-label="シェア"
            >
              <Share2 size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckPointCard;
