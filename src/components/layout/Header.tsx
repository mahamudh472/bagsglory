"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  ShoppingBag,
  Heart,
  Menu,
  X,
  ChevronRight,
  ShieldCheck,
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
        className={`sticky top-0 z-40 bg-[#F8F5EF] border-b border-[#E5DED4] font-sans transition-all duration-300 ${
          scrolled ? "shadow-sm py-0 bg-[#F8F5EF]/95 backdrop-blur-md" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 sm:h-22">
            {/* Left: Mobile Menu Button & Site Logo */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 -ml-2 text-[#171513] hover:text-[#C9A45C] transition-colors focus:outline-none"
                aria-label="Open Mobile Menu"
              >
                <Menu className="w-5 h-5" />
              </button>

              <Logo size="lg" variant="dark" />
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8">
              {mainNav.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`text-[12px] font-semibold tracking-[0.18em] transition-colors relative py-1 group ${
                      isActive
                        ? "text-[#171513] font-bold"
                        : "text-[#746C63] hover:text-[#171513]"
                    }`}
                  >
                    <span>{item.label}</span>
                    <span
                      className={`absolute bottom-0 left-0 w-full h-[1.5px] bg-[#C9A45C] transition-transform duration-300 origin-left ${
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Right: Search, Wishlist, Account & Cart */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Search Trigger */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-[#171513] hover:text-[#C9A45C] transition-colors rounded-full hover:bg-[#E5DED4]/40"
                aria-label="Search"
              >
                <Search className="w-5 h-5 stroke-[1.75]" />
              </button>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="relative p-2 text-[#171513] hover:text-[#C9A45C] transition-colors rounded-full hover:bg-[#E5DED4]/40 hidden sm:flex"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5 stroke-[1.75]" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#0D0C0B] text-[#C9A45C] text-[10px] font-bold flex items-center justify-center border border-[#C9A45C]/40">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Shopping Bag Trigger with Cart Total & Count */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="flex items-center gap-2.5 px-3.5 py-2 rounded-none text-[#171513] hover:text-[#C9A45C] hover:bg-[#E5DED4]/40 transition-all font-medium text-xs tracking-wider group"
                aria-label="Cart"
              >
                <span className="hidden sm:inline-block font-semibold text-xs text-[#171513] group-hover:text-[#C9A45C] transition-colors">
                  {formatPrice(cartTotal)}
                </span>
                <div className="relative">
                  <ShoppingBag className="w-5 h-5 stroke-[1.75] text-[#171513] group-hover:text-[#C9A45C] transition-colors" />
                  <span className="absolute -top-1.5 -right-2 w-4 h-4 rounded-full bg-[#0D0C0B] text-[#C9A45C] text-[10px] font-bold flex items-center justify-center border border-[#C9A45C]/50">
                    {cartItemCount}
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full-Screen Luxury Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden animate-in fade-in duration-200 font-sans">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[#0D0C0B]/70 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Slide-over Drawer Panel */}
          <div className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-[#F8F5EF] shadow-2xl p-6 flex flex-col justify-between overflow-y-auto z-[101] border-r border-[#E5DED4]">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#E5DED4] pb-4">
                <Logo size="md" variant="dark" />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-[#746C63] hover:text-[#171513] rounded-md transition-colors"
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
                    className="flex items-center justify-between px-3 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#171513] hover:bg-[#E5DED4]/50 hover:text-[#C9A45C] transition-colors border-b border-[#E5DED4]/40"
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-4 h-4 text-[#746C63]" />
                  </Link>
                ))}
                <Link
                  href="/wishlist"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#171513] hover:bg-[#E5DED4]/50 hover:text-[#C9A45C] transition-colors border-b border-[#E5DED4]/40"
                >
                  <span>Wishlist ({wishlist.length})</span>
                  <ChevronRight className="w-4 h-4 text-[#746C63]" />
                </Link>
              </div>

              {/* Category Links */}
              <div className="pt-2">
                <div className="text-[11px] font-bold text-[#C9A45C] uppercase tracking-[0.2em] px-3 mb-3">
                  Collections
                </div>
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/category/${cat.slug}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2 text-xs font-medium text-[#746C63] hover:text-[#171513] hover:bg-[#E5DED4]/40 transition-colors"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Footer Area */}
            <div className="border-t border-[#E5DED4] pt-4 space-y-3 mt-8">
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 px-4 bg-[#0D0C0B] text-[#F8F5EF] hover:bg-[#C9A45C] hover:text-[#0D0C0B] text-xs font-bold uppercase tracking-[0.15em] flex items-center justify-center gap-2 transition-colors"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Admin Suite</span>
              </Link>
              <p className="text-[11px] text-[#746C63] text-center tracking-wider uppercase">
                Carry Your Glory • Worldwide Delivery
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


