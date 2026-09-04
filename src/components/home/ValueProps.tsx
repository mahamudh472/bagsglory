"use client";

import React from "react";
import { Globe, Award, Tag, Lock } from "lucide-react";

export const ValueProps: React.FC = () => {
  const items = [
    {
      icon: Globe,
      title: "Worldwide Shipping",
      desc: "It should be noted that we offer fast, reliable doorstep shipping across all locations.",
    },
    {
      icon: Award,
      title: "Best Quality",
      desc: "It should be noted that every item is handcrafted from genuine materials and tested rigorously.",
    },
    {
      icon: Tag,
      title: "Best Offers",
      desc: "It should be noted that we guarantee unbeatable seasonal value and direct factory deals.",
    },
    {
      icon: Lock,
      title: "Secure Payments",
      desc: "It should be noted that we offer 100% secure payment gateways and Cash on Delivery protection.",
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-white font-sans border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="text-center flex flex-col items-center space-y-3 group"
              >
                <div className="w-14 h-14 rounded-full bg-slate-50 border border-slate-200 text-[#0084D4] group-hover:bg-[#0084D4] group-hover:text-white group-hover:border-[#0084D4] transition-all duration-300 flex items-center justify-center mb-1 shadow-xs">
                  <Icon className="w-6 h-6 stroke-[1.8]" />
                </div>
                <h3 className="font-heading font-bold text-base text-[#1E293B] tracking-tight">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-xs">
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

