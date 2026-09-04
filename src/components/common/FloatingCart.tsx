"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export const FloatingCart: React.FC = () => {
  const pathname = usePathname();
  const { cart, setIsCartOpen } = useStore();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [bumping, setBumping] = useState(false);

  useEffect(() => {
    if (totalItems === 0) return;
    setBumping(true);
    const timer = setTimeout(() => {
      setBumping(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [totalItems]);

  // Hide floating cart button on all admin pages
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <button
      onClick={() => setIsCartOpen(true)}
      className={`fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#0084D4] hover:bg-[#0073B6] text-white flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 group focus:outline-none focus:ring-4 focus:ring-[#0084D4]/30 ${
        bumping ? "animate-bounce" : ""
      }`}
      aria-label="Open Cart"
    >
      <div className="relative">
        <ShoppingBag className="w-6 h-6 transition-transform group-hover:scale-110" />
        {totalItems > 0 && (
          <span className="absolute -top-2.5 -right-2.5 bg-[#1E293B] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm transition-transform duration-300 scale-100">
            {totalItems}
          </span>
        )}
      </div>
    </button>
  );
};
