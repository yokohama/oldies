import { useState, useRef } from "react";
import { toast } from "sonner";
import { useCheckPoints } from "@/hooks/useCheckPoints";

interface UseCheckPointFormReturn {
  point: string;
  setPoint: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  selectedFile: File | null;
  previewUrl: string | null;
  fileInputRef: React.RefObject<HTMLInputElement>;
  isSubmitting: boolean;
  uploadProgress: number;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveFile: () => void;
  handleSubmit: (
    e: React.FormEvent,
    productEraId: number,
    onSuccess: () => void,
    onClose: () => void,
  ) => Promise<void>;
}

export function useCheckPointForm(): UseCheckPointFormReturn {
  const [point, setPoint] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // チェックポイント追加のカスタムフックを使用
  const { addCheckPoint, isSubmitting, uploadProgress } = useCheckPoints();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // ファイルサイズチェック (5MB以下)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("ファイルサイズは5MB以下にしてください");
      return;
    }

    // 画像ファイルのみ許可
    if (!file.type.startsWith("image/")) {
      toast.error("画像ファイルのみアップロードできます");
      return;
    }

    setSelectedFile(file);

    // プレビュー用のURL生成
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (
    e: React.FormEvent,
    productEraId: number,
    onSuccess: () => void,
    onClose: () => void,
  ) => {
    e.preventDefault();

    if (!point.trim()) {
      toast.error("チェックポイントを入力してください");
      return;
    }

    if (!selectedFile) {
      toast.error("画像をアップロードしてください");
      return;
    }

    // カスタムフックのaddCheckPoint関数を使用
    const success = await addCheckPoint(
      productEraId,
      point,
      selectedFile,
      description || null,
    );

    if (success) {
      setPoint("");
      setDescription("");
      setSelectedFile(null);
      setPreviewUrl(null);
      onSuccess();
      onClose();
    }
  };

  return {
    point,
    setPoint,
    description,
    setDescription,
    selectedFile,
    previewUrl,
    fileInputRef,
    isSubmitting,
    uploadProgress,
    handleFileChange,
    handleRemoveFile,
    handleSubmit,
  };
}
