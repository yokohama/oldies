import { useState, useEffect } from "react";
import { ProductEra } from "@/lib/types";
import { type CarouselApi } from "@/components/ui/carousel";

interface UseProductEraCarouselProps {
  productEras: ProductEra[];
  selectedEraIndex: number;
  onEraIndexChange?: (index: number) => void;
}

interface UseProductEraCarouselReturn {
  sortedProductEras: ProductEra[];
  api: CarouselApi | undefined;
  setApi: (api: CarouselApi | undefined) => void;
  currentIndex: number;
  currentProductEra: ProductEra | null;
  handlePrevSlide: () => void;
  handleNextSlide: () => void;
}

export function useProductEraCarousel({
  productEras: unsortedProductEras,
  selectedEraIndex,
  onEraIndexChange,
}: UseProductEraCarouselProps): UseProductEraCarouselReturn {
  // 製造開始年でソートした配列を作成
  const sortedProductEras = [...unsortedProductEras].sort(
    (a, b) => a.manufacturing_start_year - b.manufacturing_start_year,
  );

  const [api, setApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentProductEra, setCurrentProductEra] = useState<ProductEra | null>(
    sortedProductEras.length > 0 ? sortedProductEras[0] : null,
  );

  // カルーセルAPIのイベントハンドリング
  useEffect(() => {
    if (!api) {
      return;
    }

    const onSelect = () => {
      const newIndex = api.selectedScrollSnap();
      setCurrentIndex(newIndex);

      // カルーセルの選択が変わったらスライダーの値も更新する
      if (
        sortedProductEras.length > 0 &&
        newIndex >= 0 &&
        newIndex < sortedProductEras.length
      ) {
        // 親コンポーネントに選択したインデックスを通知
        if (onEraIndexChange) {
          onEraIndexChange(newIndex);
        }
      }
    };

    api.on("select", onSelect);
    // 初期化時に現在のインデックスを設定
    setCurrentIndex(api.selectedScrollSnap());

    return () => {
      api.off("select", onSelect);
    };
  }, [api, sortedProductEras, onEraIndexChange]);

  // 現在の製品時代を更新
  useEffect(() => {
    if (
      sortedProductEras.length > 0 &&
      currentIndex >= 0 &&
      currentIndex < sortedProductEras.length
    ) {
      setCurrentProductEra(sortedProductEras[currentIndex]);
    }
  }, [currentIndex, sortedProductEras]);

  // 選択したインデックスに基づいて適切なカードにスクロールする
  useEffect(() => {
    if (!api || sortedProductEras.length === 0) return;

    // 選択されたインデックスが現在のインデックスと異なる場合、スクロールする
    if (selectedEraIndex !== currentIndex) {
      api.scrollTo(selectedEraIndex, true);
    }
  }, [selectedEraIndex, sortedProductEras, api, currentIndex]);

  // ナビゲーション関数
  const handlePrevSlide = () => api?.scrollPrev();
  const handleNextSlide = () => api?.scrollNext();

  return {
    sortedProductEras,
    api,
    setApi,
    currentIndex,
    currentProductEra,
    handlePrevSlide,
    handleNextSlide,
  };
}
