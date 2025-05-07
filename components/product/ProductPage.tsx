"use client";

import { useEffect, useState } from "react";
import Header from "../ui/Header";
import ProductTitle from "../ui/ProductTitle";
import EraSelector from "./EraSelector";
import EraDescription from "./EraDescription";
import ProductCarousel from "./ProductCarousel";
import { products } from "@/lib/sample-data";

const ProductPage = () => {
  const [selectedEra, setSelectedEra] = useState(70);
  const [rangeValue, setRangeValue] = useState([0, 9]);

  const [searchStartYear, setSearchStartYear] = useState(
    selectedEra + rangeValue[0],
  );
  const [searchEndYear, setSearchEndYear] = useState(
    selectedEra + rangeValue[1],
  );

  // 製品の製造期間の終了が検索範囲の開始以降 かつ 製品の製造期間の開始が検索範囲の終了以前
  const filteredProducts = products.filter(
    (product) =>
      product.manufacturing_end_year >= 1900 + searchStartYear &&
      product.manufacturing_start_year <= 1900 + searchEndYear,
  );

  const handleEraChange = (era: number) => {
    setSelectedEra(era);
    setRangeValue([0, 9]);
  };

  useEffect(() => {
    setSearchStartYear(selectedEra + rangeValue[0]);
    setSearchEndYear(selectedEra + rangeValue[1]);
  }, [selectedEra, rangeValue]);

  return (
    <div className="max-w-md mx-auto px-4 py-6 sm:px-6">
      <Header />
      <ProductTitle />

      <EraSelector
        selectedEra={selectedEra}
        onEraChange={handleEraChange}
        rangeValue={rangeValue}
        setRangeValue={setRangeValue}
      />
      <EraDescription era={selectedEra} rangeValue={rangeValue} />
      <ProductCarousel products={filteredProducts} />
    </div>
  );
};

export default ProductPage;
