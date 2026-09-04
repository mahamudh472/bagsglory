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
        <h1 className="font-heading font-bold text-3xl text-[#1E293B] mb-4">
          Category Not Found
        </h1>
        <p className="text-sm text-slate-500 mb-8 max-w-md mx-auto">
          The requested category does not exist or has been updated.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#0084D4] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#0073B6] transition-colors rounded-none"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Browse All Products</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-20 font-sans">
      {/* Category Hero Banner with Blue Tint */}
      <div className="relative bg-[#1E6288] text-white py-14 sm:py-18 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#1E6288] via-[#1E6288]/80 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs uppercase tracking-wider text-sky-200 mb-4">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-sky-300" />
            <Link href="/shop" className="hover:text-white transition-colors">
              Shop
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-sky-300" />
            <span className="text-white font-bold">{category.name}</span>
          </nav>

          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-sky-300 block">
              {categoryProducts.length} Products Available
            </span>
            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-white">
              {category.name}
            </h1>
            <p className="text-xs sm:text-sm text-sky-100/90 leading-relaxed font-normal max-w-2xl">
              {category.description}
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Controls Toolbar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-500">
              Showing <strong className="text-[#1E293B] font-bold">{categoryProducts.length}</strong> items
            </span>
          </div>

          <div className="flex items-center gap-3">
            <label htmlFor="cat-sort" className="text-sm text-slate-500 hidden sm:inline">Sort by:</label>
            <select
              id="cat-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-sm font-semibold text-[#1E293B] bg-slate-50 border border-slate-200 rounded-none px-3.5 py-2 focus:outline-none focus:border-[#0084D4]"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rating</option>
            </select>
          </div>
        </div>

        {/* Category Products Grid */}
        {categoryProducts.length === 0 ? (
          <div className="bg-slate-50 border border-slate-200 p-12 text-center space-y-4">
            <h3 className="font-heading font-bold text-xl text-[#1E293B]">
              No items in this collection
            </h3>
            <p className="text-sm text-slate-500 max-w-sm mx-auto">
              Please check back soon or browse our full store catalog.
            </p>
            <Link
              href="/shop"
              className="inline-block px-6 py-2.5 bg-[#0084D4] text-white rounded-none text-xs font-bold uppercase tracking-wider hover:bg-[#0073B6] transition-colors"
            >
              Explore All Bags
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
