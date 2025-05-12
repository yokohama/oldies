"use client";

import { useLikedCheckPoints } from "@/hooks/useLikedCheckPoints";
import { useAuth } from "@/contexts/AuthContext";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const FavoritesPage = () => {
  const { likedCheckPoints, isLoading, error, unlikeCheckPoint } =
    useLikedCheckPoints();
  const { user } = useAuth();
  const [removingId, setRemovingId] = useState<number | null>(null);

  const handleUnlike = async (checkPointId: number) => {
    try {
      setRemovingId(checkPointId);
      await unlikeCheckPoint(checkPointId);
    } catch (err) {
      console.error("いいねの削除に失敗しました", err);
    } finally {
      setRemovingId(null);
    }
  };

  if (!user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6">
        <Heart className="h-16 w-16 text-amber-300 mb-4" />
        <h1 className="text-2xl font-bold text-amber-800 mb-2">お気に入り</h1>
        <p className="text-stone-600 mb-6 text-center">
          お気に入りを表示するにはログインしてください。
        </p>
        <Link
          href="/"
          className="px-6 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
        >
          ホームに戻る
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-16 w-16 bg-amber-200 rounded-full mb-4"></div>
          <div className="h-6 w-48 bg-amber-200 rounded mb-4"></div>
          <div className="h-4 w-64 bg-amber-100 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6">
        <Heart className="h-16 w-16 text-red-400 mb-4" />
        <h1 className="text-2xl font-bold text-amber-800 mb-2">
          エラーが発生しました
        </h1>
        <p className="text-stone-600 mb-6 text-center">{error.message}</p>
        <Link
          href="/"
          className="px-6 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
        >
          ホームに戻る
        </Link>
      </div>
    );
  }

  if (likedCheckPoints.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6">
        <Heart className="h-16 w-16 text-amber-300 mb-4" />
        <h1 className="text-2xl font-bold text-amber-800 mb-2">
          お気に入りはありません
        </h1>
        <p className="text-stone-600 mb-6 text-center">
          チェックポイントにいいねを追加すると、ここに表示されます。
        </p>
        <Link
          href="/"
          className="px-6 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
        >
          ホームに戻る
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Heart className="h-6 w-6 text-amber-600 mr-2" />
        <h1 className="text-2xl font-bold text-amber-800 font-playfair">
          お気に入りチェックポイント
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {likedCheckPoints.map((checkPoint) => (
          <div
            key={checkPoint.id}
            className="bg-[#f9f6f0] rounded-lg overflow-hidden shadow-md border border-amber-100 hover:shadow-lg transition-shadow"
          >
            <div className="relative h-64 w-full">
              <Image
                src={checkPoint.imageUrl}
                alt={checkPoint.point}
                fill
                className="object-cover sepia-[0.15]"
              />
              <button
                onClick={() => handleUnlike(checkPoint.id)}
                disabled={removingId === checkPoint.id}
                className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
              >
                <Heart
                  className={`h-5 w-5 ${removingId === checkPoint.id
                      ? "text-amber-300"
                      : "text-amber-600 fill-amber-600"
                    }`}
                />
              </button>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-amber-800 mb-1">
                {checkPoint.point}
              </h3>
              <p className="text-sm text-stone-600 mb-3">
                {checkPoint.productEra?.manufacturing_start_year}年 -{" "}
                {checkPoint.productEra?.manufacturing_end_year}年
              </p>
              {checkPoint.productEra?.product && (
                <Link
                  href={`/product/${checkPoint.productEra.product.id}`}
                  className="text-amber-600 hover:text-amber-700 text-sm font-medium flex items-center"
                >
                  {checkPoint.productEra.product.brand?.name} -{" "}
                  {checkPoint.productEra.product.name}
                </Link>
              )}
              {checkPoint.description && (
                <p className="text-sm text-stone-600 mt-2 line-clamp-2">
                  {checkPoint.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
