"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";
import { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";

interface ProductCarouselProps {
  products: Product[];
}

const ProductCarousel = ({ products }: ProductCarouselProps) => {
  const carouselRef = useRef(null);

  const showProductInfo = (product: Product) => {
    toast(
      <div className="flex flex-col gap-2 relative">
        <button
          onClick={() => toast.dismiss()}
          className="absolute top-0 left-0 p-1 rounded-full hover:bg-stone-100"
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
        <h3 className="font-medium">{product.name}</h3>
        <p className="text-sm">{product.description}</p>
      </div>,
      {
        // カスタム閉じるボタンを使用するため、デフォルトの閉じるボタンは無効化
        closeButton: false,
      },
    );
  };

  return (
    <div className="mb-10">
      <h2 className="text-lg font-medium text-stone-800 mb-3 font-playfair">
        特徴と見分け方
      </h2>

      <Carousel
        ref={carouselRef}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem
              key={product.id}
              className="basis-full pl-1.5 pr-1.5 pt-3 pb-5"
            >
              <Card className="border-stone-200 overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative h-52 w-full bg-stone-100">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                    <span className="absolute top-2 right-2 bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full font-medium">
                      {product.manufacturing_start_year}-
                      {product.manufacturing_end_year}
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="p-3 flex justify-between items-center">
                  <div>
                    <h3 className="text-sm font-medium text-stone-800">
                      {product.name}
                    </h3>
                    <p className="text-xs text-stone-500"></p>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => showProductInfo(product)}
                  >
                    <Info className="h-4 w-4 text-stone-600" />
                  </Button>
                </CardFooter>
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

export default ProductCarousel;
