"use client";

import { useState } from "react";
import { useUserCheckPoints } from "@/hooks/useUserCheckPoints";
import CheckPoint from "../product_era_check_points/CheckPoint";
import { ProductEraCheckPoint, UserProfile } from "@/lib/types";
import { useAuth } from "@/contexts/AuthContext";

interface ProfileCheckPointsProps {
  userId: string;
  userProfile: UserProfile;
}

const ProfileCheckPoints = ({
  userId,
  userProfile,
}: ProfileCheckPointsProps) => {
  const { user } = useAuth();
  const { checkPoints, loading, error } = useUserCheckPoints(userId);
  const [selectedCheckPoint, setSelectedCheckPoint] =
    useState<ProductEraCheckPoint | null>(null);

  // 現在のユーザーが投稿者と同じかどうかを確認
  const isOwnProfile = user?.id === userId;

  // チェックポイントの詳細表示
  const showProductEraCheckPoint = (checkPoint: ProductEraCheckPoint) => {
    setSelectedCheckPoint(checkPoint);
    // ここで詳細表示のモーダルを表示する処理を追加することも可能
    // 現在はコンソールログのみ
    console.log("チェックポイント詳細:", checkPoint);
  };

  // チェックポイント削除処理
  const handleDeleteCheckPoint = async (checkPoint: ProductEraCheckPoint) => {
    if (!confirm("このチェックポイントを削除してもよろしいですか？")) {
      return;
    }

    try {
      // ここで削除APIを呼び出す
      // 成功したら、チェックポイントリストから削除
      const updatedCheckPoints = checkPoints.filter(
        (cp) => cp.id !== checkPoint.id,
      );
      // setCheckPoints(updatedCheckPoints); // 実際のAPIと連携する場合はこちらを使用
    } catch (error) {
      console.error("チェックポイントの削除に失敗しました:", error);
    }
  };

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
          <p className="text-sm text-[#7a6b59]">
            エラーが発生しました: {error}
          </p>
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
              showProductEraCheckPoint={showProductEraCheckPoint}
              isOwnCheckPoint={isOwnProfile}
              onDelete={isOwnProfile ? handleDeleteCheckPoint : undefined}
              userProfile={userProfile}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default ProfileCheckPoints;
