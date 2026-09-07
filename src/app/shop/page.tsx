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
    <div className="bg-[#F8F5EF] min-h-screen py-10 font-sans animate-page-enter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title & Introduction */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#C9A45C] block mb-2">
            The Complete Atelier Collection
          </span>
          <h1 className="font-heading font-normal text-4xl sm:text-5xl lg:text-6xl text-[#0D0C0B] tracking-tight">
            Handcrafted Bags & Accessories
          </h1>
          <div className="w-12 h-[1px] bg-[#C9A45C] mx-auto my-3.5" />
          <p className="text-sm sm:text-base text-[#746C63] font-light leading-relaxed">
            Every piece is forged with uncompromised precision, bespoke hardware, and delivered with nationwide Cash on Delivery.
          </p>
        </div>

        {/* Top Control Bar (Sort, View Mode, Filter Toggle) */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#E5DED4]">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-[#0D0C0B] text-[#F8F5EF] text-xs font-semibold uppercase tracking-[0.18em]"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#C9A45C]" />
              <span>Filters {hasActiveFilters && "●"}</span>
            </button>

            <span className="text-xs sm:text-sm text-[#746C63] font-light tracking-wide">
              Showing <strong className="text-[#0D0C0B] font-semibold">{filteredProducts.length}</strong> creations
            </span>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3">
            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2">
              <label htmlFor="shop-sort" className="text-xs uppercase tracking-wider text-[#746C63] hidden sm:inline">Sort by:</label>
              <select
                id="shop-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-xs font-semibold uppercase tracking-wider text-[#0D0C0B] bg-[#FFFFFF] border border-[#E5DED4] px-3.5 py-2.5 focus:outline-none focus:border-[#C9A45C]"
              >
                <option value="featured">Curated (Featured)</option>
                <option value="newest">New Arrivals</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rating</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center border border-[#E5DED4] p-0.5 bg-[#FFFFFF]">
              <button
                onClick={() => setViewMode("grid")}
                aria-label="Grid View"
                className={`p-2 transition-colors ${
                  viewMode === "grid" ? "bg-[#0D0C0B] text-[#F8F5EF]" : "text-[#746C63] hover:text-[#0D0C0B]"
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                aria-label="List View"
                className={`p-2 transition-colors ${
                  viewMode === "list" ? "bg-[#0D0C0B] text-[#F8F5EF]" : "text-[#746C63] hover:text-[#0D0C0B]"
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
                className="w-full py-2.5 px-3 bg-[#FFFFFF] border border-[#E5DED4] text-[#0D0C0B] hover:bg-[#0D0C0B] hover:text-[#F8F5EF] text-xs font-semibold uppercase tracking-[0.18em] flex items-center justify-center gap-2 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#C9A45C]" />
                <span>Reset All Filters</span>
              </button>
            )}

            {/* 1. Category Filter */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0D0C0B]">
                Collections
              </h3>
              <div className="space-y-2.5">
                {categories.map((cat) => (
                  <label
                    key={cat.id}
                    className="flex items-center justify-between text-xs text-[#746C63] hover:text-[#0D0C0B] cursor-pointer py-0.5 tracking-wide"
                  >
                    <span className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat.slug)}
                        onChange={() => toggleCategory(cat.slug)}
                        className="rounded border-[#E5DED4] text-[#0D0C0B] focus:ring-0"
                      />
                      <span>{cat.name}</span>
                    </span>
                    <span className="text-[11px] text-[#746C63] font-mono">
                      ({products.filter((p) => p.category === cat.slug).length})
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* 2. Price Range Slider */}
            <div className="space-y-3 pt-6 border-t border-[#E5DED4]">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0D0C0B]">
                  Max Price
                </h3>
                <span className="text-xs font-semibold text-[#0D0C0B]">
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
                className="w-full accent-[#0D0C0B] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-[#746C63] font-mono">
                <span>৳1,000</span>
                <span>৳6,000</span>
              </div>
            </div>

            {/* 3. Materials Filter */}
            <div className="space-y-3 pt-6 border-t border-[#E5DED4]">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0D0C0B]">
                Material
              </h3>
              <div className="space-y-2.5">
                {materialOptions.map((mat) => (
                  <label
                    key={mat}
                    className="flex items-center gap-2.5 text-xs text-[#746C63] hover:text-[#0D0C0B] cursor-pointer py-0.5 tracking-wide"
                  >
                    <input
                      type="checkbox"
                      checked={selectedMaterials.includes(mat)}
                      onChange={() => toggleMaterial(mat)}
                      className="rounded border-[#E5DED4] text-[#0D0C0B] focus:ring-0"
                    />
                    <span>{mat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* On Sale Filter */}
            <div className="pt-6 border-t border-[#E5DED4]">
              <label className="flex items-center gap-2.5 text-xs text-[#0D0C0B] hover:text-[#C9A45C] cursor-pointer py-0.5 uppercase tracking-wider font-semibold">
                <input
                  type="checkbox"
                  checked={onSaleOnly}
                  onChange={(e) => setOnSaleOnly(e.target.checked)}
                  className="rounded border-[#E5DED4] text-[#0D0C0B] focus:ring-0"
                />
                <span>Privilege Sale Only</span>
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
                <div className="w-12 h-12 rounded-full bg-[#FFFFFF] border border-[#E5DED4] text-[#C9A45C] flex items-center justify-center mx-auto shadow-xs">
                  <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
                </div>
                <h3 className="font-heading font-normal text-2xl text-[#0D0C0B]">
                  No matching creations found
                </h3>
                <p className="text-xs text-[#746C63] leading-relaxed font-light">
                  Try adjusting your price filter or clearing selections to explore the complete catalog.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-3 bg-[#0D0C0B] hover:bg-[#C9A45C] text-[#F8F5EF] hover:text-[#0D0C0B] text-xs font-semibold uppercase tracking-[0.18em] transition-colors"
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
            className="fixed inset-0 bg-[#0D0C0B]/70 backdrop-blur-sm"
            onClick={() => setIsMobileFilterOpen(false)}
          />

          <div className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-[#F8F5EF] shadow-2xl p-6 flex flex-col justify-between overflow-y-auto z-[101] border-r border-[#E5DED4]">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#E5DED4] pb-4">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#C9A45C]" />
                  <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0D0C0B]">
                    Filter Products
                  </h2>
                </div>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1.5 text-[#746C63] hover:text-[#0D0C0B] rounded-md"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Collections Filter */}
              <div className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0D0C0B]">
                  Collections
                </h3>
                <div className="space-y-2.5">
                  {categories.map((cat) => (
                    <label
                      key={cat.id}
                      className="flex items-center justify-between text-xs text-[#746C63] cursor-pointer"
                    >
                      <span className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(cat.slug)}
                          onChange={() => toggleCategory(cat.slug)}
                          className="rounded border-[#E5DED4] text-[#0D0C0B] focus:ring-0"
                        />
                        <span>{cat.name}</span>
                      </span>
                      <span className="text-[11px] text-[#746C63] font-mono">
                        ({products.filter((p) => p.category === cat.slug).length})
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="space-y-3 pt-6 border-t border-[#E5DED4]">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0D0C0B]">
                    Max Price
                  </h3>
                  <span className="text-xs font-semibold text-[#0D0C0B]">
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
                  className="w-full accent-[#0D0C0B]"
                />
              </div>

              {/* Materials Filter */}
              <div className="space-y-3 pt-6 border-t border-[#E5DED4]">
                <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0D0C0B]">
                  Material
                </h3>
                <div className="space-y-2.5">
                  {materialOptions.map((mat) => (
                    <label
                      key={mat}
                      className="flex items-center gap-2.5 text-xs text-[#746C63] cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedMaterials.includes(mat)}
                        onChange={() => toggleMaterial(mat)}
                        className="rounded border-[#E5DED4] text-[#0D0C0B] focus:ring-0"
                      />
                      <span>{mat}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Apply & Reset CTAs */}
            <div className="pt-6 border-t border-[#E5DED4] space-y-2 mt-8">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-3.5 bg-[#0D0C0B] hover:bg-[#C9A45C] text-[#F8F5EF] hover:text-[#0D0C0B] text-xs font-semibold uppercase tracking-[0.18em] transition-all"
              >
                Apply Filters ({filteredProducts.length})
              </button>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="w-full py-2.5 bg-[#FFFFFF] border border-[#E5DED4] text-[#0D0C0B] text-xs font-semibold uppercase tracking-[0.18em]"
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

