"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // セッションを取得
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          console.error("認証エラー:", error);
        } else {
          console.log(
            "認証成功:",
            data.session ? "セッションあり" : "セッションなし",
          );
        }
      } catch (err) {
        console.error("認証コールバック処理エラー:", err);
      } finally {
        // 処理が完了したらホームページにリダイレクト
        router.push("/");
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-lg">認証処理中...</p>
    </div>
  );
}
