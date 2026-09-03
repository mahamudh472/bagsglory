"use client";

import React, { useEffect } from "react";
import { X, Trash2, Plus, Minus, ShoppingCart, ArrowRight, ShieldCheck, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore } from "@/context/StoreContext";
import { CouponBox } from "./CouponBox";
import { formatPrice } from "@/utils/currency";

export const CartDrawer: React.FC = () => {
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

  if (!isCartOpen) return null;

  const freeShippingProgress = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    router.push("/checkout");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200 font-ui">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#181817]/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-5 border-b border-[#E7E2DA] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4 text-[#A85A20]" />
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[#181817]">
                Shopping Cart ({cartItemCount})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-[#625E58] hover:text-[#181817] rounded-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress */}
          <div className="bg-[#F8F6F1] border-b border-[#E7E2DA] px-5 py-3">
            <div className="flex items-center justify-between text-xs text-[#181817] mb-1.5">
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#A85A20]" />
                {remainingForFreeShipping === 0 ? (
                  <span className="text-[#2D5A3C] font-semibold">You unlocked Free Delivery!</span>
                ) : (
                  <span>
                    Add <strong className="text-[#181817]">{formatPrice(remainingForFreeShipping)}</strong> for Free Delivery
                  </span>
                )}
              </span>
              <span className="text-[11px] text-[#625E58] font-mono">
                {formatPrice(cartSubtotal)} / {formatPrice(freeShippingThreshold)}
              </span>
            </div>
            <div className="w-full h-1 bg-[#E7E2DA] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#181817] transition-all duration-500 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="py-20 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#F8F6F1] border border-[#E7E2DA] text-[#625E58] flex items-center justify-center mx-auto">
                  <ShoppingCart className="w-5 h-5" />
                </div>
                <h3 className="font-editorial text-2xl text-[#181817]">
                  Your cart is empty
                </h3>
                <p className="text-xs text-[#625E58] max-w-xs mx-auto leading-relaxed">
                  Discover our artisanal leather backpacks, totes, and briefcases.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 bg-[#181817] text-white rounded-md text-xs font-semibold uppercase tracking-wider"
                >
                  Explore Catalog
                </button>
              </div>
            ) : (
              <div className="divide-y divide-[#E7E2DA]">
                {cart.map((item) => (
                  <div key={item.id} className="py-4 first:pt-0 flex gap-4">
                    {/* Item Image */}
                    <div className="relative w-20 h-24 rounded-md overflow-hidden bg-[#EFEBE4] border border-[#E7E2DA] shrink-0">
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
                          <h4 className="font-semibold text-xs text-[#181817] leading-snug line-clamp-1">
                            {item.title}
                          </h4>
                          <div className="text-[11px] text-[#625E58] mt-0.5">
                            {item.colorName} • {item.sizeOrCapacity}
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#8C827A] hover:text-[#181817] p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        {/* Quantity controls */}
                        <div className="flex items-center border border-[#E7E2DA] rounded bg-white">
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center text-[#181817] hover:bg-[#F8F6F1]"
                          >
                            <Minus className="w-2.5 h-2.5" />
                          </button>
                          <span className="w-6 text-center text-xs font-semibold text-[#181817]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center text-[#181817] hover:bg-[#F8F6F1]"
                          >
                            <Plus className="w-2.5 h-2.5" />
                          </button>
                        </div>

                        <span className="font-semibold text-xs text-[#181817]">
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
            <div className="p-5 border-t border-[#E7E2DA] bg-[#F8F6F1] space-y-3">
              {/* Cost Summary */}
              <div className="space-y-1.5 text-xs text-[#625E58]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#181817]">{formatPrice(cartSubtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#2D5A3C] font-semibold">
                    <span>Discount Applied</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Courier Delivery</span>
                  <span className="font-semibold text-[#181817]">
                    {shippingFee === 0 ? "Free" : formatPrice(shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-[#181817] pt-2 border-t border-[#E7E2DA]">
                  <span>Total (Cash on Delivery)</span>
                  <span className="font-bold text-base text-[#181817]">{formatPrice(cartTotal)}</span>
                </div>
              </div>

              {/* Action Button: 6-8px radius, Charcoal background */}
              <button
                onClick={handleCheckoutClick}
                className="w-full h-12 px-4 bg-[#181817] hover:bg-[#2C2B29] text-white rounded-md font-semibold text-xs uppercase tracking-[0.12em] flex items-center justify-center gap-2 shadow-subtle transition-colors"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-between text-[11px] text-[#625E58] pt-1">
                <div className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#2D5A3C]" />
                  <span>Pay cash upon parcel arrival</span>
                </div>
                <Link
                  href="/cart"
                  onClick={() => setIsCartOpen(false)}
                  className="font-semibold underline hover:text-[#181817]"
                >
                  View Full Cart
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
