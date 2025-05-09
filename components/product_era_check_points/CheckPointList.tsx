"use client";

import { useState } from "react";
import { ProductEraCheckPoint } from "@/lib/types";
import { Button } from "@/components/ui/button";
import AddCheckPointModal from "./AddCheckPointModal";
import CheckPoint from "./CheckPoint";
import {
  showProductEraCheckPoint,
  deleteCheckPoint,
} from "./utils/checkPointUtils";
import { useAuth } from "@/contexts/AuthContext";

interface CheckPointListProps {
  checkPoints: ProductEraCheckPoint[];
  productEraId: number;
}

const CheckPointList = ({ checkPoints, productEraId }: CheckPointListProps) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [localCheckPoints, setLocalCheckPoints] =
    useState<ProductEraCheckPoint[]>(checkPoints);
  const { user } = useAuth();

  const handleDeleteCheckPoint = async (checkPoint: ProductEraCheckPoint) => {
    if (window.confirm("このチェックポイントを削除してもよろしいですか？")) {
      const success = await deleteCheckPoint(checkPoint.id);
      if (success) {
        // ローカルの状態を更新して、UIを即座に反映
        setLocalCheckPoints((prev) =>
          prev.filter((cp) => cp.id !== checkPoint.id),
        );
      }
    }
  };

  return (
    <>
      <AddCheckPointModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        productEraId={productEraId}
        onSuccess={() => {
          // データを再取得するためのコールバック
          window.location.reload();
        }}
      />

      <div className="mt-6 bg-white rounded-sm p-4 shadow-sm">
        <div className="flex justify-between items-center mb-3 px-2">
          <h3 className="text-xl font-serif text-[#5c4d3c] relative inline-block pb-1">
            Check point
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#d3c7a7]"></div>
          </h3>
          <Button
            variant="outline"
            size="sm"
            className="text-xs border-[#d3c7a7] text-[#7a6b59] hover:bg-[#f9f6f0] hover:border-[#b8a88a] transition-colors"
            onClick={() => setIsAddModalOpen(true)}
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
              className="mr-1"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            追加
          </Button>
        </div>
        <div className="space-y-4 px-2">
          {localCheckPoints && localCheckPoints.length > 0 ? (
            localCheckPoints.map((checkPoint) => (
              <CheckPoint
                key={checkPoint.id}
                checkPoint={checkPoint}
                showProductEraCheckPoint={showProductEraCheckPoint}
                isOwnCheckPoint={user?.id === checkPoint.userId}
                onDelete={handleDeleteCheckPoint}
              />
            ))
          ) : (
            <div className="text-center py-6 border border-dashed border-[#d3c7a7] rounded-sm bg-[#f9f6f0]">
              <p className="text-[#7a6b59] font-serif italic">
                チェックポイントがまだありません。
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CheckPointList;
