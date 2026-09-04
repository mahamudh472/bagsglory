"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  variant?: "dark" | "light";
  showWordmark?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  href?: string;
}

export const Logo: React.FC<LogoProps> = ({
  variant = "dark",
  showWordmark = true,
  size = "md",
  className = "",
  href = "/",
}) => {
  const isLight = variant === "light";

  // Dimensions for primary full logo (approx 2.5 : 1 ratio)
  const fullDimensions = {
    sm: { width: 130, height: 52, class: "h-9 sm:h-10 w-auto" },
    md: { width: 175, height: 70, class: "h-11 sm:h-12 w-auto" },
    lg: { width: 220, height: 88, class: "h-13 sm:h-15 md:h-16 w-auto" },
    xl: { width: 275, height: 110, class: "h-18 sm:h-20 md:h-22 w-auto" },
  }[size];

  // Dimensions for icon / logo-mark only (1 : 1 square)
  const markDimensions = {
    sm: { width: 40, height: 40, class: "w-9 h-9 sm:w-10 sm:h-10" },
    md: { width: 50, height: 50, class: "w-11 h-11 sm:w-12 sm:h-12" },
    lg: { width: 64, height: 64, class: "w-14 h-14 sm:w-16 sm:h-16" },
    xl: { width: 80, height: 80, class: "w-18 h-18 sm:w-20 sm:h-20" },
  }[size];

  // Pick appropriate asset based on variant and whether wordmark is shown
  const imageSrc = showWordmark
    ? isLight
      ? "/images/primary-logo/primary-logo-with-dark-bg.png"
      : "/images/primary-logo/primary-logo.png"
    : isLight
    ? "/images/logo-mark/logo-mark-with-dark-bg.png"
    : "/images/logo-mark/logo-mark.png";

  const content = showWordmark ? (
    <div className={`relative flex items-center shrink-0 ${className}`}>
      <Image
        src={imageSrc}
        alt="BAGSGLORY - Carry Your Glory!"
        width={fullDimensions.width}
        height={fullDimensions.height}
        className={`${fullDimensions.class} object-contain transition-transform duration-200 group-hover:scale-[1.02]`}
        priority
      />
    </div>
  ) : (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      <Image
        src={imageSrc}
        alt="BAGSGLORY"
        width={markDimensions.width}
        height={markDimensions.height}
        className={`${markDimensions.class} object-contain transition-transform duration-200 group-hover:scale-105`}
        priority
      />
    </div>
  );

  if (!href) {
    return content;
  }

  return (
    <Link href={href} className="inline-flex items-center group select-none focus:outline-none">
      {content}
    </Link>
  );
};


