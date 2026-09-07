"use client";

import React from "react";
import { Globe, Award, Tag, ShieldCheck } from "lucide-react";

export const ValueProps: React.FC = () => {
  const items = [
    {
      icon: Globe,
      title: "Worldwide Delivery",
      desc: "Carefully packaged and dispatched with insured tracked shipping.",
    },
    {
      icon: Award,
      title: "Bespoke Quality",
      desc: "Handcrafted from premier full-grain leathers and reinforced brass.",
    },
    {
      icon: Tag,
      title: "Direct Atelier Value",
      desc: "Exceptional luxury without unnecessary middleman markups.",
    },
    {
      icon: ShieldCheck,
      title: "Secure Purchase",
      desc: "Encrypted checkout with nationwide Cash on Delivery confidence.",
    },
  ];

  return (
    <section className="py-20 sm:py-24 bg-[#F8F5EF] font-sans border-t border-[#E5DED4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="text-center flex flex-col items-center space-y-3.5 group"
              >
                <div className="w-13 h-13 rounded-full bg-[#FFFFFF] border border-[#E5DED4] text-[#0D0C0B] group-hover:border-[#C9A45C] group-hover:text-[#C9A45C] transition-all duration-300 flex items-center justify-center mb-1 shadow-xs">
                  <Icon className="w-5 h-5 stroke-[1.5]" />
                </div>
                <h3 className="font-sans font-semibold text-xs sm:text-sm uppercase tracking-[0.18em] text-[#0D0C0B]">
                  {item.title}
                </h3>
                <p className="text-xs text-[#746C63] leading-relaxed max-w-xs font-light">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};


