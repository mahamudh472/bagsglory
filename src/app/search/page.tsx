"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search, ShoppingBag, ArrowLeft } from "lucide-react";
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
    <div className="bg-[#F8F5EF] min-h-screen py-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Header Form */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#C9A45C] block mb-2">
            Curated Catalogue
          </span>
          <h1 className="font-heading font-normal text-4xl sm:text-5xl text-[#0D0C0B] tracking-tight mb-6">
            Search Collections
          </h1>

          <div className="relative">
            <Search className="w-4 h-4 text-[#746C63] absolute left-4 top-4" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by handbag name, collection, shade, or leather grade..."
              className="w-full text-xs pl-11 pr-4 py-3.5 bg-white border border-[#E5DED4] focus:outline-none focus:border-[#C9A45C] rounded-none shadow-xs"
            />
          </div>
        </div>

        {/* Results Metadata */}
        <div className="flex items-center justify-between pb-4 mb-8 border-b border-[#E5DED4]">
          <div className="text-xs text-[#746C63]">
            {searchTerm.trim() ? (
              <span>
                Found <strong className="text-[#0D0C0B] font-semibold">{searchResults.length}</strong> matching creations for &ldquo;<strong className="text-[#C9A45C]">{searchTerm}</strong>&rdquo;
              </span>
            ) : (
              <span>Enter keywords above to search our full catalog</span>
            )}
          </div>

          <Link
            href="/shop"
            className="text-xs font-semibold text-[#746C63] hover:text-[#0D0C0B] flex items-center gap-1.5 uppercase tracking-[0.16em] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Browse All Collections</span>
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
          <div className="bg-white p-16 text-center border border-[#E5DED4] max-w-xl mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#F8F5EF] border border-[#E5DED4] text-[#C9A45C] flex items-center justify-center mx-auto">
              <ShoppingBag className="w-7 h-7 stroke-[1.5]" />
            </div>
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C9A45C] block">
              Refine Search
            </span>
            <h3 className="font-heading text-2xl text-[#0D0C0B]">
              No matching creations found
            </h3>
            <p className="text-xs text-[#746C63] font-light leading-relaxed max-w-md mx-auto">
              We couldn&apos;t find any items matching &ldquo;{searchTerm}&rdquo;. Try searching for &ldquo;Backpack&rdquo;, &ldquo;Tote&rdquo;, &ldquo;Duffel&rdquo;, or &ldquo;Handbag&rdquo;.
            </p>

            <div className="pt-3 flex flex-wrap justify-center gap-2">
              {["Backpack", "Tote", "Duffel", "Handbag", "Crossbody", "Executive"].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSearchTerm(tag)}
                  className="text-xs px-4 py-1.5 bg-[#F8F5EF] hover:bg-[#0D0C0B] hover:text-[#C9A45C] text-[#0D0C0B] font-medium transition-all border border-[#E5DED4] uppercase tracking-wider"
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
    <Suspense fallback={<div className="p-12 text-center text-[#746C63] font-light">Loading search results...</div>}>
      <SearchContent />
    </Suspense>
  );
}
