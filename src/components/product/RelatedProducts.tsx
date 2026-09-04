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
    <div className="mt-20 pt-12 border-t border-slate-200">
      <div className="mb-8 text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0084D4] block mb-1">
          Handpicked For You
        </span>
        <h3 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
          Related Products
        </h3>
        <div className="w-12 h-0.5 bg-[#0084D4] mx-auto mt-2"></div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {related.map((prod) => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>
    </div>
  );
};
