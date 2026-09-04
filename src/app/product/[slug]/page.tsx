"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { ProductImageGallery } from "@/components/product/ProductImageGallery";
import { VariantSelector } from "@/components/product/VariantSelector";
import { ProductTabs } from "@/components/product/ProductTabs";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { RatingStars } from "@/components/common/RatingStars";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const resolvedParams = use(params);
  const { products } = useStore();

  const product = products.find((p) => p.slug === resolvedParams.slug);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center font-sans">
        <h1 className="font-heading font-bold text-3xl text-[#1E293B] mb-4">
          Product Not Found
        </h1>
        <p className="text-sm text-slate-500 mb-8 max-w-md mx-auto">
          The bag model you are searching for might be discontinued or archived.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#0084D4] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#0073B6] transition-colors rounded-none"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Catalog</span>
        </Link>
      </div>
    );
  }

  const currentVariant = product.variants[selectedVariantIndex] || product.variants[0];

  return (
    <div className="bg-white min-h-screen py-6 sm:py-10 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs uppercase tracking-wider text-slate-500 mb-8 overflow-x-auto pb-1 scrollbar-none">
          <Link href="/" className="hover:text-[#0084D4] transition-colors shrink-0">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <Link href="/shop" className="hover:text-[#0084D4] transition-colors shrink-0">
            Shop
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <Link
            href={`/category/${product.category}`}
            className="hover:text-[#0084D4] transition-colors shrink-0"
          >
            {product.categoryName}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="text-[#1E293B] font-bold truncate max-w-xs shrink-0">
            {product.title}
          </span>
        </nav>

        {/* Product Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left: Product Image Gallery */}
          <div className="lg:col-span-7">
            <ProductImageGallery
              images={currentVariant.images.length > 0 ? currentVariant.images : product.variants[0].images}
              productTitle={product.title}
              badge={product.isBestSeller ? "Bestseller" : product.isNewArrival ? "New" : undefined}
            />
          </div>

          {/* Right: Product Details & Purchase Controls */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <div className="space-y-3">
              {/* Category & Rating */}
              <div className="flex items-center justify-between">
                <Link
                  href={`/category/${product.category}`}
                  className="text-xs sm:text-sm font-bold text-[#0084D4] uppercase tracking-wider hover:underline"
                >
                  {product.categoryName}
                </Link>
                <RatingStars rating={product.rating} count={product.reviewCount} showCount size="sm" />
              </div>

              {/* Product Title */}
              <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#1E293B] leading-tight">
                {product.title}
              </h1>

              {/* Short Description */}
              <p className="text-sm text-slate-500 leading-relaxed pt-1">
                {product.shortDescription}
              </p>
            </div>

            {/* Variant Selector Component */}
            <VariantSelector
              product={product}
              selectedVariant={currentVariant}
              onVariantChange={(variant) => {
                const idx = product.variants.findIndex((v) => v.sku === variant.sku);
                if (idx !== -1) setSelectedVariantIndex(idx);
              }}
            />
          </div>
        </div>

        {/* Detailed Tabs */}
        <ProductTabs product={product} />

        {/* Recommendations Section */}
        <RelatedProducts currentProductId={product.id} category={product.category} />
      </div>
    </div>
  );
}

