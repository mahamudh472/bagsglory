"use client";

import React from "react";
import { Truck, ShieldCheck, RotateCcw, Lock } from "lucide-react";

export const ValueProps: React.FC = () => {
  const items = [
    {
      icon: Truck,
      title: "Cash on Delivery",
      desc: "Doorstep courier delivery nationwide with zero prepayment required.",
    },
    {
      icon: ShieldCheck,
      title: "Lifetime Warranty",
      desc: "Full coverage on full-grain leather, cast brass hardware, and zippers.",
    },
    {
      icon: RotateCcw,
      title: "30-Day Easy Returns",
      desc: "Hassle-free returns and doorstep exchange if not completely satisfied.",
    },
    {
      icon: Lock,
      title: "100% Protected",
      desc: "Pay upon physical parcel inspection with guaranteed peace of mind.",
    },
  ];

  return (
    <section className="py-20 bg-[#F8F6F1] font-ui">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="text-center sm:text-left flex flex-col items-center sm:items-start space-y-3"
              >
                <div className="w-11 h-11 rounded-md bg-white border border-[#E7E2DA] text-[#A85A20] flex items-center justify-center mb-1 shadow-subtle">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-sm uppercase tracking-[0.12em] text-[#181817]">
                  {item.title}
                </h3>
                <p className="text-sm text-[#625E58] leading-relaxed max-w-xs">
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
