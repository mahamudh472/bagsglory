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
    <div className="mt-24 pt-16 border-t border-[#E7E2DA] font-ui">
      <div className="mb-10 text-center sm:text-left">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A85A20] block mb-1.5">
          Complementary Pieces
        </span>
        <h3 className="font-editorial text-3xl sm:text-4xl text-[#181817] font-normal">
          You May Also Like
        </h3>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {related.map((prod) => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>
    </div>
  );
};
