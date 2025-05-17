import Image from "next/image";
import { Suspense } from "react";
import type { Metadata } from "next";
import { baseMetadata, generateCheckPointMetadata } from "@/lib/metadata";
import { getCheckpointData } from "@/lib/server/checkPointsServer";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import PageTitle from "@/components/ui/PageTitle";
import Spinner from "@/components/ui/Spinner";
import Error from "@/components/ui/Error";
import NotFound from "@/components/ui/NotFound";

// 動的メタデータの生成
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const checkPointId = parseInt(params.id, 10);
  const { checkPoint } = await getCheckpointData(checkPointId);

  if (!checkPoint) {
    return {
      ...baseMetadata,
    };
  }

  return generateCheckPointMetadata(checkPoint);
}

export default async function CheckPointPage({
  params,
}: {
  params: { id: string };
}) {
  // サーバーサイドでデータを取得（React Cacheによって同じリクエストは再利用される）
  const checkPointId = parseInt(params.id, 10);
  const { checkPoint, error } = await getCheckpointData(checkPointId);

  return (
    <main className="min-h-screen oldies-bg-primary">
      <div className="oldies-container">
        <Header />
        <PageTitle title={`${checkPoint?.era.product.name}の鑑定ポイント`} />
        <Suspense fallback={<Spinner />}>
          {error ? (
            <Error label="ブランド一覧に戻る" returnUrl="/brands" />
          ) : !checkPoint ? (
            <NotFound text="鑑定ポイントが見つかりませんでした。" />
          ) : (
            <div className="oldies-card flex flex-col h-full">
              <div className="flex flex-col items-center p-5 flex-grow">
                <div className="text-center text-xl font-light w-full max-w-2xl text-gray-700 dark:text-gray-300 pb-5">
                  {`${checkPoint.era.manufacturing_start_year} 〜 ${checkPoint.era.manufacturing_end_year}の${checkPoint.point}の特徴`}
                </div>
                {checkPoint.imageUrl && (
                  <div className="relative h-80 w-80 mb-6 oldies-bg-accent rounded-md overflow-hidden oldies-border">
                    <Image
                      src={checkPoint.imageUrl}
                      alt={checkPoint.point}
                      fill
                      sizes="(max-width: 768px) 100vw, 320px"
                      className="object-cover sepia-[0.15] brightness-[0.98]"
                      priority={true}
                    />
                  </div>
                )}
                <div className="text-center w-full max-w-2xl text-gray-700 dark:text-gray-300">
                  <p className="font-light italic">{checkPoint.description}</p>
                </div>
              </div>
            </div>
          )}
        </Suspense>
        <Footer />
      </div>
    </main>
  );
}
