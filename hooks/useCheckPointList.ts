"use client";

import { useState, useEffect } from "react";
import { ProductEraCheckPoint, User } from "@/lib/types";
import {
  getUserProfile,
  UserProfile,
} from "@/components/product_era_check_points/utils/checkPointUtils";
import { useCheckPoints } from "./useCheckPoints";
import { useAuth } from "@/contexts/AuthContext";

interface UseCheckPointListReturn {
  localCheckPoints: ProductEraCheckPoint[];
  userProfiles: Record<string, UserProfile>;
  isAddModalOpen: boolean;
  setIsAddModalOpen: (isOpen: boolean) => void;
  handleDeleteCheckPoint: (checkPoint: ProductEraCheckPoint) => Promise<void>;
  handleAddButtonClick: () => void;
  user: User | null;
}

export function useCheckPointList(
  initialCheckPoints: ProductEraCheckPoint[],
): UseCheckPointListReturn {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [localCheckPoints, setLocalCheckPoints] =
    useState<ProductEraCheckPoint[]>(initialCheckPoints);
  const [userProfiles, setUserProfiles] = useState<Record<string, UserProfile>>(
    {},
  );

  const { deleteCheckPoint } = useCheckPoints();
  const { user, signInWithGoogle } = useAuth();

  // チェックポイントの削除ハンドラー
  const handleDeleteCheckPoint = async (checkPoint: ProductEraCheckPoint) => {
    if (window.confirm("このチェックポイントを削除してもよろしいですか？")) {
      const success = await deleteCheckPoint(checkPoint.id);
      if (success) {
        // ローカルの状態を更新して、UIを即座に反映
        setLocalCheckPoints((prev) =>
          prev.filter((cp) => cp.id !== checkPoint.id),
        );
      }
    }
  };

  // 追加ボタンクリックハンドラー
  const handleAddButtonClick = () => {
    if (!user) {
      // ユーザーがログインしていない場合は、Googleログイン処理を実行
      signInWithGoogle();
    } else {
      // ログイン済みの場合はモーダルを開く
      setIsAddModalOpen(true);
    }
  };

  // チェックポイントの投稿者情報を取得
  useEffect(() => {
    const fetchUserProfiles = async () => {
      const userIds = localCheckPoints
        .map((cp) => cp.userId)
        .filter(
          (userId): userId is string => userId !== null && userId !== undefined,
        );

      // 重複を排除
      const uniqueUserIds = [...new Set(userIds)];

      // 各ユーザーのプロフィール情報を取得
      const profiles: Record<string, UserProfile> = {};

      await Promise.all(
        uniqueUserIds.map(async (userId) => {
          const profile = await getUserProfile(userId);
          if (profile) {
            profiles[userId] = profile;
          }
        }),
      );

      setUserProfiles(profiles);
    };

    if (localCheckPoints.length > 0) {
      fetchUserProfiles();
    }
  }, [localCheckPoints]);

  return {
    localCheckPoints,
    userProfiles,
    isAddModalOpen,
    setIsAddModalOpen,
    handleDeleteCheckPoint,
    handleAddButtonClick,
    user,
  };
}
