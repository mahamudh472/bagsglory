"use client";

import React, { useState, useMemo, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { ProductCard } from "@/components/common/ProductCard";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default function CategoryDetailPage({ params }: CategoryPageProps) {
  const resolvedParams = use(params);
  const { categories, products } = useStore();

  const category = categories.find((c) => c.slug === resolvedParams.slug);

  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");
  const [maxPrice, setMaxPrice] = useState<number>(7000);

  const categoryProducts = useMemo(() => {
    return products
      .filter((p) => p.category === resolvedParams.slug && p.basePrice <= maxPrice)
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.basePrice - b.basePrice;
        if (sortBy === "price-desc") return b.basePrice - a.basePrice;
        if (sortBy === "rating") return b.rating - a.rating;
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [products, resolvedParams.slug, maxPrice, sortBy]);

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center font-ui">
        <h1 className="font-editorial text-3xl text-[#181817] mb-4">
          Collection Not Found
        </h1>
        <p className="text-sm text-[#625E58] mb-8 max-w-md mx-auto">
          The requested collection does not exist or has been updated.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#181817] text-white rounded-md text-xs font-semibold uppercase tracking-wider hover:bg-[#2C2B29] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Browse All Bags</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#F8F6F1] min-h-screen pb-20 font-ui">
      {/* Category Hero Banner */}
      <div className="relative bg-[#181817] text-white py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#181817] via-[#181817]/70 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[11px] uppercase tracking-[0.1em] text-[#B8AA98] mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3 text-[#625E58]" />
            <Link href="/shop" className="hover:text-white transition-colors">
              Collections
            </Link>
            <ChevronRight className="w-3 h-3 text-[#625E58]" />
            <span className="text-white font-semibold">{category.name}</span>
          </nav>

          <div className="max-w-3xl space-y-3">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A85A20] block">
              {categoryProducts.length} Silhouettes Handcrafted
            </span>
            <h1 className="font-editorial text-3xl sm:text-5xl text-white font-normal">
              {category.name}
            </h1>
            <p className="text-xs sm:text-sm text-[#E7E2DA]/90 leading-relaxed font-normal max-w-2xl">
              {category.description}
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Controls Toolbar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#E7E2DA]">
          <div className="flex items-center gap-4">
            <Link
              href="/shop"
              className="text-xs font-semibold text-[#181817] hover:text-[#A85A20] flex items-center gap-1.5 uppercase tracking-wider"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Collections</span>
            </Link>
            <span className="text-xs text-[#625E58]">
              Showing {categoryProducts.length} items
            </span>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="category-sort" className="text-xs text-[#625E58]">Sort by:</label>
            <select
              id="category-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs font-semibold text-[#181817] bg-white border border-[#E7E2DA] rounded-md px-3 py-2 focus:outline-none focus:border-[#181817]"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Product Cards */}
        {categoryProducts.length === 0 ? (
          <div className="py-20 text-center space-y-4 max-w-md mx-auto">
            <h3 className="font-editorial text-2xl text-[#181817]">No bags found in this collection</h3>
            <p className="text-xs text-[#625E58]">Explore our other handcrafted leather collections.</p>
            <Link
              href="/shop"
              className="inline-block px-6 py-2.5 bg-[#181817] text-white rounded-md text-xs font-semibold uppercase tracking-wider"
            >
              View Full Catalog
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
