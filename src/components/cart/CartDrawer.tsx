"use client";

import React, { useEffect } from "react";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useStore } from "@/context/StoreContext";
import { CouponBox } from "./CouponBox";
import { formatPrice } from "@/utils/currency";

export const CartDrawer: React.FC = () => {
  const pathname = usePathname();
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    discountAmount,
    shippingFee,
    cartTotal,
    cartItemCount,
    freeShippingThreshold,
  } = useStore();

  const router = useRouter();

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isCartOpen]);

  // Hide cart drawer on all admin pages
  if (!isCartOpen || pathname.startsWith("/admin")) return null;

  const freeShippingProgress = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    router.push("/checkout");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200 font-sans">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#0D0C0B]/70 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F8F5EF] shadow-2xl flex flex-col justify-between border-l border-[#E5DED4]">
          {/* Header */}
          <div className="p-5 border-b border-[#E5DED4] flex items-center justify-between bg-[#F8F5EF]">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#C9A45C] stroke-[1.75]" />
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0D0C0B]">
                Shopping Bag ({cartItemCount})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-[#746C63] hover:text-[#0D0C0B] rounded-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress */}
          <div className="bg-[#FFFFFF] border-b border-[#E5DED4] px-5 py-3.5">
            <div className="flex items-center justify-between text-xs text-[#0D0C0B] mb-2">
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#C9A45C]" />
                {remainingForFreeShipping === 0 ? (
                  <span className="text-[#0D0C0B] font-semibold">Complimentary Delivery Unlocked</span>
                ) : (
                  <span className="text-[#746C63]">
                    Add <strong className="text-[#0D0C0B] font-semibold">{formatPrice(remainingForFreeShipping)}</strong> for Free Delivery
                  </span>
                )}
              </span>
              <span className="text-[11px] text-[#746C63] font-mono">
                {formatPrice(cartSubtotal)} / {formatPrice(freeShippingThreshold)}
              </span>
            </div>
            <div className="w-full h-1 bg-[#E5DED4] overflow-hidden">
              <div
                className="h-full bg-[#C9A45C] transition-all duration-500"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="py-20 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#FFFFFF] border border-[#E5DED4] text-[#C9A45C] flex items-center justify-center mx-auto shadow-xs">
                  <ShoppingBag className="w-6 h-6 stroke-[1.5]" />
                </div>
                <h3 className="font-heading font-normal text-2xl text-[#0D0C0B]">
                  Your Bag is Empty
                </h3>
                <p className="text-xs text-[#746C63] max-w-xs mx-auto leading-relaxed font-light">
                  Discover our curated collections of luxury handbags, totes, and accessories.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-8 py-3.5 bg-[#0D0C0B] hover:bg-[#C9A45C] text-[#F8F5EF] hover:text-[#0D0C0B] text-xs font-semibold uppercase tracking-[0.18em] transition-all shadow-xs"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              <div className="divide-y divide-[#E5DED4]">
                {cart.map((item) => (
                  <div key={item.id} className="py-4 first:pt-0 flex gap-4">
                    {/* Item Image */}
                    <div className="relative w-20 h-24 bg-[#FFFFFF] border border-[#E5DED4] shrink-0 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-heading font-medium text-sm text-[#0D0C0B] leading-snug line-clamp-1">
                            {item.title}
                          </h4>
                          <div className="text-[11px] text-[#746C63] mt-0.5 font-light">
                            {item.colorName} • {item.sizeOrCapacity}
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#746C63] hover:text-[#EF4444] p-1 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        {/* Quantity controls */}
                        <div className="flex items-center border border-[#E5DED4] bg-[#FFFFFF]">
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center text-[#0D0C0B] hover:bg-[#F8F5EF] transition-colors"
                          >
                            <Minus className="w-2.5 h-2.5" />
                          </button>
                          <span className="w-6 text-center text-xs font-semibold text-[#0D0C0B]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center text-[#0D0C0B] hover:bg-[#F8F5EF] transition-colors"
                          >
                            <Plus className="w-2.5 h-2.5" />
                          </button>
                        </div>

                        <span className="font-semibold text-xs text-[#0D0C0B]">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Coupon component inside drawer */}
                <div className="pt-4">
                  <CouponBox />
                </div>
              </div>
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#E5DED4] bg-[#FFFFFF] space-y-3">
              {/* Cost Summary */}
              <div className="space-y-1.5 text-xs text-[#746C63]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#0D0C0B]">{formatPrice(cartSubtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#10B981] font-semibold">
                    <span>Privilege Discount</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Insured Delivery</span>
                  <span className="font-semibold text-[#0D0C0B]">
                    {shippingFee === 0 ? "Complimentary" : formatPrice(shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-[#0D0C0B] pt-2 border-t border-[#E5DED4]">
                  <span>Total (Pay on Delivery)</span>
                  <span className="font-bold text-base text-[#0D0C0B]">{formatPrice(cartTotal)}</span>
                </div>
              </div>

              {/* Action Button: Luxury Obsidian & Gold */}
              <button
                onClick={handleCheckoutClick}
                className="w-full h-12 px-4 bg-[#0D0C0B] hover:bg-[#C9A45C] text-[#F8F5EF] hover:text-[#0D0C0B] font-semibold text-xs uppercase tracking-[0.18em] flex items-center justify-center gap-2 shadow-sm transition-all duration-300"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-between text-[11px] text-[#746C63] pt-1">
                <div className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C9A45C]" />
                  <span>Nationwide Cash on Delivery</span>
                </div>
                <Link
                  href="/cart"
                  onClick={() => setIsCartOpen(false)}
                  className="font-semibold text-[#0D0C0B] hover:text-[#C9A45C] transition-colors uppercase tracking-wider text-[10px]"
                >
                  View Full Cart &rarr;
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


