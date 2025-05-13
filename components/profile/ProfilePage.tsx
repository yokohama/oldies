"use client";

import Header from "../ui/Header";
import Footer from "../ui/Footer";
import { useProfile } from "@/hooks/profile/useProfile";
import { useSuccessMessage } from "@/hooks/common/useSuccessMessage";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileCheckPoints from "@/components/profile/ProfileCheckPoints";
import ProfileLoading from "@/components/profile/ProfileLoading";
import ProfileError from "@/components/profile/ProfileError";

interface ProfilePageProps {
  userId: string;
}

const ProfilePage = ({ userId }: ProfilePageProps) => {
  const { user, loading, error } = useProfile({ userId });
  const { showSuccessMessage, message } = useSuccessMessage({
    message: "プロフィールを更新しました",
  });

  if (loading) {
    return <ProfileLoading />;
  }

  if (error || !user) {
    return <ProfileError error={error} />;
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <Header />
      <div className="max-w-4xl mx-auto">
        {/* 成功メッセージ */}
        {showSuccessMessage && (
          <div className="bg-[#e5f0e5] border border-[#c1d8c1] text-[#3c5c3c] p-3 rounded-md mb-4 animate-fadeIn">
            {message}
          </div>
        )}

        {/* プロフィールヘッダー */}
        <ProfileHeader user={user} />

        {/* ユーザーのチェックポイント一覧 */}
        <div className="mt-8">
          <ProfileCheckPoints userId={user.id} userProfile={user} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
