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
    <div className={`rounded-md bg-white border border-[#E7E2DA] p-3.5 font-ui ${className}`}>
      <div className="flex items-center gap-2 mb-2">
        <Tag className="w-3.5 h-3.5 text-[#A85A20]" />
        <span className="text-[11px] font-semibold text-[#181817] uppercase tracking-wider">
          Promotional Code
        </span>
      </div>

      {appliedCoupon ? (
        <div className="flex items-center justify-between bg-[#F8F6F1] border border-[#E7E2DA] p-2.5 rounded-md">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-[#2D5A3C]/10 text-[#2D5A3C] flex items-center justify-center shrink-0">
              <Check className="w-3 h-3" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-xs text-[#181817] font-mono uppercase">
                  {appliedCoupon.code}
                </span>
                <span className="text-xs font-semibold text-[#2D5A3C]">
                  {appliedCoupon.discountType === "percentage"
                    ? `${appliedCoupon.discountValue}% OFF`
                    : `৳${appliedCoupon.discountValue} OFF`}
                </span>
              </div>
              <p className="text-[11px] text-[#625E58]">{appliedCoupon.description}</p>
            </div>
          </div>
          <button
            onClick={handleRemove}
            className="p-1 text-[#8C827A] hover:text-[#181817] transition-colors"
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
              placeholder="e.g. GLORY10"
              className="flex-1 text-xs px-3 py-2 rounded-md border border-[#E7E2DA] bg-[#F8F6F1] uppercase font-mono tracking-wider focus:outline-none focus:border-[#181817]"
            />
            <button
              type="submit"
              disabled={!couponCode.trim() || cartSubtotal === 0}
              className="px-4 py-2 bg-[#181817] text-white text-xs font-semibold rounded-md hover:bg-[#2C2B29] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shrink-0"
            >
              Apply
            </button>
          </div>

          {message && (
            <div
              className={`flex items-center gap-1.5 text-[11px] font-medium ${
                message.isError ? "text-[#A33B3B]" : "text-[#2D5A3C]"
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

          <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px] text-[#625E58]">
            <span>Available:</span>
            <button
              type="button"
              onClick={() => {
                setCouponCode("GLORY10");
                applyCoupon("GLORY10");
              }}
              className="text-[#A85A20] font-mono font-medium underline hover:text-[#181817]"
            >
              GLORY10
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => {
                setCouponCode("BAGS20");
                applyCoupon("BAGS20");
              }}
              className="text-[#A85A20] font-mono font-medium underline hover:text-[#181817]"
            >
              BAGS20
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
