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
      <div className="max-w-7xl mx-auto px-4 py-24 text-center font-ui">
        <h1 className="font-editorial text-3xl text-[#181817] mb-4">
          Bag Silhouette Not Found
        </h1>
        <p className="text-sm text-[#625E58] mb-8 max-w-md mx-auto">
          The bag model you are searching for might be discontinued or archived.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#181817] text-white rounded-md text-xs font-semibold uppercase tracking-wider hover:bg-[#2C2B29] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Catalog</span>
        </Link>
      </div>
    );
  }

  const currentVariant = product.variants[selectedVariantIndex] || product.variants[0];

  return (
    <div className="bg-[#F8F6F1] min-h-screen py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs uppercase tracking-[0.1em] text-[#625E58] mb-8 overflow-x-auto pb-1 scrollbar-none font-ui">
          <Link href="/" className="hover:text-[#181817] transition-colors shrink-0">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#B8AA98] shrink-0" />
          <Link href="/shop" className="hover:text-[#181817] transition-colors shrink-0">
            Shop
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#B8AA98] shrink-0" />
          <Link
            href={`/category/${product.category}`}
            className="hover:text-[#181817] transition-colors shrink-0"
          >
            {product.categoryName}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#B8AA98] shrink-0" />
          <span className="text-[#181817] font-semibold truncate max-w-xs shrink-0">
            {product.title}
          </span>
        </nav>

        {/* Top Product Showcase (Open 55-60% Gallery + 40-45% Info) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left: Spacious Editorial Gallery (58%) */}
          <div className="lg:col-span-7">
            <ProductImageGallery
              images={currentVariant.images.length > 0 ? currentVariant.images : product.variants[0].images}
              productTitle={product.title}
              badge={product.isBestSeller ? "Bestseller" : product.isNewArrival ? "New" : undefined}
            />
          </div>

          {/* Right: Product Details & Purchase Controls (42%) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <div className="space-y-3.5">
              {/* Category & Rating */}
              <div className="flex items-center justify-between">
                <Link
                  href={`/category/${product.category}`}
                  className="text-xs sm:text-sm font-semibold text-[#A85A20] uppercase tracking-[0.15em] hover:underline"
                >
                  {product.categoryName}
                </Link>
                <RatingStars rating={product.rating} count={product.reviewCount} showCount size="sm" />
              </div>

              {/* Product Title in Cormorant Garamond */}
              <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#181817] leading-[1.08] font-normal">
                {product.title}
              </h1>

              {/* Short Description */}
              <p className="text-sm sm:text-base text-[#625E58] leading-relaxed font-ui pt-1">
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

        {/* Detailed Tabs (Details, Materials, Dimensions, Care, Warranty, Reviews) */}
        <ProductTabs product={product} />

        {/* Recommendations Section */}
        <RelatedProducts currentProductId={product.id} category={product.category} />
      </div>
    </div>
  );
}
