"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export const HeroBanner: React.FC = () => {
  return (
    <section className="relative bg-[#F8F5EF] border-b border-[#E5DED4] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[580px] sm:min-h-[640px] lg:min-h-[700px] py-12 lg:py-0">
          
          {/* Left Column: Editorial Brand Headline & CTAs */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 z-10 text-left">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2">
                <span className="w-8 h-[1px] bg-[#C9A45C]" />
                <span className="text-xs sm:text-[13px] font-semibold uppercase tracking-[0.25em] text-[#C9A45C]">
                  Signature Collection 2026
                </span>
              </div>

              <h1 className="font-heading font-normal text-5xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight leading-[0.95] text-[#0D0C0B]">
                Carry Your <span className="italic font-light text-[#C9A45C]">Glory</span>
              </h1>
            </div>

            <p className="font-sans text-base sm:text-lg text-[#746C63] max-w-md font-light leading-relaxed">
              Timeless bags designed for every journey. Handcrafted with uncompromising precision from world-class full-grain leather.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2 sm:pt-4">
              <Link
                href="/shop"
                className="px-8 sm:px-9 py-4 bg-[#0D0C0B] hover:bg-[#C9A45C] text-[#F8F5EF] hover:text-[#0D0C0B] font-sans font-semibold text-xs sm:text-[13px] uppercase tracking-[0.18em] transition-all duration-300 shadow-sm hover:shadow-md flex items-center gap-3 group"
              >
                <span>Shop Collection</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/category/totes"
                className="px-8 sm:px-9 py-4 bg-transparent hover:bg-[#0D0C0B] text-[#171513] hover:text-[#F8F5EF] font-sans font-semibold text-xs sm:text-[13px] uppercase tracking-[0.18em] border border-[#171513] transition-all duration-300"
              >
                Explore
              </Link>
            </div>

            {/* Minimal Sub-features */}
            <div className="pt-6 sm:pt-8 border-t border-[#E5DED4]/60 grid grid-cols-3 gap-4 text-left">
              <div>
                <span className="block font-heading text-xl sm:text-2xl text-[#0D0C0B] font-semibold">100%</span>
                <span className="text-[11px] uppercase tracking-wider text-[#746C63]">Full-Grain</span>
              </div>
              <div>
                <span className="block font-heading text-xl sm:text-2xl text-[#0D0C0B] font-semibold">Bespoke</span>
                <span className="text-[11px] uppercase tracking-wider text-[#746C63]">Craftsmanship</span>
              </div>
              <div>
                <span className="block font-heading text-xl sm:text-2xl text-[#0D0C0B] font-semibold">Lifetime</span>
                <span className="text-[11px] uppercase tracking-wider text-[#746C63]">Quality Guarantee</span>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Handbag / Editorial Photography */}
          <div className="lg:col-span-6 relative h-[420px] sm:h-[500px] lg:h-[620px] w-full flex items-center justify-center">
            {/* Background subtle luxury frame */}
            <div className="absolute inset-4 border border-[#C9A45C]/30 z-0 pointer-events-none translate-x-3 translate-y-3 hidden sm:block" />
            
            <div className="relative w-full h-full overflow-hidden bg-[#241B14] shadow-2xl z-10">
              <Image
                src="/images/hero-banner.jpg"
                alt="BAGSGLORY Signature Luxury Collection"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-1000 ease-out hover:scale-105"
              />
              {/* Refined subtle dark gradient vignette at base for editorial depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0C0B]/60 via-transparent to-transparent pointer-events-none" />
              
              {/* Floating Editorial Badge */}
              <div className="absolute bottom-6 left-6 bg-[#0D0C0B]/90 backdrop-blur-md border border-[#C9A45C]/40 p-4 text-white max-w-xs shadow-lg">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C9A45C]">Edition 2026</p>
                <p className="font-heading text-lg text-[#F8F5EF] leading-snug">The Sovereign Handbag</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};


