"use client";

import Image from "next/image";
import { ProductEraCheckPoint } from "@/lib/types";
import { toast } from "sonner";
import { siteConfig } from "@/lib/config/siteConfig";
import { Brand, Product } from "@/lib/types";

export const showProductEraCheckPoint = (
  brand: Brand,
  product: Product,
  checkPoint: ProductEraCheckPoint,
) => {
  const toastId = toast(
    <div className="relative oldies-bg-primary p-4 rounded-lg oldies-border">
      <button
        onClick={() => toast.dismiss(toastId)}
        className="absolute top-0 right-0 p-1 rounded-full hover:oldies-bg-secondary"
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
          className="oldies-text-secondary"
        >
          <line x1="18" y1="6" x2="6" y2="18">
            {" "}
          </line>
          <line x1="6" y1="6" x2="18" y2="18">
            {" "}
          </line>
        </svg>
      </button>
      {checkPoint.imageUrl && (
        <div className="relative h-48 w-full oldies-bg-secondary rounded-lg overflow-hidden mb-4 oldies-border">
          <Image
            src={checkPoint.imageUrl}
            alt={`${checkPoint.point} - ${product.name} - ${brand.name} | ヴィンテージアパレル| 時代の特徴ポイント | ${siteConfig.name}`}
            fill
            className="object-cover sepia-[0.15] brightness-[0.98]"
            unoptimized
          />
        </div>
      )}
      <h3 className="text-lg font-medium oldies-text-primary mb-2 font-serif">
        {checkPoint.point}
      </h3>
      <p className="text-sm oldies-text-secondary">
        {" "}
        {checkPoint.description}{" "}
      </p>
    </div>,
    {
      duration: Infinity,
    },
  );

  return toastId;
};
