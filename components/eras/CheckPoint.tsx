"use client";

import Image from "next/image";
import Link from "next/link";
import { CheckPointType, UserProfileType } from "@/lib/types";
import { Trash2, Heart, Share2 } from "lucide-react";
import { toast } from "sonner";
import { useCheckPointActions } from "@/hooks";
import { siteConfig } from "@/lib/config/siteConfig";
import { getAvatarUrl } from "@/lib/config/siteConfig";

interface CheckPointProps {
  checkPoint: CheckPointType;
  setCheckPoints: React.Dispatch<React.SetStateAction<CheckPointType[]>>;
  isOwnCheckPoint?: boolean;
  userProfile?: UserProfileType;
}

const CheckPoint = ({
  checkPoint,
  setCheckPoints,
  isOwnCheckPoint = false,
  userProfile,
}: CheckPointProps) => {
  const {
    liked = false,
    likeCount = 0,
    displayName = "ユーザー",
    avatarUrl = getAvatarUrl(),
    handleLike = () => { },
    handleShare = () => { },
    isLikeLoading = false,
    handleDelete,
  } = useCheckPointActions({
    brand: checkPoint.era.product.brand,
    product: checkPoint.era.product,
    checkPoint,
    isOwnCheckPoint,
    userProfile,
  });

  return (
    <div
      className="oldies-card cursor-pointer flex flex-col h-full"
      onClick={() => openCheckPointToast(checkPoint)}
    >
      {isOwnCheckPoint && (
        <button
          onClick={(e) => handleDelete(checkPoint.id, e, setCheckPoints)}
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

const openCheckPointToast = (checkPoint: CheckPointType) => {
  const toastId = toast(
    <div
      id="debug"
      className="relative oldies-bg-lighter p-4 rounded-lg oldies-border-thick w-full shadow-lg"
      style={{ maxWidth: "100%" }}
    >
      <button
        onClick={() => toast.dismiss(toastId)}
        className="absolute top-2 right-2 p-1 rounded-full hover:oldies-bg-secondary"
      >
        <svg
          xmlns={siteConfig.svg.xmlns}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--oldies-accent-primary)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      {checkPoint.imageUrl && (
        <div className="relative h-48 w-full oldies-bg-secondary rounded-lg overflow-hidden mt-6 oldies-border">
          <Image
            src={checkPoint.imageUrl}
            alt={`${checkPoint.point} - ${checkPoint.era.product.name} - ${checkPoint.era.product.brand.name} | ヴィンテージアパレル| 時代の特徴ポイント | ${siteConfig.name}`}
            fill
            className="object-cover sepia-[0.15] brightness-[0.98]"
            unoptimized
          />
        </div>
      )}
      <h3 className="text-lg font-medium oldies-text-primary my-2 font-serif">
        {checkPoint.point}
      </h3>
      <p className="text-sm oldies-text-secondary">{checkPoint.description}</p>
    </div>,
    {
      duration: Infinity,
      style: {
        padding: 0,
        margin: 0,
        width: "100%",
        maxWidth: "450px",
      },
      unstyled: true,
      className: "oldies-toast",
    },
  );

  return toastId;
};

export default CheckPoint;
