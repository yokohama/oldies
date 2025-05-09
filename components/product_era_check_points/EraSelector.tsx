"use client";

import { useEffect, useRef } from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { ProductEra } from "@/lib/types";

interface EraSelectorProps {
  productEras: ProductEra[];
  selectedEraIndex: number;
  onEraIndexChange: (index: number) => void;
}

const EraSelector = ({
  productEras: unsortedProductEras,
  selectedEraIndex,
  onEraIndexChange,
}: EraSelectorProps) => {
  // 製造開始年でソートした配列を作成
  const productEras = [...unsortedProductEras].sort(
    (a, b) => a.manufacturing_start_year - b.manufacturing_start_year,
  );

  const sliderRef = useRef<HTMLDivElement>(null);

  // 現在選択されているproduct_eraアイテム
  const currentEra = productEras[selectedEraIndex];

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

  // 表示する年代範囲（現在選択されているeraの製造期間）
  const startYear = currentEra?.manufacturing_start_year || 0;
  const endYear = currentEra?.manufacturing_end_year || 0;

  return (
    <div className="mb-6 border border-amber-500 rounded-lg p-2 bg-amber-100/80 shadow-sm">
      <div className="px-2 py-4 bg-[url('/vintage-paper-texture.png')] bg-opacity-30 rounded-md">
        <div className="text-center mb-3">
          <h1 className="text-4xl font-medium text-amber-900 font-playfair pb-1 drop-shadow-sm">
            {startYear} 〜 {endYear}&apos;s
          </h1>
        </div>
        <div ref={sliderRef} className="py-2">
          <SliderPrimitive.Root
            value={[selectedEraIndex]}
            min={0}
            max={productEras.length - 1}
            step={1}
            onValueChange={(value) => onEraIndexChange(value[0])}
            className="relative flex w-full touch-none select-none items-center h-10"
            aria-label="年代選択"
            data-draggable="true"
          >
            <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-amber-200/80">
              <SliderPrimitive.Range className="absolute h-full bg-amber-200/80" />
            </SliderPrimitive.Track>
            {/* 単一のつまみ - タッチ領域を拡大 */}
            <SliderPrimitive.Thumb
              className="block h-7 w-7 rounded-full border-2 border-amber-500 bg-amber-600 shadow-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-grab active:cursor-grabbing touch-manipulation"
              aria-label="年代選択"
              data-draggable="true"
            />
          </SliderPrimitive.Root>
        </div>
      </div>
    </div>
  );
};

export default EraSelector;
