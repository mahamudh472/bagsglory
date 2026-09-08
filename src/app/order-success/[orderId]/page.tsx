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
import { Order } from "@/types";
import { formatPrice } from "@/utils/currency";

export default function OrderSuccessPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = use(params);
  const { getOrderById } = useStore();
  const [order, setOrder] = React.useState<Order | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadOrder() {
      try {
        const found = await getOrderById(orderId);
        if (isMounted) setOrder(found || null);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    loadOrder();

    if (typeof window !== "undefined") {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#C9A45C", "#E5C77A", "#0D0C0B", "#F8F5EF"],
      });
    }

    return () => {
      isMounted = false;
    };
  }, [orderId, getOrderById]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8F5EF] py-24 flex items-center justify-center font-sans">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-2 border-[#C9A45C] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs uppercase tracking-[0.2em] text-[#746C63]">
            Confirming order with database...
          </p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-[#F8F5EF] py-20 flex items-center justify-center font-sans">
        <div className="max-w-md w-full mx-4 bg-white p-12 border border-[#E5DED4] text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-[#F8F5EF] border border-[#E5DED4] text-[#C9A45C] flex items-center justify-center mx-auto">
            <ShoppingBag className="w-6 h-6 stroke-[1.5]" />
          </div>
          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C9A45C] block">
            Order Status
          </span>
          <h1 className="font-heading text-3xl text-[#0D0C0B]">
            Order Not Found
          </h1>
          <p className="text-xs text-[#746C63] font-light">
            We could not find an active order with reference: <strong className="font-mono text-[#0D0C0B]">{orderId}</strong>.
          </p>
          <Link
            href="/shop"
            className="inline-block px-8 py-3 bg-[#0D0C0B] text-white text-xs font-semibold uppercase tracking-[0.18em] hover:bg-[#C9A45C] hover:text-[#0D0C0B] transition-all rounded-none mt-2"
          >
            Return to Boutique
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
    <div className="bg-[#F8F5EF] min-h-screen py-16 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header Card */}
        <div className="bg-white p-8 sm:p-14 border border-[#E5DED4] text-center space-y-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-[#F8F5EF] text-[#C9A45C] flex items-center justify-center mx-auto border border-[#E5DED4]">
            <CheckCircle2 className="w-8 h-8 stroke-[1.5]" />
          </div>

          <span className="text-[10px] font-semibold text-[#C9A45C] uppercase tracking-[0.25em] block">
            Cash on Delivery Confirmed
          </span>

          <h1 className="font-heading font-normal text-4xl sm:text-5xl text-[#0D0C0B] tracking-tight">
            Thank You, {order.customer.fullName.split(" ")[0]}!
          </h1>

          <p className="text-xs sm:text-sm text-[#746C63] font-light max-w-lg mx-auto leading-relaxed">
            Your BagsGlory order has been received and scheduled for handcrafted dispatch. A confirmation has been dispatched to <strong className="text-[#0D0C0B] font-medium">{order.customer.email}</strong>.
          </p>

          <div className="inline-flex items-center gap-2 p-2.5 px-5 bg-[#F8F5EF] border border-[#E5DED4] text-xs font-mono text-[#0D0C0B]">
            <span className="text-[#746C63]">Order Reference:</span>
            <strong className="text-[#0D0C0B] font-bold">{order.id}</strong>
          </div>
        </div>

        {/* 2-Column Content: Timeline & Order Receipt */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left: Progress Tracking Timeline */}
          <div className="md:col-span-7 space-y-6">
            <div className="bg-white p-6 sm:p-8 border border-[#E5DED4] space-y-6">
              <div className="flex items-center justify-between border-b border-[#E5DED4] pb-4">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#C9A45C]" />
                  <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0D0C0B]">
                    Courier Journey
                  </h3>
                </div>
                <span className="text-xs font-semibold text-[#0D0C0B] bg-[#F8F5EF] border border-[#E5DED4] px-3 py-1">
                  {order.orderStatus}
                </span>
              </div>

              {/* Timeline Steps */}
              <div className="space-y-6 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E5DED4]">
                {order.trackingHistory.map((step: any, idx: number) => (
                  <div key={idx} className="relative flex items-start gap-4">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10 text-[11px] font-bold ${
                        step.completed
                          ? "bg-[#0D0C0B] text-[#C9A45C]"
                          : step.current
                          ? "bg-[#C9A45C] text-[#0D0C0B] ring-4 ring-[#C9A45C]/20"
                          : "bg-[#F0ECE1] text-[#746C63]"
                      }`}
                    >
                      {step.completed ? "✓" : idx + 1}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-xs text-[#0D0C0B] uppercase tracking-wider">{step.label}</h4>
                        <span className="text-[10px] text-[#746C63] font-mono">{step.timestamp}</span>
                      </div>
                      <p className="text-xs text-[#746C63] font-light mt-0.5 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* COD Instructions */}
            <div className="bg-white p-6 sm:p-7 border border-[#E5DED4] space-y-2.5">
              <div className="flex items-center gap-2 text-[#0D0C0B] font-semibold text-xs uppercase tracking-wider">
                <Banknote className="w-4 h-4 text-[#C9A45C]" />
                <span>Cash on Delivery Protocol</span>
              </div>
              <p className="text-xs text-[#746C63] font-light leading-relaxed">
                Please keep <strong className="text-[#0D0C0B] font-medium">{formatPrice(order.total)}</strong> in cash ready upon delivery. The courier rider will contact you at <strong className="text-[#0D0C0B] font-medium">{order.customer.phone}</strong> prior to doorstep arrival.
              </p>
            </div>

            {/* Delivery Destination */}
            <div className="bg-white p-6 sm:p-7 border border-[#E5DED4] space-y-3">
              <div className="flex items-center gap-2 text-[#0D0C0B] font-semibold text-xs uppercase tracking-wider">
                <MapPin className="w-4 h-4 text-[#C9A45C]" />
                <span>Delivery Destination</span>
              </div>
              <div className="text-xs text-[#746C63] space-y-1 font-light">
                <p className="font-medium text-[#0D0C0B]">{order.customer.fullName}</p>
                <p>{order.customer.streetAddress}</p>
                <p>
                  {order.customer.city}, {order.customer.districtState} {order.customer.postalCode}
                </p>
                <p className="pt-1 text-[#746C63]">📞 {order.customer.phone} • ✉️ {order.customer.email}</p>
              </div>
            </div>
          </div>

          {/* Right: Order Breakdown */}
          <div className="md:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 border border-[#E5DED4] space-y-4">
              <div className="flex items-center justify-between border-b border-[#E5DED4] pb-3">
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0D0C0B]">
                  Order Summary
                </h3>
                <button
                  onClick={handlePrint}
                  className="text-xs text-[#746C63] hover:text-[#0D0C0B] flex items-center gap-1.5 transition-colors uppercase tracking-wider font-semibold"
                >
                  <Printer className="w-3.5 h-3.5 text-[#C9A45C]" />
                  <span>Print Receipt</span>
                </button>
              </div>

              {/* Items list */}
              <div className="divide-y divide-[#E5DED4]">
                {order.items.map((item: any) => (
                  <div key={item.id} className="py-3.5 first:pt-0 flex items-center gap-3.5">
                    <div className="relative w-12 h-14 bg-[#F8F5EF] border border-[#E5DED4] shrink-0">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-xs text-[#0D0C0B] truncate">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-[#746C63] uppercase tracking-wider">
                        {item.colorName} • Qty: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right font-semibold text-xs text-[#0D0C0B]">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Financial Calculations */}
              <div className="space-y-2 text-xs text-[#746C63] border-t border-[#E5DED4] pt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#0D0C0B]">{formatPrice(order.subtotal)}</span>
                </div>
                {order.discountAmount > 0 && (
                  <div className="flex justify-between text-[#C9A45C] font-semibold">
                    <span>Privilege Savings ({order.couponApplied})</span>
                    <span>-{formatPrice(order.discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Courier Delivery</span>
                  <span className="font-semibold text-[#0D0C0B]">
                    {order.shippingFee === 0 ? "Complimentary" : formatPrice(order.shippingFee)}
                  </span>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between items-baseline pt-4 border-t border-[#E5DED4]">
                <span className="font-semibold uppercase tracking-wider text-xs text-[#0D0C0B]">Total Amount</span>
                <span className="font-normal font-heading text-2xl text-[#0D0C0B]">{formatPrice(order.total)}</span>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 space-y-3">
                <Link
                  href="/track-order"
                  className="w-full h-12 bg-[#0D0C0B] hover:bg-[#C9A45C] hover:text-[#0D0C0B] text-white text-xs font-semibold uppercase tracking-[0.18em] flex items-center justify-center gap-2 transition-all rounded-none"
                >
                  <Truck className="w-4 h-4" />
                  <span>Track This Order</span>
                </Link>

                <Link
                  href="/shop"
                  className="w-full h-12 bg-[#F8F5EF] hover:bg-white text-[#0D0C0B] border border-[#E5DED4] text-xs font-semibold uppercase tracking-[0.18em] flex items-center justify-center gap-2 transition-all rounded-none"
                >
                  <Home className="w-4 h-4 text-[#746C63]" />
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
