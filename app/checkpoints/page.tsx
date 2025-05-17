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
        <PageTitle title={"チェックポイント一覧"} />
        <Suspense fallback={<Spinner />}>
          {error ? (
            <Error label="ブランド一覧に戻る" returnUrl="/brands" />
          ) : checkPoints?.length == 0 || !checkPoints ? (
            <NotFound text="チェックポイントが見つかりませんでした。" />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {checkPoints.map((cp) => (
                <div key={cp.id}>{cp.id}</div>
              ))}
            </div>
          )}
        </Suspense>
        <Footer />
      </div>
    </main>
  );
}
