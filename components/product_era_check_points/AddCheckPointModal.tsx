"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import Image from "next/image";
import { Upload, X } from "lucide-react";

interface AddCheckPointModalProps {
  isOpen: boolean;
  onClose: () => void;
  productEraId: number;
  onSuccess: () => void;
}

const AddCheckPointModal = ({
  isOpen,
  onClose,
  productEraId,
  onSuccess,
}: AddCheckPointModalProps) => {
  const router = useRouter();
  const [point, setPoint] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const uploadImageToSupabase = async (
    file: File,
    userId: string,
  ): Promise<string> => {
    try {
      // ファイル名の一意性を確保するためにタイムスタンプとランダム文字列を追加
      const fileExt = file.name.split(".").pop();
      const fileName = `${userId}_${Date.now()}_${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `product_era_check_points/${fileName}`;

      // アップロード開始時に進捗を0%に設定
      setUploadProgress(0);

      // Supabaseにアップロード
      const { data, error } = await supabase.storage
        .from("images")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      // アップロード完了時に進捗を100%に設定
      setUploadProgress(100);

      if (error) {
        console.error("アップロードエラー:", error);
        throw error;
      }

      // 公開URLを取得
      const {
        data: { publicUrl },
      } = supabase.storage.from("images").getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error("画像アップロードエラー:", error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!point.trim()) {
      toast.error("チェックポイントを入力してください");
      return;
    }

    if (!selectedFile) {
      toast.error("画像をアップロードしてください");
      return;
    }

    setIsSubmitting(true);
    setUploadProgress(0);

    try {
      // ログインユーザーの取得
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        toast.error("ログインが必要です");
        router.push("/login");
        return;
      }

      // 画像をアップロードしてURLを取得
      const imageUrl = await uploadImageToSupabase(selectedFile, user.id);

      // チェックポイントの追加
      const { data, error } = await supabase
        .from("product_era_check_points")
        .insert({
          product_era_id: productEraId,
          point: point,
          image_url: imageUrl,
          description: description || null,
          user_id: user.id,
        })
        .select();

      if (error) {
        console.error("エラー詳細:", error);
        throw error;
      }

      toast.success("チェックポイントを追加しました");
      setPoint("");
      setDescription("");
      setSelectedFile(null);
      setPreviewUrl(null);
      setUploadProgress(0);
      onSuccess();
      onClose();
    } catch (error) {
      console.error("チェックポイントの追加に失敗しました:", error);
      toast.error("チェックポイントの追加に失敗しました");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white border border-[#d3c7a7] shadow-[0_4px_12px_rgba(122,95,67,0.15)]">
        <DialogHeader>
          <DialogTitle className="text-[#5c4d3c] font-serif text-xl relative inline-block pb-2">
            Check point
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#d3c7a7]"></div>
          </DialogTitle>
          <DialogDescription className="text-[#7a6b59] font-light italic">
            あなたの製品の特徴や見分け方のポイントを追加してください。
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="items-center">
              <Input
                id="point"
                value={point}
                onChange={(e) => setPoint(e.target.value)}
                className="col-span-3 border-[#d3c7a7] focus-visible:ring-[#e5dcc3] focus-visible:ring-opacity-50 bg-[#f9f6f0] text-[#5c4d3c]"
                placeholder="ポイント"
                required
              />
            </div>
            <div className="items-start">
              <div className="col-span-3 space-y-3">
                {!previewUrl ? (
                  <div className="flex flex-col gap-2">
                    <div
                      className="border-2 border-dashed border-[#d3c7a7] rounded-sm p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-[#f9f6f0] transition-colors bg-[#f8f3e6]"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="h-8 w-8 text-[#7a6b59] mb-2" />
                      <p className="text-sm font-serif text-[#5c4d3c]">
                        クリックして画像をアップロード
                      </p>
                      <p className="text-xs text-[#7a6b59] mt-1 italic">
                        JPG, PNG, GIF (最大5MB)
                      </p>
                    </div>
                    <Input
                      ref={fileInputRef}
                      id="imageUpload"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>
                ) : (
                  <div className="relative">
                    <div className="relative aspect-video w-full overflow-hidden rounded-sm border border-[#d3c7a7] bg-[#e5dcc3]">
                      <Image
                        src={previewUrl}
                        alt="プレビュー"
                        fill
                        className="object-cover sepia-[0.15] brightness-[0.98]"
                        unoptimized
                      />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-white border-[#d3c7a7] hover:bg-[#f9f6f0]"
                      onClick={handleRemoveFile}
                    >
                      <X className="h-4 w-4 text-[#a85751]" />
                      <span className="sr-only">削除</span>
                    </Button>
                    {isSubmitting && (
                      <div className="mt-2">
                        <div className="h-2 w-full bg-[#f8f3e6] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#b8a88a] transition-all duration-300 ease-in-out"
                            style={{ width: `${uploadProgress}%` }}
                          />
                        </div>
                        <p className="text-xs text-[#7a6b59] mt-1 text-right italic">
                          {uploadProgress}%
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="items-center">
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="col-span-3 border-[#d3c7a7] focus-visible:ring-[#e5dcc3] focus-visible:ring-opacity-50 bg-[#f9f6f0] text-[#5c4d3c]"
                rows={4}
                placeholder="説明"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-[#d3c7a7] text-[#7a6b59] hover:bg-[#f9f6f0] hover:text-[#5c4d3c] font-serif"
            >
              キャンセル
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#7a6b59] text-white hover:bg-[#5c4d3c] font-serif"
            >
              {isSubmitting ? "送信中..." : "追加"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCheckPointModal;
