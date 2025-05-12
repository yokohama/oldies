"use client";

import Image from "next/image";
import Link from "next/link";
import { ProductEraCheckPoint, UserProfile } from "@/lib/types";
import { Trash2, Heart, Share2 } from "lucide-react";
import { useCheckPoint } from "@/hooks/useCheckPoint";
import { useAuth } from "@/contexts/AuthContext";

interface CheckPointProps {
  checkPoint: ProductEraCheckPoint;
  showProductEraCheckPoint: (checkPoint: ProductEraCheckPoint) => void;
  isOwnCheckPoint?: boolean;
  onDelete?: (checkPoint: ProductEraCheckPoint) => void;
  userProfile?: UserProfile; // ユーザープロフィール情報
}

const CheckPoint = ({
  checkPoint,
  showProductEraCheckPoint,
  isOwnCheckPoint = false,
  onDelete,
  userProfile,
}: CheckPointProps) => {
  const { user } = useAuth();
  const {
    liked,
    likeCount,
    displayName,
    avatarUrl,
    handleDelete,
    handleLike,
    handleShare,
    handleCheckPointClick,
    isLikeLoading,
  } = useCheckPoint({
    checkPoint,
    showProductEraCheckPoint,
    isOwnCheckPoint,
    onDelete,
    userProfile,
  });

  return (
    <div
      className="bg-[#f8f3e6] border border-[#d3c7a7] rounded-sm overflow-hidden relative transition-all duration-200 hover:shadow-[0_2px_8px_rgba(122,95,67,0.15)] cursor-pointer"
      onClick={handleCheckPointClick}
    >
      {isOwnCheckPoint && onDelete && (
        <button
          onClick={handleDelete}
          className="absolute top-2 right-2 text-[#a85751] hover:text-[#8a3c37] transition-colors z-10"
          aria-label="削除"
        >
          <Trash2 size={18} />
        </button>
      )}
      <div className="flex items-start p-3">
        {checkPoint.imageUrl && (
          <div className="relative h-16 w-16 mr-3 flex-shrink-0 bg-[#e5dcc3] rounded-sm overflow-hidden border border-[#d3c7a7]">
            <Image
              src={checkPoint.imageUrl}
              alt={checkPoint.point}
              fill
              className="object-cover sepia-[0.15] brightness-[0.98]"
              unoptimized
            />
          </div>
        )}
        <div className="flex-1">
          <h4 className="text-sm font-serif text-[#5c4d3c] mb-1 border-b border-[#d3c7a7] pb-1">
            {checkPoint.point}
          </h4>
          <p className="text-xs text-[#7a6b59] font-light italic">
            {checkPoint.description}
          </p>
        </div>
      </div>

      {/* フッター部分（SNS領域） */}
      <div className="border-t border-[#d3c7a7] bg-[#f0ebe0] px-3 py-2">
        <div className="flex items-center justify-between">
          {/* 投稿者情報 - クリックでプロフィールページへ */}
          <Link
            href={`/profile/${checkPoint.userId}`}
            className="flex items-center group"
            onClick={(e) => e.stopPropagation()} // 親要素のクリックイベントを停止
          >
            <div className="relative h-6 w-6 rounded-full overflow-hidden border border-[#d3c7a7] mr-2 transition-transform group-hover:scale-105">
              <Image
                src={avatarUrl}
                alt={displayName}
                width={24}
                height={24}
                className="object-cover"
                unoptimized
              />
            </div>
            <span className="text-xs text-[#5c4d3c] font-medium group-hover:text-[#a85751] transition-colors">
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
              className={`flex items-center text-xs ${liked ? "text-[#a85751]" : "text-[#7a6b59]"} hover:text-[#a85751] transition-colors ${isLikeLoading ? "opacity-50 cursor-wait" : ""}`}
              aria-label="いいね"
              disabled={isLikeLoading}
            >
              <Heart size={14} className={liked ? "fill-[#a85751]" : ""} />
              <span className="ml-1">{likeCount}</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation(); // 親要素のクリックイベントを停止
                handleShare(e);
              }}
              className="flex items-center text-xs text-[#7a6b59] hover:text-[#5c4d3c] transition-colors"
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

export default CheckPoint;
