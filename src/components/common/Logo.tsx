"use client";

import React from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";

interface LogoProps {
  variant?: "dark" | "light";
  showWordmark?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  variant = "dark",
  showWordmark = true,
  size = "md",
  className = "",
}) => {
  const isLight = variant === "light";

  const sizeDimensions = {
    sm: { icon: "w-7 h-7", iconSize: "w-4 h-4", text: "text-lg", sub: "text-[9px]" },
    md: { icon: "w-9 h-9", iconSize: "w-5 h-5", text: "text-xl sm:text-2xl", sub: "text-[10px]" },
    lg: { icon: "w-11 h-11", iconSize: "w-6 h-6", text: "text-2xl sm:text-3xl", sub: "text-[11px]" },
  }[size];

  return (
    <Link href="/" className={`inline-flex items-center gap-2.5 group select-none ${className}`}>
      {/* BagsGlory Signature Icon */}
      <div
        className={`${sizeDimensions.icon} rounded-lg flex items-center justify-center transition-transform duration-200 group-hover:scale-105 shrink-0 ${
          isLight
            ? "bg-[#0084D4] text-white shadow-md shadow-[#0084D4]/30"
            : "bg-[#0084D4] text-white shadow-md shadow-[#0084D4]/20"
        }`}
      >
        <ShoppingBag className={`${sizeDimensions.iconSize} stroke-[2.2]`} />
      </div>

      {/* Wordmark */}
      {showWordmark && (
        <div className="flex flex-col">
          <span
            className={`font-heading font-extrabold ${sizeDimensions.text} tracking-tight leading-none ${
              isLight ? "text-white" : "text-[#1E293B]"
            }`}
          >
            BAGS<span className="text-[#0084D4]">GLORY</span>
          </span>
          <span
            className={`${sizeDimensions.sub} font-semibold uppercase tracking-[0.2em] mt-0.5 ${
              isLight ? "text-slate-300" : "text-[#64748B]"
            }`}
          >
            Carry Your Glory!
          </span>
        </div>
      )}
    </Link>
  );
};

