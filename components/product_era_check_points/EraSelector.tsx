"use client";

import * as SliderPrimitive from "@radix-ui/react-slider";
import { ProductEra } from "@/lib/types";
import { useEraSelector } from "@/hooks/useEraSelector";

interface EraSelectorProps {
  productEras: ProductEra[];
  selectedEraIndex: number;
  onEraIndexChange: (index: number) => void;
}

const EraSelector = ({
  productEras,
  selectedEraIndex,
  onEraIndexChange,
}: EraSelectorProps) => {
  // カスタムフックを使用してスライダーのロジックを分離
  const {
    sortedProductEras,
    sliderRef,
    startYear,
    endYear,
    handleValueChange,
  } = useEraSelector({
    productEras,
    selectedEraIndex,
    onEraIndexChange,
  });

  return (
    <div className="mb-6 border-2 border-[#d3c7a7] rounded-sm p-3 bg-[#f8f3e6] shadow-[0_4px_12px_rgba(122,95,67,0.15)]">
      <div className="text-center mb-4">
        <h1 className="text-4xl font-serif text-[#5c4d3c] pb-2 drop-shadow-sm relative inline-block">
          {startYear} 〜 {endYear}&apos;s
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#d3c7a7]"></div>
        </h1>
      </div>
      <div ref={sliderRef} className="py-3 px-2">
        <SliderPrimitive.Root
          value={[selectedEraIndex]}
          min={0}
          max={sortedProductEras.length - 1}
          step={1}
          onValueChange={handleValueChange}
          className="relative flex w-full touch-none select-none items-center h-12"
          aria-label="年代選択"
          data-draggable="true"
        >
          <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden bg-[#e5dcc3]">
            <SliderPrimitive.Range className="absolute h-full bg-[#b8a88a]" />
          </SliderPrimitive.Track>
          {/* 単一のつまみ - タッチ領域を拡大 */}
          <SliderPrimitive.Thumb
            className="block h-8 w-8 rounded-full border-2 border-[#7a6b59] bg-[#5c4d3c] shadow-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d3c7a7] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-grab active:cursor-grabbing touch-manipulation"
            aria-label="年代選択"
            data-draggable="true"
          />
        </SliderPrimitive.Root>
        <div className="flex justify-between mt-2 text-[#7a6b59] font-serif text-sm italic">
          <span>{sortedProductEras[0]?.manufacturing_start_year || ""}</span>
          <span>
            {sortedProductEras[sortedProductEras.length - 1]
              ?.manufacturing_end_year || ""}
          </span>
        </div>
      </div>
    </div>
  );
};

export default EraSelector;
