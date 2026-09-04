"use client";

import React, { useState } from "react";
import { Tag, Check, X, AlertCircle } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export const CouponBox: React.FC<{ className?: string }> = ({ className = "" }) => {
  const { appliedCoupon, applyCoupon, removeCoupon, cartSubtotal } = useStore();
  const [couponCode, setCouponCode] = useState("");
  const [message, setMessage] = useState<{ text: string; isError: boolean } | null>(null);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    const res = applyCoupon(couponCode);
    setMessage({ text: res.message, isError: !res.success });
    if (res.success) {
      setCouponCode("");
    }
  };

  const handleRemove = () => {
    removeCoupon();
    setMessage({ text: "Coupon removed.", isError: false });
  };

  return (
    <div className={`rounded-none bg-white border border-slate-200 p-3.5 font-sans ${className}`}>
      <div className="flex items-center gap-2 mb-2">
        <Tag className="w-3.5 h-3.5 text-[#0084D4]" />
        <span className="text-[11px] font-bold text-[#1E293B] uppercase tracking-wider">
          Promotional Code
        </span>
      </div>

      {appliedCoupon ? (
        <div className="flex items-center justify-between bg-sky-50/50 border border-sky-100 p-2.5 rounded-none">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
              <Check className="w-3 h-3" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs text-[#1E293B] font-mono uppercase">
                  {appliedCoupon.code}
                </span>
                <span className="text-xs font-bold text-emerald-600">
                  {appliedCoupon.discountType === "percentage"
                    ? `${appliedCoupon.discountValue}% OFF`
                    : `৳${appliedCoupon.discountValue} OFF`}
                </span>
              </div>
              <p className="text-[11px] text-slate-500">{appliedCoupon.description}</p>
            </div>
          </div>
          <button
            onClick={handleRemove}
            className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
            title="Remove Coupon"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <form onSubmit={handleApply} className="space-y-2">
          <div className="flex gap-2">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => {
                setCouponCode(e.target.value.toUpperCase());
                setMessage(null);
              }}
              placeholder="e.g. OFF20"
              className="flex-1 text-xs px-3 py-2 rounded-none border border-slate-200 bg-slate-50 uppercase font-mono tracking-wider focus:outline-none focus:border-[#0084D4]"
            />
            <button
              type="submit"
              disabled={!couponCode.trim() || cartSubtotal === 0}
              className="px-4 py-2 bg-[#0084D4] text-white text-xs font-bold rounded-none hover:bg-[#0073B6] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shrink-0 uppercase tracking-wider"
            >
              Apply
            </button>
          </div>

          {message && (
            <div
              className={`flex items-center gap-1.5 text-[11px] font-medium ${
                message.isError ? "text-rose-600" : "text-emerald-600"
              }`}
            >
              {message.isError ? (
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              ) : (
                <Check className="w-3.5 h-3.5 shrink-0" />
              )}
              <span>{message.text}</span>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px] text-slate-500">
            <span>Available:</span>
            <button
              type="button"
              onClick={() => {
                setCouponCode("OFF20");
                applyCoupon("OFF20");
              }}
              className="text-[#0084D4] font-mono font-bold underline hover:text-[#0073B6]"
            >
              OFF20
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => {
                setCouponCode("GLORY10");
                applyCoupon("GLORY10");
              }}
              className="text-[#0084D4] font-mono font-bold underline hover:text-[#0073B6]"
            >
              GLORY10
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

