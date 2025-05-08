"use client";

import { Dispatch, SetStateAction } from "react";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";

interface EraSelectorProps {
  selectedEra: number;
  onEraChange: (era: number) => void;
  rangeValue: number[];
  setRangeValue: Dispatch<SetStateAction<number[]>>;
}

const eras = [40, 50, 60, 70, 80, 90];

const EraSelector = ({
  selectedEra,
  onEraChange,
  rangeValue,
  setRangeValue,
}: EraSelectorProps) => {
  return (
    <div className="mb-6 border border-stone-200 rounded-lg p-2 bg-white">
      <div className="grid grid-cols-6 gap-1 mb-5">
        {eras.map((era) => (
          <button
            key={era}
            onClick={() => onEraChange(era)}
            className={cn(
              "py-2 text-center text-sm font-medium rounded-md transition-all duration-200",
              selectedEra === era
                ? "bg-amber-700 text-white shadow-sm"
                : "bg-stone-100 text-stone-700 hover:bg-stone-200",
            )}
          >
            {era}
          </button>
        ))}
      </div>

      <div className="px-2 py-4">
        <div className="flex justify-between text-xs text-stone-500 mb-1">
          <span>{1900 + selectedEra}</span>
          <span>{1900 + selectedEra + 9}</span>
        </div>
        <Slider
          value={rangeValue}
          min={0}
          max={9}
          step={1}
          onValueChange={setRangeValue}
          className="mt-2"
        />
      </div>
    </div>
  );
};

export default EraSelector;
