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
      className={`fixed bottom-6 right-6 z-40 w-13 h-13 rounded-full bg-[#0D0C0B] hover:bg-[#C9A45C] text-[#F8F5EF] hover:text-[#0D0C0B] flex items-center justify-center shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 group focus:outline-none border border-[#C9A45C]/40 ${
        bumping ? "animate-bounce" : ""
      }`}
      aria-label="Open Cart"
    >
      <div className="relative">
        <ShoppingBag className="w-5 h-5 stroke-[1.75] transition-transform group-hover:scale-110" />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-[#C9A45C] text-[#0D0C0B] text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center border border-[#0D0C0B] shadow-xs">
            {totalItems}
          </span>
        )}
      </div>
    </button>
  );
};

