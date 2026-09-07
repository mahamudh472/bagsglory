"use client";

import React from "react";
import Link from "next/link";
import {
  Bell,
  Menu,
  ExternalLink,
  RotateCcw,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { useAdminUI } from "./AdminLayoutClient";

export const AdminHeader: React.FC<{ title: string; subtitle?: string }> = ({
  title,
  subtitle,
}) => {
  const { orders, resetToDefaults } = useStore();
  const { toggleMobileSidebar } = useAdminUI();
  const pendingOrdersCount = orders.filter((o) => o.orderStatus === "Pending").length;

  return (
    <header className="bg-white border-b border-[#E5DED4] px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 sticky top-0 z-30 font-sans">
      {/* Left: Mobile Hamburger & Page Title */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={toggleMobileSidebar}
          className="lg:hidden p-2 text-[#746C63] hover:text-[#0D0C0B] hover:bg-[#F8F5EF] transition-colors shrink-0"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="min-w-0">
          <h1 className="font-heading font-normal text-2xl sm:text-3xl text-[#0D0C0B] truncate leading-tight tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs sm:text-sm text-[#746C63] font-light truncate mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Right Action Tools */}
      <div className="flex items-center justify-between sm:justify-end gap-2.5 sm:gap-3 shrink-0">
        {/* Reset Store Data Button */}
        <button
          onClick={() => {
            if (confirm("Reset demo data to initial defaults?")) {
              resetToDefaults();
            }
          }}
          className="px-3 py-2 text-xs text-[#746C63] hover:text-[#0D0C0B] hover:bg-[#F8F5EF] flex items-center gap-1.5 transition-colors border border-[#E5DED4] font-medium"
          title="Reset Catalog & Orders to Default"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#C9A45C]" />
          <span>Reset Demo</span>
        </button>

        {/* Pending Orders Notification Pill */}
        <Link
          href="/admin/orders"
          className="flex items-center gap-1.5 px-3.5 py-2 bg-[#F8F5EF] border border-[#E5DED4] text-[#0D0C0B] text-xs font-semibold hover:border-[#C9A45C] transition-colors"
        >
          <Bell className="w-3.5 h-3.5 text-[#C9A45C]" />
          <span>{pendingOrdersCount} Pending COD</span>
        </Link>

        {/* Public Store Link */}
        <Link
          href="/"
          target="_blank"
          className="px-4 py-2 bg-[#0D0C0B] text-white text-xs font-semibold uppercase tracking-[0.16em] hover:bg-[#C9A45C] hover:text-[#0D0C0B] transition-colors flex items-center gap-1.5"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Storefront</span>
          <span className="sm:hidden">Store</span>
        </Link>
      </div>
    </header>
  );
};
