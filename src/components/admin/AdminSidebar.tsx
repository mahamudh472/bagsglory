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
  LogOut,
} from "lucide-react";
import { Logo } from "@/components/common/Logo";
import { useAdminUI } from "./AdminLayoutClient";

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  isOpen = false,
  onClose,
}) => {
  const pathname = usePathname();
  const { user, logout } = useAdminUI();

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
    <aside className="w-64 sm:w-72 lg:w-64 bg-white text-[#0D0C0B] min-h-full h-full flex flex-col justify-between border-r border-[#E5DED4] shrink-0 select-none font-sans">
      {/* Brand Header */}
      <div>
        <div className="p-5 sm:p-6 border-b border-[#E5DED4] flex items-center justify-between">
          <div>
            <Logo variant="dark" size="sm" />
            <span className="inline-block mt-2 text-[9px] text-[#C9A45C] font-bold tracking-[0.2em] uppercase bg-[#F8F5EF] px-2 py-0.5 border border-[#E5DED4]">
              Executive Portal
            </span>
          </div>

          {/* Close button for mobile drawer */}
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden p-2 text-[#746C63] hover:text-[#0D0C0B] hover:bg-[#F8F5EF] transition-colors"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Nav Links */}
        <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-220px)]">
          <div className="text-[9px] uppercase font-bold text-[#746C63] px-3 py-2 tracking-[0.2em]">
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
                className={`flex items-center gap-3 px-3.5 py-3 text-xs uppercase tracking-wider font-semibold transition-all ${
                  isActive
                    ? "bg-[#0D0C0B] text-[#C9A45C] font-bold shadow-xs"
                    : "text-[#746C63] hover:text-[#0D0C0B] hover:bg-[#F8F5EF]"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-[#C9A45C]" : "text-[#746C63]"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Area with Storefront Switcher & User Profile */}
      <div className="p-4 border-t border-[#E5DED4] space-y-3 bg-[#F8F5EF]">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between p-2.5 bg-white border border-[#E5DED4] text-[#0D0C0B] hover:border-[#C9A45C] text-[11px] font-semibold uppercase tracking-wider transition-colors"
        >
          <div className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5 text-[#C9A45C]" />
            <span>View Storefront</span>
          </div>
          <span className="text-[9px] text-[#0D0C0B] bg-[#F8F5EF] border border-[#E5DED4] px-1.5 py-0.5 font-semibold">Live</span>
        </Link>

        {/* Dynamic Admin Profile & Logout */}
        <div className="pt-1 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 bg-[#0D0C0B] text-[#C9A45C] flex items-center justify-center font-bold text-xs shrink-0 border border-[#C9A45C]/30">
              {user?.name ? user.name.slice(0, 2).toUpperCase() : "BG"}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-[#0D0C0B] truncate">
                {user?.name || "Administrator"}
              </p>
              <p className="text-[10px] text-[#746C63] font-light truncate">
                {user?.email || "admin@bagsglory.com"}
              </p>
            </div>
          </div>

          <button
            onClick={logout}
            title="Sign Out"
            className="p-1.5 text-[#746C63] hover:text-[#EF4444] hover:bg-white transition-colors border border-transparent hover:border-[#E5DED4]"
          >
            <LogOut className="w-4 h-4" />
          </button>
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
        <div className="fixed inset-0 z-[100] lg:hidden overflow-hidden animate-in fade-in duration-200 font-sans">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[#0D0C0B]/60 backdrop-blur-xs transition-opacity"
            onClick={onClose}
          />

          {/* Drawer panel */}
          <div className="fixed inset-y-0 left-0 max-w-full flex z-[101]">
            <div className="w-screen max-w-xs bg-white shadow-2xl animate-in slide-in-from-left duration-300">
              {sidebarContent}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
