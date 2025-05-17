import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import type { Metadata } from "next";
import { baseMetadata, generateCheckpointsMetadata } from "@/lib/metadata";
import { getCheckpointsData } from "@/lib/server/checkPointsServer";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import PageTitle from "@/components/ui/PageTitle";
import Spinner from "@/components/ui/Spinner";
import Error from "@/components/ui/Error";
import NotFound from "@/components/ui/NotFound";
import { siteUrls } from "@/lib/config/siteConfig";

// 動的メタデータの生成
export async function generateMetadata(): Promise<Metadata> {
  const { checkPoints } = await getCheckpointsData();

  if (!checkPoints) {
    return {
      ...baseMetadata,
    };
  }

  return generateCheckpointsMetadata();
}

export default async function CheckPointsPage() {
  // サーバーサイドでデータを取得（React Cacheによって同じリクエストは再利用される）
  const { checkPoints, error } = await getCheckpointsData();

  return (
    <main className="min-h-screen oldies-bg-primary">
      <div className="oldies-container">
        <Header />
        <PageTitle title={"鑑定ポイント一覧"} />
        <Suspense fallback={<Spinner />}>
          {error ? (
            <Error label="ブランド一覧に戻る" returnUrl="/brands" />
          ) : checkPoints?.length == 0 || !checkPoints ? (
            <NotFound text="鑑定ポイントが見つかりませんでした。" />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {checkPoints.map((checkPoint) => (
                <Link
                  key={checkPoint.id}
                  href={siteUrls.checkpoint(checkPoint.id)}
                >
                  <div className="oldies-card cursor-pointer flex flex-col h-full">
                    <div className="flex items-start p-3 flex-grow">
                      {checkPoint.imageUrl && (
                        <div className="relative h-16 w-16 mr-3 flex-shrink-0 oldies-bg-accent rounded-sm overflow-hidden oldies-border">
                          <Image
                            src={checkPoint.imageUrl}
                            alt={checkPoint.point}
                            fill
                            sizes="(max-width: 768px) 100vw, 64px"
                            className="object-cover sepia-[0.15] brightness-[0.98]"
                            priority={true}
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <h4 className="oldies-card-header">
                          {checkPoint.point}
                        </h4>
                        <p className="text-xs oldies-text-secondary font-light italic">
                          {checkPoint.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </Suspense>
        <Footer />
      </div>
    </main>
  );
}
