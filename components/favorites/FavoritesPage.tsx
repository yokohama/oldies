"use client";

import { useLikedCheckPoints } from "@/hooks";
import { useAuth } from "@/contexts/AuthContext";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Header from "../ui/Header";
import Footer from "../ui/Footer";
import Spinner from "../ui/Spinner";
import Error from "../ui/Error";
import NotFound from "../ui/NotFound";

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
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 bg-[#f9f6f0]">
        <Header />
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif text-[#5c4d3c] mb-2">
            お気に入りチェックポイント
          </h1>
          <div className="w-24 h-1 bg-[#d3c7a7] mx-auto"></div>
        </div>
        <div className="text-center py-10 border-2 border-dashed border-[#d3c7a7] rounded-md">
          <Heart className="h-16 w-16 text-[#d3c7a7] mx-auto mb-4" />
          <p className="text-lg text-[#7a6b59] italic mb-6">
            お気に入りを表示するにはログインしてください。
          </p>
          <Link
            href="/"
            className="px-6 py-2 bg-[#7a6b59] text-white rounded-sm hover:bg-[#5c4d3c] transition-colors"
          >
            ホームに戻る
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 bg-[#f9f6f0]">
        <Header />
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif text-[#5c4d3c] mb-2">
            お気に入りチェックポイント
          </h1>
          <div className="w-24 h-1 bg-[#d3c7a7] mx-auto"></div>
          <Spinner size="lg" />
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 bg-[#f9f6f0]">
        <Header />
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif text-[#5c4d3c] mb-2">
            お気に入りチェックポイント
          </h1>
          <div className="w-24 h-1 bg-[#d3c7a7] mx-auto"></div>
        </div>
        <Error />
        <Footer />
      </div>
    );
  }

  if (likedCheckPoints.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 bg-[#f9f6f0]">
        <Header />
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif text-[#5c4d3c] mb-2">
            お気に入りチェックポイント
          </h1>
          <div className="w-24 h-1 bg-[#d3c7a7] mx-auto"></div>
        </div>
        <div className="text-center py-10 border-2 border-dashed border-[#d3c7a7] rounded-md">
          <Heart className="h-16 w-16 text-[#d3c7a7] mx-auto mb-4" />
          <NotFound text="お気に入りはありません。チェックポイントにいいねを追加すると、ここに表示されます。" />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 bg-[#f9f6f0]">
      <Header />
      <div className="text-center mb-8">
        <h1 className="text-3xl font-serif text-[#5c4d3c] mb-2">
          お気に入りチェックポイント
        </h1>
        <div className="w-24 h-1 bg-[#d3c7a7] mx-auto"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {likedCheckPoints.map((checkPoint) => (
          <div
            key={checkPoint.id}
            className="bg-[#f8f3e6] border-2 border-[#d3c7a7] rounded-sm overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_20px_rgba(122,95,67,0.3)]"
          >
            <div className="h-48 overflow-hidden relative">
              <div className="absolute inset-0 border-b-2 border-[#d3c7a7] z-10"></div>
              <Image
                src={checkPoint.imageUrl}
                alt={checkPoint.point}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover sepia-[0.2] brightness-[0.95]"
              />
              <button
                onClick={() => handleUnlike(checkPoint.id)}
                disabled={removingId === checkPoint.id}
                className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors z-20"
              >
                <Heart
                  className={`h-5 w-5 ${
                    removingId === checkPoint.id
                      ? "text-[#d3c7a7]"
                      : "text-[#7a6b59] fill-[#7a6b59]"
                  }`}
                />
              </button>
            </div>
            <div className="p-5">
              <h2 className="text-xl font-serif text-[#5c4d3c] mb-2 border-b border-[#d3c7a7] pb-2">
                {checkPoint.point}
              </h2>
              <p className="text-[#7a6b59] font-light mb-2">
                {checkPoint.productEra?.manufacturing_start_year}年 -{" "}
                {checkPoint.productEra?.manufacturing_end_year}年
              </p>
              {checkPoint.productEra?.product && (
                <Link
                  href={`/product/${checkPoint.productEra.product.id}`}
                  className="text-[#7a6b59] hover:text-[#5c4d3c] text-sm font-medium block mb-2"
                >
                  {checkPoint.productEra.product.brand?.name} -{" "}
                  {checkPoint.productEra.product.name}
                </Link>
              )}
              {checkPoint.description && (
                <div className="text-[#7a6b59] font-light italic line-clamp-2">
                  {checkPoint.description}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default FavoritesPage;
