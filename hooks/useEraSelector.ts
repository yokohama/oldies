import { useEffect, useRef } from "react";
import { ProductEra } from "@/lib/types";

interface UseEraSelectorProps {
  productEras: ProductEra[];
  selectedEraIndex: number;
  onEraIndexChange: (index: number) => void;
}

interface UseEraSelectorReturn {
  sortedProductEras: ProductEra[];
  sliderRef: React.RefObject<HTMLDivElement>;
  currentEra: ProductEra | undefined;
  startYear: number;
  endYear: number;
  handleValueChange: (value: number[]) => void;
}

export function useEraSelector({
  productEras: unsortedProductEras,
  selectedEraIndex,
  onEraIndexChange,
}: UseEraSelectorProps): UseEraSelectorReturn {
  // 製造開始年でソートした配列を作成
  const sortedProductEras = [...unsortedProductEras].sort(
    (a, b) => a.manufacturing_start_year - b.manufacturing_start_year,
  );

  const sliderRef = useRef<HTMLDivElement>(null);

  // 現在選択されているproduct_eraアイテム
  const currentEra = sortedProductEras[selectedEraIndex];

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

  // スライダーの値が変更されたときのハンドラー
  const handleValueChange = (value: number[]) => {
    onEraIndexChange(value[0]);
  };

  return {
    sortedProductEras,
    sliderRef,
    currentEra,
    startYear,
    endYear,
    handleValueChange,
  };
}
