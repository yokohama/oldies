import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { baseMetadata, generateProfileMetadata } from "@/lib/metadata";
import { getProfileData } from "@/lib/server/profileServer";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import Spinner from "@/components/ui/Spinner";
import Error from "@/components/ui/Error";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileCheckPoints from "@/components/profile/ProfileCheckPoints";

// 動的メタデータの生成
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { user, error } = await getProfileData(params.id);

  // ユーザーが見つからない場合は基本メタデータを返す
  if (!user || error) {
    return {
      ...baseMetadata,
      title: "ユーザーが見つかりません",
      description:
        "指定されたユーザーは存在しないか、削除された可能性があります。",
    };
  }

  // ユーザープロフィールに基づいたメタデータを生成
  return generateProfileMetadata(user);
}

export default async function UserProfilePage({
  params,
}: {
  params: { id: string };
}) {
  // サーバーサイドでデータを取得
  const { user, error } = await getProfileData(params.id);

  // ユーザーが見つからない場合は404ページを表示
  if (!user && error === "ユーザーが見つかりませんでした") {
    notFound();
  }

  return (
    <main className="min-h-screen oldies-bg-primary">
      <Suspense fallback={<Spinner />}>
        {error || !user ? (
          <Error />
        ) : (
          <div className="container mx-auto py-12 px-4 bg-transparent">
            <Header />
            <div className="max-w-4xl mx-auto">
              {/* プロフィールヘッダー */}
              <ProfileHeader user={user} />

              {/* ユーザーのチェックポイント一覧 */}
              <div className="mt-8">
                <ProfileCheckPoints userId={params.id} userProfile={user} />
              </div>
            </div>
            <Footer />
          </div>
        )}
      </Suspense>
    </main>
  );
}
