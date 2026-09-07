"use client";

import React from "react";
import Link from "next/link";
import { Heart, ShoppingBag, ArrowRight } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { ProductCard } from "@/components/common/ProductCard";

export default function WishlistPage() {
  const { wishlist, products } = useStore();

  const savedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="bg-[#F8F5EF] min-h-screen py-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-10 border-b border-[#E5DED4]">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#C9A45C]">
              <Heart className="w-3.5 h-3.5 fill-[#C9A45C] text-[#C9A45C]" />
              <span>Personal Wishlist</span>
            </div>
            <h1 className="font-heading font-normal text-3xl sm:text-5xl text-[#0D0C0B] mt-1">
              Saved Creations ({savedProducts.length})
            </h1>
          </div>

          <Link
            href="/shop"
            className="text-xs font-semibold text-[#746C63] hover:text-[#0D0C0B] flex items-center gap-1.5 uppercase tracking-[0.16em] transition-colors"
          >
            <span>Continue Exploring</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Wishlist Grid or Empty State */}
        {savedProducts.length === 0 ? (
          <div className="bg-white p-16 text-center border border-[#E5DED4] max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#F8F5EF] border border-[#E5DED4] text-[#C9A45C] flex items-center justify-center mx-auto mb-4">
              <Heart className="w-7 h-7 stroke-[1.5]" />
            </div>
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C9A45C] block mb-1">
              Your Wishlist
            </span>
            <h2 className="font-heading text-3xl text-[#0D0C0B] mb-2">
              Your wishlist is currently empty
            </h2>
            <p className="text-xs text-[#746C63] font-light mb-8 max-w-sm mx-auto leading-relaxed">
              Explore our wide range of luxury handbags, structured totes, and timeless leather goods. Click the heart icon on any product to save your favorites.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#0D0C0B] hover:bg-[#C9A45C] hover:text-[#0D0C0B] text-white text-xs font-semibold uppercase tracking-[0.18em] transition-all rounded-none"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Explore Collections</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {savedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
