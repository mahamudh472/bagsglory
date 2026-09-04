"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Check, Star } from "lucide-react";
import { Product } from "@/types";
import { useStore } from "@/context/StoreContext";
import { formatPrice } from "@/utils/currency";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, className = "" }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const currentVariant = product.variants[selectedVariantIndex] || product.variants[0];
  const primaryImage = currentVariant?.images[0] || "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800";
  const secondaryImage = currentVariant?.images[1] || primaryImage;

  const inWishlist = isInWishlist(product.id);
  const currentPrice = product.basePrice + (currentVariant?.priceOffset || 0);
  const originalPrice = product.compareAtPrice ? product.compareAtPrice + (currentVariant?.priceOffset || 0) : undefined;
  const isOnSale = Boolean(originalPrice && originalPrice > currentPrice);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (currentVariant) {
      addToCart(product, currentVariant, 1);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 1500);
    }
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      className={`group relative flex flex-col bg-white rounded-lg p-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1. Product Image Container */}
      <div className="relative aspect-square w-full bg-slate-50 overflow-hidden rounded-md border border-slate-100">
        <Link href={`/product/${product.slug}`} className="block w-full h-full relative">
          <Image
            src={isHovered && secondaryImage !== primaryImage ? secondaryImage : primaryImage}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </Link>

        {/* BagsGlory Signature Blue Circle Sale Badge (as in screenshot) */}
        {isOnSale && (
          <div className="absolute top-2.5 left-2.5 w-9 h-9 rounded-full bg-[#0084D4] text-white text-[11px] font-bold flex items-center justify-center shadow-md z-10">
            Sale!
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          aria-label="Wishlist"
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/95 text-slate-400 hover:text-rose-500 flex items-center justify-center transition-all duration-200 z-10 shadow-sm opacity-0 group-hover:opacity-100 hover:scale-110"
        >
          <Heart className={`w-4 h-4 ${inWishlist ? "fill-rose-500 text-rose-500" : ""}`} />
        </button>

        {/* Quick Add Button on Hover */}
        <div className="absolute inset-x-2 bottom-2 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10">
          <button
            onClick={handleQuickAdd}
            disabled={currentVariant?.stock === 0}
            className={`w-full py-2.5 px-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg transition-all duration-200 rounded-sm active:scale-95 ${
              isAdded
                ? "bg-emerald-600 text-white"
                : currentVariant?.stock === 0
                ? "bg-slate-200 text-slate-500 cursor-not-allowed"
                : "bg-[#0084D4] text-white hover:bg-[#0073B6]"
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added to Cart</span>
              </>
            ) : currentVariant?.stock === 0 ? (
              <span>Out of Stock</span>
            ) : (
              <>
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 2. Product Information */}
      <div className="pt-3 pb-1 flex flex-col flex-1">
        {/* Category */}
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
          {product.categoryName}
        </span>

        {/* Title */}
        <Link href={`/product/${product.slug}`} className="hover:text-[#0084D4] transition-colors">
          <h3 className="font-heading font-semibold text-sm sm:text-base text-[#1E293B] group-hover:text-[#0084D4] leading-snug line-clamp-1 mb-1.5 transition-colors">
            {product.title}
          </h3>
        </Link>

        {/* Star Rating (Golden Yellow as in screenshot) */}
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${
                i < Math.floor(product.rating || 5)
                  ? "fill-[#F59E0B] text-[#F59E0B]"
                  : "fill-slate-200 text-slate-200"
              }`}
            />
          ))}
          <span className="text-[11px] text-slate-400 font-medium ml-1">
            ({product.reviewCount || 12})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-2">
          <span className="font-bold text-[#1E293B] text-sm sm:text-base font-sans">
            {formatPrice(currentPrice)}
          </span>
          {originalPrice && originalPrice > currentPrice && (
            <span className="text-xs text-slate-400 line-through font-sans">
              {formatPrice(originalPrice)}
            </span>
          )}
        </div>

        {/* Interactive Color Swatches (as shown in screenshot) */}
        {product.variants.length > 1 && (
          <div className="flex items-center gap-1.5 pt-1">
            {product.variants.map((v, idx) => (
              <button
                key={v.sku}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedVariantIndex(idx);
                }}
                title={v.colorName}
                className={`w-3.5 h-3.5 rounded-full border border-slate-300 transition-all ${
                  selectedVariantIndex === idx
                    ? "ring-2 ring-offset-1 ring-[#0084D4] scale-110"
                    : "opacity-70 hover:opacity-100"
                }`}
                style={{ backgroundColor: v.colorHex }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

