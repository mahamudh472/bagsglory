"use client";

import React from "react";
import Image from "next/image";
import { Check, Shield, Layers, Award, Sparkles } from "lucide-react";
import Link from "next/link";

export const CraftsmanshipStory: React.FC = () => {
  const points = [
    {
      title: "Italian Vachetta & Top-Grain Hide",
      desc: "Sourced from historic Tuscan tanneries using natural vegetable extracts and tree bark tannins without toxic chrome."
    },
    {
      title: "Hand-Burnished & Saddle-Stitched",
      desc: "Each stress point is reinforced with heavy bonded nylon threads and edges are beveled, waxed, and polished by hand."
    },
    {
      title: "Solid Brass Japanese YKK Excella Zippers",
      desc: "Mirror-polished teeth guarantee whisper-smooth operation and zero snagging for decades of heavy commuting."
    },
    {
      title: "Lifetime Repair & Authenticity Guarantee",
      desc: "We stand behind every stitch. In the rare event of a material flaw, our master craftsmen restore it free of charge."
    }
  ];

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Visual Showcase (2 Images Overlay) */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-zinc-200">
              <Image
                src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=1200"
                alt="Leather Crafting Artisan"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="bg-amber-500 text-zinc-950 font-bold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full">
                  Since 2018
                </span>
                <h3 className="font-serif-heading text-xl font-bold mt-2">
                  Tuscan Vegetable-Tanned Excellence
                </h3>
                <p className="text-xs text-zinc-300 mt-1">
                  Ages into a rich honey patina unique to your personal travels.
                </p>
              </div>
            </div>

            {/* Small Floating Stat Badge */}
            <div className="absolute -bottom-6 -right-4 sm:right-6 bg-zinc-950 text-white p-5 rounded-2xl border border-amber-500/30 shadow-2xl flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-serif-heading font-black text-xl">
                100%
              </div>
              <div>
                <p className="text-xs font-bold text-white uppercase tracking-wider">
                  Full-Grain Purity
                </p>
                <p className="text-[11px] text-zinc-400">Zero synthetic fillers or bonded dust</p>
              </div>
            </div>
          </div>

          {/* Right Text & Craft Points */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-800 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-600" />
                The BagsGlory Standard
              </span>
              <h2 className="font-serif-heading font-black text-3xl sm:text-4xl text-zinc-950 mt-1">
                Engineered to Outlast Trends, Built to Age Gracefully.
              </h2>
            </div>

            <p className="text-sm text-zinc-600 leading-relaxed">
              We reject fast fashion disposable culture. Every BagsGlory silhouette is conceived in our Florence workshop and crafted in limited batches using time-honored European leatherworking traditions.
            </p>

            <div className="space-y-4 pt-2">
              {points.map((pt, idx) => (
                <div key={idx} className="flex items-start gap-3.5">
                  <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-zinc-900">{pt.title}</h4>
                    <p className="text-xs text-zinc-500 mt-0.5 leading-relaxed">{pt.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 flex items-center gap-4">
              <Link
                href="/shop"
                className="px-6 py-3 bg-zinc-950 hover:bg-amber-800 text-white text-xs font-bold rounded-xl transition-colors shadow-md"
              >
                Experience the Craft
              </Link>
              <span className="text-xs text-zinc-500">
                ⚡ Cash on Delivery available on all artisan orders
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
