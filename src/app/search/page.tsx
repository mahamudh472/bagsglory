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
    <div className="bg-zinc-50/60 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Header Form */}
        <div className="max-w-2xl mx-auto text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
            Catalog Search
          </span>
          <h1 className="font-serif-heading font-black text-3xl sm:text-4xl text-zinc-950 mt-1 mb-4">
            Find Your Signature Bag
          </h1>

          <div className="relative">
            <Search className="w-5 h-5 text-zinc-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by leather type, backpack, laptop size, weekender duffel..."
              className="w-full text-sm pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-zinc-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
            />
          </div>
        </div>

        {/* Results Metadata */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-zinc-200">
          <div className="text-xs text-zinc-600">
            {searchTerm.trim() ? (
              <span>
                Found <strong className="text-zinc-900">{searchResults.length}</strong> matching bags for &ldquo;<strong className="text-amber-800">{searchTerm}</strong>&rdquo;
              </span>
            ) : (
              <span>Enter keywords above to search our handcrafted collection</span>
            )}
          </div>

          <Link
            href="/shop"
            className="text-xs font-bold text-zinc-700 hover:text-amber-800 flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Browse Full Catalog</span>
          </Link>
        </div>

        {/* Results Grid */}
        {searchResults.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {searchResults.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-zinc-200 max-w-xl mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center mx-auto">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-zinc-900 text-lg">
              No matching bags found
            </h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              We couldn&apos;t find any items matching &ldquo;{searchTerm}&rdquo;. Try searching for &ldquo;Leather Backpack&rdquo;, &ldquo;Tote&rdquo;, &ldquo;Duffel&rdquo;, or &ldquo;Sling&rdquo;.
            </p>

            <div className="pt-2 flex flex-wrap justify-center gap-2">
              {["Backpacks", "Totes", "Duffels", "Briefcases", "Slings"].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSearchTerm(tag)}
                  className="text-xs px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-amber-100 hover:text-amber-900 font-medium transition-colors"
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
