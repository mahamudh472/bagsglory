"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Search,
  Truck,
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
    <div className="bg-[#F8F6F1] min-h-screen py-12 font-ui">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A85A20] block mb-2">
            Nationwide Courier Telemetry
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl text-[#181817] font-normal">
            Track Cash on Delivery Order
          </h1>
          <p className="text-xs sm:text-sm text-[#625E58] mt-2 leading-relaxed">
            Enter your Order ID (e.g. <code className="bg-white border border-[#E7E2DA] px-1.5 py-0.5 rounded font-mono text-[#181817]">BG-2026-8891</code>) to check live courier delivery status.
          </p>
        </div>

        {/* Tracking Search Card */}
        <div className="bg-white rounded-lg p-6 sm:p-8 border border-[#E7E2DA] shadow-subtle mb-8">
          <form onSubmit={handleTrackSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              <div className="sm:col-span-8">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#181817] mb-1.5">
                  Order Reference ID *
                </label>
                <div className="relative">
                  <Package className="w-4 h-4 text-[#8C827A] absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={orderQuery}
                    onChange={(e) => setOrderQuery(e.target.value.toUpperCase())}
                    placeholder="e.g. BG-2026-8891"
                    className="w-full text-xs font-mono uppercase pl-10 pr-4 py-3 rounded-md border border-[#E7E2DA] bg-[#F8F6F1] focus:bg-white focus:outline-none focus:border-[#181817]"
                  />
                </div>
              </div>

              <div className="sm:col-span-4 flex items-end">
                <button
                  type="submit"
                  className="w-full h-[42px] bg-[#181817] hover:bg-[#2C2B29] text-white rounded-md text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-subtle transition-colors"
                >
                  <Search className="w-3.5 h-3.5 text-[#B8AA98]" />
                  <span>Track Parcel</span>
                </button>
              </div>
            </div>

            {/* Quick Demo Helper */}
            {orders.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 pt-2 text-[11px] text-[#625E58]">
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
                    className="font-mono text-[#A85A20] bg-[#F8F6F1] hover:bg-[#EFEBE4] border border-[#E7E2DA] px-2 py-0.5 rounded text-[11px] transition-colors"
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
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Status Header */}
            <div className="bg-white rounded-lg p-6 sm:p-8 border border-[#E7E2DA] shadow-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-semibold text-[#A85A20] uppercase tracking-wider">
                  Live Dispatch Status
                </span>
                <h2 className="font-editorial text-2xl sm:text-3xl text-[#181817] mt-0.5 font-normal">
                  {trackedOrder.orderStatus}
                </h2>
                <p className="text-xs text-[#625E58] mt-1">
                  Placed on {new Date(trackedOrder.createdAt).toLocaleDateString()} for {trackedOrder.customer.fullName}
                </p>
              </div>

              <div className="flex flex-col sm:items-end">
                <span className="text-xs font-semibold text-[#181817]">Payment Condition</span>
                <span className="text-xs font-semibold text-[#2D5A3C] bg-[#2D5A3C]/10 px-2.5 py-1 rounded mt-1 border border-[#2D5A3C]/20">
                  {trackedOrder.paymentStatus}
                </span>
                <span className="text-xs text-[#625E58] mt-1 font-mono">
                  Amount Due: <strong>{formatPrice(trackedOrder.total)}</strong>
                </span>
              </div>
            </div>

            {/* Stepper Timeline */}
            <div className="bg-white rounded-lg p-6 sm:p-8 border border-[#E7E2DA] shadow-subtle space-y-6">
              <h3 className="font-semibold text-xs uppercase tracking-[0.12em] text-[#181817]">
                Courier Journey
              </h3>

              <div className="space-y-6 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E7E2DA]">
                {trackedOrder.trackingHistory.map((step, idx) => (
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

            {/* Package Contents */}
            <div className="bg-white rounded-lg p-6 sm:p-8 border border-[#E7E2DA] shadow-subtle space-y-4">
              <h3 className="font-semibold text-xs uppercase tracking-[0.12em] text-[#181817]">
                Parcel Contents ({trackedOrder.items.length})
              </h3>
              <div className="divide-y divide-[#E7E2DA]">
                {trackedOrder.items.map((item) => (
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
                        {item.colorName} • {item.sizeOrCapacity} • Qty: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right font-semibold text-xs text-[#181817]">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : hasSearched && !trackedOrder ? (
          <div className="bg-white rounded-lg p-12 text-center border border-[#E7E2DA] max-w-md mx-auto space-y-3 shadow-subtle">
            <AlertCircle className="w-8 h-8 text-[#A85A20] mx-auto" />
            <h3 className="font-editorial text-2xl text-[#181817]">
              No order found for &ldquo;{orderQuery}&rdquo;
            </h3>
            <p className="text-xs text-[#625E58] leading-relaxed">
              Please double check your order reference ID from your order confirmation SMS or receipt.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
