"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Check, Star } from "lucide-react";
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
      className={`group relative flex flex-col bg-[#FFFFFF] border border-[#E5DED4] p-3 transition-all duration-500 hover:shadow-luxury hover:border-[#C9A45C]/60 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1. Product Image Container */}
      <div className="relative aspect-[4/5] w-full bg-[#F8F5EF] overflow-hidden">
        <Link href={`/product/${product.slug}`} className="block w-full h-full relative">
          <Image
            src={isHovered && secondaryImage !== primaryImage ? secondaryImage : primaryImage}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Restrained Luxury Sale Badge */}
        {isOnSale && (
          <div className="absolute top-3 left-3 bg-[#0D0C0B] text-[#C9A45C] text-[10px] font-semibold tracking-[0.2em] px-2.5 py-1 uppercase border border-[#C9A45C]/40 z-10">
            SALE
          </div>
        )}

        {/* Floating Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          aria-label="Wishlist"
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#FFFFFF]/90 backdrop-blur-xs text-[#171513] hover:text-[#C9A45C] flex items-center justify-center transition-all duration-300 z-10 shadow-xs opacity-0 group-hover:opacity-100 hover:scale-105"
        >
          <Heart className={`w-4 h-4 stroke-[1.75] ${inWishlist ? "fill-[#C9A45C] text-[#C9A45C]" : ""}`} />
        </button>

        {/* Quick Add Button on Hover */}
        <div className="absolute inset-x-3 bottom-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10">
          <button
            onClick={handleQuickAdd}
            disabled={currentVariant?.stock === 0}
            className={`w-full py-2.5 px-3 text-[11px] font-semibold uppercase tracking-[0.18em] flex items-center justify-center gap-2 transition-all duration-300 ${
              isAdded
                ? "bg-[#10B981] text-white"
                : currentVariant?.stock === 0
                ? "bg-[#E5DED4] text-[#746C63] cursor-not-allowed"
                : "bg-[#0D0C0B] text-[#F8F5EF] hover:bg-[#C9A45C] hover:text-[#0D0C0B]"
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added to Bag</span>
              </>
            ) : currentVariant?.stock === 0 ? (
              <span>Out of Stock</span>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Quick Add</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 2. Product Information */}
      <div className="pt-4 pb-1 flex flex-col flex-1">
        {/* Category */}
        <span className="text-[10px] font-semibold text-[#746C63] uppercase tracking-[0.2em] mb-1">
          {product.categoryName}
        </span>

        {/* Title */}
        <Link href={`/product/${product.slug}`} className="hover:text-[#C9A45C] transition-colors">
          <h3 className="font-heading font-medium text-base sm:text-lg text-[#0D0C0B] leading-snug line-clamp-1 mb-1.5 transition-colors">
            {product.title}
          </h3>
        </Link>

        {/* Star Rating in Champagne Gold */}
        <div className="flex items-center gap-1 mb-2.5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-3 h-3 ${
                i < Math.floor(product.rating || 5)
                  ? "fill-[#C9A45C] text-[#C9A45C]"
                  : "fill-[#E5DED4] text-[#E5DED4]"
              }`}
            />
          ))}
          <span className="text-[11px] text-[#746C63] font-light ml-1">
            ({product.reviewCount || 12})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-2 mt-auto">
          <span className="font-semibold text-[#0D0C0B] text-sm sm:text-base font-sans tracking-tight">
            {formatPrice(currentPrice)}
          </span>
          {originalPrice && originalPrice > currentPrice && (
            <span className="text-xs text-[#746C63] line-through font-sans">
              {formatPrice(originalPrice)}
            </span>
          )}
        </div>

        {/* Color Swatches */}
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
                className={`w-3.5 h-3.5 rounded-full border transition-all ${
                  selectedVariantIndex === idx
                    ? "border-[#0D0C0B] scale-115 ring-1 ring-[#C9A45C] ring-offset-1"
                    : "border-[#E5DED4] opacity-75 hover:opacity-100"
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


