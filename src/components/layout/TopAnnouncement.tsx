"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import Link from "next/link";

export const TopAnnouncement: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-[#0D0C0B] text-[#F8F5EF] text-[11px] sm:text-xs py-2 px-4 tracking-wider transition-all border-b border-[#241B14] font-sans">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="hidden md:block text-[#C9A45C] font-semibold tracking-[0.15em] text-[10px] uppercase">
          ✦ COMPLIMENTARY SHIPPING OVER ৳3,000
        </div>

        <div className="flex-1 md:flex-initial text-center font-medium tracking-wide">
          <span className="text-[#F8F5EF]/90">✦ SIGNATURE SALE — UP TO 70% OFF SELECTED COLLECTIONS ✦</span>
          <span className="mx-2 text-[#746C63] hidden sm:inline">•</span>
          <span className="hidden sm:inline text-[#F8F5EF]/80">
            Use code <strong className="text-[#C9A45C] font-semibold tracking-wider">OFF20</strong>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/shop"
            className="text-[#C9A45C] hover:text-[#E5C77A] transition-colors text-[11px] font-semibold tracking-widest uppercase hidden md:inline-block"
          >
            Explore &rarr;
          </Link>
          <button
            onClick={() => setIsVisible(false)}
            aria-label="Close banner"
            className="text-[#746C63] hover:text-[#F8F5EF] transition-colors ml-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

