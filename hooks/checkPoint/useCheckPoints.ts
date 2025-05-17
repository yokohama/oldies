"use client";

import { useState, useEffect } from "react";
import { CheckPointType, UserProfileType } from "@/lib/types";
import { User } from "@supabase/supabase-js";
import { API } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

interface UseCheckPointsReturn {
  checkPoints: CheckPointType[];
  setCheckPoints: React.Dispatch<React.SetStateAction<CheckPointType[]>>;
  userProfiles: Record<string, UserProfileType>;
  isAddModalOpen: boolean;
  setIsAddModalOpen: (isOpen: boolean) => void;
  handleAddButtonClick: () => void;
  user: User | null;
  addNewCheckPoint: (newCheckPoint: CheckPointType) => void;
}

export function useCheckPoints(
  initialCheckPoints: CheckPointType[],
): UseCheckPointsReturn {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [checkPoints, setCheckPoints] =
    useState<CheckPointType[]>(initialCheckPoints);
  const [userProfiles, setUserProfiles] = useState<
    Record<string, UserProfileType>
  >({});

  const { user, signInWithGoogle } = useAuth();

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

  // 新しいチェックポイントを追加するメソッド
  const addNewCheckPoint = (newCheckPoint: CheckPointType) => {
    setCheckPoints((prevCheckPoints) => [newCheckPoint, ...prevCheckPoints]);

    // 新しいチェックポイントのユーザープロフィールを取得
    if (newCheckPoint.userId && !userProfiles[newCheckPoint.userId]) {
      API.getUserProfile(newCheckPoint.userId).then((profile) => {
        if (profile) {
          setUserProfiles((prev) => ({
            ...prev,
            [newCheckPoint.userId as string]: profile,
          }));
        }
      });
    }
  };

  // チェックポイントの投稿者情報を取得
  useEffect(() => {
    /*
     *
     * ここでproductCheckPointsをAPIから取得
     *
     */

    const fetchUserProfiles = async () => {
      const userIds = checkPoints
        .map((cp) => cp.userId)
        .filter(
          (userId): userId is string => userId !== null && userId !== undefined,
        );

      // 重複を排除
      const uniqueUserIds = Array.from(new Set(userIds));

      // 各ユーザーのプロフィール情報を取得
      const profiles: Record<string, UserProfileType> = {};

      await Promise.all(
        uniqueUserIds.map(async (userId) => {
          const profile = await API.getUserProfile(userId);
          if (profile) {
            profiles[userId] = profile;
          }
        }),
      );

      setUserProfiles(profiles);
    };

    if (checkPoints.length > 0) {
      fetchUserProfiles();
    }
  }, [initialCheckPoints]);

  return {
    checkPoints,
    setCheckPoints,
    userProfiles,
    isAddModalOpen,
    setIsAddModalOpen,
    handleAddButtonClick,
    user,
    addNewCheckPoint,
  };
}
