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
    { id: "care", label: "Product Care" },
    { id: "warranty", label: "Warranty" },
    { id: "reviews", label: `Reviews (${reviewsList.length})` },
  ] as const;

  return (
    <div className="mt-16 pt-10 border-t border-slate-200 font-sans">
      {/* Tab Navigation Header */}
      <div className="flex border-b border-slate-200 overflow-x-auto gap-8 sm:gap-10 pb-3 scrollbar-none">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`text-sm font-bold uppercase tracking-wider pb-3 transition-all whitespace-nowrap border-b-2 ${
              activeTab === tab.id
                ? "border-[#0084D4] text-[#0084D4]"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content Panels */}
      <div className="pt-8 max-w-4xl">
        {/* TAB 1: DETAILS */}
        {activeTab === "details" && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div>
              <h3 className="font-heading font-bold text-2xl text-[#1E293B] mb-3">
                Product Description & Features
              </h3>
              <p className="text-base text-slate-600 leading-relaxed max-w-3xl">
                {product.description || product.shortDescription}
              </p>
            </div>

            {/* Specification Grid */}
            <div className="pt-6 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-3 gap-y-6 gap-x-8 text-sm">
              <div>
                <span className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Material
                </span>
                <p className="font-bold text-sm sm:text-base text-[#1E293B]">{product.specs.material}</p>
              </div>

              <div>
                <span className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Capacity
                </span>
                <p className="font-bold text-sm sm:text-base text-[#1E293B]">{product.specs.capacity}</p>
              </div>

              <div>
                <span className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Dimensions
                </span>
                <p className="font-bold text-sm sm:text-base text-[#1E293B]">{product.specs.dimensions}</p>
              </div>

              <div>
                <span className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Weight
                </span>
                <p className="font-bold text-sm sm:text-base text-[#1E293B]">{product.specs.weight}</p>
              </div>

              <div>
                <span className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Laptop Fit
                </span>
                <p className="font-bold text-sm sm:text-base text-[#1E293B]">{product.specs.laptopFit}</p>
              </div>

              <div>
                <span className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Water Resistance
                </span>
                <p className="font-bold text-sm sm:text-base text-[#1E293B]">{product.specs.waterResistance}</p>
              </div>
            </div>

            {/* Key Features List */}
            {product.features && product.features.length > 0 && (
              <div className="pt-6 border-t border-slate-100 space-y-3">
                <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                  Key Features
                </span>
                <ul className="space-y-2 text-sm text-slate-600">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-baseline gap-2.5">
                      <span className="text-[#0084D4] font-bold">•</span>
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
            <h3 className="font-heading font-bold text-2xl text-[#1E293B]">
              Premium Craftsmanship & Materials
            </h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              We source only genuine full-grain leather and heavy-duty reinforced fabrics to guarantee unmatched durability, rich natural texture, and enduring aesthetics.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div className="p-6 bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="font-bold text-sm text-[#1E293B] uppercase tracking-wider">Natural Patina Evolution</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">Over months of daily use, sunlight and natural hand oils enrich the leather, developing a deep, glossy patina unique to your journey.</p>
              </div>
              <div className="p-6 bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="font-bold text-sm text-[#1E293B] uppercase tracking-wider">Reinforced Hardware</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">Fitted with solid brass rivets, clasps, and heavy-duty smooth zippers for silky smooth, lifelong operation.</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: DIMENSIONS */}
        {activeTab === "dimensions" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <h3 className="font-heading font-bold text-2xl text-[#1E293B]">
              Sizing & Fit Specifications
            </h3>
            <div className="divide-y divide-slate-100 text-sm">
              <div className="py-3.5 flex justify-between">
                <span className="text-slate-500">Exterior Dimensions</span>
                <span className="font-bold text-[#1E293B]">{product.specs.dimensions}</span>
              </div>
              <div className="py-3.5 flex justify-between">
                <span className="text-slate-500">Storage Capacity</span>
                <span className="font-bold text-[#1E293B]">{product.specs.capacity}</span>
              </div>
              <div className="py-3.5 flex justify-between">
                <span className="text-slate-500">Net Weight</span>
                <span className="font-bold text-[#1E293B]">{product.specs.weight}</span>
              </div>
              <div className="py-3.5 flex justify-between">
                <span className="text-slate-500">Laptop Device Fit</span>
                <span className="font-bold text-[#1E293B]">{product.specs.laptopFit}</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: LEATHER CARE */}
        {activeTab === "care" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <h3 className="font-heading font-bold text-2xl text-[#1E293B]">
              Preserving Your Bag
            </h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Genuine materials thrive with simple, mindful care. Follow these quick steps to keep your bag looking pristine.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-sm">
              <div className="p-5 bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="font-bold text-sm text-[#1E293B]">1. Conditioning</h4>
                <p className="text-xs text-slate-600 leading-relaxed">Apply a neutral leather cream or wax balm every 6 months to nourish the leather fibers.</p>
              </div>
              <div className="p-5 bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="font-bold text-sm text-[#1E293B]">2. Moisture Care</h4>
                <p className="text-xs text-slate-600 leading-relaxed">If wet, pat dry with a soft cloth and allow to air dry naturally at room temperature away from direct heaters.</p>
              </div>
              <div className="p-5 bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="font-bold text-sm text-[#1E293B]">3. Dust Protection</h4>
                <p className="text-xs text-slate-600 leading-relaxed">Store inside your complimentary dust bag in a well-ventilated dry area when not in active use.</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: WARRANTY */}
        {activeTab === "warranty" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <h3 className="font-heading font-bold text-2xl text-[#1E293B]">
              Lifetime Craftsmanship Warranty
            </h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              We stand behind our products. Our {product.specs.warranty} covers any defect in materials, hardware, stitching, or zipper failure under normal usage.
            </p>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              If your bag requires servicing, our support team will assist you with convenient nationwide doorstep courier handling.
            </p>
          </div>
        )}

        {/* TAB 6: REVIEWS */}
        {activeTab === "reviews" && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-6 border-b border-slate-200">
              <div>
                <h3 className="font-heading font-bold text-2xl text-[#1E293B]">
                  Customer Reviews
                </h3>
                <div className="flex items-center gap-2.5 mt-1.5">
                  <RatingStars rating={product.rating} size="md" />
                  <span className="text-sm font-bold text-[#1E293B]">
                    {product.rating.toFixed(1)} out of 5 ({reviewsList.length} verified reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Review List */}
            <div className="space-y-6 divide-y divide-slate-100">
              {reviewsList.map((rev) => (
                <div key={rev.id} className="pt-6 first:pt-0 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#1E293B]">{rev.author}</span>
                      {rev.verifiedPurchase && (
                        <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Verified Buyer
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-slate-400">{rev.date}</span>
                  </div>

                  <RatingStars rating={rev.rating} size="sm" />
                  <h4 className="font-bold text-sm text-[#1E293B]">{rev.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{rev.comment}</p>
                </div>
              ))}
            </div>

            {/* Write a Review Form */}
            <div className="pt-8 border-t border-slate-200">
              <h4 className="font-heading font-bold text-lg text-[#1E293B] mb-4">
                Write a Customer Review
              </h4>

              {submittedReview ? (
                <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Thank you! Your verified review has been published.</span>
                </div>
              ) : (
                <form onSubmit={handleReviewSubmit} className="space-y-4 max-w-xl">
                  <div>
                    <label className="block text-xs font-bold text-[#1E293B] mb-1">
                      Rating
                    </label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setReviewRating(s)}
                          className="p-1 text-[#F59E0B]"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              s <= reviewRating ? "fill-[#F59E0B]" : "text-slate-300"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#1E293B] mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        placeholder="e.g. Shakil Chowdhury"
                        className="w-full text-xs p-3 border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#0084D4] rounded-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#1E293B] mb-1">
                        Headline
                      </label>
                      <input
                        type="text"
                        value={reviewTitle}
                        onChange={(e) => setReviewTitle(e.target.value)}
                        placeholder="e.g. Premium quality & fast COD delivery"
                        className="w-full text-xs p-3 border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#0084D4] rounded-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1E293B] mb-1">
                      Review Comments *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      placeholder="Share your experience with the craftsmanship, packaging, and feel..."
                      className="w-full text-xs p-3 border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#0084D4] rounded-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#0084D4] hover:bg-[#0073B6] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors shadow-md rounded-none"
                  >
                    <span>Submit Review</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
