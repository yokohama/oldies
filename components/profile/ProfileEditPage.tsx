"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect } from "react";
import Header from "../ui/Header";
import Footer from "../ui/Footer";
import Spinner from "../ui/Spinner";
import Error from "../ui/Error";
import { useProfileEdit, useProfileRedirect } from "@/hooks";
import { useAuth } from "@/contexts/AuthContext";

const ProfileEditPage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const {
    profile,
    loading,
    saving,
    error,
    success,
    name,
    avatarPreview,
    websiteUrl,
    twitterUrl,
    instagramUrl,
    facebookUrl,
    youtubeUrl,
    handleNameChange,
    handleAvatarChange,
    handleWebsiteUrlChange,
    handleTwitterUrlChange,
    handleInstagramUrlChange,
    handleFacebookUrlChange,
    handleYoutubeUrlChange,
    handleSubmit,
  } = useProfileEdit();

  const { isLoading: authLoading } = useProfileRedirect();

  // 保存成功後にプロフィールページにリダイレクト
  useEffect(() => {
    if (success && user) {
      router.push(`/profile/${user.id}?updated=true`);
    }
  }, [success, router, user]);

  if (authLoading || loading) {
    return <Spinner />;
  }

  if (error || !profile) {
    return <Error />;
  }

  return (
    <div className="container mx-auto py-12 px-4 bg-transparent">
      <Header />
      <div className="max-w-2xl mx-auto">
        <div className="bg-[#f8f3e6] border border-[#d3c7a7] rounded-md p-6 mb-8">
          <h1 className="text-2xl font-serif text-[#5c4d3c] mb-6 border-b border-[#d3c7a7] pb-2">
            プロフィール編集
          </h1>

          {success && (
            <div className="bg-[#e5f0e5] border border-[#c1d8c1] text-[#3c5c3c] p-3 rounded-md mb-4">
              プロフィールを更新しました。プロフィールページに移動します...
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="avatar"
                className="block text-sm font-medium text-[#5c4d3c] mb-2"
              >
                プロフィール画像
              </label>
              <div className="flex items-center space-x-4">
                <div className="relative h-24 w-24 rounded-full overflow-hidden border-2 border-[#d3c7a7]">
                  <Image
                    src={
                      avatarPreview ||
                      profile.avatarUrl ||
                      `https://api.dicebear.com/7.x/initials/svg?seed=${profile.id}`
                    }
                    alt={name}
                    fill
                    sizes="(max-width: 768px) 100vw, 96px"
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div>
                  <input
                    type="file"
                    id="avatar"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="avatar"
                    className="inline-block bg-[#e5dcc3] hover:bg-[#d3c7a7] text-[#5c4d3c] text-sm px-4 py-2 rounded-md cursor-pointer transition-colors"
                  >
                    画像を選択
                  </label>
                  <p className="text-xs text-[#7a6b59] mt-1">
                    JPG、PNG、GIF形式（最大2MB）
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-[#5c4d3c] mb-2"
              >
                表示名
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={handleNameChange}
                className="w-full px-3 py-2 border border-[#d3c7a7] rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-[#a85751]"
                placeholder="表示名を入力"
                required
              />
            </div>

            <div className="mb-6 space-y-4">
              <h2 className="text-lg font-medium text-[#5c4d3c] border-b border-[#d3c7a7] pb-2">
                SNSリンク
              </h2>

              <div>
                <label
                  htmlFor="websiteUrl"
                  className="block text-sm text-[#5c4d3c] mb-1"
                >
                  ウェブサイト
                </label>
                <input
                  type="url"
                  id="websiteUrl"
                  value={websiteUrl}
                  onChange={handleWebsiteUrlChange}
                  className="w-full px-3 py-2 border border-[#d3c7a7] rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-[#a85751]"
                  placeholder="https://example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="twitterUrl"
                  className="block text-sm text-[#5c4d3c] mb-1"
                >
                  Twitter
                </label>
                <input
                  type="url"
                  id="twitterUrl"
                  value={twitterUrl}
                  onChange={handleTwitterUrlChange}
                  className="w-full px-3 py-2 border border-[#d3c7a7] rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-[#a85751]"
                  placeholder="https://twitter.com/username"
                />
              </div>

              <div>
                <label
                  htmlFor="instagramUrl"
                  className="block text-sm text-[#5c4d3c] mb-1"
                >
                  Instagram
                </label>
                <input
                  type="url"
                  id="instagramUrl"
                  value={instagramUrl}
                  onChange={handleInstagramUrlChange}
                  className="w-full px-3 py-2 border border-[#d3c7a7] rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-[#a85751]"
                  placeholder="https://instagram.com/username"
                />
              </div>

              <div>
                <label
                  htmlFor="facebookUrl"
                  className="block text-sm text-[#5c4d3c] mb-1"
                >
                  Facebook
                </label>
                <input
                  type="url"
                  id="facebookUrl"
                  value={facebookUrl}
                  onChange={handleFacebookUrlChange}
                  className="w-full px-3 py-2 border border-[#d3c7a7] rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-[#a85751]"
                  placeholder="https://facebook.com/username"
                />
              </div>

              <div>
                <label
                  htmlFor="youtubeUrl"
                  className="block text-sm text-[#5c4d3c] mb-1"
                >
                  YouTube
                </label>
                <input
                  type="url"
                  id="youtubeUrl"
                  value={youtubeUrl}
                  onChange={handleYoutubeUrlChange}
                  className="w-full px-3 py-2 border border-[#d3c7a7] rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-[#a85751]"
                  placeholder="https://youtube.com/c/channelname"
                />
              </div>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => router.back()}
                className="bg-[#e5dcc3] hover:bg-[#d3c7a7] text-[#5c4d3c] px-4 py-2 rounded-md transition-colors"
              >
                キャンセル
              </button>
              <button
                type="submit"
                disabled={saving || success}
                className={`bg-[#a85751] hover:bg-[#8a3c37] text-white px-6 py-2 rounded-md transition-colors ${
                  saving || success ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {saving ? "保存中..." : success ? "保存完了" : "保存する"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfileEditPage;
