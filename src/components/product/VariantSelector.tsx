"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ShoppingBag,
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
      <div className="space-y-2 border-b border-[#E5DED4] pb-6">
        <div className="flex items-baseline gap-3">
          <span className="font-semibold text-3xl sm:text-4xl text-[#0D0C0B]">
            {formatPrice(currentPrice)}
          </span>
          {originalPrice && (
            <span className="text-base sm:text-lg text-[#746C63] line-through font-light">
              {formatPrice(originalPrice)}
            </span>
          )}
          {discountPercentage > 0 && (
            <span className="bg-[#0D0C0B] text-[#C9A45C] text-[10px] font-semibold px-2.5 py-1 uppercase tracking-[0.2em] border border-[#C9A45C]/40">
              SAVE {discountPercentage}%
            </span>
          )}
        </div>
        <p className="text-xs text-[#746C63] font-light">
          Price includes tax. Complimentary insured delivery & Nationwide Cash on Delivery available.
        </p>
      </div>

      {/* Color Selection Swatches */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-[#0D0C0B] uppercase tracking-[0.18em]">
            Leather Finish: <span className="text-[#C9A45C]">{selectedVariant.colorName}</span>
          </span>
          <span className="text-xs">
            {selectedVariant.stock > 0 ? (
              <span className="text-[#0D0C0B] font-medium text-[11px] uppercase tracking-wider">
                ● In Atelier Stock
              </span>
            ) : (
              <span className="text-[#EF4444] font-medium text-[11px] uppercase tracking-wider">Out of Stock</span>
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
                className={`flex items-center gap-2 px-3.5 py-2.5 border transition-all text-xs font-semibold uppercase tracking-wider ${
                  isSelected
                    ? "border-[#0D0C0B] ring-1 ring-[#C9A45C] bg-[#F8F5EF]"
                    : "border-[#E5DED4] hover:border-[#0D0C0B] bg-[#FFFFFF]"
                }`}
              >
                <span
                  className="w-3.5 h-3.5 rounded-full border border-[#E5DED4]"
                  style={{ backgroundColor: variant.colorHex }}
                />
                <span className="text-[#0D0C0B]">
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
          <div className="flex items-center border border-[#E5DED4] bg-[#FFFFFF] h-12">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-3.5 h-full text-[#0D0C0B] hover:bg-[#F8F5EF] transition-colors font-medium"
            >
              -
            </button>
            <span className="w-10 text-center text-xs font-semibold text-[#0D0C0B]">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(Math.min(selectedVariant.stock || 10, quantity + 1))}
              className="px-3.5 h-full text-[#0D0C0B] hover:bg-[#F8F5EF] transition-colors font-medium"
            >
              +
            </button>
          </div>

          {/* Add to Bag Button */}
          <button
            onClick={handleAddToCart}
            disabled={selectedVariant.stock === 0}
            aria-label={isAdded ? "Added to Bag" : "Add to Bag"}
            className={`flex-1 h-12 px-3 sm:px-4 text-xs font-semibold uppercase tracking-[0.18em] flex items-center justify-center gap-2 transition-all duration-300 shadow-xs ${
              isAdded
                ? "bg-[#10B981] text-white"
                : selectedVariant.stock === 0
                ? "bg-[#E5DED4] text-[#746C63] cursor-not-allowed"
                : "bg-[#0D0C0B] hover:bg-[#C9A45C] text-[#F8F5EF] hover:text-[#0D0C0B]"
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4" />
                <span className="hidden sm:inline">Added to Bag</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline">Add to Bag</span>
              </>
            )}
          </button>

          {/* Wishlist Button */}
          <button
            onClick={() => toggleWishlist(product.id)}
            className="w-12 h-12 border border-[#E5DED4] flex items-center justify-center text-[#171513] hover:text-[#C9A45C] hover:border-[#C9A45C] transition-colors bg-[#FFFFFF] shadow-xs"
            aria-label="Wishlist"
          >
            <Heart className={`w-4 h-4 stroke-[1.75] ${inWishlist ? "fill-[#C9A45C] text-[#C9A45C]" : ""}`} />
          </button>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="w-12 h-12 border border-[#E5DED4] flex items-center justify-center text-[#171513] hover:text-[#C9A45C] hover:border-[#C9A45C] transition-colors bg-[#FFFFFF] shadow-xs"
            aria-label="Share"
            title={copiedLink ? "Link Copied!" : "Share"}
          >
            {copiedLink ? <Check className="w-4 h-4 text-[#C9A45C]" /> : <Share2 className="w-4 h-4" />}
          </button>
        </div>

        {/* Primary CTA: BUY NOW — CASH ON DELIVERY */}
        <button
          onClick={handleBuyNow}
          disabled={selectedVariant.stock === 0}
          className="w-full h-12 bg-transparent hover:bg-[#0D0C0B] text-[#0D0C0B] hover:text-[#F8F5EF] border border-[#0D0C0B] font-semibold text-xs uppercase tracking-[0.18em] transition-all duration-300 flex items-center justify-center gap-2"
        >
          <span>Immediate Purchase — Cash on Delivery</span>
        </button>
      </div>

      {/* Trust & Guarantee Grid */}
      <div className="pt-6 border-t border-[#E5DED4] grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#FFFFFF] border border-[#E5DED4] flex items-center justify-center shrink-0">
            <Truck className="w-4 h-4 text-[#C9A45C] stroke-[1.5]" />
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#0D0C0B]">Doorstep COD</h4>
            <p className="text-[11px] text-[#746C63] font-light">Pay on parcel inspection</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#FFFFFF] border border-[#E5DED4] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4 text-[#C9A45C] stroke-[1.5]" />
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#0D0C0B]">Authenticity</h4>
            <p className="text-[11px] text-[#746C63] font-light">100% Full-grain leather</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#FFFFFF] border border-[#E5DED4] flex items-center justify-center shrink-0">
            <RotateCcw className="w-4 h-4 text-[#C9A45C] stroke-[1.5]" />
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#0D0C0B]">Atelier Care</h4>
            <p className="text-[11px] text-[#746C63] font-light">Complimentary exchange</p>
          </div>
        </div>
      </div>
    </div>
  );
};

