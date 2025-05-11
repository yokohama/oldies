import { useState, useEffect } from "react";
import { UserProfile } from "@/lib/types";
import { API } from "@/lib/api";

interface UseUserProfileProps {
  userId: string | null;
}

export const useUserProfile = ({ userId }: UseUserProfileProps) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        // lib/api.tsのAPIクラスを使用してユーザー情報を取得
        const userData = await API.getUserProfile(userId as string);

        if (!userData) {
          throw new Error("ユーザーが見つかりません");
        }

        setUser(userData);
      } catch (err) {
        console.error("プロフィール取得エラー:", err);
        setError("ユーザー情報を読み込めませんでした");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserProfile();
    } else {
      setLoading(false);
      setError("ユーザーIDが指定されていません");
    }
  }, [userId]);

  return { user, loading, error };
};
