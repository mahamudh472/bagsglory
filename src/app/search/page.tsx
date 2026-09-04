"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search, ShoppingBag, ArrowLeft, Sparkles, Filter } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { ProductCard } from "@/components/common/ProductCard";

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const { products } = useStore();

  const searchResults = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return [];
    return products.filter((p) => {
      return (
        p.title.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        p.specs.material.toLowerCase().includes(q) ||
        p.variants.some((v) => v.colorName.toLowerCase().includes(q))
      );
    });
  }, [products, searchTerm]);

  return (
    <div className="bg-slate-50 min-h-screen py-10 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Header Form */}
        <div className="max-w-2xl mx-auto text-center mb-10">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0084D4] block mb-1">
            Search BagsGlory
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 tracking-tight mb-4">
            Search Products
          </h1>

          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by product name, category, color, material..."
              className="w-full text-sm pl-12 pr-4 py-3.5 rounded-xl bg-white border border-slate-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0084D4] focus:border-[#0084D4]"
            />
          </div>
        </div>

        {/* Results Metadata */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200">
          <div className="text-xs text-slate-600">
            {searchTerm.trim() ? (
              <span>
                Found <strong className="text-slate-900">{searchResults.length}</strong> matching products for &ldquo;<strong className="text-[#0084D4]">{searchTerm}</strong>&rdquo;
              </span>
            ) : (
              <span>Enter keywords above to search our full catalog</span>
            )}
          </div>

          <Link
            href="/shop"
            className="text-xs font-bold text-[#0084D4] hover:text-[#0073B6] flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Browse All Products</span>
          </Link>
        </div>

        {/* Results Grid */}
        {searchResults.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {searchResults.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-12 text-center border border-slate-200 max-w-xl mx-auto space-y-4 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-sky-50 text-[#0084D4] flex items-center justify-center mx-auto">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-slate-800 text-lg">
              No matching products found
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              We couldn&apos;t find any items matching &ldquo;{searchTerm}&rdquo;. Try searching for &ldquo;Backpack&rdquo;, &ldquo;Tote&rdquo;, &ldquo;Duffel&rdquo;, or &ldquo;Jeans&rdquo;.
            </p>

            <div className="pt-2 flex flex-wrap justify-center gap-2">
              {["Backpack", "Tote", "Duffel", "Handbag", "Shoes", "Jeans"].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSearchTerm(tag)}
                  className="text-xs px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-sky-50 hover:text-[#0084D4] font-medium transition-colors border border-slate-200"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-zinc-500">Loading search results...</div>}>
      <SearchContent />
    </Suspense>
  );
}
