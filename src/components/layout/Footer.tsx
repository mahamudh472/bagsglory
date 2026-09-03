"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { Logo } from "@/components/common/Logo";

export const Footer: React.FC = () => {
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // Hide footer on admin pages
  if (pathname.startsWith("/admin")) return null;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#EFEBE4] border-t border-[#E7E2DA] text-[#625E58] pt-16 pb-12 font-ui">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-[#E7E2DA]">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <Logo size="md" />
            <p className="text-sm sm:text-[15px] text-[#625E58] leading-relaxed max-w-sm">
              Artisanal leather carry goods crafted from full-grain Italian hides. Engineered for enduring elegance, purposeful utility, and a lifetime of journeys.
            </p>
            <div className="text-xs text-[#8C827A] pt-2">
              <span>Nationwide Cash on Delivery • 30-Day Easy Returns</span>
            </div>
          </div>

          {/* SHOP Column */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-[#181817]">
              Shop
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/shop" className="hover:text-[#181817] transition-colors">
                  All Bags
                </Link>
              </li>
              <li>
                <Link href="/category/backpacks" className="hover:text-[#181817] transition-colors">
                  Backpacks
                </Link>
              </li>
              <li>
                <Link href="/category/briefcases" className="hover:text-[#181817] transition-colors">
                  Briefcases
                </Link>
              </li>
              <li>
                <Link href="/category/duffels" className="hover:text-[#181817] transition-colors">
                  Travel Bags
                </Link>
              </li>
              <li>
                <Link href="/category/slings" className="hover:text-[#181817] transition-colors">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* CUSTOMER CARE Column */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-[#181817]">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/track-order" className="hover:text-[#181817] transition-colors">
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="hover:text-[#181817] transition-colors">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="hover:text-[#181817] transition-colors">
                  Returns & Exchange
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="hover:text-[#181817] transition-colors">
                  Lifetime Warranty
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="hover:text-[#181817] transition-colors">
                  FAQs & Support
                </Link>
              </li>
            </ul>
          </div>

          {/* ABOUT Column */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-[#181817]">
              About
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/shop" className="hover:text-[#181817] transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-[#181817] transition-colors">
                  Craftsmanship
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-[#181817] transition-colors">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-[#181817] transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-[#8C827A] hover:text-[#181817] transition-colors text-xs font-medium">
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* NEWSLETTER Column */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-[#181817]">
              Newsletter
            </h4>
            <p className="text-xs sm:text-sm text-[#625E58] leading-relaxed">
              Receive private previews of seasonal leather releases and artisan dispatches.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full text-sm px-3.5 py-2.5 bg-white border border-[#E7E2DA] rounded-md text-[#181817] placeholder:text-[#B8AA98] focus:outline-none focus:border-[#181817] transition-colors"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="absolute right-2 top-2 p-1 text-[#181817] hover:text-[#A85A20] transition-colors"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              {subscribed && (
                <p className="text-xs text-[#2D5A3C] font-semibold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>Subscribed successfully.</span>
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Sub-bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-[#8C827A]">
          <p>© {new Date().getFullYear()} BagsGlory. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs">
            <span>Cash on Delivery</span>
            <span>•</span>
            <span>Handcrafted Quality</span>
            <span>•</span>
            <span>Worldwide Design Heritage</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
