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
    <div className="space-y-6 font-ui">
      {/* Dynamic Price Display */}
      <div className="space-y-1.5 border-b border-[#E7E2DA] pb-6">
        <div className="flex items-baseline gap-3">
          <span className="font-ui font-bold text-3xl sm:text-4xl text-[#181817]">
            {formatPrice(currentPrice)}
          </span>
          {originalPrice && (
            <span className="text-base sm:text-lg text-[#625E58] line-through font-ui">
              {formatPrice(originalPrice)}
            </span>
          )}
          {discountPercentage > 0 && (
            <span className="bg-[#A85A20]/10 text-[#A85A20] text-xs font-semibold px-2.5 py-1 rounded-sm uppercase tracking-wider border border-[#A85A20]/20">
              Save {discountPercentage}%
            </span>
          )}
        </div>
        <p className="text-xs text-[#625E58]">
          Price includes VAT. Cash on Delivery available across all 64 districts in Bangladesh.
        </p>
      </div>

      {/* Color Selection Swatches */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold text-[#181817] uppercase tracking-[0.1em]">
            Selected Finish: <span className="font-bold text-[#A85A20]">{selectedVariant.colorName}</span>
          </span>
          <span className="text-xs">
            {selectedVariant.stock > 0 ? (
              <span className="text-[#2D5A3C] font-semibold">
                {selectedVariant.stock} available in stock
              </span>
            ) : (
              <span className="text-[#A33B3B] font-semibold">Out of Stock</span>
            )}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {product.variants.map((variant) => {
            const isSelected = variant.sku === selectedVariant.sku;
            return (
              <button
                key={variant.sku}
                onClick={() => onVariantChange(variant)}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-md border text-sm font-medium transition-all ${
                  isSelected
                    ? "border-[#181817] bg-[#FFFFFF] text-[#181817] ring-1 ring-[#181817]"
                    : "border-[#E7E2DA] hover:border-[#B8AA98] text-[#625E58] bg-[#FFFFFF]"
                }`}
              >
                <span
                  className="w-4 h-4 rounded-full border border-[#181817]/15 shrink-0"
                  style={{ backgroundColor: variant.colorHex }}
                />
                <span>{variant.colorName}</span>
                {variant.priceOffset !== 0 && (
                  <span className="text-xs text-[#625E58]">
                    ({variant.priceOffset > 0 ? `+${formatPrice(variant.priceOffset)}` : `-${formatPrice(Math.abs(variant.priceOffset))}`})
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Size / Capacity Indicator */}
      <div className="space-y-2">
        <label className="text-sm font-semibold uppercase tracking-[0.1em] text-[#181817] block">
          Capacity & Dimensions
        </label>
        <div className="p-3.5 bg-[#FFFFFF] rounded-md border border-[#E7E2DA] flex items-center justify-between text-sm">
          <div className="font-semibold text-[#181817]">
            {selectedVariant.sizeOrCapacity}
          </div>
          <div className="text-[#625E58]">
            {product.specs.dimensions}
          </div>
        </div>
      </div>

      {/* Quantity Selector & Action Row */}
      <div className="space-y-3.5 pt-1">
        <div className="flex items-center gap-2.5">
          {/* Quantity Stepper */}
          <div className="flex items-center border border-[#E7E2DA] rounded-md bg-[#FFFFFF] p-0.5 shrink-0">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-9 sm:w-10 h-12 flex items-center justify-center text-[#181817] hover:bg-[#F8F6F1] rounded transition-colors text-base font-semibold"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="w-8 sm:w-10 text-center font-semibold text-sm text-[#181817]">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(Math.min(selectedVariant.stock, quantity + 1))}
              disabled={quantity >= selectedVariant.stock}
              className="w-9 sm:w-10 h-12 flex items-center justify-center text-[#181817] hover:bg-[#F8F6F1] rounded transition-colors text-base font-semibold disabled:opacity-30"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          {/* Add to Cart (Icon Only) */}
          <button
            onClick={handleAddToCart}
            disabled={selectedVariant.stock === 0}
            title={isAdded ? "Added to Cart" : "Add to Cart"}
            aria-label="Add to Cart"
            className={`w-12 h-12 sm:w-14 rounded-md flex items-center justify-center transition-all shadow-subtle shrink-0 ${
              isAdded
                ? "bg-[#2D5A3C] text-white"
                : selectedVariant.stock === 0
                ? "bg-[#E7E2DA] text-[#625E58] cursor-not-allowed"
                : "bg-[#181817] text-white hover:bg-[#2C2B29]"
            }`}
          >
            {isAdded ? (
              <Check className="w-5 h-5 text-white" />
            ) : (
              <ShoppingCart className="w-5 h-5 text-[#B8AA98]" />
            )}
          </button>

          {/* Wishlist Button */}
          <button
            onClick={() => toggleWishlist(product.id)}
            aria-label="Wishlist"
            title="Add to Wishlist"
            className={`w-12 h-12 sm:w-14 rounded-md border flex items-center justify-center transition-colors shrink-0 ${
              inWishlist
                ? "bg-white border-[#A85A20] text-[#A85A20]"
                : "bg-white border-[#E7E2DA] text-[#625E58] hover:border-[#181817]"
            }`}
          >
            <Heart className={`w-5 h-5 ${inWishlist ? "fill-[#A85A20]" : ""}`} />
          </button>

          {/* Share Button */}
          <button
            onClick={handleShare}
            aria-label="Share"
            className="w-12 h-12 sm:w-14 rounded-md border border-[#E7E2DA] bg-white text-[#625E58] hover:border-[#181817] flex items-center justify-center transition-colors shrink-0 relative"
            title="Copy Link"
          >
            <Share2 className="w-5 h-5" />
            {copiedLink && (
              <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#181817] text-white text-[11px] px-2 py-0.5 rounded shadow-sm whitespace-nowrap z-20">
                Copied
              </span>
            )}
          </button>
        </div>

        {/* Primary CTA: BUY NOW — CASH ON DELIVERY */}
        <button
          onClick={handleBuyNow}
          disabled={selectedVariant.stock === 0}
          className="w-full h-12 bg-[#181817] hover:bg-[#2C2B29] text-white rounded-md font-semibold text-sm uppercase tracking-[0.1em] transition-colors flex items-center justify-center gap-2 shadow-subtle"
        >
          <span>Buy Now — Cash on Delivery</span>
        </button>
      </div>

      {/* Trust & Guarantee Grid */}
      <div className="pt-6 border-t border-[#E7E2DA] grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-[#FFFFFF] border border-[#E7E2DA] flex items-center justify-center shrink-0">
            <Truck className="w-4 h-4 text-[#A85A20]" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[#181817]">Doorstep COD</h4>
            <p className="text-xs text-[#625E58]">Pay when you receive</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-[#FFFFFF] border border-[#E7E2DA] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4 text-[#A85A20]" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[#181817]">Lifetime Warranty</h4>
            <p className="text-xs text-[#625E58]">Cast hardware & hides</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-[#FFFFFF] border border-[#E7E2DA] flex items-center justify-center shrink-0">
            <RotateCcw className="w-4 h-4 text-[#A85A20]" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[#181817]">30-Day Returns</h4>
            <p className="text-xs text-[#625E58]">Hassle-free exchanges</p>
          </div>
        </div>
      </div>
    </div>
  );
};
