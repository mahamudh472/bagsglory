"use client";

import React from "react";
import Link from "next/link";
import { Heart, ShoppingBag, ArrowRight, Trash2 } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { ProductCard } from "@/components/common/ProductCard";

export default function WishlistPage() {
  const { wishlist, products } = useStore();

  const savedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="bg-zinc-50/50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-zinc-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-rose-600">
              <Heart className="w-4 h-4 fill-rose-600" />
              <span>Saved Silhouettes</span>
            </div>
            <h1 className="font-serif-heading font-black text-3xl sm:text-4xl text-zinc-950 mt-1">
              My Wishlist ({savedProducts.length})
            </h1>
          </div>

          <Link
            href="/shop"
            className="text-xs font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1.5"
          >
            <span>Continue Browsing</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Wishlist Grid or Empty State */}
        {savedProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-zinc-200 max-w-lg mx-auto shadow-subtle">
            <div className="w-20 h-20 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-4">
              <Heart className="w-10 h-10" />
            </div>
            <h2 className="font-serif-heading font-bold text-2xl text-zinc-900 mb-2">
              Your wishlist is currently empty
            </h2>
            <p className="text-xs text-zinc-500 mb-8 max-w-sm mx-auto leading-relaxed">
              Explore our collection of Italian leather backpacks, executive briefcases, and travel weekender duffels. Click the heart icon to save your favorites.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-zinc-950 hover:bg-amber-800 text-white rounded-2xl text-xs font-bold transition-all shadow-lg"
            >
              <ShoppingBag className="w-4 h-4 text-amber-400" />
              <span>Discover Handcrafted Bags</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {savedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
