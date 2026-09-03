"use client";

import React, { useState } from "react";
import { Star, CheckCircle2, Send } from "lucide-react";
import { Product, Review } from "@/types";
import { RatingStars } from "@/components/common/RatingStars";

interface ProductTabsProps {
  product: Product;
}

export const ProductTabs: React.FC<ProductTabsProps> = ({ product }) => {
  const [activeTab, setActiveTab] = useState<"details" | "materials" | "dimensions" | "care" | "warranty" | "reviews">("details");
  const [reviewsList, setReviewsList] = useState<Review[]>(product.reviews);

  // New review state
  const [authorName, setAuthorName] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewComment, setReviewComment] = useState("");
  const [submittedReview, setSubmittedReview] = useState(false);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !reviewComment.trim()) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      author: authorName.trim(),
      rating: reviewRating,
      date: new Date().toISOString().split("T")[0],
      title: reviewTitle.trim() || "Verified Buyer Review",
      comment: reviewComment.trim(),
      verifiedPurchase: true,
    };

    setReviewsList([newRev, ...reviewsList]);
    setSubmittedReview(true);
    setAuthorName("");
    setReviewTitle("");
    setReviewComment("");
  };

  const tabs = [
    { id: "details", label: "Details" },
    { id: "materials", label: "Materials" },
    { id: "dimensions", label: "Dimensions" },
    { id: "care", label: "Leather Care" },
    { id: "warranty", label: "Warranty" },
    { id: "reviews", label: `Reviews (${reviewsList.length})` },
  ] as const;

  return (
    <div className="mt-20 pt-10 border-t border-[#E7E2DA] font-ui">
      {/* Editorial Tab Navigation Header */}
      <div className="flex border-b border-[#E7E2DA] overflow-x-auto gap-8 sm:gap-10 pb-3 scrollbar-none">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`text-sm font-semibold uppercase tracking-[0.12em] pb-3 transition-all whitespace-nowrap border-b-2 ${
              activeTab === tab.id
                ? "border-[#181817] text-[#181817]"
                : "border-transparent text-[#625E58] hover:text-[#181817]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content Panels */}
      <div className="pt-10 max-w-4xl">
        {/* TAB 1: DETAILS */}
        {activeTab === "details" && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div>
              <h3 className="font-editorial text-3xl sm:text-4xl text-[#181817] mb-3 font-normal">
                Designed for everyday movement.
              </h3>
              <p className="text-base sm:text-lg text-[#625E58] leading-relaxed max-w-3xl">
                {product.description || product.shortDescription}
              </p>
            </div>

            {/* Clean Specification Grid */}
            <div className="pt-8 border-t border-[#E7E2DA] grid grid-cols-2 sm:grid-cols-3 gap-y-7 gap-x-8 text-sm">
              <div>
                <span className="block text-xs font-bold uppercase tracking-[0.15em] text-[#8C827A] mb-1.5">
                  Material
                </span>
                <p className="font-semibold text-base text-[#181817]">{product.specs.material}</p>
              </div>

              <div>
                <span className="block text-xs font-bold uppercase tracking-[0.15em] text-[#8C827A] mb-1.5">
                  Capacity
                </span>
                <p className="font-semibold text-base text-[#181817]">{product.specs.capacity}</p>
              </div>

              <div>
                <span className="block text-xs font-bold uppercase tracking-[0.15em] text-[#8C827A] mb-1.5">
                  Dimensions
                </span>
                <p className="font-semibold text-base text-[#181817]">{product.specs.dimensions}</p>
              </div>

              <div>
                <span className="block text-xs font-bold uppercase tracking-[0.15em] text-[#8C827A] mb-1.5">
                  Weight
                </span>
                <p className="font-semibold text-base text-[#181817]">{product.specs.weight}</p>
              </div>

              <div>
                <span className="block text-xs font-bold uppercase tracking-[0.15em] text-[#8C827A] mb-1.5">
                  Laptop Fit
                </span>
                <p className="font-semibold text-base text-[#181817]">{product.specs.laptopFit}</p>
              </div>

              <div>
                <span className="block text-xs font-bold uppercase tracking-[0.15em] text-[#8C827A] mb-1.5">
                  Water Resistance
                </span>
                <p className="font-semibold text-base text-[#181817]">{product.specs.waterResistance}</p>
              </div>
            </div>

            {/* Key Features List */}
            {product.features && product.features.length > 0 && (
              <div className="pt-8 border-t border-[#E7E2DA] space-y-3.5">
                <span className="block text-xs font-bold uppercase tracking-[0.15em] text-[#8C827A]">
                  Key Features
                </span>
                <ul className="space-y-2.5 text-sm sm:text-base text-[#625E58]">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-baseline gap-2.5">
                      <span className="text-[#A85A20] font-bold">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: MATERIALS */}
        {activeTab === "materials" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <h3 className="font-editorial text-3xl sm:text-4xl text-[#181817] font-normal">
              Full-Grain Italian Vachetta Leather
            </h3>
            <p className="text-base text-[#625E58] leading-relaxed">
              We source only the top layer of animal hide, known as full-grain leather. Unlike corrected or genuine bonded leathers, full-grain retains the complete natural grain, unique character marks, and natural oils of the hide.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="p-6 bg-white rounded-md border border-[#E7E2DA] space-y-2">
                <h4 className="font-semibold text-sm text-[#181817] uppercase tracking-wider">Natural Patina Evolution</h4>
                <p className="text-sm text-[#625E58] leading-relaxed">Over months of daily use, sunlight and natural hand oils enrich the leather, developing a deep, glossy patina unique to your journey.</p>
              </div>
              <div className="p-6 bg-white rounded-md border border-[#E7E2DA] space-y-2">
                <h4 className="font-semibold text-sm text-[#181817] uppercase tracking-wider">Cast Antique Brass Hardware</h4>
                <p className="text-sm text-[#625E58] leading-relaxed">Fitted with solid brass rivets, clasps, and Japanese YKK Excella zippers for silky smooth, lifelong operation.</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: DIMENSIONS */}
        {activeTab === "dimensions" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <h3 className="font-editorial text-3xl sm:text-4xl text-[#181817] font-normal">
              Sizing & Fit Specifications
            </h3>
            <div className="divide-y divide-[#E7E2DA] text-sm">
              <div className="py-4 flex justify-between">
                <span className="text-[#625E58]">Exterior Dimensions</span>
                <span className="font-semibold text-[#181817]">{product.specs.dimensions}</span>
              </div>
              <div className="py-4 flex justify-between">
                <span className="text-[#625E58]">Volumetric Storage</span>
                <span className="font-semibold text-[#181817]">{product.specs.capacity}</span>
              </div>
              <div className="py-4 flex justify-between">
                <span className="text-[#625E58]">Net Weight</span>
                <span className="font-semibold text-[#181817]">{product.specs.weight}</span>
              </div>
              <div className="py-4 flex justify-between">
                <span className="text-[#625E58]">Laptop Device Sleeve</span>
                <span className="font-semibold text-[#181817]">{product.specs.laptopFit}</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: LEATHER CARE */}
        {activeTab === "care" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <h3 className="font-editorial text-3xl sm:text-4xl text-[#181817] font-normal">
              Preserving Natural Leather
            </h3>
            <p className="text-base text-[#625E58] leading-relaxed">
              Natural leather breathes and thrives with minimal, deliberate maintenance. Follow these simple guidelines to ensure your bag lasts for generations.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-2 text-sm">
              <div className="p-5 bg-white rounded-md border border-[#E7E2DA] space-y-2">
                <h4 className="font-semibold text-sm text-[#181817]">1. Conditioning</h4>
                <p className="text-xs sm:text-sm text-[#625E58] leading-relaxed">Apply a pea-sized amount of organic beeswax or neutral leather balm every 6 months to replenish natural moisture.</p>
              </div>
              <div className="p-5 bg-white rounded-md border border-[#E7E2DA] space-y-2">
                <h4 className="font-semibold text-sm text-[#181817]">2. Water Protection</h4>
                <p className="text-xs sm:text-sm text-[#625E58] leading-relaxed">If exposed to heavy rain, pat dry with a soft cloth and allow to air dry naturally at room temperature.</p>
              </div>
              <div className="p-5 bg-white rounded-md border border-[#E7E2DA] space-y-2">
                <h4 className="font-semibold text-sm text-[#181817]">3. Storage</h4>
                <p className="text-xs sm:text-sm text-[#625E58] leading-relaxed">Store inside your complimentary 100% breathable cotton dust bag in a well-ventilated space.</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: WARRANTY */}
        {activeTab === "warranty" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <h3 className="font-editorial text-3xl sm:text-4xl text-[#181817] font-normal">
              Lifetime Craftsmanship Warranty
            </h3>
            <p className="text-base text-[#625E58] leading-relaxed">
              We stand behind every stitch and rivet. Our {product.specs.warranty} covers any defect in materials, hardware, stitching, or zipper failure during standard intended use.
            </p>
            <p className="text-sm text-[#625E58] leading-relaxed">
              If your bag requires atelier servicing, our nationwide repair team will collect and service your item with doorstep courier handling.
            </p>
          </div>
        )}

        {/* TAB 6: REVIEWS */}
        {activeTab === "reviews" && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-6 border-b border-[#E7E2DA]">
              <div>
                <h3 className="font-editorial text-3xl sm:text-4xl text-[#181817] font-normal">
                  Customer Reviews
                </h3>
                <div className="flex items-center gap-2.5 mt-1.5">
                  <RatingStars rating={product.rating} size="md" />
                  <span className="text-sm font-semibold text-[#181817]">
                    {product.rating.toFixed(1)} out of 5 ({reviewsList.length} verified reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Review form */}
            <div className="p-6 bg-white rounded-md border border-[#E7E2DA] space-y-4">
              <h4 className="font-semibold text-sm uppercase tracking-wider text-[#181817]">
                Leave a Verified Review
              </h4>
              {submittedReview ? (
                <div className="p-3.5 bg-[#2D5A3C]/10 text-[#2D5A3C] rounded text-sm font-medium flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Thank you. Your review has been submitted.
                </div>
              ) : (
                <form onSubmit={handleReviewSubmit} className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      className="text-sm p-3 rounded-md border border-[#E7E2DA] focus:outline-none focus:border-[#181817]"
                    />
                    <input
                      type="text"
                      placeholder="Review Headline"
                      value={reviewTitle}
                      onChange={(e) => setReviewTitle(e.target.value)}
                      className="text-sm p-3 rounded-md border border-[#E7E2DA] focus:outline-none focus:border-[#181817]"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <label className="text-sm text-[#625E58]">Rating:</label>
                    <div className="flex gap-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewRating(star)}
                          className="p-0.5"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              star <= reviewRating
                                ? "fill-[#A85A20] text-[#A85A20]"
                                : "text-[#E7E2DA]"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <textarea
                    required
                    rows={3}
                    placeholder="Share your thoughts on the leather quality, finish, and ergonomics..."
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    className="w-full text-sm p-3 rounded-md border border-[#E7E2DA] focus:outline-none focus:border-[#181817]"
                  />

                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#181817] hover:bg-[#2C2B29] text-white rounded-md text-sm font-semibold uppercase tracking-wider flex items-center gap-2 transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    <span>Post Review</span>
                  </button>
                </form>
              )}
            </div>

            {/* Review Cards */}
            <div className="space-y-4">
              {reviewsList.map((rev) => (
                <div key={rev.id} className="p-5 bg-white rounded-md border border-[#E7E2DA] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-[#181817]">{rev.author}</span>
                    <span className="text-xs text-[#8C827A]">{rev.date}</span>
                  </div>
                  <RatingStars rating={rev.rating} size="sm" />
                  <h5 className="font-semibold text-sm text-[#181817] pt-1">{rev.title}</h5>
                  <p className="text-sm text-[#625E58] leading-relaxed">{rev.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
