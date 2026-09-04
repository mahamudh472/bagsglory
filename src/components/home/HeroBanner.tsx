"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export const HeroBanner: React.FC = () => {
  return (
    <section
      className="relative min-h-[520px] sm:min-h-[600px] lg:min-h-[640px] flex items-center bg-fixed bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: `url('/images/hero-banner.jpg')`,
      }}
    >
      {/* Blue Gradient Parallax Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#173F5A]/90 via-[#23587D]/75 to-[#0084D4]/50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 sm:py-24 w-full">
        <div className="max-w-xl space-y-6 text-white animate-in fade-in slide-in-from-left duration-700">
          <div className="space-y-1">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-sky-300 block mb-2">
              Signature Collection 2026
            </span>
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.08] text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]">
              Carry Your Glory!
            </h1>
          </div>

          <div className="space-y-1.5">
            <h2 className="text-xl sm:text-2xl font-bold tracking-wide text-white/95">
              Raining Offers For Hot Summer!
            </h2>
            <p className="text-base sm:text-lg font-medium text-sky-100/90">
              25% Off On All Premium Handcrafted Bags
            </p>
          </div>

          {/* Action Buttons: Solid Blue "Shop Now" + Outline "Find More" */}
          <div className="flex flex-wrap items-center gap-4 pt-3">
            <Link
              href="/shop"
              className="px-8 py-4 bg-[#0084D4] hover:bg-[#0073B6] text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 rounded-none flex items-center gap-2 group"
            >
              <span>Shop Now</span>
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
            </Link>

            <Link
              href="/shop"
              className="px-8 py-4 bg-transparent hover:bg-white hover:text-[#0084D4] text-white font-bold text-xs sm:text-sm uppercase tracking-wider border-2 border-white transition-all duration-300 hover:-translate-y-0.5 rounded-none"
            >
              Find More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

