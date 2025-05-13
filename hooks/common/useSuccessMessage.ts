import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

interface UseSuccessMessageProps {
  paramName?: string; // クエリパラメータ名（デフォルト: "updated"）
  paramValue?: string; // 期待する値（デフォルト: "true"）
  duration?: number; // メッセージ表示時間（ミリ秒、デフォルト: 3000）
  message?: string; // 表示するメッセージ
}

export const useSuccessMessage = ({
  paramName = "updated",
  paramValue = "true",
  duration = 3000,
  message = "プロフィールを更新しました",
}: UseSuccessMessageProps = {}) => {
  const searchParams = useSearchParams();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    if (searchParams.get(paramName) === paramValue) {
      setShowSuccessMessage(true);

      // 指定時間後にメッセージを非表示にする
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [searchParams, paramName, paramValue, duration]);

  return {
    showSuccessMessage,
    message,
    setShowSuccessMessage,
  };
};
