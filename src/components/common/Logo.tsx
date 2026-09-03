"use client";

import React from "react";
import Link from "next/link";

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
    sm: { icon: "w-6 h-6", text: "text-base sm:text-lg", sub: "text-[7.5px]" },
    md: { icon: "w-8 h-8", text: "text-lg sm:text-xl", sub: "text-[8.5px]" },
    lg: { icon: "w-10 h-10", text: "text-2xl", sub: "text-[9.5px]" },
  }[size];

  return (
    <Link href="/" className={`inline-flex items-center gap-2.5 group select-none ${className}`}>
      {/* Minimalist Geometric Monogram Icon */}
      <div
        className={`${sizeDimensions.icon} rounded-md flex items-center justify-center transition-opacity duration-200 group-hover:opacity-90 shrink-0 ${
          isLight
            ? "bg-white text-[#181817]"
            : "bg-[#181817] text-white"
        }`}
      >
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-3/5 h-3/5"
        >
          <path
            d="M15 15V11C15 8.23858 17.2386 6 20 6C22.7614 6 25 8.23858 25 11V15"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            className={isLight ? "text-[#A85A20]" : "text-[#A85A20]"}
          />
          <path
            d="M10 15H30L28.5 33C28.35 34.5 27.2 35.5 25.7 35.5H14.3C12.8 35.5 11.65 34.5 11.5 33L10 15Z"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinejoin="round"
            className={isLight ? "text-[#A85A20]" : "text-[#A85A20]"}
          />
          <circle
            cx="20"
            cy="17"
            r="1.5"
            fill="currentColor"
            className={isLight ? "text-[#A85A20]" : "text-[#A85A20]"}
          />
          <line
            x1="16"
            y1="24"
            x2="24"
            y2="24"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            className={isLight ? "text-[#A85A20]" : "text-[#A85A20]"}
          />
        </svg>
      </div>

      {/* Wordmark */}
      {showWordmark && (
        <div className="flex flex-col">
          <span
            className={`font-editorial font-bold ${sizeDimensions.text} tracking-[0.14em] leading-none uppercase ${
              isLight ? "text-white" : "text-[#181817]"
            }`}
          >
            BAGS<span className="text-[#A85A20]">GLORY</span>
          </span>
          <span
            className={`${sizeDimensions.sub} font-medium uppercase tracking-[0.22em] mt-0.5 ${
              isLight ? "text-zinc-400" : "text-[#625E58]"
            }`}
          >
            Handcrafted Leather
          </span>
        </div>
      )}
    </Link>
  );
};
