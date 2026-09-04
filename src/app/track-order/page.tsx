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
    <div className="bg-slate-50 min-h-screen py-12 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0084D4] block mb-2">
            Courier Tracking
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 tracking-tight">
            Track Your Order
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
            Enter your Order ID (e.g. <code className="bg-white border border-slate-200 px-1.5 py-0.5 rounded font-mono text-slate-800">BG-2026-8891</code>) to check live courier delivery status.
          </p>
        </div>

        {/* Tracking Search Card */}
        <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-8">
          <form onSubmit={handleTrackSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              <div className="sm:col-span-8">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Order Reference ID *
                </label>
                <div className="relative">
                  <Package className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={orderQuery}
                    onChange={(e) => setOrderQuery(e.target.value.toUpperCase())}
                    placeholder="e.g. BG-2026-8891"
                    className="w-full text-xs font-mono uppercase pl-10 pr-4 py-3 rounded-lg border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#0084D4] focus:ring-1 focus:ring-[#0084D4]"
                  />
                </div>
              </div>

              <div className="sm:col-span-4 flex items-end">
                <button
                  type="submit"
                  className="w-full h-[42px] bg-[#0084D4] hover:bg-[#0073B6] text-white rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <Search className="w-3.5 h-3.5 text-white" />
                  <span>Track Parcel</span>
                </button>
              </div>
            </div>

            {/* Quick Demo Helper */}
            {orders.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 pt-2 text-[11px] text-slate-500">
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
                    className="font-mono text-[#0084D4] bg-sky-50 hover:bg-sky-100 border border-sky-200 px-2.5 py-0.5 rounded text-[11px] transition-colors"
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
            <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-semibold text-[#0084D4] uppercase tracking-wider">
                  Live Dispatch Status
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mt-0.5">
                  {trackedOrder.orderStatus}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Placed on {new Date(trackedOrder.createdAt).toLocaleDateString()} for {trackedOrder.customer.fullName}
                </p>
              </div>

              <div className="flex flex-col sm:items-end">
                <span className="text-xs font-semibold text-slate-700">Payment Condition</span>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full mt-1 border border-emerald-200">
                  {trackedOrder.paymentStatus}
                </span>
                <span className="text-xs text-slate-600 mt-1 font-mono">
                  Amount Due: <strong className="text-slate-900">{formatPrice(trackedOrder.total)}</strong>
                </span>
              </div>
            </div>

            {/* Stepper Timeline */}
            <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800">
                Courier Journey
              </h3>

              <div className="space-y-6 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                {trackedOrder.trackingHistory.map((step, idx) => (
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

            {/* Package Contents */}
            <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800">
                Parcel Contents ({trackedOrder.items.length})
              </h3>
              <div className="divide-y divide-slate-100">
                {trackedOrder.items.map((item) => (
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
                        {item.colorName} • {item.sizeOrCapacity} • Qty: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right font-bold text-xs text-slate-900">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : hasSearched && !trackedOrder ? (
          <div className="bg-white rounded-xl p-12 text-center border border-slate-200 max-w-md mx-auto space-y-3 shadow-sm">
            <AlertCircle className="w-8 h-8 text-[#0084D4] mx-auto" />
            <h3 className="text-2xl font-bold text-slate-800">
              No order found for &ldquo;{orderQuery}&rdquo;
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Please double check your order reference ID from your order confirmation SMS or receipt.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
