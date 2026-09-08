"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Copy, Check, ArrowRight } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export const LimitedOfferBanner: React.FC = () => {
  const { coupons } = useStore();
  const [copied, setCopied] = useState(false);

  const activeCoupon = coupons.find((c) => c.isActive) || coupons[0] || {
    code: "GLORY10",
    discountValue: 10,
    discountType: "percentage",
  };

  const discountText = activeCoupon.discountType === "percentage"
    ? `Enjoy ${activeCoupon.discountValue}% Privilege:`
    : `Enjoy ৳${activeCoupon.discountValue} Privilege:`;

  const handleCopy = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(activeCoupon.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section className="relative py-24 sm:py-32 bg-[#0D0C0B] text-[#F8F5EF] overflow-hidden font-sans border-y border-[#241B14]">
      {/* Background Editorial Image with Luxury Dark Obsidian Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/special-edition-banner.jpg"
          alt="Limited Edition Signature Collection"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-30 filter saturate-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D0C0B] via-[#0D0C0B]/90 to-[#0D0C0B]/60" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2">
            <span className="w-8 h-[1px] bg-[#C9A45C]" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C9A45C] block">
              Limited Edition
            </span>
          </div>

          <h2 className="font-heading font-normal text-4xl sm:text-5xl lg:text-6xl text-[#F8F5EF] leading-[1.05]">
            The Signature <span className="italic font-light text-[#C9A45C]">Collection</span>
          </h2>

          <p className="font-sans text-sm sm:text-base text-[#F8F5EF]/80 leading-relaxed font-light max-w-lg">
            Crafted for those who carry their own glory. Experience limited batch releases handcrafted with bespoke gold hardware and Italian Vachetta leather.
          </p>

          <div className="pt-2">
            <div className="inline-flex items-center gap-3 p-3 bg-[#241B14]/80 border border-[#C9A45C]/30 mb-6">
              <span className="text-xs text-[#F8F5EF]/90 uppercase tracking-wider font-medium">
                {discountText}
              </span>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#C9A45C] text-[#0D0C0B] text-xs font-mono font-bold tracking-wider hover:bg-[#E5C77A] transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#0D0C0B]" />
                    <span>COPIED: {activeCoupon.code}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>CODE: {activeCoupon.code}</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/shop"
                className="px-9 py-4 bg-[#C9A45C] hover:bg-[#E5C77A] text-[#0D0C0B] font-semibold text-xs uppercase tracking-[0.18em] transition-all duration-300 shadow-md flex items-center gap-3 group"
              >
                <span>Shop Collection</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


