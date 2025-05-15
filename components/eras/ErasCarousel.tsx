"use client";

import { useState } from "react";
import Image from "next/image";
import { ProductEra } from "@/lib/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Toaster } from "sonner";
import CheckPoints from "./CheckPoints";
import { useErasCarousel } from "@/hooks";

// 外部から使用するためのプロップス
interface ErasCarouselProps {
  productEras: ProductEra[];
}

const ErasCarousel = ({ productEras }: ErasCarouselProps) => {
  const [selectedEraIndex, setSelectedEraIndex] = useState(0);

  const handleEraIndexChange = (index: number) => {
    setSelectedEraIndex(index);
  };

  const {
    setApi,
    currentIndex,
    currentProductEra,
    handlePrevSlide,
    handleNextSlide,
  } = useErasCarousel({
    productEras,
    selectedEraIndex,
    onEraIndexChange: handleEraIndexChange,
  });

  return (
    <div>
      <Toaster position="top-center" />

      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
          dragFree: false,
          containScroll: "trimSnaps",
          skipSnaps: false,
        }}
        className="w-full relative mb-0"
      >
        {/* 左側（戻る）インジケーター */}
        <div
          className="absolute top-[104px] left-2 z-10 flex flex-col gap-1.5 items-center animate-pulse cursor-pointer"
          onClick={handlePrevSlide}
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
            className="oldies-text-accent transform rotate-180"
          >
            <path d="m9 18 6-6-6-6"></path>
          </svg>
        </div>

        {/* 右側（次へ）インジケーター */}
        <div
          className="absolute top-[104px] right-2 z-10 flex flex-col gap-1.5 items-center animate-pulse cursor-pointer"
          onClick={handleNextSlide}
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
            className="oldies-text-accent"
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
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  index === currentIndex
                    ? "bg-[var(--oldies-accent-primary)]"
                    : "bg-[var(--oldies-border-primary)] hover:bg-[var(--oldies-border-secondary)]"
                }`}
              />
            ))}
          </div>
        </div>

        <CarouselContent className="-ml-2 -mr-2">
          {productEras.map((productEra) => (
            <CarouselItem
              key={productEra.id}
              className="basis-full pl-1.5 pr-1.5 pt-3 pb-0"
            >
              <Card className="oldies-card overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative h-52 w-full oldies-bg-secondary">
                    <Image
                      src={productEra.imageUrl}
                      alt={`製造年代: ${productEra.manufacturing_start_year}-${productEra.manufacturing_end_year}`}
                      fill
                      className="object-cover sepia-[0.15] brightness-[0.98]"
                      unoptimized
                    />
                    <span className="absolute top-2 right-2 bg-[var(--oldies-bg-accent)] oldies-text-primary text-base px-3 py-1.5 rounded-full font-medium">
                      {productEra.manufacturing_start_year}-
                      {productEra.manufacturing_end_year}
                    </span>
                  </div>
                  <h3 className="text-sm oldies-text-secondary px-2 mt-2">
                    {currentProductEra?.description}
                  </h3>
                  <CheckPoints era={productEra} />
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

export default ErasCarousel;
