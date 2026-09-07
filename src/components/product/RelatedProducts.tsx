"use client";

import React from "react";
import { Product } from "@/types";
import { useStore } from "@/context/StoreContext";
import { ProductCard } from "@/components/common/ProductCard";

interface RelatedProductsProps {
  currentProductId: string;
  category: string;
}

export const RelatedProducts: React.FC<RelatedProductsProps> = ({
  currentProductId,
  category,
}) => {
  const { products } = useStore();

  const related = products
    .filter((p) => p.id !== currentProductId && (p.category === category || p.isFeatured))
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <div className="mt-20 pt-12 border-t border-[#E5DED4] font-sans">
      <div className="mb-10 text-center">
        <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#C9A45C] block mb-2">
          Curated Companions
        </span>
        <h3 className="font-heading font-normal text-3xl text-[#0D0C0B]">
          Complete Your Ensemble
        </h3>
        <div className="w-12 h-[1px] bg-[#C9A45C] mx-auto mt-3"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {related.map((prod) => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>
    </div>
  );
};

