"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Tag,
  Menu,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";

export const AdminBottomNav: React.FC<{ onOpenMenu: () => void }> = ({
  onOpenMenu,
}) => {
  const pathname = usePathname();
  const { orders } = useStore();
  const pendingOrdersCount = orders.filter((o) => o.orderStatus === "Pending").length;

  const items = [
    {
      label: "Overview",
      href: "/admin",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      label: "Products",
      href: "/admin/products",
      icon: Package,
    },
    {
      label: "Orders",
      href: "/admin/orders",
      icon: ShoppingBag,
      badge: pendingOrdersCount > 0 ? pendingOrdersCount : undefined,
    },
    {
      label: "Coupons",
      href: "/admin/coupons",
      icon: Tag,
    },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-[#E5DED4] z-40 px-2 py-2 flex items-center justify-around font-sans">
      {items.map((item) => {
        const isActive = item.exact
          ? pathname === item.href
          : pathname.startsWith(item.href);
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center py-1 px-3 transition-all relative ${
              isActive
                ? "text-[#0D0C0B] font-bold"
                : "text-[#746C63] hover:text-[#0D0C0B]"
            }`}
          >
            <div className="relative">
              <Icon className={`w-5 h-5 ${isActive ? "text-[#C9A45C]" : "text-[#746C63]"}`} />
              {item.badge && (
                <span className="absolute -top-1.5 -right-2 bg-[#0D0C0B] text-[#C9A45C] font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center border border-[#C9A45C]/40">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] uppercase font-semibold mt-1 tracking-wider">{item.label}</span>
          </Link>
        );
      })}

      {/* More / Menu Button for mobile drawer */}
      <button
        onClick={onOpenMenu}
        className="flex flex-col items-center justify-center py-1 px-3 text-[#746C63] hover:text-[#0D0C0B] transition-colors"
      >
        <Menu className="w-5 h-5" />
        <span className="text-[10px] uppercase font-semibold mt-1 tracking-wider">Menu</span>
      </button>
    </nav>
  );
};
