"use client";

import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import * as SliderPrimitive from "@radix-ui/react-slider";

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
  const sliderRef = useRef<HTMLDivElement>(null);

  // スライダーのドラッグ操作を改善するためのタッチイベント処理
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    // タッチイベントのデフォルト動作を防止して、スクロールではなくスライダー操作を優先
    const preventScroll = (e: TouchEvent) => {
      e.preventDefault();
    };

    slider.addEventListener("touchmove", preventScroll, { passive: false });

    return () => {
      slider.removeEventListener("touchmove", preventScroll);
    };
  }, []);

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
          <span>{1900 + selectedEra + rangeValue[0]}</span>
          <span>{1900 + selectedEra + rangeValue[1]}</span>
        </div>
        <div ref={sliderRef} className="py-2">
          <SliderPrimitive.Root
            value={rangeValue}
            min={0}
            max={9}
            step={1}
            onValueChange={setRangeValue}
            className="relative flex w-full touch-none select-none items-center h-10"
            aria-label="年代範囲"
            data-draggable="true"
          >
            <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-stone-200">
              <SliderPrimitive.Range className="absolute h-full bg-amber-700" />
            </SliderPrimitive.Track>
            {/* 開始位置のつまみ - タッチ領域を拡大 */}
            <SliderPrimitive.Thumb
              className="block h-7 w-7 rounded-full border-2 border-amber-700 bg-white ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-grab active:cursor-grabbing touch-manipulation"
              aria-label="開始年"
              data-draggable="true"
            />
            {/* 終了位置のつまみ - タッチ領域を拡大 */}
            <SliderPrimitive.Thumb
              className="block h-7 w-7 rounded-full border-2 border-amber-700 bg-white ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-grab active:cursor-grabbing touch-manipulation"
              aria-label="終了年"
              data-draggable="true"
            />
          </SliderPrimitive.Root>
        </div>
      </div>
    </div>
  );
};

export default EraSelector;
