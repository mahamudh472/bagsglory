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
    <nav className="lg:hidden fixed bottom-0 inset-x-0 bg-[#181817]/95 backdrop-blur-md border-t border-[#2C2B29] z-40 px-2 py-2 flex items-center justify-around shadow-2xl font-ui">
      {items.map((item) => {
        const isActive = item.exact
          ? pathname === item.href
          : pathname.startsWith(item.href);
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-md transition-all relative ${
              isActive
                ? "text-[#A85A20] font-semibold"
                : "text-[#B8AA98] hover:text-white"
            }`}
          >
            <div className="relative">
              <Icon className="w-5 h-5" />
              {item.badge && (
                <span className="absolute -top-1.5 -right-2 bg-[#A85A20] text-white font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] mt-1 tracking-tight">{item.label}</span>
          </Link>
        );
      })}

      {/* More / Menu Button for mobile drawer */}
      <button
        onClick={onOpenMenu}
        className="flex flex-col items-center justify-center py-1 px-3 rounded-md text-[#B8AA98] hover:text-white transition-colors"
      >
        <Menu className="w-5 h-5" />
        <span className="text-[10px] mt-1 tracking-tight">Menu</span>
      </button>
    </nav>
  );
};
