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
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { Logo } from "@/components/common/Logo";
import { useStore } from "@/context/StoreContext";
import { SearchModal } from "@/components/search/SearchModal";

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { cartItemCount, wishlist, setIsCartOpen, categories } = useStore();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
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
    { label: "Shop", href: "/shop" },
    { label: "Women", href: "/category/totes" },
    { label: "Men", href: "/category/briefcases" },
    { label: "Accessories", href: "/category/slings" },
    { label: "Track Order", href: "/track-order" },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 bg-[#FFFFFF] border-b border-[#E7E2DA] font-ui transition-all duration-300 ${
          scrolled ? "shadow-subtle py-0" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 -ml-2 text-[#181817] hover:text-[#A85A20] transition-colors focus:outline-none"
              aria-label="Open Mobile Menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Minimalist Site Logo */}
            <Logo size="md" />

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-9">
              {mainNav.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-[13px] sm:text-sm font-semibold uppercase tracking-[0.1em] transition-colors ${
                      isActive
                        ? "text-[#A85A20] font-bold"
                        : "text-[#181817] hover:text-[#A85A20]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Search, Wishlist & Cart Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search Trigger */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2 p-2 text-[#181817] hover:text-[#A85A20] rounded-md transition-colors"
                aria-label="Search"
              >
                <Search className="w-[18px] h-[18px]" />
                <span className="hidden xl:inline-flex text-xs text-[#625E58] font-medium tracking-wide">
                  Search
                </span>
              </button>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="relative p-2 text-[#181817] hover:text-[#A85A20] rounded-md transition-colors"
                aria-label="Wishlist"
              >
                <Heart className="w-[18px] h-[18px]" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#181817] text-white text-[10px] font-bold flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Cart Trigger */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-2 px-3.5 py-2.5 rounded-md bg-[#181817] text-white hover:bg-[#2C2B29] transition-all ml-1 shadow-subtle"
                aria-label="Bag"
              >
                <ShoppingBag className="w-4 h-4 text-[#B8AA98]" />
                <span className="hidden sm:inline text-xs font-semibold uppercase tracking-wider">Bag</span>
                {cartItemCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-[#A85A20] text-white text-[10px] font-bold flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Drawer Menu (Outside header container for clean stacking) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden animate-in fade-in duration-200 font-ui">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[#181817]/70 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Slide-over Drawer Panel */}
          <div className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-[#FFFFFF] shadow-2xl p-6 flex flex-col justify-between overflow-y-auto z-[101]">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#E7E2DA] pb-4">
                <Logo size="sm" />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-[#625E58] hover:text-[#181817] rounded-md transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="space-y-1">
                {mainNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-3 rounded-md text-sm font-semibold text-[#181817] hover:bg-[#F8F6F1] hover:text-[#A85A20] uppercase tracking-wider transition-colors"
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-4 h-4 text-[#B8AA98]" />
                  </Link>
                ))}
                <Link
                  href="/wishlist"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-3 rounded-md text-sm font-semibold text-[#181817] hover:bg-[#F8F6F1] hover:text-[#A85A20] uppercase tracking-wider transition-colors"
                >
                  <span>Wishlist ({wishlist.length})</span>
                  <ChevronRight className="w-4 h-4 text-[#B8AA98]" />
                </Link>
              </div>

              {/* Category Links */}
              <div className="border-t border-[#E7E2DA] pt-4">
                <div className="text-xs font-bold text-[#A85A20] uppercase tracking-[0.15em] px-3 mb-2">
                  Collections
                </div>
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/category/${cat.slug}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2.5 text-sm font-medium text-[#625E58] hover:text-[#181817] hover:bg-[#F8F6F1] rounded-md transition-colors"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Footer Area */}
            <div className="border-t border-[#E7E2DA] pt-4 space-y-3 mt-8">
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 px-4 bg-[#181817] text-white rounded-md text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#2C2B29] transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-[#A85A20]" />
                <span>Admin Suite</span>
              </Link>
              <p className="text-xs text-[#625E58] text-center">
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
