"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ProductEra, ProductEraCheckPoint } from "@/lib/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { toast, Toaster } from "sonner";

interface ProductCarouselProps {
  productEras: ProductEra[];
}

const ProductEraCarousel = ({ productEras }: ProductCarouselProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentProductEra, setCurrentProductEra] = useState<ProductEra | null>(
    productEras.length > 0 ? productEras[0] : null,
  );

  useEffect(() => {
    if (!api) {
      return;
    }

    const onSelect = () => {
      setCurrentIndex(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    // 初期化時に現在のインデックスを設定
    setCurrentIndex(api.selectedScrollSnap());

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  useEffect(() => {
    if (
      productEras.length > 0 &&
      currentIndex >= 0 &&
      currentIndex < productEras.length
    ) {
      setCurrentProductEra(productEras[currentIndex]);
    }
  }, [currentIndex, productEras]);

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

      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
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
                    />
                    <span className="absolute top-2 right-2 bg-amber-100 text-amber-800 text-base px-3 py-1.5 rounded-full font-medium">
                      {productEra.manufacturing_start_year}-
                      {productEra.manufacturing_end_year}
                    </span>
                  </div>
                  <h3 className="text-sm font-medium text-stone-800 px-2">
                    {currentProductEra?.description}
                  </h3>
                  <div className="mt-6">
                    <h3 className="text-md font-medium text-stone-800 mb-3 px-2">
                      チェックポイント
                    </h3>
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

        <div className="flex justify-center mt-2 gap-2">
          <CarouselPrevious variant="ghost" size="icon" className="static" />
          <CarouselNext variant="ghost" size="icon" className="static" />
        </div>
      </Carousel>
    </div>
  );
};

export default ProductEraCarousel;
