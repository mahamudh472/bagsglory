"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Shield, Award, Zap, Compass } from "lucide-react";

export const CategoryShowcase: React.FC = () => {
  const brandLogos = [
    { name: "GLORY LUXE", icon: Sparkles },
    { name: "HERITAGE CO.", icon: Shield },
    { name: "ARTISAN 1984", icon: Award },
    { name: "URBAN CARRY", icon: Zap },
    { name: "VOYAGER TRAVEL", icon: Compass },
  ];

  const promoCards = [
    {
      title: "20% Off On Tank Tops",
      tagline: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac dictum.",
      image: "/images/women-fashion.jpg",
      link: "/shop",
      buttonText: "SHOP NOW",
    },
    {
      title: "Latest Eyewear For You",
      tagline: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac dictum.",
      image: "/images/men-fashion.jpg",
      link: "/shop",
      buttonText: "SHOP NOW",
    },
    {
      title: "Let's Lorem Suit Up!",
      tagline: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac dictum.",
      image: "/images/footwear.jpg",
      link: "/shop",
      buttonText: "CHECK OUT",
    },
  ];

  return (
    <section className="bg-white font-sans">
      {/* 1. Brand Logos Strip (as seen in screenshot) */}
      <div className="border-b border-slate-100 py-8 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-6 opacity-70 hover:opacity-100 transition-opacity">
            {brandLogos.map((brand, idx) => {
              const Icon = brand.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-slate-500 font-heading font-extrabold text-xs sm:text-sm uppercase tracking-widest"
                >
                  <Icon className="w-5 h-5 text-[#0084D4]" />
                  <span>{brand.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. 3 Featured Promo Cards (matching screenshot) */}
      <div className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {promoCards.map((card, idx) => (
              <div
                key={idx}
                className="relative min-h-[380px] sm:min-h-[420px] rounded-lg overflow-hidden flex flex-col justify-end p-8 text-white group shadow-md hover:shadow-xl transition-all duration-300"
              >
                {/* Background Image with Smooth Scale Animation */}
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/50 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

                {/* Content */}
                <div className="relative z-10 space-y-3">
                  <h3 className="font-heading font-bold text-2xl sm:text-2xl text-white leading-tight">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-200 line-clamp-2 leading-relaxed">
                    {card.tagline}
                  </p>
                  <div className="pt-2">
                    <Link
                      href={card.link}
                      className="inline-block px-7 py-3 bg-[#0084D4] hover:bg-[#0073B6] text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 rounded-none"
                    >
                      {card.buttonText}
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

