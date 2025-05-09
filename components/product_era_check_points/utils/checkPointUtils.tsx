import Image from "next/image";
import { ProductEraCheckPoint } from "@/lib/types";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

export const showProductEraCheckPoint = (checkPoint: ProductEraCheckPoint) => {
  const toastId = toast(
    <div className="relative bg-white p-4 rounded-lg">
      <button
        onClick={() => toast.dismiss(toastId)}
        className="absolute top-0 right-0 p-1 rounded-full hover:bg-stone-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      {checkPoint.imageUrl && (
        <div className="relative h-48 w-full bg-stone-100 rounded-lg overflow-hidden mb-4">
          <Image
            src={checkPoint.imageUrl}
            alt={checkPoint.point}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      )}
      <h3 className="text-lg font-medium text-stone-800 mb-2">
        {checkPoint.point}
      </h3>
      <p className="text-sm text-stone-600">{checkPoint.description}</p>
    </div>,
    {
      duration: Infinity,
    },
  );

  return toastId;
};

export const deleteCheckPoint = async (checkPointId: number) => {
  try {
    const { error } = await supabase
      .from("product_era_check_points")
      .delete()
      .eq("id", checkPointId);

    if (error) {
      throw error;
    }

    toast.success("チェックポイントを削除しました");
    return true;
  } catch (error) {
    console.error("チェックポイント削除エラー:", error);
    toast.error("チェックポイントの削除に失敗しました");
    return false;
  }
};
