"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, X, ArrowRight, Sparkles, Tag, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useStore } from "@/context/StoreContext";
import { formatPrice } from "@/utils/currency";

export const SearchModal: React.FC = () => {
  const pathname = usePathname();
  const { isSearchOpen, setIsSearchOpen, products } = useStore();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (pathname.startsWith("/admin")) return;

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
  }, [isSearchOpen, setIsSearchOpen, pathname]);

  useEffect(() => {
    if (isSearchOpen && !pathname.startsWith("/admin")) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isSearchOpen, pathname]);

  if (!isSearchOpen || pathname.startsWith("/admin")) return null;

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
    "Luxury Tote",
    "Laptop Briefcase",
    "Crossbody Bag",
    "Shoulder Sling"
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 md:pt-24 px-4 bg-[#0D0C0B]/70 backdrop-blur-sm animate-in fade-in duration-200 font-sans">
      <div
        className="w-full max-w-2xl bg-[#FFFFFF] shadow-2xl border border-[#E5DED4] overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <form onSubmit={handleSearchSubmit} className="relative p-4 md:p-6 border-b border-[#E5DED4] flex items-center gap-3 bg-[#F8F5EF]">
          <Search className="w-5 h-5 text-[#C9A45C] shrink-0 stroke-[1.75]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search luxury bags, backpacks, totes, briefcases..."
            className="w-full text-base md:text-lg text-[#0D0C0B] placeholder:text-[#746C63] bg-transparent focus:outline-none font-medium"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="p-1.5 text-[#746C63] hover:text-[#0D0C0B] rounded-full hover:bg-[#E5DED4]/50 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsSearchOpen(false)}
            className="px-2.5 py-1 text-[11px] font-semibold tracking-wider text-[#746C63] bg-[#FFFFFF] border border-[#E5DED4] hover:bg-[#E5DED4] transition-colors"
          >
            ESC
          </button>
        </form>

        {/* Results / Suggestions Container */}
        <div className="p-4 md:p-6 overflow-y-auto space-y-6">
          {query.trim() === "" ? (
            <div>
              <div className="flex items-center gap-2 text-[11px] font-semibold text-[#C9A45C] uppercase tracking-[0.2em] mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#C9A45C]" />
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
                    className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-[#F8F5EF] text-[#171513] hover:bg-[#0D0C0B] hover:text-[#F8F5EF] border border-[#E5DED4] transition-all"
                  >
                    <Tag className="w-3 h-3 text-[#C9A45C]" />
                    {item}
                  </button>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-[#E5DED4]">
                <div className="text-[11px] font-semibold text-[#746C63] uppercase tracking-[0.2em] mb-3">
                  Featured Collections
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {products.filter((p) => p.isFeatured).slice(0, 2).map((prod) => (
                    <Link
                      key={prod.id}
                      href={`/product/${prod.slug}`}
                      onClick={() => setIsSearchOpen(false)}
                      className="flex items-center gap-3 p-2.5 border border-[#E5DED4] hover:border-[#C9A45C] hover:bg-[#F8F5EF]/60 transition-all group"
                    >
                      <div className="w-12 h-12 bg-[#F8F5EF] relative overflow-hidden shrink-0">
                        <Image
                          src={prod.variants[0]?.images[0] || ""}
                          alt={prod.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-[#0D0C0B] truncate group-hover:text-[#C9A45C] transition-colors">
                          {prod.title}
                        </p>
                        <p className="text-xs font-bold text-[#0D0C0B] mt-0.5">
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
              <div className="flex items-center justify-between text-[11px] font-semibold text-[#746C63] uppercase tracking-[0.2em]">
                <span>Matching Products ({filteredProducts.length})</span>
                <button
                  type="button"
                  onClick={handleSearchSubmit}
                  className="text-[#C9A45C] hover:text-[#0D0C0B] flex items-center gap-1 font-semibold transition-colors"
                >
                  View All Results <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="divide-y divide-[#E5DED4]">
                {filteredProducts.map((prod) => (
                  <Link
                    key={prod.id}
                    href={`/product/${prod.slug}`}
                    onClick={() => setIsSearchOpen(false)}
                    className="flex items-center gap-4 py-3 hover:bg-[#F8F5EF] px-2 transition-colors group"
                  >
                    <div className="w-14 h-14 bg-[#F8F5EF] relative overflow-hidden shrink-0 border border-[#E5DED4]">
                      <Image
                        src={prod.variants[0]?.images[0] || ""}
                        alt={prod.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-semibold text-[#C9A45C] uppercase tracking-[0.18em]">
                          {prod.categoryName}
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold text-[#0D0C0B] group-hover:text-[#C9A45C] truncate transition-colors">
                        {prod.title}
                      </h4>
                      <p className="text-xs text-[#746C63] truncate mt-0.5 font-light">
                        {prod.specs.capacity} • {prod.specs.material}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-semibold text-[#0D0C0B] text-sm">
                        {formatPrice(prod.basePrice)}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="py-12 text-center">
              <div className="w-12 h-12 rounded-full bg-[#F8F5EF] text-[#C9A45C] flex items-center justify-center mx-auto mb-3 border border-[#E5DED4]">
                <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
              </div>
              <h3 className="font-heading text-lg text-[#0D0C0B]">No products found for &quot;{query}&quot;</h3>
              <p className="text-xs text-[#746C63] max-w-sm mx-auto mt-1 font-light">
                Try searching by bag category (tote, backpack, duffel, sling) or material.
              </p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-[#F8F5EF] border-t border-[#E5DED4] flex items-center justify-between text-[11px] text-[#746C63] px-6">
          <span>Press <kbd className="font-mono bg-[#FFFFFF] px-1.5 py-0.5 border border-[#E5DED4]">Enter</kbd> to see all results</span>
          <span>Carry Your Glory</span>
        </div>
      </div>
    </div>
  );
};


