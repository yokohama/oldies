"use client";

import { useState, useEffect } from "react";
import { API } from "@/lib/api";
import { toast } from "sonner";
import { CheckPointType, UserProfileType } from "@/lib/types";
import { useAuth } from "@/contexts/AuthContext";
import { BrandType, ProductType } from "@/lib/types";
import { getAvatarUrl } from "@/lib/config/siteConfig";

interface UseCheckPointActionsProps {
  brand: BrandType;
  product: ProductType;
  checkPoint?: CheckPointType;
  showCheckPoint?: (
    brand: BrandType,
    product: ProductType,
    checkPoint: CheckPointType,
  ) => void;
  isOwnCheckPoint?: boolean;
  userProfile?: UserProfileType;
}

interface UseCheckPointActionsReturn {
  // チェックポイント追加・削除機能
  handleAddCheckPoint: (
    productEraId: number,
    point: string,
    file: File,
    description: string | null,
  ) => Promise<{ success: boolean; checkPoint?: CheckPointType }>;
  handleDeleteCheckPoint: (checkPointId: number) => Promise<boolean>;
  isSubmitting: boolean;
  uploadProgress: number;

  // インタラクション機能
  liked: boolean;
  likeCount: number;
  displayName: string;
  avatarUrl: string;
  handleLike: (e: React.MouseEvent) => void;
  handleShare: (e: React.MouseEvent) => void;
  handleCheckPointClick: () => void;
  isLikeLoading: boolean;
}

export function useCheckPointActions(
  props?: UseCheckPointActionsProps,
): UseCheckPointActionsReturn {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // インタラクション関連の状態
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isLikeLoading, setIsLikeLoading] = useState(false);

  const brand = props?.brand;
  const product = props?.product;
  const checkPoint = props?.checkPoint;
  const showCheckPoint = props?.showCheckPoint;
  const userProfile = props?.userProfile;

  // チェックポイントのいいね状態を取得
  useEffect(() => {
    const fetchLikeStatus = async () => {
      if (!user || !checkPoint?.id) return;

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
  }, [user, checkPoint?.id]);

  // チェックポイントのいいね数を取得
  useEffect(() => {
    const fetchLikeCount = async () => {
      if (!checkPoint?.id) return;

      try {
        const count = await API.getCheckPointLikesCount(checkPoint.id);
        setLikeCount(count);
      } catch (err) {
        console.error("いいね数の取得に失敗:", err);
      }
    };

    fetchLikeCount();
  }, [checkPoint?.id]);

  const handleAddCheckPoint = async (
    productEraId: number,
    point: string,
    file: File,
    description: string | null,
  ): Promise<{ success: boolean; checkPoint?: CheckPointType }> => {
    setIsSubmitting(true);
    setUploadProgress(0);

    try {
      // ログインユーザーの取得
      const user = await API.getCurrentUser();

      if (!user) {
        toast.error("ログインが必要です");
        return { success: false };
      }

      // アップロード開始時に進捗を設定
      setUploadProgress(10);

      // 画像をアップロードしてURLを取得
      const imageUrl = await API.uploadImage(file, user.id);

      // アップロード完了時に進捗を更新
      setUploadProgress(70);

      // チェックポイントの追加
      const newCheckPoint = await API.addCheckPoint(
        productEraId,
        point,
        imageUrl,
        description,
        user.id,
      );

      setUploadProgress(100);
      toast.success("チェックポイントを追加しました");
      return { success: true, checkPoint: newCheckPoint };
    } catch (error) {
      console.error("チェックポイントの追加に失敗しました:", error);
      toast.error("チェックポイントの追加に失敗しました");
      return { success: false };
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCheckPoint = async (
    checkPointId: number,
  ): Promise<boolean> => {
    try {
      await API.deleteCheckPoint(checkPointId);
      toast.success("チェックポイントを削除しました");
      return true;
    } catch (error) {
      console.error("チェックポイントの削除に失敗しました:", error);
      toast.error("チェックポイントの削除に失敗しました");
      return false;
    }
  };

  const handleLike = async (e: React.MouseEvent) => {
    if (!e || !checkPoint?.id) return;
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
    if (!e) return;
    e.stopPropagation();
    // シェア機能の実装（将来的に実装）
    alert("シェア機能は現在開発中です");
  };

  const handleCheckPointClick = () => {
    if (brand && product && checkPoint && showCheckPoint) {
      showCheckPoint(brand, product, checkPoint);
    }
  };

  // ユーザープロフィール情報の処理
  const defaultAvatar = getAvatarUrl(checkPoint?.userId || "anonymous");

  const displayName = userProfile?.name ?? "ユーザー";
  const avatarUrl = userProfile?.avatarUrl ?? defaultAvatar;

  return {
    handleAddCheckPoint,
    handleDeleteCheckPoint,
    isSubmitting,
    uploadProgress,
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
