"use client";

import CheckPoint from "../eras/CheckPoint";
import { UserProfile, ProductEraCheckPoint } from "@/lib/types";
import { useAuth } from "@/contexts/AuthContext";
import { showProductEraCheckPoint as toastShowProductEraCheckPoint } from "../eras/CheckPointToast";
import { useState } from "react";

interface ProfileCheckPointsProps {
  userId: string;
  userProfile: UserProfile;
  initialCheckPoints: ProductEraCheckPoint[];
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
    useState<ProductEraCheckPoint[]>(initialCheckPoints);
  const [error] = useState<string | null>(initialError);

  const isOwnProfile = user?.id === userId;

  return (
    <>
      <h2 className="text-xl font-serif text-[#5c4d3c] mb-4 border-b border-[#d3c7a7] pb-2">
        {isOwnProfile ? (
          <p>投稿したチェックポイント</p>
        ) : (
          <p>{userProfile.name}さんのチェックポイント</p>
        )}
      </h2>

      {error ? (
        <div className="text-center py-8">
          <p className="text-sm text-[#7a6b59]">エラーが発生しました</p>
        </div>
      ) : checkPoints.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-sm text-[#7a6b59]">
            投稿したチェックポイントはありません。
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {checkPoints.map((checkPoint) => (
            <CheckPoint
              key={checkPoint.id}
              brand={checkPoint.brand}
              product={checkPoint.product}
              checkPoint={checkPoint}
              setCheckPoints={setCheckPoints}
              showProductEraCheckPoint={toastShowProductEraCheckPoint}
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
