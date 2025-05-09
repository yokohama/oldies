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
      className="bg-[#f8f3e6] border border-[#d3c7a7] rounded-sm overflow-hidden relative transition-all duration-200 hover:shadow-[0_2px_8px_rgba(122,95,67,0.15)] cursor-pointer"
      onClick={() => showProductEraCheckPoint(checkPoint)}
    >
      {isOwnCheckPoint && onDelete && (
        <button
          onClick={handleDelete}
          className="absolute top-2 right-2 text-[#a85751] hover:text-[#8a3c37] transition-colors z-10"
          aria-label="削除"
        >
          <XCircle size={18} />
        </button>
      )}
      <div className="flex items-start p-3">
        {checkPoint.imageUrl && (
          <div className="relative h-16 w-16 mr-3 flex-shrink-0 bg-[#e5dcc3] rounded-sm overflow-hidden border border-[#d3c7a7]">
            <Image
              src={checkPoint.imageUrl}
              alt={checkPoint.point}
              fill
              className="object-cover sepia-[0.15] brightness-[0.98]"
              unoptimized
            />
          </div>
        )}
        <div className="flex-1">
          <h4 className="text-sm font-serif text-[#5c4d3c] mb-1 border-b border-[#d3c7a7] pb-1">
            {checkPoint.point}
          </h4>
          <p className="text-xs text-[#7a6b59] font-light italic">
            {checkPoint.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckPoint;
