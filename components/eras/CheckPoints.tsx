"use client";
import { EraType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import AddCheckPointModal from "./AddCheckPointModal";
import CheckPoint from "./CheckPoint";
import { useCheckPoints } from "@/hooks";
import NotFound from "../ui/NotFound";
import { siteConfig } from "@/lib/config/siteConfig";

interface CheckPointsProps {
  era: EraType;
}

const CheckPoints = ({ era }: CheckPointsProps) => {
  const {
    userProfiles,
    checkPoints,
    setCheckPoints,
    isAddModalOpen,
    setIsAddModalOpen,
    handleAddButtonClick,
    user,
    addNewCheckPoint,
  } = useCheckPoints(era.checkPoints || []);

  return (
    <div>
      <AddCheckPointModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        eraId={era.id}
        onSuccess={(newCheckPoint) => {
          // 新しい鑑定ポイントを状態に追加
          addNewCheckPoint(newCheckPoint);
          setIsAddModalOpen(false);
        }}
      />

      <div className="mt-6 rounded-sm p-4 shadow-sm">
        <div className="flex justify-between items-center mb-3 px-2">
          <h3 className="oldies-section-title relative inline-block pb-1">
            Check point
          </h3>
          <Button
            variant="default"
            size="sm"
            className="bg-amber-600 hover:bg-amber-700 text-white text-xs"
            onClick={handleAddButtonClick}
          >
            <svg
              xmlns={siteConfig.svg.xmlns}
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
          {checkPoints && checkPoints.length == 0 ? (
            <NotFound text="鑑定ポイントがまだありません。" />
          ) : (
            checkPoints.map((checkPoint) => (
              <CheckPoint
                key={checkPoint.id}
                checkPoint={checkPoint}
                setCheckPoints={setCheckPoints}
                isOwnCheckPoint={user?.id === checkPoint.userId}
                userProfile={
                  checkPoint.userId
                    ? userProfiles[checkPoint.userId]
                    : undefined
                }
              />
            ))
          )}
        </div>
      </div>
      <div className="mt-4 text-center">
        <span className="inline-block bg-[var(--oldies-bg-accent)] oldies-text-primary text-sm px-3 py-1.5 rounded-full font-medium">
          {era.manufacturing_start_year}〜{era.manufacturing_end_year}
        </span>
      </div>
    </div>
  );
};

export default CheckPoints;
