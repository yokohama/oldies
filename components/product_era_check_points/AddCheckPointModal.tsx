"use client";

import { useState } from "react";
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
  const [imageUrl, setImageUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!point.trim()) {
      toast.error("チェックポイントを入力してください");
      return;
    }

    if (!imageUrl.trim()) {
      toast.error("画像URLを入力してください");
      return;
    }

    setIsSubmitting(true);

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
        throw error;
      }

      toast.success("チェックポイントを追加しました");
      setPoint("");
      setDescription("");
      setImageUrl("");
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>チェックポイントを追加</DialogTitle>
          <DialogDescription>
            製品の特徴や見分け方のポイントを追加してください。
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="point" className="text-right">
                ポイント
              </Label>
              <Input
                id="point"
                value={point}
                onChange={(e) => setPoint(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="imageUrl" className="text-right">
                画像URL
              </Label>
              <Input
                id="imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                説明
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="col-span-3"
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              キャンセル
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "送信中..." : "追加"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCheckPointModal;
