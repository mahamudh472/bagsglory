"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Copy, Check } from "lucide-react";

export const LimitedOfferBanner: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText("OFF20");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section
      className="relative py-20 sm:py-28 bg-fixed bg-cover bg-center text-white overflow-hidden font-sans"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=85&w=1800')`,
      }}
    >
      {/* Cool Ocean Blue Overlay (Allows the model image to show through as user scrolls) */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0E4A6F]/95 via-[#1E6288]/80 to-[#0084D4]/40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-xl space-y-4">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-sky-200 block">
            Limited Time Offer
          </span>

          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
            Special Edition
          </h2>

          <p className="text-xs sm:text-sm text-sky-100/90 leading-relaxed max-w-md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
          </p>

          <div className="pt-2">
            <h3 className="text-sm sm:text-base font-bold text-white mb-4">
              Buy This Collection At 20% Discount, Use Code{" "}
              <span className="bg-white/25 px-2.5 py-1 rounded text-white font-mono font-bold tracking-wider">
                OFF20
              </span>
            </h3>

            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link
                href="/shop"
                className="px-8 py-3.5 bg-[#0084D4] hover:bg-[#0073B6] text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 rounded-none"
              >
                Shop Now
              </Link>

              <button
                onClick={handleCopy}
                className="px-6 py-3.5 bg-white/20 hover:bg-white/30 backdrop-blur-xs text-white font-bold text-xs uppercase tracking-wider border border-white/40 transition-all duration-200 rounded-none flex items-center gap-2"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Code Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Code: OFF20</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

