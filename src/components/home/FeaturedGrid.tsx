"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { ProductCard } from "@/components/common/ProductCard";

export const FeaturedGrid: React.FC = () => {
  const { products } = useStore();
  const [activeTab, setActiveTab] = useState<"featured" | "bestseller" | "all">("featured");

  const displayedProducts = products.filter((p) => {
    if (activeTab === "featured") return p.isFeatured;
    if (activeTab === "bestseller") return p.isBestSeller;
    return true;
  });

  return (
    <section className="py-24 bg-[#F8F6F1] font-ui border-b border-[#E7E2DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A85A20] block mb-2">
            Signature Releases
          </span>
          <h2 className="font-editorial text-4xl sm:text-5xl text-[#181817] font-normal tracking-tight">
            Featured Products
          </h2>
          <p className="text-sm sm:text-base text-[#625E58] mt-2.5">
            Handcrafted leather silhouettes engineered for everyday movement.
          </p>

          {/* Clean Minimal Filter Tabs */}
          <div className="inline-flex items-center gap-2 mt-8 p-1.5 bg-white rounded-md border border-[#E7E2DA]">
            <button
              onClick={() => setActiveTab("featured")}
              className={`px-5 py-2.5 rounded text-sm font-semibold uppercase tracking-wider transition-colors ${
                activeTab === "featured"
                  ? "bg-[#181817] text-white"
                  : "text-[#625E58] hover:text-[#181817]"
              }`}
            >
              Featured
            </button>
            <button
              onClick={() => setActiveTab("bestseller")}
              className={`px-5 py-2.5 rounded text-sm font-semibold uppercase tracking-wider transition-colors ${
                activeTab === "bestseller"
                  ? "bg-[#181817] text-white"
                  : "text-[#625E58] hover:text-[#181817]"
              }`}
            >
              Bestsellers
            </button>
            <button
              onClick={() => setActiveTab("all")}
              className={`px-5 py-2.5 rounded text-sm font-semibold uppercase tracking-wider transition-colors ${
                activeTab === "all"
                  ? "bg-[#181817] text-white"
                  : "text-[#625E58] hover:text-[#181817]"
              }`}
            >
              All ({products.length})
            </button>
          </div>
        </div>

        {/* Product Cards Grid with Open Spacing */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {displayedProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-md border border-[#181817] text-[#181817] hover:bg-[#181817] hover:text-white text-sm font-semibold uppercase tracking-[0.12em] transition-colors"
          >
            <span>View Full Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
