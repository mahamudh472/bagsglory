"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { ProductCard } from "@/components/common/ProductCard";

export const FeaturedGrid: React.FC = () => {
  const { products } = useStore();
  const [activeTab, setActiveTab] = useState<"featured" | "bestseller" | "new">("featured");

  const displayedProducts = products.filter((p) => {
    if (activeTab === "featured") return p.isFeatured;
    if (activeTab === "bestseller") return p.isBestSeller;
    if (activeTab === "new") return p.isNewArrival || p.isFeatured;
    return true;
  });

  return (
    <section className="py-20 sm:py-24 bg-[#F8F5EF] font-sans border-t border-[#E5DED4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C9A45C] block mb-2">
            Selected Craftsmanship
          </span>
          <h2 className="font-heading font-normal text-3xl sm:text-4xl lg:text-5xl text-[#0D0C0B] tracking-tight">
            Featured Products
          </h2>
          <div className="w-12 h-[1px] bg-[#C9A45C] mx-auto my-3.5" />
          <p className="font-sans text-sm sm:text-base text-[#746C63] font-light">
            Discover pieces designed for every journey.
          </p>

          {/* Filter Tabs */}
          <div className="inline-flex items-center gap-1 sm:gap-2 mt-8 p-1 border border-[#E5DED4] bg-[#FFFFFF]/60 backdrop-blur-xs">
            <button
              onClick={() => setActiveTab("featured")}
              className={`px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-300 ${
                activeTab === "featured"
                  ? "bg-[#0D0C0B] text-[#F8F5EF] shadow-xs"
                  : "text-[#746C63] hover:text-[#0D0C0B]"
              }`}
            >
              Featured
            </button>
            <button
              onClick={() => setActiveTab("bestseller")}
              className={`px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-300 ${
                activeTab === "bestseller"
                  ? "bg-[#0D0C0B] text-[#F8F5EF] shadow-xs"
                  : "text-[#746C63] hover:text-[#0D0C0B]"
              }`}
            >
              Bestsellers
            </button>
            <button
              onClick={() => setActiveTab("new")}
              className={`px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-300 ${
                activeTab === "new"
                  ? "bg-[#0D0C0B] text-[#F8F5EF] shadow-xs"
                  : "text-[#746C63] hover:text-[#0D0C0B]"
              }`}
            >
              New Arrivals
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
          {displayedProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-16 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-3 px-9 py-4 bg-transparent hover:bg-[#0D0C0B] text-[#171513] hover:text-[#F8F5EF] border border-[#171513] text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-300 group"
          >
            <span>Explore All Pieces</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};


