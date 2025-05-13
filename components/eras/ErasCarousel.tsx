"use client";

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
import { useErasCarousel } from "@/hooks/era/useErasCarousel";

interface ErasCarouselProps {
  productEras: ProductEra[];
  selectedEraIndex: number;
  onEraIndexChange?: (index: number) => void;
}

const ErasCarousel = ({
  productEras,
  selectedEraIndex,
  onEraIndexChange,
}: ErasCarouselProps) => {
  const {
    sortedProductEras,
    setApi,
    currentIndex,
    currentProductEra,
    handlePrevSlide,
    handleNextSlide,
  } = useErasCarousel({
    productEras,
    selectedEraIndex,
    onEraIndexChange,
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
            className="text-amber-500 transform rotate-180"
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
            className="text-amber-500"
          >
            <path d="m9 18 6-6-6-6"></path>
          </svg>
        </div>

        {/* カルーセルのナビゲーションインジケーター */}
        <div className="flex justify-center mt-4 gap-2">
          <div className="flex items-center gap-1.5 mx-2">
            {sortedProductEras.map((_, index) => (
              <div
                key={index}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  index === currentIndex
                    ? "bg-amber-600"
                    : "bg-stone-300 hover:bg-stone-400"
                }`}
              />
            ))}
          </div>
        </div>

        <CarouselContent className="-ml-2 -mr-2">
          {sortedProductEras.map((productEra) => (
            <CarouselItem
              key={productEra.id}
              className="basis-full pl-1.5 pr-1.5 pt-3 pb-0"
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
