import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

interface UseProfileRedirectProps {
  redirectUnauthorized?: boolean; // 未認証ユーザーをリダイレクトするかどうか
  redirectOnSuccess?: boolean; // 成功時にリダイレクトするかどうか
  success?: boolean; // 成功状態
  redirectPath?: string; // 未認証時のリダイレクト先（デフォルト: "/"）
}

export const useProfileRedirect = ({
  redirectUnauthorized = true,
  redirectOnSuccess = false,
  success = false,
  redirectPath = "/",
}: UseProfileRedirectProps = {}) => {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  // 未ログイン状態の場合はリダイレクト
  useEffect(() => {
    if (!authLoading && !user && redirectUnauthorized) {
      router.push(redirectPath);
    }
  }, [authLoading, user, router, redirectUnauthorized, redirectPath]);

  // 保存成功時にプロフィールページに遷移
  useEffect(() => {
    if (success && user && redirectOnSuccess) {
      // クエリパラメータを追加して成功メッセージを表示するフラグを渡す
      router.push(`/profile/${user.id}?updated=true`);
    }
  }, [success, user, router, redirectOnSuccess]);

  return {
    isAuthenticated: !!user && !authLoading,
    isLoading: authLoading,
    user,
  };
};
