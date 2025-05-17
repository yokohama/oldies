import { useState, useEffect } from "react";
import { Era } from "@/lib/types";
import { type CarouselApi } from "@/components/ui/carousel";

interface UseProductEraCarouselProps {
  eras: Era[];
  selectedEraIndex: number;
  onEraIndexChange?: (index: number) => void;
}

interface UseProductEraCarouselReturn {
  setApi: (api: CarouselApi | undefined) => void;
  currentIndex: number;
  currentProductEra: Era | null;
  handlePrevSlide: () => void;
  handleNextSlide: () => void;
}

export function useErasCarousel({
  eras,
  selectedEraIndex,
  onEraIndexChange,
}: UseProductEraCarouselProps): UseProductEraCarouselReturn {
  const [api, setApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentProductEra, setCurrentProductEra] = useState<Era | null>(
    eras.length > 0 ? eras[0] : null,
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
      if (eras.length > 0 && newIndex >= 0 && newIndex < eras.length) {
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
  }, [api, eras, onEraIndexChange]);

  // 現在の製品時代を更新
  useEffect(() => {
    if (eras.length > 0 && currentIndex >= 0 && currentIndex < eras.length) {
      setCurrentProductEra(eras[currentIndex]);
    }
  }, [currentIndex, eras]);

  // 選択したインデックスに基づいて適切なカードにスクロールする
  useEffect(() => {
    if (!api || eras.length === 0) return;

    // 選択されたインデックスが現在のインデックスと異なる場合、スクロールする
    if (selectedEraIndex !== currentIndex) {
      api.scrollTo(selectedEraIndex, true);
    }
  }, [selectedEraIndex, eras, api, currentIndex]);

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
