"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Brand } from "@/lib/types";

interface BrandCardProps {
  brand: Brand;
}

const BrandCard = ({ brand }: BrandCardProps) => {
  const router = useRouter();

  const handleBrandClick = (brandId: number) => {
    router.push(`/brands/${brandId}/products`);
  };

  return (
    <div
      className="oldies-card-interactive"
      onClick={() => handleBrandClick(brand.id)}
    >
      <div className="h-48 overflow-hidden relative">
        <div className="absolute inset-0 border-b border-[var(--oldies-border-primary)] z-10"></div>
        <Image
          src={brand.imageUrl}
          alt={brand.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover sepia-[0.2] brightness-[0.95]"
        />
      </div>
      <div className="oldies-card-content">
        <h2 className="oldies-section-title">{brand.name}</h2>
        <div className="oldies-text-secondary font-light italic">
          {brand.description}
        </div>
      </div>
    </div>
  );
};

export default BrandCard;
