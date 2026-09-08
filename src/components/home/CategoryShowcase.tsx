"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck, Award, Gem, Compass } from "lucide-react";

import { useStore } from "@/context/StoreContext";

export const CategoryShowcase: React.FC = () => {
  const { categories } = useStore();

  const brandLogos = [
    { name: "GLORY LUXE", icon: Sparkles },
    { name: "HERITAGE CO.", icon: ShieldCheck },
    { name: "ARTISAN ATELIER", icon: Award },
    { name: "VACHETTA LEATHER", icon: Gem },
    { name: "VOYAGER TRAVEL", icon: Compass },
  ];

  // Dynamic collections from store or fallback
  const fallbackCards = [
    {
      subtitle: "COLLECTION",
      title: "Luxury Handbags",
      tagline: "Structured silhouettes, bespoke hardware, and timeless everyday elegance.",
      image: "/images/women-fashion.jpg",
      link: "/category/totes",
      buttonText: "DISCOVER TOTES",
    },
    {
      subtitle: "EXECUTIVE",
      title: "Executive & Travel",
      tagline: "Hand-stitched briefcases, tech-ready duffels, and commanding leather daypacks.",
      image: "/images/men-fashion.jpg",
      link: "/category/briefcases",
      buttonText: "DISCOVER BRIEFCASES",
    },
    {
      subtitle: "MINIMALIST",
      title: "Everyday Slings",
      tagline: "Minimalist leather slings, full-grain cardholders, and fine travel companions.",
      image: "/images/footwear.jpg",
      link: "/category/slings",
      buttonText: "SHOP SLINGS",
    },
  ];

  const promoCards = categories.length >= 3
    ? categories.slice(0, 3).map((cat, idx) => ({
        subtitle: cat.badge || (idx === 0 ? "FEATURED" : idx === 1 ? "SIGNATURE" : "ATELIER"),
        title: cat.name,
        tagline: cat.tagline || cat.description,
        image: cat.image || fallbackCards[idx]?.image || "/images/women-fashion.jpg",
        link: `/category/${cat.slug}`,
        buttonText: `EXPLORE ${cat.name.split(" ")[0].toUpperCase()}`,
      }))
    : fallbackCards;

  return (
    <section className="bg-[#F8F5EF] font-sans">
      {/* 1. Refined Luxury Brand Trust Strip */}
      <div className="border-b border-[#E5DED4] py-8 bg-[#F8F5EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-6 opacity-75 hover:opacity-100 transition-opacity">
            {brandLogos.map((brand, idx) => {
              const Icon = brand.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 text-[#746C63] font-sans font-semibold text-xs tracking-[0.2em] uppercase"
                >
                  <Icon className="w-4 h-4 text-[#C9A45C]" />
                  <span>{brand.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. 3 Featured Editorial Promo Cards */}
      <div className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C9A45C] block mb-2">
              Curated Lines
            </span>
            <h2 className="font-heading font-normal text-3xl sm:text-4xl text-[#0D0C0B]">
              The Collections
            </h2>
            <div className="w-12 h-[1px] bg-[#C9A45C] mx-auto mt-3" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {promoCards.map((card, idx) => (
              <div
                key={idx}
                className="group relative min-h-[460px] sm:min-h-[500px] bg-[#0D0C0B] overflow-hidden flex flex-col justify-end p-8 text-white shadow-luxury transition-all duration-500 border border-[#E5DED4]/40"
              >
                {/* Editorial Photography with Smooth Zoom */}
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105 opacity-85 group-hover:opacity-90"
                />

                {/* Subtle Editorial Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0C0B] via-[#0D0C0B]/40 to-transparent pointer-events-none" />

                {/* Content */}
                <div className="relative z-10 space-y-3">
                  <span className="text-[11px] font-semibold tracking-[0.25em] text-[#C9A45C] block uppercase">
                    {card.subtitle}
                  </span>

                  <h3 className="font-heading font-normal text-2xl sm:text-3xl text-[#F8F5EF] leading-tight">
                    {card.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#F8F5EF]/80 font-light line-clamp-2 leading-relaxed">
                    {card.tagline}
                  </p>

                  <div className="pt-2">
                    <Link
                      href={card.link}
                      className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#F8F5EF] group-hover:text-[#C9A45C] transition-colors"
                    >
                      <span className="border-b border-[#C9A45C]/60 pb-1 group-hover:border-[#C9A45C]">
                        {card.buttonText}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};


