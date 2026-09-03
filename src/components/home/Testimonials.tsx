"use client";

import React from "react";
import { Star, Quote, CheckCircle2 } from "lucide-react";

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      author: "Julian Wright, Senior Partner",
      role: "Corporate Law, New York",
      title: "The Vanguard Briefcase commands respect",
      text: "I was skeptical about buying high-end leather online, especially paying cash on delivery. When the courier arrived, I inspected every stitch. The English bridle leather is sublime.",
      rating: 5,
      product: "Vanguard Executive Briefcase"
    },
    {
      author: "Elena Rostova",
      role: "Architect & Urban Photographer, Chicago",
      title: "Sovereign Daypack survived rain in Tokyo & London",
      text: "The waterproof YKK zippers and memory foam shoulder straps make this the most comfortable 16\" laptop backpack I have ever strapped on.",
      rating: 5,
      product: "The Sovereign Leather Daypack"
    },
    {
      author: "Marcus Vance",
      role: "Design Director, San Francisco",
      title: "Weekender Duffel is TSA Carry-on Gold",
      text: "The isolated shoe garage is a game changer. The waxed canvas resists grime and the Horween leather handles feel indestructible.",
      rating: 5,
      product: "Nomad Heritage Weekender Duffel"
    }
  ];

  return (
    <section className="py-20 bg-zinc-950 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400">
            Real Stories from Discerning Travelers
          </span>
          <h2 className="font-serif-heading font-black text-3xl sm:text-4xl text-white mt-1">
            Endorsed by Over 25,000 Bag Enthusiasts
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6 flex flex-col justify-between hover:border-amber-500/40 transition-all duration-300"
            >
              <div>
                {/* Rating & Quote */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-zinc-700" />
                </div>

                <h3 className="font-bold text-white text-base mb-2">&ldquo;{rev.title}&rdquo;</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">&ldquo;{rev.text}&rdquo;</p>
              </div>

              <div className="pt-6 mt-6 border-t border-zinc-800/80 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5 font-semibold text-xs text-white">
                    <span>{rev.author}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <p className="text-[11px] text-zinc-500">{rev.role}</p>
                </div>
                <span className="text-[10px] text-amber-400/80 bg-amber-950/40 px-2 py-1 rounded border border-amber-800/30">
                  {rev.product}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
