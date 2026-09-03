"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Check } from "lucide-react";
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
      className={`group relative flex flex-col bg-transparent overflow-hidden transition-all ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1. Editorial Image Container */}
      <div className="relative aspect-[4/5] sm:aspect-square w-full bg-[#EFEBE4] rounded-lg overflow-hidden border border-[#E7E2DA]/60">
        <Link href={`/product/${product.slug}`} className="block w-full h-full relative">
          <Image
            src={isHovered && secondaryImage !== primaryImage ? secondaryImage : primaryImage}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-103"
          />
        </Link>

        {/* Minimal Sale Indicator: Very light cognac background + cognac text */}
        {isOnSale && (
          <span className="absolute top-3 left-3 bg-[#A85A20]/10 text-[#A85A20] text-xs font-semibold px-2.5 py-1 rounded-sm uppercase tracking-wider z-10 border border-[#A85A20]/20">
            Sale
          </span>
        )}

        {/* Minimal Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          aria-label="Wishlist"
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 text-[#625E58] hover:text-[#181817] flex items-center justify-center transition-colors z-10 shadow-subtle"
        >
          <Heart className={`w-4 h-4 ${inWishlist ? "fill-[#A85A20] text-[#A85A20]" : ""}`} />
        </button>

        {/* Quick Add Button on Hover */}
        <div className="absolute inset-x-3 bottom-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-200 z-10">
          <button
            onClick={handleQuickAdd}
            disabled={currentVariant?.stock === 0}
            className={`w-full py-2.5 px-3 rounded-md text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-subtle transition-colors ${
              isAdded
                ? "bg-[#2D5A3C] text-white"
                : currentVariant?.stock === 0
                ? "bg-[#E7E2DA] text-[#625E58] cursor-not-allowed"
                : "bg-[#181817] text-white hover:bg-[#2C2B29]"
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
                <ShoppingBag className="w-3.5 h-3.5 text-[#B8AA98]" />
                <span>Add to Bag</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 2. Product Metadata */}
      <div className="pt-3.5 pb-1 flex flex-col flex-1">
        {/* Category Label */}
        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#A85A20] mb-0.5">
          {product.categoryName}
        </span>

        {/* Product Title in Cormorant Garamond */}
        <Link href={`/product/${product.slug}`} className="hover:text-[#A85A20] transition-colors">
          <h3 className="font-editorial text-xl text-[#181817] leading-snug line-clamp-1 mb-1 font-normal">
            {product.title}
          </h3>
        </Link>

        {/* Color Swatches if multiple */}
        {product.variants.length > 1 && (
          <div className="flex items-center gap-1.5 my-1">
            {product.variants.map((v, idx) => (
              <button
                key={v.sku}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedVariantIndex(idx);
                }}
                title={v.colorName}
                className={`w-3.5 h-3.5 rounded-full border border-[#181817]/20 transition-all ${
                  selectedVariantIndex === idx
                    ? "ring-1 ring-offset-1 ring-[#181817] scale-110"
                    : "opacity-60 hover:opacity-100"
                }`}
                style={{ backgroundColor: v.colorHex }}
              />
            ))}
          </div>
        )}

        {/* Price & Stock */}
        <div className="flex items-center justify-between gap-2 mt-auto pt-1.5">
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-[#181817] text-base sm:text-lg font-ui">
              {formatPrice(currentPrice)}
            </span>
            {originalPrice && originalPrice > currentPrice && (
              <span className="text-xs sm:text-sm text-[#625E58] line-through font-ui">
                {formatPrice(originalPrice)}
              </span>
            )}
          </div>

          <span className="text-xs text-[#2D5A3C] font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2D5A3C] inline-block" />
            In stock
          </span>
        </div>
      </div>
    </div>
  );
};
