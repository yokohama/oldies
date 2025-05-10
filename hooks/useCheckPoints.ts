import { useState } from "react";
import { API } from "@/lib/api";
import { ProductEraCheckPoint } from "@/lib/types";
import { toast } from "sonner";

interface UseCheckPointsReturn {
  addCheckPoint: (
    productEraId: number,
    point: string,
    file: File,
    description: string | null,
  ) => Promise<boolean>;
  deleteCheckPoint: (checkPointId: number) => Promise<boolean>;
  isSubmitting: boolean;
  uploadProgress: number;
}

export function useCheckPoints(): UseCheckPointsReturn {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const addCheckPoint = async (
    productEraId: number,
    point: string,
    file: File,
    description: string | null,
  ): Promise<boolean> => {
    setIsSubmitting(true);
    setUploadProgress(0);

    try {
      // ログインユーザーの取得
      const user = await API.getCurrentUser();

      if (!user) {
        toast.error("ログインが必要です");
        return false;
      }

      // アップロード開始時に進捗を設定
      setUploadProgress(10);

      // 画像をアップロードしてURLを取得
      const imageUrl = await API.uploadImage(file, user.id);

      // アップロード完了時に進捗を更新
      setUploadProgress(70);

      // チェックポイントの追加
      await API.addCheckPoint(
        productEraId,
        point,
        imageUrl,
        description,
        user.id,
      );

      setUploadProgress(100);
      toast.success("チェックポイントを追加しました");
      return true;
    } catch (error) {
      console.error("チェックポイントの追加に失敗しました:", error);
      toast.error("チェックポイントの追加に失敗しました");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteCheckPoint = async (checkPointId: number): Promise<boolean> => {
    try {
      await API.deleteCheckPoint(checkPointId);
      toast.success("チェックポイントを削除しました");
      return true;
    } catch (error) {
      console.error("チェックポイント削除エラー:", error);
      toast.error("チェックポイントの削除に失敗しました");
      return false;
    }
  };

  return {
    addCheckPoint,
    deleteCheckPoint,
    isSubmitting,
    uploadProgress,
  };
}
