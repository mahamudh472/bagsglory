"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const CategoryShowcase: React.FC = () => {
  const editorialCollections = [
    {
      title: "The Backpack Atelier",
      tagline: "Heritage full-grain leather for urban commuting and travel.",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=900",
      link: "/category/backpacks",
      categoryName: "Backpacks",
    },
    {
      title: "Structured Everyday Totes",
      tagline: "Architectural lines with dedicated laptop sleeves and key leashes.",
      image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=900",
      link: "/category/totes",
      categoryName: "Totes",
    },
    {
      title: "Executive Briefcases",
      tagline: "Vegetable-tanned leather cases tailored for the modern boardroom.",
      image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&q=80&w=900",
      link: "/category/briefcases",
      categoryName: "Briefcases",
    },
  ];

  return (
    <section className="bg-[#F8F6F1] py-20 font-ui border-b border-[#E7E2DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A85A20] block mb-2">
            Curated Collections
          </span>
          <h2 className="font-editorial text-4xl sm:text-5xl text-[#181817] font-normal">
            Artisanal Silhouettes
          </h2>
        </div>

        {/* 3 Editorial Collection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {editorialCollections.map((col, idx) => (
            <Link
              key={idx}
              href={col.link}
              className="group flex flex-col space-y-4"
            >
              {/* Image Container with 8-12px rounding */}
              <div className="relative aspect-[4/5] w-full rounded-lg overflow-hidden bg-[#EFEBE4] border border-[#E7E2DA]/60">
                <Image
                  src={col.image}
                  alt={col.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-103"
                />
              </div>

              {/* Text Info */}
              <div className="space-y-2 pt-1">
                <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#A85A20]">
                  {col.categoryName}
                </span>
                <h3 className="font-editorial text-2xl sm:text-3xl text-[#181817] group-hover:text-[#A85A20] transition-colors leading-tight font-normal">
                  {col.title}
                </h3>
                <p className="text-sm text-[#625E58] leading-relaxed line-clamp-2">
                  {col.tagline}
                </p>
                <div className="pt-2 flex items-center gap-1.5 text-sm font-semibold text-[#181817] group-hover:text-[#A85A20] transition-colors">
                  <span>Explore Collection</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
