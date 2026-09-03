"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Copy, Check } from "lucide-react";

export const LimitedOfferBanner: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText("GLORY10");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section className="relative py-24 sm:py-28 bg-[#181817] text-white overflow-hidden font-ui">
      {/* Background with warm ambient lighting */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity scale-102"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=1920')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#181817] via-[#181817]/80 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-2xl space-y-5">
          <span className="text-[10px] font-semibold text-[#B8AA98] uppercase tracking-[0.25em] block">
            Special Seasonal Dispatch
          </span>

          <h2 className="font-editorial text-3xl sm:text-5xl text-white leading-tight font-normal">
            Enjoy 10% Off Your First Order <br />
            With Code <span className="font-mono text-[#E7E2DA] font-semibold">GLORY10</span>
          </h2>

          <p className="text-xs sm:text-sm text-[#E7E2DA]/80 leading-relaxed max-w-xl font-ui">
            Handcrafted from full-grain Italian leather with lifetime craftsmanship warranty. Delivered with nationwide Cash on Delivery inspection.
          </p>

          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <Link
              href="/shop"
              className="px-7 py-3.5 bg-white text-[#181817] hover:bg-[#EFEBE4] font-semibold text-xs uppercase tracking-[0.12em] rounded-md flex items-center gap-2 transition-colors shadow-subtle"
            >
              <span>Shop Collection</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={handleCopy}
              className="px-6 py-3.5 bg-white/10 hover:bg-white/15 text-white font-semibold text-xs uppercase tracking-[0.12em] rounded-md border border-white/20 backdrop-blur-xs flex items-center gap-2 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#2D5A3C]" />
                  <span>Code Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#B8AA98]" />
                  <span>Copy Code: GLORY10</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
