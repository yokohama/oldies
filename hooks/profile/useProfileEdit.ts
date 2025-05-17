import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useProfileContext } from "@/contexts/ProfileContext";
import { UserProfileType } from "@/lib/types";
import { API } from "@/lib/api";
import { supabase } from "@/lib/supabase";

export const useProfileEdit = () => {
  const { user } = useAuth();
  const { updateProfile } = useProfileContext();
  const [profile, setProfile] = useState<UserProfileType | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // フォーム用の状態
  const [name, setName] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [twitterUrl, setTwitterUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [facebookUrl, setFacebookUrl] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) {
        setLoading(false);
        setError("ログインが必要です");
        return;
      }

      try {
        setLoading(true);
        const userData = await API.getUserProfile(user.id);

        if (!userData) {
          throw new Error("プロフィールが見つかりません");
        }

        setProfile(userData);
        setName(userData.name || "");

        // URLフィールドの初期値を設定
        if (userData.websiteUrl) setWebsiteUrl(userData.websiteUrl);
        if (userData.twitterUrl) setTwitterUrl(userData.twitterUrl);
        if (userData.instagramUrl) setInstagramUrl(userData.instagramUrl);
        if (userData.facebookUrl) setFacebookUrl(userData.facebookUrl);
        if (userData.youtubeUrl) setYoutubeUrl(userData.youtubeUrl);
      } catch (err) {
        console.error("プロフィール取得エラー:", err);
        setError("プロフィール情報を読み込めませんでした");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [user]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleWebsiteUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWebsiteUrl(e.target.value);
  };

  const handleTwitterUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTwitterUrl(e.target.value);
  };

  const handleInstagramUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInstagramUrl(e.target.value);
  };

  const handleFacebookUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFacebookUrl(e.target.value);
  };

  const handleYoutubeUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYoutubeUrl(e.target.value);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);

      // プレビュー用のURL生成
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      setError("ログインが必要です");
      return;
    }

    try {
      setSaving(true);
      setError(null);
      setSuccess(false);

      // プロフィール情報の更新
      let avatarUrl = profile?.avatarUrl || null;

      // アバター画像がアップロードされた場合
      if (avatarFile) {
        avatarUrl = await API.uploadImage(avatarFile, user.id, "avatars");
      }

      // Supabaseのprofilesテーブルを更新
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          full_name: name,
          avatar_url: avatarUrl,
          website_url: websiteUrl || null,
          twitter_url: twitterUrl || null,
          instagram_url: instagramUrl || null,
          facebook_url: facebookUrl || null,
          youtube_url: youtubeUrl || null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (updateError) {
        console.error("Supabase更新エラー:", updateError);
        throw updateError;
      }

      console.log("プロフィール更新完了:", {
        website_url: websiteUrl || null,
        twitter_url: twitterUrl || null,
        instagram_url: instagramUrl || null,
        facebook_url: facebookUrl || null,
        youtube_url: youtubeUrl || null,
      });

      // 成功メッセージを表示
      setSuccess(true);

      // プロフィール情報を再取得して表示を更新
      const updatedProfile = await API.getUserProfile(user.id);
      if (updatedProfile) {
        setProfile(updatedProfile);
        // グローバルコンテキストを更新して他のコンポーネントに通知
        updateProfile(updatedProfile);
      }
    } catch (err) {
      console.error("プロフィール更新エラー:", err);
      setError("プロフィールの更新に失敗しました");
    } finally {
      setSaving(false);
    }
  };

  return {
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
  };
};
