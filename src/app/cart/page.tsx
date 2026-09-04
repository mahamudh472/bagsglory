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
      <div className="bg-white min-h-screen py-20 font-sans">
        <div className="max-w-xl mx-auto px-4 text-center">
          <div className="bg-slate-50 p-12 border border-slate-200 shadow-sm space-y-4">
            <div className="w-14 h-14 rounded-full bg-white border border-slate-200 text-slate-400 flex items-center justify-center mx-auto">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <h1 className="font-heading font-bold text-2xl text-[#1E293B]">
              Your Shopping Cart is Empty
            </h1>
            <p className="text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
              Explore our handcrafted luxury backpacks, structured totes, and travel bags.
            </p>
            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#0084D4] hover:bg-[#0073B6] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md rounded-none"
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
    <div className="bg-white min-h-screen py-10 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-100">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0084D4] block mb-1">
              Review Items
            </span>
            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#1E293B]">
              Shopping Cart ({cart.reduce((c, i) => c + i.quantity, 0)} Items)
            </h1>
          </div>

          <Link
            href="/shop"
            className="text-xs font-bold text-slate-500 hover:text-[#0084D4] flex items-center gap-1.5 uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>
        </div>

        {/* Free Shipping Alert Bar */}
        <div className="bg-slate-50 border border-slate-200 p-4 mb-8 shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#1E293B] mb-2">
            <span className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#0084D4]" />
              {remainingForFreeShipping === 0 ? (
                <span className="text-emerald-600 font-bold">You unlocked Free Doorstep Courier Delivery!</span>
              ) : (
                <span>
                  Add <strong className="text-[#0084D4]">{formatPrice(remainingForFreeShipping)}</strong> for Free Delivery
                </span>
              )}
            </span>
            <span className="text-xs text-slate-500 font-mono">
              {formatPrice(cartSubtotal)} / {formatPrice(freeShippingThreshold)}
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#0084D4] transition-all duration-500 rounded-full"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Items Table / List (8 Cols) */}
          <div className="lg:col-span-8 bg-white border border-slate-200 p-6 shadow-xs space-y-6">
            <div className="divide-y divide-slate-100">
              {cart.map((item) => (
                <div key={item.id} className="py-5 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="relative w-20 h-24 overflow-hidden bg-slate-50 border border-slate-200 shrink-0">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-sm text-[#1E293B] leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {item.colorName} • {item.sizeOrCapacity}
                      </p>
                      <p className="text-xs font-bold text-[#0084D4] mt-2">
                        {formatPrice(item.price)} each
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                    {/* Stepper */}
                    <div className="flex items-center border border-slate-200 bg-white">
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-[#1E293B] hover:bg-slate-100"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-[#1E293B]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-[#1E293B] hover:bg-slate-100"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="font-bold text-sm text-[#1E293B]">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-slate-400 hover:text-rose-600 p-1.5 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
              <button
                onClick={clearCart}
                className="text-xs text-slate-400 hover:text-rose-600 font-semibold uppercase tracking-wider"
              >
                Clear entire bag
              </button>
            </div>
          </div>

          {/* Right Summary Card (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-50 border border-slate-200 p-6 shadow-xs space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#1E293B] pb-2 border-b border-slate-200">
                Order Summary
              </h2>

              <CouponBox />

              <div className="space-y-2 pt-4 border-t border-slate-200 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-[#1E293B]">{formatPrice(cartSubtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Discount Applied</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Courier Delivery Fee</span>
                  <span className="font-bold text-[#1E293B]">
                    {shippingFee === 0 ? "Free" : formatPrice(shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between items-baseline text-sm pt-3 border-t border-slate-200">
                  <span className="font-bold text-[#1E293B]">Total (Cash on Delivery)</span>
                  <span className="font-extrabold text-lg text-[#0084D4]">{formatPrice(cartTotal)}</span>
                </div>
              </div>

              <button
                onClick={() => router.push("/checkout")}
                className="w-full h-12 bg-[#0084D4] hover:bg-[#0073B6] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md rounded-none"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center text-[11px] text-slate-500 pt-1 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero prepayment. Pay cash upon delivery.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

