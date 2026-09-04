"use client";

import React, { useEffect, use } from "react";
import Link from "next/link";
import Image from "next/image";
import confetti from "canvas-confetti";
import {
  CheckCircle2,
  Truck,
  MapPin,
  Printer,
  ShoppingBag,
  Home,
  Banknote,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { formatPrice } from "@/utils/currency";

export default function OrderSuccessPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = use(params);
  const { getOrderById } = useStore();
  const order = getOrderById(orderId);

  useEffect(() => {
    if (typeof window !== "undefined") {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#0084D4", "#0073B6", "#10B981", "#F59E0B"],
      });
    }
  }, []);

  if (!order) {
    return (
      <div className="min-h-screen bg-slate-50 py-16 flex items-center justify-center font-sans">
        <div className="max-w-md w-full mx-4 bg-white p-8 rounded-xl border border-slate-200 text-center shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-200 text-slate-500 flex items-center justify-center mx-auto">
            <ShoppingBag className="w-5 h-5 text-[#0084D4]" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">
            Order Not Found
          </h1>
          <p className="text-xs text-slate-500">
            We could not find an active order with reference: <strong className="font-mono">{orderId}</strong>.
          </p>
          <Link
            href="/shop"
            className="inline-block px-6 py-2.5 bg-[#0084D4] text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-[#0073B6] transition-colors"
          >
            Return to Store
          </Link>
        </div>
      </div>
    );
  }

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header Card */}
        <div className="bg-white rounded-xl p-8 sm:p-12 border border-slate-200 shadow-sm text-center space-y-4 mb-8">
          <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
            <CheckCircle2 className="w-7 h-7" />
          </div>

          <span className="text-xs font-semibold text-[#0084D4] uppercase tracking-[0.2em] block">
            Cash on Delivery Confirmed
          </span>

          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 tracking-tight">
            Thank You, {order.customer.fullName.split(" ")[0]}!
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
            Your BagsGlory order has been received. A confirmation has been sent to <strong className="text-slate-900 font-semibold">{order.customer.email}</strong>.
          </p>

          <div className="inline-flex items-center gap-2 p-2 px-4 rounded-lg bg-slate-50 border border-slate-200 text-xs font-mono text-slate-800">
            <span>Order Reference:</span>
            <strong className="text-[#0084D4] font-bold">{order.id}</strong>
          </div>
        </div>

        {/* 2-Column Content: Timeline & Order Receipt */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left: Progress Tracking Timeline */}
          <div className="md:col-span-7 space-y-6">
            <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#0084D4]" />
                  <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800">
                    Courier Journey
                  </h3>
                </div>
                <span className="text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-full">
                  {order.orderStatus}
                </span>
              </div>

              {/* Timeline Steps */}
              <div className="space-y-6 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                {order.trackingHistory.map((step, idx) => (
                  <div key={idx} className="relative flex items-start gap-4">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10 text-[11px] font-bold ${
                        step.completed
                          ? "bg-emerald-600 text-white"
                          : step.current
                          ? "bg-[#0084D4] text-white ring-4 ring-[#0084D4]/20"
                          : "bg-slate-200 text-slate-500"
                      }`}
                    >
                      {step.completed ? "✓" : idx + 1}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-xs text-slate-800">{step.label}</h4>
                        <span className="text-[10px] text-slate-400">{step.timestamp}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* COD Instructions */}
            <div className="bg-sky-50 rounded-xl p-6 border border-sky-100 space-y-2.5">
              <div className="flex items-center gap-2 text-sky-900 font-bold text-xs uppercase tracking-wider">
                <Banknote className="w-4 h-4 text-[#0084D4]" />
                <span>Cash on Delivery Instructions</span>
              </div>
              <p className="text-xs text-sky-800 leading-relaxed">
                Please keep <strong>{formatPrice(order.total)}</strong> in cash ready upon delivery. The courier rider will contact you at <strong>{order.customer.phone}</strong> prior to doorstep arrival.
              </p>
            </div>

            {/* Delivery Destination */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-slate-800 font-bold text-xs uppercase tracking-wider">
                <MapPin className="w-4 h-4 text-[#0084D4]" />
                <span>Delivery Destination</span>
              </div>
              <div className="text-xs text-slate-600 space-y-1">
                <p className="font-bold text-slate-900">{order.customer.fullName}</p>
                <p>{order.customer.streetAddress}</p>
                <p>
                  {order.customer.city}, {order.customer.districtState} {order.customer.postalCode}
                </p>
                <p className="pt-1 text-slate-500">📞 {order.customer.phone} • ✉️ {order.customer.email}</p>
              </div>
            </div>
          </div>

          {/* Right: Order Breakdown */}
          <div className="md:col-span-5 space-y-6">
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800">
                  Order Summary
                </h3>
                <button
                  onClick={handlePrint}
                  className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5 text-[#0084D4]" />
                  <span>Print</span>
                </button>
              </div>

              {/* Items list */}
              <div className="divide-y divide-slate-100">
                {order.items.map((item) => (
                  <div key={item.id} className="py-3 first:pt-0 flex items-center gap-3">
                    <div className="relative w-12 h-14 rounded-lg overflow-hidden bg-slate-50 border border-slate-200 shrink-0">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-xs text-slate-800 truncate">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        {item.colorName} • Qty: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right font-bold text-xs text-slate-900">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Financial Calculations */}
              <div className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-800">{formatPrice(order.subtotal)}</span>
                </div>
                {order.discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Discount ({order.couponApplied})</span>
                    <span>-{formatPrice(order.discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Courier Delivery</span>
                  <span className="font-semibold text-slate-800">
                    {order.shippingFee === 0 ? "Free" : formatPrice(order.shippingFee)}
                  </span>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between items-baseline pt-3 border-t border-slate-100">
                <span className="font-bold text-sm text-slate-800">Total Amount</span>
                <span className="font-extrabold text-xl text-[#0084D4]">{formatPrice(order.total)}</span>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 space-y-2">
                <Link
                  href="/track-order"
                  className="w-full h-11 bg-[#0084D4] hover:bg-[#0073B6] text-white rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <Truck className="w-4 h-4 text-white" />
                  <span>Track This Order</span>
                </Link>

                <Link
                  href="/shop"
                  className="w-full h-11 bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                >
                  <Home className="w-4 h-4 text-slate-500" />
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
