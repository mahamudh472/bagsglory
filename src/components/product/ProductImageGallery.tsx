"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Maximize2, Search } from "lucide-react";

interface ProductImageGalleryProps {
  images: string[];
  productTitle: string;
  badge?: string;
}

export const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  images,
  productTitle,
  badge,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [showLoupe, setShowLoupe] = useState(false);
  const [loupeState, setLoupeState] = useState({
    lensX: 0,
    lensY: 0,
    xPercent: 50,
    yPercent: 50,
    containerWidth: 500,
    containerHeight: 600,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const activeImage = images[selectedIndex] || images[0] || "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1200";

  const LENS_SIZE = 160;
  const ZOOM_FACTOR = 2.8;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (x < 0 || x > rect.width || y < 0 || y > rect.height) {
      setShowLoupe(false);
      return;
    }

    const xPercent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    const yPercent = Math.max(0, Math.min(100, (y / rect.height) * 100));

    const lensX = Math.max(0, Math.min(rect.width - LENS_SIZE, x - LENS_SIZE / 2));
    const lensY = Math.max(0, Math.min(rect.height - LENS_SIZE, y - LENS_SIZE / 2));

    setLoupeState({
      lensX,
      lensY,
      xPercent,
      yPercent,
      containerWidth: rect.width,
      containerHeight: rect.height,
    });
    setShowLoupe(true);
  };

  const handleMouseLeave = () => {
    setShowLoupe(false);
  };

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4 lg:gap-5 select-none font-sans">
      {/* Small Vertical Thumbnails */}
      {images.length > 1 && (
        <div className="flex md:flex-col gap-2.5 overflow-x-auto md:overflow-y-auto max-h-[580px] shrink-0 pb-1 md:pb-0 scrollbar-none">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSelectedIndex(idx);
                setShowLoupe(false);
              }}
              className={`relative w-16 h-20 sm:w-[72px] sm:h-[90px] overflow-hidden bg-[#FFFFFF] border transition-all shrink-0 ${
                selectedIndex === idx
                  ? "border-[#0D0C0B] opacity-100 ring-1 ring-[#C9A45C]"
                  : "border-[#E5DED4] opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={img}
                alt={`${productTitle} thumbnail ${idx + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main Editorial Hero Image with Cursor Loupe Zoom Box */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setShowLoupe(true)}
        onMouseLeave={handleMouseLeave}
        onClick={() => setIsZoomed(true)}
        className="relative flex-1 aspect-[4/5] sm:aspect-[4/4.8] overflow-hidden bg-[#FFFFFF] border border-[#E5DED4] cursor-crosshair group shadow-xs"
      >
        <Image
          src={activeImage}
          alt={productTitle}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 60vw"
          className="object-cover object-center pointer-events-none"
        />

        {/* Sale / Stock Badge */}
        {badge && (
          <div className="absolute top-4 left-4 z-10 pointer-events-none">
            <span className="bg-[#0D0C0B] text-[#C9A45C] text-[10px] font-semibold tracking-[0.2em] px-3 py-1.5 uppercase border border-[#C9A45C]/40">
              {badge}
            </span>
          </div>
        )}

        {/* Cursor Loupe Zoom Box (Appears on Hover) */}
        {showLoupe && (
          <div
            className="absolute border-2 border-[#C9A45C] shadow-2xl pointer-events-none z-20 overflow-hidden bg-[#FFFFFF]"
            style={{
              width: `${LENS_SIZE}px`,
              height: `${LENS_SIZE}px`,
              left: `${loupeState.lensX}px`,
              top: `${loupeState.lensY}px`,
              backgroundImage: `url('${activeImage}')`,
              backgroundSize: `${loupeState.containerWidth * ZOOM_FACTOR}px ${loupeState.containerHeight * ZOOM_FACTOR}px`,
              backgroundPosition: `${loupeState.xPercent}% ${loupeState.yPercent}%`,
              backgroundRepeat: "no-repeat",
              boxShadow: "0 10px 30px -5px rgba(13, 12, 11, 0.3), 0 0 0 1px rgba(201, 164, 92, 0.4) inset",
            }}
          >
            {/* Center target crosshair indicator */}
            <div className="absolute inset-0 flex items-center justify-center opacity-40 pointer-events-none">
              <div className="w-3 h-3 border-t-2 border-l-2 border-[#C9A45C]" />
            </div>
          </div>
        )}

        {/* Hover Hint */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-[#FFFFFF]/90 text-[#171513] text-xs font-medium tracking-wide pointer-events-none border border-[#E5DED4] opacity-90 group-hover:opacity-0 transition-opacity">
          <Search className="w-3.5 h-3.5 text-[#C9A45C]" />
          <span className="text-[11px] uppercase tracking-wider">Hover to zoom</span>
        </div>

        {/* Lightbox Trigger */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsZoomed(true);
          }}
          className="absolute bottom-4 right-4 p-2.5 bg-[#FFFFFF] text-[#171513] hover:text-[#C9A45C] border border-[#E5DED4] shadow-xs transition-all z-10"
          title="Full Screen View"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Lightbox Zoom Modal */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-50 bg-[#0D0C0B]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setIsZoomed(false)}
        >
          <div className="relative max-w-5xl w-full max-h-[90vh] aspect-[4/4.5]">
            <Image
              src={activeImage}
              alt={productTitle}
              fill
              className="object-contain"
            />
          </div>
          <button
            onClick={() => setIsZoomed(false)}
            className="absolute top-6 right-6 text-[#F8F5EF] text-xs bg-[#241B14] px-4 py-2 border border-[#C9A45C]/40 hover:bg-[#C9A45C] hover:text-[#0D0C0B] font-medium uppercase tracking-[0.18em] transition-colors"
          >
            Close ✕
          </button>
        </div>
      )}
    </div>
  );
};

