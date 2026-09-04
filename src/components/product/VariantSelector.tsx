"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ShoppingCart,
  Heart,
  Share2,
  Check,
  Truck,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";
import { Product, ProductVariant } from "@/types";
import { useStore } from "@/context/StoreContext";
import { formatPrice } from "@/utils/currency";

interface VariantSelectorProps {
  product: Product;
  selectedVariant: ProductVariant;
  onVariantChange: (variant: ProductVariant) => void;
}

export const VariantSelector: React.FC<VariantSelectorProps> = ({
  product,
  selectedVariant,
  onVariantChange,
}) => {
  const router = useRouter();
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const inWishlist = isInWishlist(product.id);
  const currentPrice = product.basePrice + (selectedVariant.priceOffset || 0);
  const originalPrice = product.compareAtPrice
    ? product.compareAtPrice + (selectedVariant.priceOffset || 0)
    : undefined;

  const discountPercentage = originalPrice
    ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(product, selectedVariant, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedVariant, quantity);
    router.push("/checkout");
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Price Display */}
      <div className="space-y-1.5 border-b border-slate-100 pb-6">
        <div className="flex items-baseline gap-3">
          <span className="font-bold text-3xl sm:text-4xl text-[#1E293B]">
            {formatPrice(currentPrice)}
          </span>
          {originalPrice && (
            <span className="text-base sm:text-lg text-slate-400 line-through">
              {formatPrice(originalPrice)}
            </span>
          )}
          {discountPercentage > 0 && (
            <span className="bg-[#0084D4] text-white text-xs font-bold px-2 py-0.5 rounded-none uppercase tracking-wider">
              Save {discountPercentage}%
            </span>
          )}
        </div>
        <p className="text-xs text-slate-500">
          Price includes VAT. Cash on Delivery available across all 64 districts in Bangladesh.
        </p>
      </div>

      {/* Color Selection Swatches */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="font-bold text-[#1E293B] uppercase tracking-wider">
            Color: <span className="text-[#0084D4]">{selectedVariant.colorName}</span>
          </span>
          <span className="text-xs">
            {selectedVariant.stock > 0 ? (
              <span className="text-emerald-600 font-bold">
                {selectedVariant.stock} available in stock
              </span>
            ) : (
              <span className="text-rose-500 font-bold">Out of Stock</span>
            )}
          </span>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {product.variants.map((variant) => {
            const isSelected = variant.sku === selectedVariant.sku;
            return (
              <button
                key={variant.sku}
                onClick={() => onVariantChange(variant)}
                className={`flex items-center gap-2 px-3 py-2 border transition-all ${
                  isSelected
                    ? "border-[#0084D4] ring-2 ring-[#0084D4]/30 bg-sky-50/40"
                    : "border-slate-200 hover:border-slate-400 bg-white"
                }`}
              >
                <span
                  className="w-4 h-4 rounded-full border border-slate-300"
                  style={{ backgroundColor: variant.colorHex }}
                />
                <span className="text-xs font-semibold text-[#1E293B]">
                  {variant.colorName}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quantity & Action Buttons */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center gap-3">
          {/* Quantity Selector */}
          <div className="flex items-center border border-slate-200 bg-white h-12">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-3.5 h-full text-slate-600 hover:bg-slate-100 transition-colors font-bold"
            >
              -
            </button>
            <span className="w-10 text-center text-sm font-bold text-[#1E293B]">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(Math.min(selectedVariant.stock || 10, quantity + 1))}
              className="px-3.5 h-full text-slate-600 hover:bg-slate-100 transition-colors font-bold"
            >
              +
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={selectedVariant.stock === 0}
            className={`flex-1 h-12 px-4 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md rounded-none ${
              isAdded
                ? "bg-emerald-600 text-white"
                : selectedVariant.stock === 0
                ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                : "bg-[#0084D4] hover:bg-[#0073B6] text-white"
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart</span>
              </>
            )}
          </button>

          {/* Wishlist Button */}
          <button
            onClick={() => toggleWishlist(product.id)}
            className="w-12 h-12 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-rose-500 hover:border-rose-300 transition-colors bg-white shadow-xs rounded-none"
            aria-label="Wishlist"
          >
            <Heart className={`w-5 h-5 ${inWishlist ? "fill-rose-500 text-rose-500" : ""}`} />
          </button>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="w-12 h-12 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-[#0084D4] hover:border-[#0084D4] transition-colors bg-white shadow-xs rounded-none"
            aria-label="Share"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        {/* Primary CTA: BUY NOW — CASH ON DELIVERY */}
        <button
          onClick={handleBuyNow}
          disabled={selectedVariant.stock === 0}
          className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-md"
        >
          <span>Buy Now — Cash on Delivery</span>
        </button>
      </div>

      {/* Trust & Guarantee Grid */}
      <div className="pt-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center shrink-0">
            <Truck className="w-4 h-4 text-[#0084D4]" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-800">Doorstep COD</h4>
            <p className="text-[11px] text-slate-500">Pay when you receive</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4 text-[#0084D4]" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-800">Quality Guarantee</h4>
            <p className="text-[11px] text-slate-500">100% Genuine materials</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center shrink-0">
            <RotateCcw className="w-4 h-4 text-[#0084D4]" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-800">Easy Returns</h4>
            <p className="text-[11px] text-slate-500">Hassle-free exchanges</p>
          </div>
        </div>
      </div>
    </div>
  );
};
