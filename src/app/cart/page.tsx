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
      <div className="bg-[#F8F6F1] min-h-screen py-20 font-ui">
        <div className="max-w-xl mx-auto px-4 text-center">
          <div className="bg-white rounded-lg p-12 border border-[#E7E2DA] shadow-subtle space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#F8F6F1] border border-[#E7E2DA] text-[#625E58] flex items-center justify-center mx-auto">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <h1 className="font-editorial text-3xl text-[#181817]">
              Your Shopping Bag is Empty
            </h1>
            <p className="text-xs text-[#625E58] max-w-sm mx-auto leading-relaxed">
              Explore our artisanal leather backpacks, structured totes, and travel bags.
            </p>
            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-8 py-3 bg-[#181817] hover:bg-[#2C2B29] text-white rounded-md text-xs font-semibold uppercase tracking-wider transition-colors shadow-subtle"
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
    <div className="bg-[#F8F6F1] min-h-screen py-10 font-ui">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#E7E2DA]">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A85A20] block mb-1">
              Review Bag
            </span>
            <h1 className="font-editorial text-3xl sm:text-4xl text-[#181817] font-normal">
              Shopping Bag ({cart.reduce((c, i) => c + i.quantity, 0)} Items)
            </h1>
          </div>

          <Link
            href="/shop"
            className="text-xs font-semibold text-[#625E58] hover:text-[#181817] flex items-center gap-1.5 uppercase tracking-wider"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Shopping</span>
          </Link>
        </div>

        {/* Free Shipping Alert Bar */}
        <div className="bg-white border border-[#E7E2DA] rounded-md p-4 mb-8 shadow-subtle">
          <div className="flex items-center justify-between text-xs text-[#181817] mb-2">
            <span className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#A85A20]" />
              {remainingForFreeShipping === 0 ? (
                <span className="text-[#2D5A3C] font-semibold">You unlocked Free Doorstep Courier Delivery!</span>
              ) : (
                <span>
                  Add <strong className="text-[#181817]">{formatPrice(remainingForFreeShipping)}</strong> for Free Delivery
                </span>
              )}
            </span>
            <span className="text-xs text-[#625E58] font-mono">
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Items Table / List (8 Cols) */}
          <div className="lg:col-span-8 bg-white rounded-lg border border-[#E7E2DA] p-6 shadow-subtle space-y-6">
            <div className="divide-y divide-[#E7E2DA]">
              {cart.map((item) => (
                <div key={item.id} className="py-5 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="relative w-20 h-24 rounded-md overflow-hidden bg-[#EFEBE4] border border-[#E7E2DA] shrink-0">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm text-[#181817] leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#625E58] mt-0.5">
                        {item.colorName} • {item.sizeOrCapacity}
                      </p>
                      <p className="text-xs font-semibold text-[#181817] mt-2">
                        {formatPrice(item.price)} each
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                    {/* Stepper */}
                    <div className="flex items-center border border-[#E7E2DA] rounded-md bg-white">
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-[#181817] hover:bg-[#F8F6F1]"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-xs font-semibold text-[#181817]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-[#181817] hover:bg-[#F8F6F1]"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="font-bold text-sm text-[#181817]">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-[#8C827A] hover:text-[#181817] p-1.5 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-[#E7E2DA] flex justify-between items-center">
              <button
                onClick={clearCart}
                className="text-xs text-[#8C827A] hover:text-[#181817] font-medium"
              >
                Clear entire bag
              </button>
            </div>
          </div>

          {/* Right Summary Card (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-lg border border-[#E7E2DA] p-6 shadow-subtle space-y-4">
              <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-[#181817] pb-2 border-b border-[#E7E2DA]">
                Order Summary
              </h2>

              <CouponBox />

              <div className="space-y-2 pt-4 border-t border-[#E7E2DA] text-xs text-[#625E58]">
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
                  <span>Courier Delivery Fee</span>
                  <span className="font-semibold text-[#181817]">
                    {shippingFee === 0 ? "Free" : formatPrice(shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between items-baseline text-sm pt-3 border-t border-[#E7E2DA]">
                  <span className="font-semibold text-[#181817]">Total (Cash on Delivery)</span>
                  <span className="font-bold text-lg text-[#181817]">{formatPrice(cartTotal)}</span>
                </div>
              </div>

              <button
                onClick={() => router.push("/checkout")}
                className="w-full h-12 bg-[#181817] hover:bg-[#2C2B29] text-white rounded-md font-semibold text-xs uppercase tracking-[0.12em] flex items-center justify-center gap-2 transition-all shadow-subtle"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center text-[11px] text-[#625E58] pt-1">
                🔒 Zero prepayment. Pay cash upon delivery.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
