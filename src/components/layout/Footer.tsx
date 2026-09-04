"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/common/Logo";

export const Footer: React.FC = () => {
  const pathname = usePathname();

  // Hide footer on admin pages
  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="bg-white border-t border-slate-200 text-slate-600 font-sans">
      {/* 1. Top Promotional Banner (as seen in screenshot) */}
      <div className="border-b border-slate-100 py-6 text-center bg-slate-50/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-heading font-extrabold text-sm sm:text-base tracking-wide text-[#1E293B]">
            SALE UP TO 70% OFF FOR ALL LUXURY & FASHION BAGS, ON ALL SIGNATURE LINES!
          </p>
        </div>
      </div>

      {/* 2. Main 4-Column Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Brand Header */}
        <div className="mb-12 pb-8 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <Logo size="lg" />
            <p className="text-xs sm:text-sm text-slate-500 max-w-md leading-relaxed">
              Handcrafted luxury backpacks, travel duffels, executive briefcases, and everyday bags with nationwide Cash on Delivery.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1: Quick Links */}
          <div className="space-y-4">
            <h4 className="font-heading font-bold text-base text-[#1E293B] tracking-tight">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-[#0084D4] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-[#0084D4] transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-[#0084D4] transition-colors">
                  My Account
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-[#0084D4] transition-colors">
                  Cart
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="hover:text-[#0084D4] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: For Her */}
          <div className="space-y-4">
            <h4 className="font-heading font-bold text-base text-[#1E293B] tracking-tight">
              For Her
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/category/totes" className="hover:text-[#0084D4] transition-colors">
                  Women Luxury Totes
                </Link>
              </li>
              <li>
                <Link href="/category/slings" className="hover:text-[#0084D4] transition-colors">
                  Everyday Shoulder Bags
                </Link>
              </li>
              <li>
                <Link href="/category/crossbody" className="hover:text-[#0084D4] transition-colors">
                  Crossbody & Clutches
                </Link>
              </li>
              <li>
                <Link href="/category/backpacks" className="hover:text-[#0084D4] transition-colors">
                  Mini Leather Backpacks
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-[#0084D4] transition-colors">
                  Women Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: For Him */}
          <div className="space-y-4">
            <h4 className="font-heading font-bold text-base text-[#1E293B] tracking-tight">
              For Him
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/category/briefcases" className="hover:text-[#0084D4] transition-colors">
                  Executive Briefcases
                </Link>
              </li>
              <li>
                <Link href="/category/backpacks" className="hover:text-[#0084D4] transition-colors">
                  Urban Commute Backpacks
                </Link>
              </li>
              <li>
                <Link href="/category/duffels" className="hover:text-[#0084D4] transition-colors">
                  Travel & Gym Duffels
                </Link>
              </li>
              <li>
                <Link href="/category/slings" className="hover:text-[#0084D4] transition-colors">
                  Chest Slings & Pouches
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-[#0084D4] transition-colors">
                  Men Wallets & Belts
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: App Download & Brand Summary */}
          <div className="space-y-4">
            <h4 className="font-heading font-bold text-base text-[#1E293B] tracking-tight">
              Get The App
            </h4>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Experience seamless ordering and exclusive flash sales directly on the BagsGlory Mobile App.
            </p>

            {/* App Badges Mock */}
            <div className="space-y-2 pt-1">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-black text-white rounded-md hover:bg-slate-800 transition-colors cursor-pointer shadow-sm">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a1.993 1.993 0 0 1-.61-.926V2.74c.15-.36.368-.679.61-.926zM15.207 13.414l2.586-2.586-2.586-2.586 2.05-1.184 3.75 2.164c1.026.592 1.026 1.558 0 2.15l-3.75 2.164-2.05-1.122zM4.73 23.308l9.763-9.764 2.875 2.876-11.25 6.495c-.476.275-.97.405-1.388.393zm0-22.616c.418-.012.912.118 1.388.393l11.25 6.495-2.875 2.876L4.73.692z"/>
                </svg>
                <div className="text-left">
                  <div className="text-[9px] uppercase tracking-wider text-slate-300">GET IT ON</div>
                  <div className="text-xs font-bold leading-tight">Google Play</div>
                </div>
              </div>

              <div className="block">
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-black text-white rounded-md hover:bg-slate-800 transition-colors cursor-pointer shadow-sm">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.87c.65-.8 1.09-1.92.97-3.03-.94.04-2.07.63-2.74 1.42-.59.68-1.11 1.8-0.97 2.88 1.05.08 2.12-.55 2.74-1.27z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-[9px] uppercase tracking-wider text-slate-300">Download on the</div>
                    <div className="text-xs font-bold leading-tight">App Store</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Bottom Sub-bar */}
        <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>Copyright © {new Date().getFullYear()} BagsGlory. Powered by BagsGlory.</p>
          <div className="flex items-center gap-4">
            <Link href="/admin" className="hover:text-[#0084D4] transition-colors">
              Admin Portal
            </Link>
            <span>•</span>
            <Link href="/track-order" className="hover:text-[#0084D4] transition-colors">
              Order Tracking
            </Link>
            <span>•</span>
            <span>Cash on Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

