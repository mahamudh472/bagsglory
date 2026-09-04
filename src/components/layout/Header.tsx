"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  ShoppingCart,
  Heart,
  Menu,
  X,
  ShieldCheck,
  ChevronRight,
  User,
} from "lucide-react";
import { Logo } from "@/components/common/Logo";
import { useStore } from "@/context/StoreContext";
import { SearchModal } from "@/components/search/SearchModal";
import { formatPrice } from "@/utils/currency";

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { cartItemCount, cartTotal, wishlist, setIsCartOpen, categories } = useStore();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileMenuOpen]);

  // Hide public header inside admin
  if (pathname.startsWith("/admin")) {
    return null;
  }

  const mainNav = [
    { label: "EVERYTHING", href: "/shop" },
    { label: "WOMEN", href: "/category/totes" },
    { label: "MEN", href: "/category/briefcases" },
    { label: "ACCESSORIES", href: "/category/slings" },
    { label: "ABOUT", href: "/shop" },
    { label: "CONTACT US", href: "/track-order" },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 bg-white border-b border-slate-100 font-sans transition-all duration-300 ${
          scrolled ? "shadow-sm py-0" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left: Mobile Menu Button & Site Logo */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 -ml-2 text-[#1E293B] hover:text-[#0084D4] transition-colors focus:outline-none"
                aria-label="Open Mobile Menu"
              >
                <Menu className="w-6 h-6" />
              </button>

              <Logo size="md" />
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7">
              {mainNav.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`text-[13px] font-semibold tracking-wide transition-colors ${
                      isActive
                        ? "text-[#0084D4]"
                        : "text-[#334155] hover:text-[#0084D4]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right: Search, Wishlist, Account & Cart */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Search Trigger */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-1.5 p-2 text-[#334155] hover:text-[#0084D4] rounded-full hover:bg-slate-50 transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="relative p-2 text-[#334155] hover:text-[#0084D4] rounded-full hover:bg-slate-50 transition-colors hidden sm:flex"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#0084D4] text-white text-[10px] font-bold flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Cart Trigger with Total Price & Count Badge */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-[#1E293B] hover:text-[#0084D4] hover:bg-sky-50/50 transition-all font-semibold text-sm group"
                aria-label="Cart"
              >
                <span className="hidden sm:inline-block text-[#0084D4] font-bold text-sm">
                  {formatPrice(cartTotal)}
                </span>
                <div className="relative">
                  <ShoppingCart className="w-5 h-5 text-[#334155] group-hover:text-[#0084D4] transition-colors" />
                  <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-[#0084D4] text-white text-[10px] font-bold flex items-center justify-center">
                    {cartItemCount}
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden animate-in fade-in duration-200 font-sans">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[#0F172A]/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Slide-over Drawer Panel */}
          <div className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-white shadow-2xl p-6 flex flex-col justify-between overflow-y-auto z-[101]">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <Logo size="sm" />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-slate-500 hover:text-slate-900 rounded-md transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="space-y-1">
                {mainNav.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-3 rounded-md text-sm font-semibold text-[#1E293B] hover:bg-sky-50 hover:text-[#0084D4] tracking-wide transition-colors"
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </Link>
                ))}
                <Link
                  href="/wishlist"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-3 rounded-md text-sm font-semibold text-[#1E293B] hover:bg-sky-50 hover:text-[#0084D4] tracking-wide transition-colors"
                >
                  <span>Wishlist ({wishlist.length})</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
              </div>

              {/* Category Links */}
              <div className="border-t border-slate-100 pt-4">
                <div className="text-xs font-bold text-[#0084D4] uppercase tracking-wider px-3 mb-2">
                  Featured Categories
                </div>
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/category/${cat.slug}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2 text-sm font-medium text-slate-600 hover:text-[#0084D4] hover:bg-sky-50/50 rounded-md transition-colors"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Footer Area */}
            <div className="border-t border-slate-100 pt-4 space-y-3 mt-8">
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 px-4 bg-[#0084D4] text-white rounded-md text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#0073B6] transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-white" />
                <span>Admin Suite</span>
              </Link>
              <p className="text-xs text-slate-400 text-center">
                Cash on Delivery Available Nationwide
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Global Search Modal */}
      <SearchModal />
    </>
  );
};

