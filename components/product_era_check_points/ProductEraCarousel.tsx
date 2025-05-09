"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ProductEra, ProductEraCheckPoint } from "@/lib/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast, Toaster } from "sonner";
import AddCheckPointModal from "./AddCheckPointModal";

interface ProductCarouselProps {
  productEras: ProductEra[];
  selectedEraIndex: number;
  onEraIndexChange?: (index: number) => void;
}

const ProductEraCarousel = ({
  productEras: unsortedProductEras,
  selectedEraIndex,
  onEraIndexChange,
}: ProductCarouselProps) => {
  // 製造開始年でソートした配列を作成
  const productEras = [...unsortedProductEras].sort(
    (a, b) => a.manufacturing_start_year - b.manufacturing_start_year,
  );

  const [api, setApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentProductEra, setCurrentProductEra] = useState<ProductEra | null>(
    productEras.length > 0 ? productEras[0] : null,
  );
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
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

    // スクロールの境界に達したときの処理
    const onDragEnd = () => {
      // 最後のスライドで右にスワイプしようとした場合
      if (currentIndex === productEras.length - 1) {
        // 最後のスライドに固定
        api.scrollTo(productEras.length - 1, true);
      }
      // 最初のスライドで左にスワイプしようとした場合
      else if (currentIndex === 0) {
        // 最初のスライドに固定
        api.scrollTo(0, true);
      }
    };

    api.on("select", onSelect);
    api.on("pointerUp", onDragEnd);
    // 初期化時に現在のインデックスを設定
    setCurrentIndex(api.selectedScrollSnap());

    return () => {
      api.off("select", onSelect);
      api.off("pointerUp", onDragEnd);
    };
  }, [api, productEras, onEraIndexChange, currentIndex]);

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

  const showProductEraCheckPoint = (checkPoint: ProductEraCheckPoint) => {
    const toastId = toast(
      <div className="relative bg-white p-4 rounded-lg">
        <button
          onClick={() => toast.dismiss(toastId)}
          className="absolute top-0 right-0 p-1 rounded-full hover:bg-stone-100"
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
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        {checkPoint.imageUrl && (
          <div className="relative h-48 w-full bg-stone-100 rounded-lg overflow-hidden mb-4">
            <Image
              src={checkPoint.imageUrl}
              alt={checkPoint.point}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        )}
        <h3 className="text-lg font-medium text-stone-800 mb-2">
          {checkPoint.point}
        </h3>
        <p className="text-sm text-stone-600">{checkPoint.description}</p>
      </div>,
      {
        duration: Infinity,
      },
    );
  };

  return (
    <div className="mb-10">
      <Toaster position="top-center" />

      {currentProductEra && (
        <AddCheckPointModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          productEraId={currentProductEra.id}
          onSuccess={() => {
            // データを再取得するためのコールバック
            window.location.reload();
          }}
        />
      )}

      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: false,
          dragFree: false,
          containScroll: "trimSnaps",
          skipSnaps: false,
        }}
        className="w-full relative"
      >
        {/* 左側（戻る）インジケーター */}
        <div
          className={`absolute top-[104px] left-2 z-10 flex flex-col gap-1.5 items-center animate-pulse ${currentIndex === 0 ? "hidden" : ""} cursor-pointer`}
          onClick={() => api?.scrollPrev()}
          role="button"
          aria-label="前のスライドへ"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-amber-500 transform rotate-180"
          >
            <path d="m9 18 6-6-6-6"></path>
          </svg>
        </div>

        {/* 右側（次へ）インジケーター */}
        <div
          className={`absolute top-[104px] right-2 z-10 flex flex-col gap-1.5 items-center animate-pulse ${currentIndex === productEras.length - 1 ? "hidden" : ""} cursor-pointer`}
          onClick={() => api?.scrollNext()}
          role="button"
          aria-label="次のスライドへ"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-amber-500"
          >
            <path d="m9 18 6-6-6-6"></path>
          </svg>
        </div>

        {/* カルーセルのナビゲーションインジケーター */}
        <div className="flex justify-center mt-4 gap-2">
          <div className="flex items-center gap-1.5 mx-2">
            {productEras.map((_, index) => (
              <div
                key={index}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${index === currentIndex
                    ? "bg-amber-600"
                    : "bg-stone-300 hover:bg-stone-400"
                  }`}
              />
            ))}
          </div>
        </div>

        <CarouselContent className="-ml-2 -mr-2">
          {productEras.map((productEra) => (
            <CarouselItem
              key={productEra.id}
              className="basis-full pl-1.5 pr-1.5 pt-3 pb-5"
            >
              <Card className="border-stone-200 overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative h-52 w-full bg-stone-100">
                    <Image
                      src={productEra.imageUrl}
                      alt={`製造年代: ${productEra.manufacturing_start_year}-${productEra.manufacturing_end_year}`}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    <span className="absolute top-2 right-2 bg-amber-100 text-amber-800 text-base px-3 py-1.5 rounded-full font-medium">
                      {productEra.manufacturing_start_year}-
                      {productEra.manufacturing_end_year}
                    </span>
                  </div>
                  <h3 className="text-sm font-normal text-stone-600 px-2 mt-2">
                    {currentProductEra?.description}
                  </h3>
                  <div className="mt-6">
                    <div className="flex justify-between items-center mb-3 px-2">
                      <h3 className="text-xl font-medium text-stone-800 font-playfair">
                        Check point
                      </h3>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs border-amber-200 text-amber-700 hover:bg-amber-50"
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
                      {productEra.checkPoints?.map((checkPoint) => (
                        <div
                          key={checkPoint.id}
                          className="bg-white border border-stone-200 rounded-lg overflow-hidden"
                          onClick={() => showProductEraCheckPoint(checkPoint)}
                        >
                          <div className="flex items-start p-3">
                            {checkPoint.imageUrl && (
                              <div className="relative h-16 w-16 mr-3 flex-shrink-0 bg-stone-100 rounded-md overflow-hidden">
                                <Image
                                  src={checkPoint.imageUrl}
                                  alt={checkPoint.point}
                                  fill
                                  className="object-cover"
                                  unoptimized
                                />
                              </div>
                            )}
                            <div className="flex-1">
                              <h4 className="text-sm font-medium text-stone-800 mb-1">
                                {checkPoint.point}
                              </h4>
                              <p className="text-xs text-stone-600">
                                {checkPoint.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-3 flex justify-between items-center"></CardFooter>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default ProductEraCarousel;
