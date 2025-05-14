"use client";

import { useProducts } from "@/hooks";
import Header from "../ui/Header";
import Footer from "../ui/Footer";
import PageTitle from "../ui/PageTitle";
import Link from "next/link";
import Image from "next/image";
import Spinner from "../ui/Spinner";
import Error from "../ui/Error";
import NotFound from "../ui/NotFound";

const ProductsPage = () => {
  const { brand, products, loading, error } = useProducts();

  return (
    <div className="oldies-container">
      <Header />
      <PageTitle title={brand?.name || "ブランド詳細"} />

      {loading ? (
        <Spinner size="lg" />
      ) : error ? (
        <Error label="ブランド一覧に戻る" returnUrl="/brands" />
      ) : products.length === 0 ? (
        <div className="text-center py-10 oldies-border-dashed rounded-md">
          <NotFound text="このブランドの年代情報が見つかりませんでした。" />
          <Link
            href="/brands"
            className="mt-4 inline-block oldies-text-primary hover:oldies-text-secondary border-b border-[var(--oldies-border-primary)] font-serif"
          >
            ブランド一覧に戻る
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Link
              href={`/brands/${brand?.id}/products/${product.id}/eras`}
              key={product.id}
              className="oldies-card-interactive"
            >
              <div className="h-48 overflow-hidden relative">
                <div className="absolute inset-0 border-b border-[var(--oldies-border-primary)] z-10"></div>
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover sepia-[0.2] brightness-[0.95]"
                />
              </div>
              <div className="oldies-card-content">
                <h2 className="oldies-section-title">{product.name}</h2>
                <p className="oldies-text-secondary font-light italic mt-2 line-clamp-3">
                  {product.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default ProductsPage;
