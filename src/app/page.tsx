import React from "react";
import { HeroBanner } from "@/components/home/HeroBanner";
import { CategoryShowcase } from "@/components/home/CategoryShowcase";
import { FeaturedGrid } from "@/components/home/FeaturedGrid";
import { LimitedOfferBanner } from "@/components/home/LimitedOfferBanner";
import { ValueProps } from "@/components/home/ValueProps";

export const metadata = {
  title: "BagsGlory | Carry Your Glory! - Handcrafted Luxury Bags",
  description: "Carry Your Glory! Discover premium handcrafted leather backpacks, structured totes, executive briefcases, and travel duffels. Cash on Delivery available.",
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* 1. Hero: Carry Your Glory! */}
      <HeroBanner />

      {/* 2. Brand Logos Bar + 3 Featured Promo Cards */}
      <CategoryShowcase />

      {/* 3. Clean Featured Products Grid with Color Swatches */}
      <FeaturedGrid />

      {/* 4. Limited Time Offer Promo Banner */}
      <LimitedOfferBanner />

      {/* 5. 4-Column Feature Value Pillars */}
      <ValueProps />
    </main>
  );
}
