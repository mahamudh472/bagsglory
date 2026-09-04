"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import Link from "next/link";

export const TopAnnouncement: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-slate-900 text-slate-200 text-[11px] sm:text-xs py-2 px-4 tracking-wide transition-all border-b border-slate-800 font-sans">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="hidden md:block text-slate-400 font-medium tracking-wider text-[11px] uppercase">
          Free Shipping on All Orders Over ৳3,000
        </div>

        <div className="flex-1 md:flex-initial text-center font-medium">
          <span>Nationwide Cash on Delivery Available</span>
          <span className="mx-2 text-slate-600 hidden sm:inline">•</span>
          <span className="hidden sm:inline">Use coupon code <strong className="text-white font-semibold">OFF20</strong> for 20% off</span>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/shop" className="text-[#0084D4] hover:text-white transition-colors text-[11px] font-bold hidden md:inline-block">
            Shop Now &rarr;
          </Link>
          <button
            onClick={() => setIsVisible(false)}
            aria-label="Close banner"
            className="text-slate-500 hover:text-slate-200 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
