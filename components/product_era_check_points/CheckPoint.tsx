"use client";

import Image from "next/image";
import { ProductEraCheckPoint } from "@/lib/types";
import { XCircle } from "lucide-react";

interface CheckPointProps {
  checkPoint: ProductEraCheckPoint;
  showProductEraCheckPoint: (checkPoint: ProductEraCheckPoint) => void;
  isOwnCheckPoint?: boolean;
  onDelete?: (checkPoint: ProductEraCheckPoint) => void;
}

const CheckPoint = ({
  checkPoint,
  showProductEraCheckPoint,
  isOwnCheckPoint = false,
  onDelete,
}: CheckPointProps) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(checkPoint);
    }
  };

  return (
    <div
      className="bg-white border border-stone-200 rounded-lg overflow-hidden relative"
      onClick={() => showProductEraCheckPoint(checkPoint)}
    >
      {isOwnCheckPoint && onDelete && (
        <button
          onClick={handleDelete}
          className="absolute top-2 right-2 text-stone-500 hover:text-red-500 transition-colors z-10"
          aria-label="削除"
        >
          <XCircle size={18} />
        </button>
      )}
      <div className="flex items-start p-3">
        {checkPoint.imageUrl && (
          <div className="relative h-16 w-16 mr-3 flex-shrink-0 bg-stone-100 rounded-md overflow-hidden">
            <Image
              src={checkPoint.imageUrl}
              alt={checkPoint.point}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        )}
        <div className="flex-1">
          <h4 className="text-sm font-medium text-stone-800 mb-1">
            {checkPoint.point}
          </h4>
          <p className="text-xs text-stone-600">{checkPoint.description}</p>
        </div>
      </div>
    </div>
  );
};

export default CheckPoint;
