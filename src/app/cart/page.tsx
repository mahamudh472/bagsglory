"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Truck,
  ArrowLeft,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { CouponBox } from "@/components/cart/CouponBox";
import { formatPrice } from "@/utils/currency";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    cartSubtotal,
    discountAmount,
    shippingFee,
    cartTotal,
    freeShippingThreshold,
  } = useStore();

  const router = useRouter();

  const freeShippingProgress = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  if (cart.length === 0) {
    return (
      <div className="bg-[#F8F5EF] min-h-screen py-24 font-sans">
        <div className="max-w-xl mx-auto px-4 text-center">
          <div className="bg-white p-14 border border-[#E5DED4] space-y-5">
            <div className="w-16 h-16 rounded-full bg-[#F8F5EF] border border-[#E5DED4] text-[#C9A45C] flex items-center justify-center mx-auto">
              <ShoppingBag className="w-7 h-7 stroke-[1.5]" />
            </div>
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C9A45C] block">
              Curated Bag
            </span>
            <h1 className="font-heading text-3xl text-[#0D0C0B]">
              Your Shopping Bag is Empty
            </h1>
            <p className="text-xs sm:text-sm text-[#746C63] font-light max-w-sm mx-auto leading-relaxed">
              Explore our handcrafted luxury handbags, structured totes, and timeless accessories.
            </p>
            <div className="pt-3">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#0D0C0B] hover:bg-[#C9A45C] hover:text-[#0D0C0B] text-white font-semibold text-xs uppercase tracking-[0.18em] transition-all rounded-none"
              >
                <span>Explore Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F8F5EF] min-h-screen py-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#E5DED4]">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#C9A45C] block mb-1">
              Your Selection
            </span>
            <h1 className="font-heading font-normal text-3xl sm:text-5xl text-[#0D0C0B]">
              Shopping Bag ({cart.reduce((c, i) => c + i.quantity, 0)} Items)
            </h1>
          </div>

          <Link
            href="/shop"
            className="text-xs font-semibold text-[#746C63] hover:text-[#0D0C0B] flex items-center gap-1.5 uppercase tracking-[0.16em] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Shopping</span>
          </Link>
        </div>

        {/* Free Shipping Alert Bar */}
        <div className="bg-white border border-[#E5DED4] p-5 mb-8">
          <div className="flex items-center justify-between text-xs text-[#0D0C0B] mb-2.5">
            <span className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#C9A45C]" />
              {remainingForFreeShipping === 0 ? (
                <span className="text-[#0D0C0B] font-semibold">✦ Complimentary White-Glove Courier Delivery Unlocked!</span>
              ) : (
                <span className="text-[#746C63]">
                  Add <strong className="text-[#0D0C0B] font-semibold">{formatPrice(remainingForFreeShipping)}</strong> for Complimentary Delivery
                </span>
              )}
            </span>
            <span className="text-[11px] text-[#746C63] font-mono">
              {formatPrice(cartSubtotal)} / {formatPrice(freeShippingThreshold)}
            </span>
          </div>
          <div className="w-full h-1 bg-[#F0ECE1] overflow-hidden">
            <div
              className="h-full bg-[#C9A45C] transition-all duration-500"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Items Table / List (8 Cols) */}
          <div className="lg:col-span-8 bg-white border border-[#E5DED4] p-6 sm:p-8 space-y-6">
            <div className="divide-y divide-[#E5DED4]">
              {cart.map((item) => (
                <div key={item.id} className="py-6 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-5">
                    <div className="relative w-20 h-24 overflow-hidden bg-[#F8F5EF] border border-[#E5DED4] shrink-0">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-heading font-medium text-lg text-[#0D0C0B] leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#746C63] uppercase tracking-wider mt-1">
                        {item.colorName} • {item.sizeOrCapacity}
                      </p>
                      <p className="text-xs font-semibold text-[#C9A45C] mt-2">
                        {formatPrice(item.price)} each
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                    {/* Stepper */}
                    <div className="flex items-center border border-[#E5DED4] bg-white">
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-[#0D0C0B] hover:bg-[#F8F5EF] transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-xs font-semibold text-[#0D0C0B]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-[#0D0C0B] hover:bg-[#F8F5EF] transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-right min-w-[70px]">
                      <span className="font-semibold text-sm text-[#0D0C0B]">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-[#746C63]/50 hover:text-rose-700 p-1.5 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-[#E5DED4] flex justify-between items-center">
              <button
                onClick={clearCart}
                className="text-[11px] text-[#746C63] hover:text-rose-700 font-semibold uppercase tracking-[0.15em] transition-colors"
              >
                Clear entire bag
              </button>
            </div>
          </div>

          {/* Right Summary Card (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-[#E5DED4] p-6 sm:p-7 space-y-5">
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0D0C0B] pb-3 border-b border-[#E5DED4]">
                Order Summary
              </h2>

              <CouponBox />

              <div className="space-y-3 pt-3 border-t border-[#E5DED4] text-xs text-[#746C63]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#0D0C0B]">{formatPrice(cartSubtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#C9A45C] font-semibold">
                    <span>Privilege Savings</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Courier Delivery Fee</span>
                  <span className="font-semibold text-[#0D0C0B]">
                    {shippingFee === 0 ? "Complimentary" : formatPrice(shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between items-baseline text-sm pt-4 border-t border-[#E5DED4]">
                  <span className="font-semibold uppercase tracking-wider text-xs text-[#0D0C0B]">Total (COD)</span>
                  <span className="font-normal font-heading text-2xl text-[#0D0C0B]">{formatPrice(cartTotal)}</span>
                </div>
              </div>

              <button
                onClick={() => router.push("/checkout")}
                className="w-full h-12 bg-[#0D0C0B] hover:bg-[#C9A45C] hover:text-[#0D0C0B] text-white font-semibold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all rounded-none"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center text-[11px] text-[#746C63] pt-1 flex items-center justify-center gap-1.5 font-light">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C9A45C]" />
                <span>Zero prepayment. Pay cash upon delivery.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

