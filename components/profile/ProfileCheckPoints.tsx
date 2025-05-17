"use client";

import CheckPoint from "@/components/eras/CheckPoint";
import { UserProfileType, CheckPointType } from "@/lib/types";
import { useAuth } from "@/contexts/AuthContext";
import { showCheckPoint } from "@/components/eras/CheckPointToast";
import { useState, useEffect } from "react";
import { useUserCheckPoints } from "@/hooks/checkPoint/useUserCheckPoints";
import Spinner from "../ui/Spinner";

interface ProfileCheckPointsProps {
  userId: string;
  userProfile: UserProfileType;
  initialCheckPoints: CheckPointType[];
  initialError?: string | null;
}

const ProfileCheckPoints = ({
  userId,
  userProfile,
  initialCheckPoints,
  initialError = null,
}: ProfileCheckPointsProps) => {
  const { user } = useAuth();
  const [checkPoints, setCheckPoints] =
    useState<CheckPointType[]>(initialCheckPoints);
  const [error, setError] = useState<string | null>(initialError);

  // useUserCheckPointsフックを使用して最新のデータを取得
  const {
    checkPoints: latestCheckPoints,
    loading,
    error: fetchError,
  } = useUserCheckPoints(userId);

  // 最新のデータが取得できたら状態を更新
  useEffect(() => {
    if (latestCheckPoints.length > 0) {
      setCheckPoints(latestCheckPoints);
    }
    if (fetchError) {
      setError(fetchError);
    }
  }, [latestCheckPoints, fetchError]);

  const isOwnProfile = user?.id === userId;

  return (
    <>
      <h2 className="text-xl font-serif text-[#5c4d3c] mb-4 border-b border-[#d3c7a7] pb-2">
        {isOwnProfile ? (
          <p>投稿した鑑定ポイント</p>
        ) : (
          <p>{userProfile.name}さんの鑑定ポイント</p>
        )}
      </h2>

      {error ? (
        <div className="text-center py-8">
          <p className="text-sm text-[#7a6b59]">エラーが発生しました</p>
        </div>
      ) : loading && checkPoints.length === 0 ? (
        <Spinner />
      ) : checkPoints.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-sm text-[#7a6b59]">
            投稿した鑑定ポイントはありません。
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {checkPoints.map((checkPoint) => (
            <CheckPoint
              key={checkPoint.id}
              checkPoint={checkPoint}
              setCheckPoints={setCheckPoints}
              showCheckPoint={showCheckPoint}
              isOwnCheckPoint={isOwnProfile}
              userProfile={userProfile}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default ProfileCheckPoints;
