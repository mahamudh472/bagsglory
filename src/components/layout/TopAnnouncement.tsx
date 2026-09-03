"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import Link from "next/link";

export const TopAnnouncement: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-[#181817] text-[#E7E2DA] text-[11px] sm:text-xs py-2 px-4 tracking-wide transition-all border-b border-[#2C2B29]">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="hidden md:block text-[#B8AA98] font-medium tracking-wider text-[11px] uppercase">
          Nationwide Cash on Delivery
        </div>

        <div className="flex-1 md:flex-initial text-center font-medium">
          <span>Complimentary delivery on orders over ৳3,000</span>
          <span className="mx-2 text-[#625E58] hidden sm:inline">•</span>
          <span className="hidden sm:inline">Use code <strong className="text-white font-semibold">GLORY10</strong> for 10% off</span>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/shop" className="text-[#A85A20] hover:text-white transition-colors text-[11px] font-semibold hidden md:inline-block">
            Shop Collection &rarr;
          </Link>
          <button
            onClick={() => setIsVisible(false)}
            aria-label="Close banner"
            className="text-[#625E58] hover:text-[#E7E2DA] transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
