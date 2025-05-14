"use client";

import { useProfileCheckPoints } from "@/hooks";
import CheckPoint from "../eras/CheckPoint";
import { UserProfile } from "@/lib/types";
import { useAuth } from "@/contexts/AuthContext";
import { showProductEraCheckPoint as toastShowProductEraCheckPoint } from "../eras/CheckPointToast";

interface ProfileCheckPointsProps {
  userId: string;
  userProfile: UserProfile;
}

const ProfileCheckPoints = ({
  userId,
  userProfile,
}: ProfileCheckPointsProps) => {
  const { user } = useAuth();
  const { checkPoints, setCheckPoints, loading, error } = useProfileCheckPoints(
    { userId },
  );

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

      {loading ? (
        <div className="text-center py-8">
          <p className="text-sm text-[#7a6b59]">読み込み中...</p>
        </div>
      ) : error ? (
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
