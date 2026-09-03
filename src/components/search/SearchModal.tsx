"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, X, ArrowRight, Sparkles, Tag, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore } from "@/context/StoreContext";
import { formatPrice } from "@/utils/currency";

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, products } = useStore();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(!isSearchOpen);
      }
      if (e.key === "Escape" && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const filteredProducts = query.trim() === ""
    ? []
    : products.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.specs.material.toLowerCase().includes(q)
        );
      }).slice(0, 6);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsSearchOpen(false);
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const popularSearches = [
    "Leather Backpack",
    "Weekender Duffel",
    "Minimalist Tote",
    "16 Inch Laptop",
    "Crossbody Saddle",
    "Waterproof Sling"
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 md:pt-24 px-4 bg-zinc-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-zinc-200 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <form onSubmit={handleSearchSubmit} className="relative p-4 md:p-6 border-b border-zinc-100 flex items-center gap-3">
          <Search className="w-6 h-6 text-amber-600 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search luxury leather backpacks, totes, weekender duffels..."
            className="w-full text-base md:text-lg text-zinc-900 placeholder:text-zinc-400 bg-transparent focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="p-1.5 text-zinc-400 hover:text-zinc-600 rounded-full hover:bg-zinc-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsSearchOpen(false)}
            className="px-2.5 py-1 text-xs font-medium text-zinc-500 bg-zinc-100 rounded-lg hover:bg-zinc-200 transition-colors"
          >
            ESC
          </button>
        </form>

        {/* Results / Suggestions Container */}
        <div className="p-4 md:p-6 overflow-y-auto space-y-6">
          {query.trim() === "" ? (
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Popular Searches
              </div>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      setQuery(item);
                      inputRef.current?.focus();
                    }}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium bg-zinc-100 text-zinc-700 hover:bg-amber-50 hover:text-amber-800 hover:border-amber-200 border border-transparent transition-all"
                  >
                    <Tag className="w-3 h-3 text-zinc-400" />
                    {item}
                  </button>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-zinc-100">
                <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">
                  Featured Recommendations
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {products.filter((p) => p.isFeatured).slice(0, 2).map((prod) => (
                    <Link
                      key={prod.id}
                      href={`/product/${prod.slug}`}
                      onClick={() => setIsSearchOpen(false)}
                      className="flex items-center gap-3 p-2.5 rounded-xl border border-zinc-100 hover:border-amber-200 hover:bg-amber-50/50 transition-all group"
                    >
                      <div className="w-12 h-12 rounded-lg bg-zinc-100 relative overflow-hidden shrink-0">
                        <Image
                          src={prod.variants[0]?.images[0] || ""}
                          alt={prod.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-zinc-900 truncate group-hover:text-amber-800">
                          {prod.title}
                        </p>
                        <p className="text-xs font-bold text-amber-700 mt-0.5">
                          {formatPrice(prod.basePrice)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-zinc-400 uppercase tracking-wider">
                <span>Matching Bags ({filteredProducts.length})</span>
                <button
                  type="button"
                  onClick={handleSearchSubmit}
                  className="text-amber-700 hover:underline flex items-center gap-1 font-semibold"
                >
                  View All Results <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="divide-y divide-zinc-100">
                {filteredProducts.map((prod) => (
                  <Link
                    key={prod.id}
                    href={`/product/${prod.slug}`}
                    onClick={() => setIsSearchOpen(false)}
                    className="flex items-center gap-4 py-3 hover:bg-zinc-50 px-2 rounded-xl transition-colors group"
                  >
                    <div className="w-14 h-14 rounded-xl bg-zinc-100 relative overflow-hidden shrink-0 border border-zinc-200">
                      <Image
                        src={prod.variants[0]?.images[0] || ""}
                        alt={prod.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">
                          {prod.categoryName}
                        </span>
                        <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-medium">
                          COD Available
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold text-zinc-900 group-hover:text-amber-700 truncate">
                        {prod.title}
                      </h4>
                      <p className="text-xs text-zinc-600 truncate mt-0.5">
                        {prod.specs.capacity} • {prod.specs.material}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-bold text-zinc-900 text-sm">
                        {formatPrice(prod.basePrice)}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="py-12 text-center">
              <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-3">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-zinc-900 text-base">No bags found for &quot;{query}&quot;</h3>
              <p className="text-xs text-zinc-500 max-w-sm mx-auto mt-1">
                Try searching by bag style (backpack, tote, duffel, sling) or material (leather, canvas, waterproof).
              </p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-zinc-50 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-500 px-6">
          <span>Press <kbd className="font-mono bg-white px-1.5 py-0.5 border rounded">Enter</kbd> to see all results</span>
          <span>Cash on Delivery on all orders</span>
        </div>
      </div>
    </div>
  );
};
