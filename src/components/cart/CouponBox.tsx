"use client";

import React, { useState } from "react";
import { Tag, Check, X, AlertCircle } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export const CouponBox: React.FC<{ className?: string }> = ({ className = "" }) => {
  const { appliedCoupon, applyCoupon, removeCoupon, cartSubtotal } = useStore();
  const [couponCode, setCouponCode] = useState("");
  const [message, setMessage] = useState<{ text: string; isError: boolean } | null>(null);

  const [isApplying, setIsApplying] = useState(false);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim() || isApplying) return;

    setIsApplying(true);
    try {
      const res = await applyCoupon(couponCode);
      setMessage({ text: res.message, isError: !res.success });
      if (res.success) {
        setCouponCode("");
      }
    } catch {
      setMessage({ text: "Failed to apply coupon. Please try again.", isError: true });
    } finally {
      setIsApplying(false);
    }
  };

  const handleRemove = () => {
    removeCoupon();
    setMessage({ text: "Coupon removed.", isError: false });
  };

  return (
    <div className={`bg-[#FFFFFF] border border-[#E5DED4] p-3.5 font-sans ${className}`}>
      <div className="flex items-center gap-2 mb-2">
        <Tag className="w-3.5 h-3.5 text-[#C9A45C]" />
        <span className="text-[10px] font-semibold text-[#0D0C0B] uppercase tracking-[0.2em]">
          Privilege Voucher Code
        </span>
      </div>

      {appliedCoupon ? (
        <div className="flex items-center justify-between bg-[#F8F5EF] border border-[#C9A45C]/40 p-2.5">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-[#0D0C0B] text-[#C9A45C] flex items-center justify-center shrink-0">
              <Check className="w-3 h-3" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-xs text-[#0D0C0B] font-mono uppercase">
                  {appliedCoupon.code}
                </span>
                <span className="text-xs font-semibold text-[#10B981]">
                  {appliedCoupon.discountType === "percentage"
                    ? `${appliedCoupon.discountValue}% OFF`
                    : `৳${appliedCoupon.discountValue} OFF`}
                </span>
              </div>
              <p className="text-[11px] text-[#746C63]">{appliedCoupon.description}</p>
            </div>
          </div>
          <button
            onClick={handleRemove}
            className="p-1 text-[#746C63] hover:text-[#EF4444] transition-colors"
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
              className="flex-1 text-xs px-3 py-2 border border-[#E5DED4] bg-[#F8F5EF] uppercase font-mono tracking-wider focus:outline-none focus:border-[#C9A45C]"
            />
            <button
              type="submit"
              disabled={!couponCode.trim() || cartSubtotal === 0}
              className="px-4 py-2 bg-[#0D0C0B] text-[#F8F5EF] text-xs font-semibold hover:bg-[#C9A45C] hover:text-[#0D0C0B] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shrink-0 uppercase tracking-wider"
            >
              Apply
            </button>
          </div>

          {message && (
            <div
              className={`flex items-center gap-1.5 text-[11px] font-medium ${
                message.isError ? "text-[#EF4444]" : "text-[#10B981]"
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

          <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px] text-[#746C63]">
            <span>Available:</span>
            <button
              type="button"
              onClick={() => {
                setCouponCode("OFF20");
                applyCoupon("OFF20");
              }}
              className="text-[#0D0C0B] font-mono font-semibold underline hover:text-[#C9A45C]"
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
              className="text-[#0D0C0B] font-mono font-semibold underline hover:text-[#C9A45C]"
            >
              GLORY10
            </button>
          </div>
        </form>
      )}
    </div>
  );
};


