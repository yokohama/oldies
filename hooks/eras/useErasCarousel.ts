import { useState, useEffect } from "react";
import { ProductEra } from "@/lib/types";
import { type CarouselApi } from "@/components/ui/carousel";

interface UseProductEraCarouselProps {
  productEras: ProductEra[];
  selectedEraIndex: number;
  onEraIndexChange?: (index: number) => void;
}

interface UseProductEraCarouselReturn {
  setApi: (api: CarouselApi | undefined) => void;
  currentIndex: number;
  currentProductEra: ProductEra | null;
  handlePrevSlide: () => void;
  handleNextSlide: () => void;
}

export function useErasCarousel({
  productEras,
  selectedEraIndex,
  onEraIndexChange,
}: UseProductEraCarouselProps): UseProductEraCarouselReturn {
  const [api, setApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentProductEra, setCurrentProductEra] = useState<ProductEra | null>(
    productEras.length > 0 ? productEras[0] : null,
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
        productEras.length > 0 &&
        newIndex >= 0 &&
        newIndex < productEras.length
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
  }, [api, productEras, onEraIndexChange]);

  // 現在の製品時代を更新
  useEffect(() => {
    if (
      productEras.length > 0 &&
      currentIndex >= 0 &&
      currentIndex < productEras.length
    ) {
      setCurrentProductEra(productEras[currentIndex]);
    }
  }, [currentIndex, productEras]);

  // 選択したインデックスに基づいて適切なカードにスクロールする
  useEffect(() => {
    if (!api || productEras.length === 0) return;

    // 選択されたインデックスが現在のインデックスと異なる場合、スクロールする
    if (selectedEraIndex !== currentIndex) {
      api.scrollTo(selectedEraIndex, true);
    }
  }, [selectedEraIndex, productEras, api, currentIndex]);

  // ナビゲーション関数
  const handlePrevSlide = () => api?.scrollPrev();
  const handleNextSlide = () => api?.scrollNext();

  return {
    setApi,
    currentIndex,
    currentProductEra,
    handlePrevSlide,
    handleNextSlide,
  };
}
