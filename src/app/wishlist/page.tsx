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
    <div className="bg-slate-50 min-h-screen py-10 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#0084D4]">
              <Heart className="w-4 h-4 fill-[#0084D4]" />
              <span>Saved Items</span>
            </div>
            <h1 className="font-bold text-2xl sm:text-3xl text-slate-800 mt-1">
              My Wishlist ({savedProducts.length})
            </h1>
          </div>

          <Link
            href="/shop"
            className="text-xs font-bold text-[#0084D4] hover:text-[#0073B6] flex items-center gap-1.5"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Wishlist Grid or Empty State */}
        {savedProducts.length === 0 ? (
          <div className="bg-white rounded-xl p-16 text-center border border-slate-200 max-w-lg mx-auto shadow-sm">
            <div className="w-16 h-16 rounded-full bg-sky-50 text-[#0084D4] flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8" />
            </div>
            <h2 className="font-bold text-2xl text-slate-800 mb-2">
              Your wishlist is currently empty
            </h2>
            <p className="text-xs text-slate-500 mb-8 max-w-sm mx-auto leading-relaxed">
              Explore our wide range of bags, backpacks, accessories, and shoes. Click the heart icon on any product to save your favorites for later.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#0084D4] hover:bg-[#0073B6] text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
            >
              <ShoppingBag className="w-4 h-4 text-white" />
              <span>Explore Products</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {savedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
