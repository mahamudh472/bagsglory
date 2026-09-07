"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Search,
  Package,
  AlertCircle,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { Order } from "@/types";
import { formatPrice } from "@/utils/currency";

export default function TrackOrderPage() {
  const { getOrderById, orders } = useStore();
  const [orderQuery, setOrderQuery] = useState("");
  const [trackedOrder, setTrackedOrder] = useState<Order | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderQuery.trim()) return;

    setHasSearched(true);
    const found = getOrderById(orderQuery.trim());
    setTrackedOrder(found || null);
  };

  return (
    <div className="bg-[#F8F5EF] min-h-screen py-16 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#C9A45C] block mb-2">
            Courier Logistics
          </span>
          <h1 className="font-heading font-normal text-4xl sm:text-5xl text-[#0D0C0B] tracking-tight">
            Track Your Order
          </h1>
          <p className="text-xs sm:text-sm text-[#746C63] font-light mt-3 leading-relaxed">
            Enter your Order ID (e.g. <code className="bg-white border border-[#E5DED4] px-2 py-0.5 font-mono text-[#0D0C0B] text-xs">BG-2026-8891</code>) to check live courier delivery status.
          </p>
        </div>

        {/* Tracking Search Card */}
        <div className="bg-white p-6 sm:p-8 border border-[#E5DED4] mb-8">
          <form onSubmit={handleTrackSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
              <div className="sm:col-span-8">
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#0D0C0B] mb-1.5">
                  Order Reference ID *
                </label>
                <div className="relative">
                  <Package className="w-4 h-4 text-[#746C63] absolute left-4 top-3.5" />
                  <input
                    type="text"
                    required
                    value={orderQuery}
                    onChange={(e) => setOrderQuery(e.target.value.toUpperCase())}
                    placeholder="e.g. BG-2026-8891"
                    className="w-full text-xs font-mono uppercase pl-11 pr-4 py-3 border border-[#E5DED4] bg-white focus:outline-none focus:border-[#C9A45C] rounded-none"
                  />
                </div>
              </div>

              <div className="sm:col-span-4 flex items-end">
                <button
                  type="submit"
                  className="w-full h-[43px] bg-[#0D0C0B] hover:bg-[#C9A45C] hover:text-[#0D0C0B] text-white text-xs font-semibold uppercase tracking-[0.18em] flex items-center justify-center gap-2 transition-all rounded-none"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Track Parcel</span>
                </button>
              </div>
            </div>

            {/* Quick Demo Helper */}
            {orders.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 pt-2 text-[11px] text-[#746C63]">
                <span>Recent orders:</span>
                {orders.slice(0, 3).map((o) => (
                  <button
                    key={o.id}
                    type="button"
                    onClick={() => {
                      setOrderQuery(o.id);
                      setTrackedOrder(o);
                      setHasSearched(true);
                    }}
                    className="font-mono text-[#0D0C0B] bg-[#F8F5EF] hover:bg-[#C9A45C] hover:text-white border border-[#E5DED4] px-2.5 py-0.5 text-[11px] transition-colors"
                  >
                    {o.id}
                  </button>
                ))}
              </div>
            )}
          </form>
        </div>

        {/* Results Card */}
        {hasSearched && trackedOrder ? (
          <div className="space-y-6">
            {/* Status Header */}
            <div className="bg-white p-6 sm:p-8 border border-[#E5DED4] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-semibold text-[#C9A45C] uppercase tracking-[0.2em]">
                  Live Dispatch Status
                </span>
                <h2 className="font-heading text-3xl sm:text-4xl text-[#0D0C0B] mt-0.5">
                  {trackedOrder.orderStatus}
                </h2>
                <p className="text-xs text-[#746C63] mt-1 font-light">
                  Placed on {new Date(trackedOrder.createdAt).toLocaleDateString()} for {trackedOrder.customer.fullName}
                </p>
              </div>

              <div className="flex flex-col sm:items-end">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#746C63]">Payment Condition</span>
                <span className="text-xs font-semibold text-[#0D0C0B] bg-[#F8F5EF] px-3 py-1 mt-1 border border-[#E5DED4]">
                  {trackedOrder.paymentStatus}
                </span>
                <span className="text-xs text-[#746C63] mt-1">
                  Amount Due: <strong className="text-[#0D0C0B] font-semibold">{formatPrice(trackedOrder.total)}</strong>
                </span>
              </div>
            </div>

            {/* Stepper Timeline */}
            <div className="bg-white p-6 sm:p-8 border border-[#E5DED4] space-y-6">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0D0C0B]">
                Courier Journey
              </h3>

              <div className="space-y-6 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E5DED4]">
                {trackedOrder.trackingHistory.map((step, idx) => (
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

            {/* Package Contents */}
            <div className="bg-white p-6 sm:p-8 border border-[#E5DED4] space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0D0C0B]">
                Parcel Contents ({trackedOrder.items.length})
              </h3>
              <div className="divide-y divide-[#E5DED4]">
                {trackedOrder.items.map((item) => (
                  <div key={item.id} className="py-3.5 first:pt-0 flex items-center gap-4">
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
                        {item.colorName} • {item.sizeOrCapacity} • Qty: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right font-semibold text-xs text-[#0D0C0B]">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : hasSearched && !trackedOrder ? (
          <div className="bg-white p-12 text-center border border-[#E5DED4] max-w-md mx-auto space-y-3">
            <AlertCircle className="w-8 h-8 text-[#C9A45C] mx-auto" />
            <h3 className="font-heading text-2xl text-[#0D0C0B]">
              No order found for &ldquo;{orderQuery}&rdquo;
            </h3>
            <p className="text-xs text-[#746C63] font-light leading-relaxed">
              Please double check your order reference ID from your order confirmation SMS or receipt.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
