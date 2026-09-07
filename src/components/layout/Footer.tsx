"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/common/Logo";
import { ShieldCheck } from "lucide-react";

export const Footer: React.FC = () => {
  const pathname = usePathname();

  // Hide footer on admin pages
  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="bg-[#0D0C0B] text-[#F8F5EF] font-sans border-t border-[#241B14]">
      {/* 1. Subtle Luxury Brand Strip */}
      <div className="border-b border-[#241B14] py-8 text-center bg-[#171513]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-heading font-normal text-lg sm:text-xl tracking-wider text-[#C9A45C]">
            ✦ COMPLIMENTARY WORLDWIDE DELIVERY ON ORDERS OVER ৳3,000 ✦
          </p>
        </div>
      </div>

      {/* 2. Main Luxury Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-10">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-5">
            <Logo size="lg" variant="light" />
            <p className="text-[11px] font-semibold tracking-[0.25em] text-[#C9A45C] uppercase">
              Carry Your Glory
            </p>
            <p className="text-xs sm:text-sm text-[#746C63] max-w-sm leading-relaxed font-light">
              Handcrafted luxury handbags, executive briefcases, structured totes, and travel companions forged with uncompromising atelier precision.
            </p>
            <div className="pt-2 flex items-center gap-4 text-[#C9A45C]">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full border border-[#241B14] flex items-center justify-center text-[#746C63] hover:text-[#C9A45C] hover:border-[#C9A45C] transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full border border-[#241B14] flex items-center justify-center text-[#746C63] hover:text-[#C9A45C] hover:border-[#C9A45C] transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.667 5H18V0h-3.889C10.667 0 9 1.667 9 4.667V8z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 1: SHOP */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A45C]">
              Shop
            </h4>
            <ul className="space-y-2.5 text-xs tracking-wider">
              <li>
                <Link href="/category/totes" className="text-[#F8F5EF]/80 hover:text-[#C9A45C] transition-colors">
                  Women
                </Link>
              </li>
              <li>
                <Link href="/category/briefcases" className="text-[#F8F5EF]/80 hover:text-[#C9A45C] transition-colors">
                  Men
                </Link>
              </li>
              <li>
                <Link href="/category/slings" className="text-[#F8F5EF]/80 hover:text-[#C9A45C] transition-colors">
                  Accessories
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-[#F8F5EF]/80 hover:text-[#C9A45C] transition-colors">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: HELP */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A45C]">
              Help
            </h4>
            <ul className="space-y-2.5 text-xs tracking-wider">
              <li>
                <Link href="/track-order" className="text-[#F8F5EF]/80 hover:text-[#C9A45C] transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="text-[#F8F5EF]/80 hover:text-[#C9A45C] transition-colors">
                  Shipping
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="text-[#F8F5EF]/80 hover:text-[#C9A45C] transition-colors">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="text-[#F8F5EF]/80 hover:text-[#C9A45C] transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: COMPANY */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A45C]">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs tracking-wider">
              <li>
                <Link href="/shop" className="text-[#F8F5EF]/80 hover:text-[#C9A45C] transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-[#F8F5EF]/80 hover:text-[#C9A45C] transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-[#F8F5EF]/80 hover:text-[#C9A45C] transition-colors flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C9A45C]" />
                  <span>Admin Suite</span>
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* 3. Bottom Sub-bar */}
        <div className="mt-16 pt-8 border-t border-[#241B14] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#746C63] font-light">
          <p>© {new Date().getFullYear()} BAGSGLORY. Carry Your Glory. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[11px] tracking-wider uppercase">
            <span>Cash on Delivery</span>
            <span>•</span>
            <span>Secure Atelier Packaging</span>
            <span>•</span>
            <span>Handcrafted Excellence</span>
          </div>
        </div>
      </div>
    </footer>
  );
};


