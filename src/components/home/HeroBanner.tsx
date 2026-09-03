"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const HeroBanner: React.FC = () => {
  return (
    <section className="relative min-h-[620px] sm:min-h-[700px] flex items-center bg-[#181817] text-white overflow-hidden font-ui">
      {/* Editorial Photography Background */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-102 opacity-70"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=85&w=2000')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#181817]/90 via-[#181817]/60 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-24 sm:py-32">
        <div className="max-w-2xl space-y-6">
          {/* Subtle Label */}
          <span className="text-[11px] font-semibold text-[#B8AA98] uppercase tracking-[0.25em] block">
            Handcrafted Italian Leather
          </span>

          {/* Headline in Cormorant Garamond */}
          <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-white leading-[1.05]">
            Carry Your <br />
            <span className="italic font-light text-[#E7E2DA]">Glory.</span>
          </h1>

          <p className="text-[#E7E2DA]/90 text-sm sm:text-base font-normal leading-relaxed max-w-lg font-ui">
            Artisanal backpacks, structured totes, and travel bags crafted from full-grain hides. Engineered for a lifetime of movement.
          </p>

          {/* Action Buttons: 6-8px radius, Charcoal / Cognac */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link
              href="/shop"
              className="px-8 py-3.5 bg-white text-[#181817] hover:bg-[#EFEBE4] font-semibold text-xs uppercase tracking-[0.12em] rounded-md transition-colors shadow-subtle"
            >
              Explore Collection
            </Link>

            <Link
              href="/category/backpacks"
              className="px-8 py-3.5 bg-transparent hover:bg-white/10 text-white font-semibold text-xs uppercase tracking-[0.12em] rounded-md border border-white/30 backdrop-blur-xs flex items-center gap-2 transition-colors"
            >
              <span>View Backpacks</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="pt-4 text-[11px] text-[#B8AA98] tracking-wider uppercase flex items-center gap-4">
            <span>Cash on Delivery</span>
            <span>•</span>
            <span>Lifetime Warranty</span>
            <span>•</span>
            <span>Free Delivery Over ৳3,000</span>
          </div>
        </div>
      </div>
    </section>
  );
};
