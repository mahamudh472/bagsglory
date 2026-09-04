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
    <section className="py-16 sm:py-20 bg-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading (Centered as in bagsglory.com screenshot) */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#1E293B] tracking-tight mb-3">
            Featured Products
          </h2>
          <div className="w-16 h-1 bg-[#0084D4] mx-auto mb-4" />
          <p className="text-sm sm:text-base text-slate-500">
            Explore our most coveted handcrafted bags, luxury totes, and daily essentials.
          </p>

          {/* Filter Tabs */}
          <div className="inline-flex items-center gap-2 mt-6 p-1 bg-slate-100 rounded-lg">
            <button
              onClick={() => setActiveTab("featured")}
              className={`px-4 py-2 rounded-md text-xs sm:text-sm font-bold uppercase tracking-wider transition-all ${
                activeTab === "featured"
                  ? "bg-[#0084D4] text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Featured
            </button>
            <button
              onClick={() => setActiveTab("bestseller")}
              className={`px-4 py-2 rounded-md text-xs sm:text-sm font-bold uppercase tracking-wider transition-all ${
                activeTab === "bestseller"
                  ? "bg-[#0084D4] text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Bestsellers
            </button>
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 rounded-md text-xs sm:text-sm font-bold uppercase tracking-wider transition-all ${
                activeTab === "all"
                  ? "bg-[#0084D4] text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              All ({products.length})
            </button>
          </div>
        </div>

        {/* Product Cards Grid: 2 cols on mobile, 4-5 cols on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {displayedProducts.slice(0, 10).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-14 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#0084D4] hover:bg-[#0073B6] text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg rounded-none"
          >
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

