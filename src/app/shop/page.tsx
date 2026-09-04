"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  SlidersHorizontal,
  Grid3X3,
  LayoutList,
  X,
  RotateCcw,
  ShoppingBag,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { ProductCard } from "@/components/common/ProductCard";
import { formatPrice } from "@/utils/currency";

export default function ShopPage() {
  const { products, categories } = useStore();

  // Filter & Sort States
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(6000);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [onSaleOnly, setOnSaleOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating" | "newest">("featured");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    if (isMobileFilterOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileFilterOpen]);

  // Material filters
  const materialOptions = [
    "Full-Grain Leather",
    "Waxed Canvas",
    "Italian Calfskin",
    "English Bridle Leather",
    "Ripstop Sailcloth",
  ];

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (selectedCategories.length > 0 && !selectedCategories.includes(p.category)) {
        return false;
      }

      // Material filter
      if (
        selectedMaterials.length > 0 &&
        !selectedMaterials.some((mat) => p.specs.material.toLowerCase().includes(mat.toLowerCase()))
      ) {
        return false;
      }

      // Price filter
      if (p.basePrice > maxPrice) {
        return false;
      }

      // In-stock filter
      if (inStockOnly) {
        const totalStock = p.variants.reduce((acc, v) => acc + v.stock, 0);
        if (totalStock === 0) return false;
      }

      // On-sale filter
      if (onSaleOnly && (!p.compareAtPrice || p.compareAtPrice <= p.basePrice)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.basePrice - b.basePrice;
      if (sortBy === "price-desc") return b.basePrice - a.basePrice;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "newest") return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      return 0; // featured default
    });
  }, [products, selectedCategories, selectedMaterials, maxPrice, inStockOnly, onSaleOnly, sortBy]);

  const toggleCategory = (slug: string) => {
    setSelectedCategories((prev) =>
      prev.includes(slug) ? prev.filter((c) => c !== slug) : [...prev, slug]
    );
  };

  const toggleMaterial = (mat: string) => {
    setSelectedMaterials((prev) =>
      prev.includes(mat) ? prev.filter((m) => m !== mat) : [...prev, mat]
    );
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedMaterials([]);
    setMaxPrice(6000);
    setInStockOnly(false);
    setOnSaleOnly(false);
    setSortBy("featured");
  };

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedMaterials.length > 0 ||
    maxPrice < 6000 ||
    inStockOnly ||
    onSaleOnly;

  return (
    <div className="bg-white min-h-screen py-10 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title & Introduction */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0084D4] block mb-2">
            The Complete Collection
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#1E293B] tracking-tight">
            Handcrafted Bags & Accessories
          </h1>
          <div className="w-16 h-1 bg-[#0084D4] mx-auto my-3" />
          <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
            Every bag is crafted with premium materials and reinforced hardware, delivered with nationwide Cash on Delivery.
          </p>
        </div>

        {/* Top Control Bar (Sort, View Mode, Filter Toggle) */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-[#0084D4] text-white rounded-none text-xs font-bold uppercase tracking-wider"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters {hasActiveFilters && "●"}</span>
            </button>

            <span className="text-sm text-slate-500">
              Showing <strong className="text-[#1E293B] font-bold">{filteredProducts.length}</strong> items
            </span>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3">
            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2">
              <label htmlFor="shop-sort" className="text-sm text-slate-500 hidden sm:inline">Sort by:</label>
              <select
                id="shop-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-sm font-semibold text-[#1E293B] bg-slate-50 border border-slate-200 rounded-none px-3.5 py-2 focus:outline-none focus:border-[#0084D4]"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest Arrivals</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rating</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center border border-slate-200 rounded-none p-0.5 bg-slate-50">
              <button
                onClick={() => setViewMode("grid")}
                aria-label="Grid View"
                className={`p-2 transition-colors ${
                  viewMode === "grid" ? "bg-[#0084D4] text-white" : "text-slate-500"
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                aria-label="List View"
                className={`p-2 transition-colors ${
                  viewMode === "list" ? "bg-[#0084D4] text-white" : "text-slate-500"
                }`}
              >
                <LayoutList className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Layout (Sidebar Filters + Catalog Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Left Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 space-y-8 sticky top-28 pr-4">
            {/* Reset Action */}
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 text-[#0084D4] hover:bg-sky-50 rounded-none text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            )}

            {/* 1. Category Filter */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#1E293B]">
                Categories
              </h3>
              <div className="space-y-2.5">
                {categories.map((cat) => (
                  <label
                    key={cat.id}
                    className="flex items-center justify-between text-sm text-slate-600 hover:text-[#0084D4] cursor-pointer py-0.5"
                  >
                    <span className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat.slug)}
                        onChange={() => toggleCategory(cat.slug)}
                        className="rounded border-slate-300 text-[#0084D4] focus:ring-0"
                      />
                      <span>{cat.name}</span>
                    </span>
                    <span className="text-xs text-slate-400">
                      ({products.filter((p) => p.category === cat.slug).length})
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* 2. Price Range Slider */}
            <div className="space-y-3 pt-6 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#1E293B]">
                  Max Price
                </h3>
                <span className="text-sm font-bold text-[#0084D4]">
                  {formatPrice(maxPrice)}
                </span>
              </div>
              <input
                type="range"
                min="1000"
                max="6000"
                step="250"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#0084D4] cursor-pointer"
              />
              <div className="flex justify-between text-xs text-slate-400">
                <span>৳1,000</span>
                <span>৳6,000</span>
              </div>
            </div>

            {/* 3. Materials Filter */}
            <div className="space-y-3 pt-6 border-t border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#1E293B]">
                Material
              </h3>
              <div className="space-y-2.5">
                {materialOptions.map((mat) => (
                  <label
                    key={mat}
                    className="flex items-center gap-2.5 text-sm text-slate-600 hover:text-[#0084D4] cursor-pointer py-0.5"
                  >
                    <input
                      type="checkbox"
                      checked={selectedMaterials.includes(mat)}
                      onChange={() => toggleMaterial(mat)}
                      className="rounded border-slate-300 text-[#0084D4] focus:ring-0"
                    />
                    <span>{mat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* On Sale Filter */}
            <div className="pt-6 border-t border-slate-100">
              <label className="flex items-center gap-2.5 text-sm text-slate-700 hover:text-[#0084D4] cursor-pointer py-0.5">
                <input
                  type="checkbox"
                  checked={onSaleOnly}
                  onChange={(e) => setOnSaleOnly(e.target.checked)}
                  className="rounded border-slate-300 text-[#0084D4] focus:ring-0"
                />
                <span className="font-semibold">On Sale Only</span>
              </label>
            </div>
          </aside>

          {/* Right Product Grid */}
          <main className="lg:col-span-9">
            {filteredProducts.length > 0 ? (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                    : "space-y-6"
                }
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center space-y-4 max-w-md mx-auto">
                <div className="w-12 h-12 rounded-full bg-white border border-[#E7E2DA] text-[#625E58] flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <h3 className="font-editorial text-2xl text-[#181817]">
                  No matching bags found
                </h3>
                <p className="text-sm text-[#625E58] leading-relaxed">
                  Try adjusting your price slider or clearing filters to browse our handcrafted catalog.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 bg-[#181817] text-white rounded-md text-xs font-semibold uppercase tracking-wider"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Slide-Over Filter Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden animate-in fade-in duration-200">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            onClick={() => setIsMobileFilterOpen(false)}
          />

          <div className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-white shadow-2xl p-6 flex flex-col justify-between overflow-y-auto z-[101]">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#0084D4]" />
                  <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800">
                    Filter Products
                  </h2>
                </div>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1.5 text-slate-500 hover:text-slate-800 rounded-md"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Collections Filter */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-slate-800">
                  Categories
                </h3>
                <div className="space-y-2.5">
                  {categories.map((cat) => (
                    <label
                      key={cat.id}
                      className="flex items-center justify-between text-sm text-slate-600 cursor-pointer"
                    >
                      <span className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(cat.slug)}
                          onChange={() => toggleCategory(cat.slug)}
                          className="rounded border-slate-300 text-[#0084D4] focus:ring-[#0084D4]"
                        />
                        <span>{cat.name}</span>
                      </span>
                      <span className="text-xs text-slate-400">
                        ({products.filter((p) => p.category === cat.slug).length})
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="space-y-3 pt-6 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-slate-800">
                    Max Price
                  </h3>
                  <span className="text-sm font-bold text-[#0084D4]">
                    {formatPrice(maxPrice)}
                  </span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="6000"
                  step="250"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#0084D4]"
                />
              </div>

              {/* Materials Filter */}
              <div className="space-y-3 pt-6 border-t border-slate-200">
                <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-slate-800">
                  Material
                </h3>
                <div className="space-y-2.5">
                  {materialOptions.map((mat) => (
                    <label
                      key={mat}
                      className="flex items-center gap-2.5 text-sm text-slate-600 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedMaterials.includes(mat)}
                        onChange={() => toggleMaterial(mat)}
                        className="rounded border-slate-300 text-[#0084D4] focus:ring-[#0084D4]"
                      />
                      <span>{mat}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Apply & Reset CTAs */}
            <div className="pt-6 border-t border-slate-200 space-y-2 mt-8">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-3 bg-[#0084D4] hover:bg-[#0073B6] text-white rounded-lg text-xs font-bold uppercase tracking-wider shadow-sm transition-all"
              >
                Apply Filters ({filteredProducts.length} items)
              </button>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="w-full py-2.5 bg-white border border-slate-200 text-slate-600 hover:text-slate-900 rounded-lg text-xs font-bold uppercase tracking-wider"
                >
                  Reset All
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
