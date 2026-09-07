import React from "react";
import Link from "next/link";
import { ArrowLeft, Compass, Search } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-[75vh] flex items-center justify-center bg-[#F8F5EF] px-4 py-16 sm:py-24 font-sans animate-page-enter">
      <div className="max-w-2xl w-full text-center">
        {/* Subtle Gold Monogram Crest / Tagline */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-[#C9A45C]/40 bg-[#FFFFFF] shadow-xs mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A45C]" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#C9A45C]">
            Carry Your Glory
          </span>
        </div>

        {/* 404 Display Heading */}
        <div className="relative mb-6">
          <span className="font-heading font-light text-7xl sm:text-9xl text-[#0D0C0B]/10 select-none block tracking-tighter">
            404
          </span>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h1 className="font-heading font-normal text-3xl sm:text-4xl lg:text-5xl text-[#0D0C0B] tracking-tight">
              Page Not Found
            </h1>
          </div>
        </div>

        <div className="w-12 h-[1px] bg-[#C9A45C] mx-auto mb-6" />

        {/* Description */}
        <p className="text-sm sm:text-base text-[#746C63] font-light max-w-md mx-auto leading-relaxed mb-10">
          The creation or page you are seeking is unavailable in our atelier catalog. It may have been archived, updated, or moved.
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <Link
            href="/shop"
            className="w-full sm:w-auto px-8 py-3.5 bg-[#0D0C0B] hover:bg-[#C9A45C] text-[#F8F5EF] hover:text-[#0D0C0B] text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-300 flex items-center justify-center gap-2 shadow-xs"
          >
            <Compass className="w-4 h-4 text-[#C9A45C] group-hover:text-[#0D0C0B]" />
            <span>Explore All Creations</span>
          </Link>
          <Link
            href="/"
            className="w-full sm:w-auto px-8 py-3.5 bg-transparent hover:bg-[#0D0C0B] text-[#0D0C0B] hover:text-[#F8F5EF] border border-[#0D0C0B] text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-300 flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
        </div>

        {/* Curated Quick Collection Links */}
        <div className="border-t border-[#E5DED4] pt-8">
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#746C63] block mb-4">
            Curated Atelier Navigation
          </span>
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs uppercase tracking-[0.15em] text-[#171513]">
            <Link href="/category/totes" className="hover:text-[#C9A45C] transition-colors">
              Women&apos;s Totes
            </Link>
            <span className="text-[#E5DED4]">•</span>
            <Link href="/category/briefcases" className="hover:text-[#C9A45C] transition-colors">
              Men&apos;s Briefcases
            </Link>
            <span className="text-[#E5DED4]">•</span>
            <Link href="/category/slings" className="hover:text-[#C9A45C] transition-colors">
              Accessories
            </Link>
            <span className="text-[#E5DED4]">•</span>
            <Link href="/track-order" className="hover:text-[#C9A45C] transition-colors">
              Track Order
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
