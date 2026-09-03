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
        colors: ["#A85A20", "#181817", "#B8AA98", "#2D5A3C"],
      });
    }
  }, []);

  if (!order) {
    return (
      <div className="min-h-screen bg-[#F8F6F1] py-16 flex items-center justify-center font-ui">
        <div className="max-w-md w-full mx-4 bg-white p-8 rounded-lg border border-[#E7E2DA] text-center shadow-subtle space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#F8F6F1] border border-[#E7E2DA] text-[#625E58] flex items-center justify-center mx-auto">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <h1 className="font-editorial text-2xl text-[#181817]">
            Order Not Found
          </h1>
          <p className="text-xs text-[#625E58]">
            We could not find an active order with reference: <strong className="font-mono">{orderId}</strong>.
          </p>
          <Link
            href="/shop"
            className="inline-block px-6 py-2.5 bg-[#181817] text-white rounded-md text-xs font-semibold uppercase tracking-wider hover:bg-[#2C2B29] transition-colors"
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
    <div className="bg-[#F8F6F1] min-h-screen py-12 font-ui">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header Card */}
        <div className="bg-white rounded-lg p-8 sm:p-12 border border-[#E7E2DA] shadow-subtle text-center space-y-4 mb-8">
          <div className="w-12 h-12 rounded-full bg-[#2D5A3C]/10 text-[#2D5A3C] flex items-center justify-center mx-auto border border-[#2D5A3C]/20">
            <CheckCircle2 className="w-6 h-6" />
          </div>

          <span className="text-[10px] font-semibold text-[#A85A20] uppercase tracking-[0.2em] block">
            Cash on Delivery Registered
          </span>

          <h1 className="font-editorial text-3xl sm:text-5xl text-[#181817] font-normal">
            Thank You, {order.customer.fullName.split(" ")[0]}
          </h1>

          <p className="text-xs sm:text-sm text-[#625E58] max-w-lg mx-auto leading-relaxed">
            Your handcrafted leather order has been confirmed. A confirmation receipt has been dispatched to <strong className="text-[#181817] font-semibold">{order.customer.email}</strong>.
          </p>

          <div className="inline-flex items-center gap-2 p-2 px-4 rounded-md bg-[#F8F6F1] border border-[#E7E2DA] text-xs font-mono text-[#181817]">
            <span>Order Reference:</span>
            <strong className="text-[#A85A20] font-bold">{order.id}</strong>
          </div>
        </div>

        {/* 2-Column Content: Timeline & Order Receipt */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left: Progress Tracking Timeline */}
          <div className="md:col-span-7 space-y-6">
            <div className="bg-white rounded-lg p-6 sm:p-8 border border-[#E7E2DA] shadow-subtle space-y-6">
              <div className="flex items-center justify-between border-b border-[#E7E2DA] pb-4">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#A85A20]" />
                  <h3 className="font-semibold text-xs uppercase tracking-wider text-[#181817]">
                    Courier Journey
                  </h3>
                </div>
                <span className="text-xs font-semibold text-[#181817] bg-[#F8F6F1] border border-[#E7E2DA] px-2.5 py-1 rounded">
                  {order.orderStatus}
                </span>
              </div>

              {/* Timeline Steps */}
              <div className="space-y-6 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E7E2DA]">
                {order.trackingHistory.map((step, idx) => (
                  <div key={idx} className="relative flex items-start gap-4">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10 text-[11px] font-semibold ${
                        step.completed
                          ? "bg-[#2D5A3C] text-white"
                          : step.current
                          ? "bg-[#A85A20] text-white ring-4 ring-[#A85A20]/20"
                          : "bg-[#E7E2DA] text-[#625E58]"
                      }`}
                    >
                      {step.completed ? "✓" : idx + 1}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-xs text-[#181817]">{step.label}</h4>
                        <span className="text-[10px] text-[#8C827A]">{step.timestamp}</span>
                      </div>
                      <p className="text-[11px] text-[#625E58] mt-0.5 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* COD Instructions */}
            <div className="bg-[#F8F6F1] rounded-lg p-6 border border-[#E7E2DA] space-y-2.5">
              <div className="flex items-center gap-2 text-[#181817] font-semibold text-xs uppercase tracking-wider">
                <Banknote className="w-4 h-4 text-[#A85A20]" />
                <span>Cash on Delivery Reminder</span>
              </div>
              <p className="text-xs text-[#625E58] leading-relaxed">
                Please keep <strong>{formatPrice(order.total)}</strong> in cash ready. The courier rider will contact you at <strong>{order.customer.phone}</strong> prior to doorstep delivery.
              </p>
            </div>

            {/* Delivery Destination */}
            <div className="bg-white rounded-lg p-6 border border-[#E7E2DA] shadow-subtle space-y-3">
              <div className="flex items-center gap-2 text-[#181817] font-semibold text-xs uppercase tracking-wider">
                <MapPin className="w-4 h-4 text-[#A85A20]" />
                <span>Delivery Destination</span>
              </div>
              <div className="text-xs text-[#625E58] space-y-1">
                <p className="font-semibold text-[#181817]">{order.customer.fullName}</p>
                <p>{order.customer.streetAddress}</p>
                <p>
                  {order.customer.city}, {order.customer.districtState} {order.customer.postalCode}
                </p>
                <p className="pt-1">📞 {order.customer.phone} • ✉️ {order.customer.email}</p>
              </div>
            </div>
          </div>

          {/* Right: Order Breakdown */}
          <div className="md:col-span-5 space-y-6">
            <div className="bg-white rounded-lg p-6 border border-[#E7E2DA] shadow-subtle space-y-4">
              <div className="flex items-center justify-between border-b border-[#E7E2DA] pb-3">
                <h3 className="font-semibold text-xs uppercase tracking-[0.12em] text-[#181817]">
                  Order Receipt
                </h3>
                <button
                  onClick={handlePrint}
                  className="text-xs text-[#625E58] hover:text-[#181817] flex items-center gap-1 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print</span>
                </button>
              </div>

              {/* Items list */}
              <div className="divide-y divide-[#E7E2DA]">
                {order.items.map((item) => (
                  <div key={item.id} className="py-3 first:pt-0 flex items-center gap-3">
                    <div className="relative w-12 h-14 rounded-md overflow-hidden bg-[#EFEBE4] border border-[#E7E2DA] shrink-0">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-xs text-[#181817] truncate">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-[#625E58]">
                        {item.colorName} • Qty: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right font-semibold text-xs text-[#181817]">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Financial Calculations */}
              <div className="space-y-2 text-xs text-[#625E58] border-t border-[#E7E2DA] pt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#181817]">{formatPrice(order.subtotal)}</span>
                </div>
                {order.discountAmount > 0 && (
                  <div className="flex justify-between text-[#2D5A3C] font-semibold">
                    <span>Discount ({order.couponApplied})</span>
                    <span>-{formatPrice(order.discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Courier Delivery</span>
                  <span className="font-semibold text-[#181817]">
                    {order.shippingFee === 0 ? "Free" : formatPrice(order.shippingFee)}
                  </span>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between items-baseline pt-3 border-t border-[#E7E2DA]">
                <span className="font-semibold text-sm text-[#181817]">Total Amount Due</span>
                <span className="font-bold text-lg text-[#181817]">{formatPrice(order.total)}</span>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 space-y-2">
                <Link
                  href="/track-order"
                  className="w-full h-11 bg-[#181817] hover:bg-[#2C2B29] text-white rounded-md text-xs font-semibold uppercase tracking-[0.12em] flex items-center justify-center gap-2 transition-all shadow-subtle"
                >
                  <Truck className="w-4 h-4 text-[#B8AA98]" />
                  <span>Track This Order</span>
                </Link>

                <Link
                  href="/shop"
                  className="w-full h-11 bg-[#F8F6F1] hover:bg-[#EFEBE4] text-[#181817] border border-[#E7E2DA] rounded-md text-xs font-semibold uppercase tracking-[0.12em] flex items-center justify-center gap-2 transition-all"
                >
                  <Home className="w-4 h-4" />
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
