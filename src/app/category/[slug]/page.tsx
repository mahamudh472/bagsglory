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
      <div className="max-w-7xl mx-auto px-4 py-24 text-center font-sans">
        <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C9A45C] block mb-2">
          Collection Unavailable
        </span>
        <h1 className="font-heading text-4xl text-[#0D0C0B] mb-4">
          Category Not Found
        </h1>
        <p className="text-sm text-[#746C63] mb-8 max-w-md mx-auto font-light">
          The requested luxury collection does not exist or has been updated.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#0D0C0B] text-white text-xs font-semibold uppercase tracking-[0.18em] hover:bg-[#C9A45C] hover:text-[#0D0C0B] transition-all rounded-none"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Browse All Creations</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#F8F5EF] min-h-screen pb-24 font-sans">
      {/* Category Hero Banner with Obsidian & Gold Tint */}
      <div className="relative bg-[#0D0C0B] text-white py-16 sm:py-24 overflow-hidden border-b border-[#241B14]">
        <div className="absolute inset-0 opacity-25">
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D0C0B] via-[#0D0C0B]/85 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#E5C77A]/70 mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3 text-[#C9A45C]/50" />
            <Link href="/shop" className="hover:text-white transition-colors">
              Collections
            </Link>
            <ChevronRight className="w-3 h-3 text-[#C9A45C]/50" />
            <span className="text-[#C9A45C] font-semibold">{category.name}</span>
          </nav>

          <div className="max-w-3xl space-y-3">
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C9A45C] block">
              Curated Edition ✦ {categoryProducts.length} Creations
            </span>
            <h1 className="font-heading font-normal text-4xl sm:text-6xl text-white tracking-tight">
              {category.name}
            </h1>
            <p className="text-sm sm:text-base text-[#D4CDC3] leading-relaxed font-light max-w-2xl">
              {category.description}
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Controls Toolbar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-6 mb-10 border-b border-[#E5DED4]">
          <div className="flex items-center gap-4">
            <span className="text-xs uppercase tracking-[0.14em] text-[#746C63]">
              Showing <strong className="text-[#0D0C0B] font-semibold">{categoryProducts.length}</strong> items
            </span>
          </div>

          <div className="flex items-center gap-3">
            <label htmlFor="cat-sort" className="text-xs uppercase tracking-[0.14em] text-[#746C63] hidden sm:inline">Sort by:</label>
            <select
              id="cat-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs uppercase tracking-wider font-semibold text-[#0D0C0B] bg-white border border-[#E5DED4] rounded-none px-4 py-2.5 focus:outline-none focus:border-[#C9A45C]"
            >
              <option value="featured">Featured Editions</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Category Products Grid */}
        {categoryProducts.length === 0 ? (
          <div className="bg-white border border-[#E5DED4] p-16 text-center space-y-4">
            <span className="text-2xl text-[#C9A45C]">✦</span>
            <h3 className="font-heading text-2xl text-[#0D0C0B]">
              No items in this collection
            </h3>
            <p className="text-xs sm:text-sm text-[#746C63] font-light max-w-sm mx-auto">
              Please check back soon or browse our full catalogue of handcrafted bags.
            </p>
            <Link
              href="/shop"
              className="inline-block px-8 py-3 bg-[#0D0C0B] text-white rounded-none text-xs font-semibold uppercase tracking-[0.18em] hover:bg-[#C9A45C] hover:text-[#0D0C0B] transition-all mt-4"
            >
              Explore All Collections
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
