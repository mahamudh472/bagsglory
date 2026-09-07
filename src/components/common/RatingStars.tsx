"use client";

import React from "react";
import { Star } from "lucide-react";

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  showCount?: boolean;
  count?: number;
  className?: string;
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  maxRating = 5,
  size = "sm",
  showCount = false,
  count,
  className = "",
}) => {
  const sizeClasses = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  return (
    <div className={`flex items-center gap-1.5 font-sans ${className}`}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: maxRating }).map((_, idx) => {
          const filled = idx < Math.floor(rating);
          const half = !filled && idx < rating;
          return (
            <Star
              key={idx}
              className={`${sizeClasses[size]} ${
                filled
                  ? "fill-[#C9A45C] text-[#C9A45C]"
                  : half
                  ? "fill-[#C9A45C]/50 text-[#C9A45C]"
                  : "fill-[#E5DED4] text-[#E5DED4]"
              }`}
            />
          );
        })}
      </div>
      <span className="text-xs font-semibold text-[#171513]">
        {rating.toFixed(1)}
      </span>
      {showCount && count !== undefined && (
        <span className="text-xs text-[#746C63]">({count})</span>
      )}
    </div>
  );
};

