"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingBag,
  Tag,
  ExternalLink,
  X,
} from "lucide-react";
import { Logo } from "@/components/common/Logo";

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  isOpen = false,
  onClose,
}) => {
  const pathname = usePathname();

  // Prevent background scroll when mobile sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const navItems = [
    {
      label: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      label: "Products & Variants",
      href: "/admin/products",
      icon: Package,
    },
    {
      label: "Collections",
      href: "/admin/categories",
      icon: FolderTree,
    },
    {
      label: "COD Orders",
      href: "/admin/orders",
      icon: ShoppingBag,
    },
    {
      label: "Coupons & Offers",
      href: "/admin/coupons",
      icon: Tag,
    },
  ];

  const sidebarContent = (
    <aside className="w-64 sm:w-72 lg:w-64 bg-[#181817] text-[#E7E2DA] min-h-full h-full flex flex-col justify-between border-r border-[#2C2B29] shrink-0 select-none font-ui">
      {/* Brand Header */}
      <div>
        <div className="p-5 sm:p-6 border-b border-[#2C2B29] flex items-center justify-between">
          <div>
            <Logo variant="light" size="sm" />
            <span className="inline-block mt-2 text-[10px] text-[#0084D4] font-bold tracking-wider uppercase bg-[#0084D4]/15 px-2 py-0.5 rounded border border-[#0084D4]/30">
              Admin Suite
            </span>
          </div>

          {/* Close button for mobile drawer */}
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition-colors"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Nav Links */}
        <nav className="p-4 space-y-1.5 overflow-y-auto max-h-[calc(100vh-220px)]">
          <div className="text-[10px] uppercase font-bold text-slate-400 px-3 py-2 tracking-[0.15em]">
            Store Management
          </div>

          {navItems.map((item) => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);

            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-3.5 py-3 rounded-lg text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-slate-800 text-white border-l-2 border-[#0084D4]"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-[#0084D4]" : "text-slate-400"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Area with Storefront Switcher */}
      <div className="p-4 border-t border-[#2C2B29] space-y-3 bg-[#181817]">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between p-3 rounded-lg bg-slate-800 text-slate-200 hover:text-white hover:bg-slate-700 text-xs font-semibold uppercase tracking-wider transition-colors"
        >
          <div className="flex items-center gap-2">
            <ExternalLink className="w-4 h-4 text-[#0084D4]" />
            <span>View Public Store</span>
          </div>
          <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-1.5 py-0.5 rounded font-bold">Live</span>
        </Link>

        <div className="flex items-center gap-3 px-2 pt-1">
          <div className="w-8 h-8 rounded-lg bg-[#0084D4]/20 text-[#0084D4] flex items-center justify-center font-bold text-xs border border-[#0084D4]/30 shrink-0">
            AD
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-white truncate">Administrator</p>
            <p className="text-[11px] text-slate-400 truncate">admin@bagsglory.com</p>
          </div>
        </div>
      </div>
    </aside>
  );

  return (
    <>
      {/* 1. Desktop Persistent Sidebar */}
      <div className="hidden lg:block shrink-0 sticky top-0 h-screen">
        {sidebarContent}
      </div>

      {/* 2. Mobile Slide-Over Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden overflow-hidden animate-in fade-in duration-200 font-ui">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[#181817]/75 backdrop-blur-xs transition-opacity"
            onClick={onClose}
          />

          {/* Drawer panel */}
          <div className="fixed inset-y-0 left-0 max-w-full flex z-[101]">
            <div className="w-screen max-w-xs bg-[#181817] shadow-2xl animate-in slide-in-from-left duration-300">
              {sidebarContent}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
