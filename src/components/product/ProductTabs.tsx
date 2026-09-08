"use client";

import React, { useState, useEffect } from "react";
import { Star, CheckCircle2, Send, AlertCircle } from "lucide-react";
import { Product, Review } from "@/types";
import { RatingStars } from "@/components/common/RatingStars";
import { useStore } from "@/context/StoreContext";

interface ProductTabsProps {
  product: Product;
}

export const ProductTabs: React.FC<ProductTabsProps> = ({ product }) => {
  const { refreshData } = useStore();
  const [activeTab, setActiveTab] = useState<"details" | "materials" | "dimensions" | "care" | "warranty" | "reviews">("details");
  const [reviewsList, setReviewsList] = useState<Review[]>(product.reviews || []);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  // Synchronize when product reviews change
  useEffect(() => {
    setReviewsList(product.reviews || []);
  }, [product.reviews]);

  // New review state
  const [authorName, setAuthorName] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewComment, setReviewComment] = useState("");
  const [submittedReview, setSubmittedReview] = useState(false);
  const [reviewError, setReviewError] = useState<string | null>(null);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !reviewComment.trim()) return;

    setIsSubmittingReview(true);
    setReviewError(null);

    const payload = {
      productId: product.id,
      author: authorName.trim(),
      rating: reviewRating,
      title: reviewTitle.trim() || "Verified Client Review",
      comment: reviewComment.trim(),
      verifiedPurchase: true,
    };

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const createdRev = await res.json();
        setReviewsList((prev) => [createdRev, ...prev]);
        setSubmittedReview(true);
        setAuthorName("");
        setReviewTitle("");
        setReviewComment("");
        // Refresh product ratings & reviews in the store
        await refreshData();
      } else {
        const data = await res.json();
        setReviewError(data.error || "Failed to submit review. Please try again.");
      }
    } catch {
      setReviewError("Network error submitting review. Please check connection.");
    } finally {
      setIsSubmittingReview(false);
    }
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
    <div className="mt-16 pt-10 border-t border-[#E5DED4] font-sans">
      {/* Tab Navigation Header */}
      <div className="flex border-b border-[#E5DED4] overflow-x-auto gap-8 sm:gap-10 pb-3 scrollbar-none">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`text-xs font-semibold uppercase tracking-[0.18em] pb-3 transition-all whitespace-nowrap border-b-2 ${
              activeTab === tab.id
                ? "border-[#0D0C0B] text-[#0D0C0B]"
                : "border-transparent text-[#746C63] hover:text-[#0D0C0B]"
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
              <h3 className="font-heading font-normal text-2xl sm:text-3xl text-[#0D0C0B] mb-3">
                Product Description & Features
              </h3>
              <p className="text-base text-[#746C63] font-light leading-relaxed max-w-3xl">
                {product.description || product.shortDescription}
              </p>
            </div>

            {/* Specification Grid */}
            <div className="pt-6 border-t border-[#E5DED4] grid grid-cols-2 sm:grid-cols-3 gap-y-6 gap-x-8 text-sm">
              <div>
                <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#746C63] mb-1">
                  Material
                </span>
                <p className="font-semibold text-sm sm:text-base text-[#0D0C0B]">{product.specs.material}</p>
              </div>

              <div>
                <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#746C63] mb-1">
                  Capacity
                </span>
                <p className="font-semibold text-sm sm:text-base text-[#0D0C0B]">{product.specs.capacity}</p>
              </div>

              <div>
                <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#746C63] mb-1">
                  Dimensions
                </span>
                <p className="font-semibold text-sm sm:text-base text-[#0D0C0B]">{product.specs.dimensions}</p>
              </div>

              <div>
                <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#746C63] mb-1">
                  Weight
                </span>
                <p className="font-semibold text-sm sm:text-base text-[#0D0C0B]">{product.specs.weight}</p>
              </div>

              <div>
                <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#746C63] mb-1">
                  Laptop Fit
                </span>
                <p className="font-semibold text-sm sm:text-base text-[#0D0C0B]">{product.specs.laptopFit}</p>
              </div>

              <div>
                <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#746C63] mb-1">
                  Water Resistance
                </span>
                <p className="font-semibold text-sm sm:text-base text-[#0D0C0B]">{product.specs.waterResistance}</p>
              </div>
            </div>

            {/* Key Features List */}
            {product.features && product.features.length > 0 && (
              <div className="pt-6 border-t border-[#E5DED4] space-y-3">
                <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#746C63]">
                  Key Features
                </span>
                <ul className="space-y-2 text-sm text-[#746C63] font-light">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-baseline gap-2.5">
                      <span className="text-[#C9A45C] font-bold">•</span>
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
            <h3 className="font-heading font-normal text-2xl sm:text-3xl text-[#0D0C0B]">
              Premier Atelier Materials
            </h3>
            <p className="text-sm sm:text-base text-[#746C63] font-light leading-relaxed">
              We source exclusively genuine full-grain leather and heavy-duty reinforced fabrics to guarantee unmatched durability, rich natural texture, and enduring aesthetics.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div className="p-6 bg-[#FFFFFF] border border-[#E5DED4] space-y-2">
                <h4 className="font-semibold text-xs text-[#0D0C0B] uppercase tracking-[0.18em]">Natural Patina Evolution</h4>
                <p className="text-xs sm:text-sm text-[#746C63] font-light leading-relaxed">Over months of daily use, sunlight and natural hand oils enrich the leather, developing a deep, glossy patina unique to your journey.</p>
              </div>
              <div className="p-6 bg-[#FFFFFF] border border-[#E5DED4] space-y-2">
                <h4 className="font-semibold text-xs text-[#0D0C0B] uppercase tracking-[0.18em]">Reinforced Hardware</h4>
                <p className="text-xs sm:text-sm text-[#746C63] font-light leading-relaxed">Fitted with solid brass rivets, clasps, and heavy-duty smooth zippers for silky smooth, lifelong operation.</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: DIMENSIONS */}
        {activeTab === "dimensions" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <h3 className="font-heading font-normal text-2xl sm:text-3xl text-[#0D0C0B]">
              Sizing & Fit Specifications
            </h3>
            <div className="divide-y divide-[#E5DED4] text-sm">
              <div className="py-3.5 flex justify-between">
                <span className="text-[#746C63]">Exterior Dimensions</span>
                <span className="font-semibold text-[#0D0C0B]">{product.specs.dimensions}</span>
              </div>
              <div className="py-3.5 flex justify-between">
                <span className="text-[#746C63]">Storage Capacity</span>
                <span className="font-semibold text-[#0D0C0B]">{product.specs.capacity}</span>
              </div>
              <div className="py-3.5 flex justify-between">
                <span className="text-[#746C63]">Net Weight</span>
                <span className="font-semibold text-[#0D0C0B]">{product.specs.weight}</span>
              </div>
              <div className="py-3.5 flex justify-between">
                <span className="text-[#746C63]">Laptop Device Fit</span>
                <span className="font-semibold text-[#0D0C0B]">{product.specs.laptopFit}</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: LEATHER CARE */}
        {activeTab === "care" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <h3 className="font-heading font-normal text-2xl sm:text-3xl text-[#0D0C0B]">
              Preserving Your Piece
            </h3>
            <p className="text-sm sm:text-base text-[#746C63] font-light leading-relaxed">
              Genuine materials thrive with simple, mindful care. Follow these quick steps to keep your bag looking pristine.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-sm">
              <div className="p-5 bg-[#FFFFFF] border border-[#E5DED4] space-y-2">
                <h4 className="font-semibold text-xs uppercase tracking-wider text-[#0D0C0B]">1. Conditioning</h4>
                <p className="text-xs text-[#746C63] font-light leading-relaxed">Apply a neutral leather cream or wax balm every 6 months to nourish the leather fibers.</p>
              </div>
              <div className="p-5 bg-[#FFFFFF] border border-[#E5DED4] space-y-2">
                <h4 className="font-semibold text-xs uppercase tracking-wider text-[#0D0C0B]">2. Moisture Care</h4>
                <p className="text-xs text-[#746C63] font-light leading-relaxed">If wet, pat dry with a soft cloth and allow to air dry naturally at room temperature away from direct heaters.</p>
              </div>
              <div className="p-5 bg-[#FFFFFF] border border-[#E5DED4] space-y-2">
                <h4 className="font-semibold text-xs uppercase tracking-wider text-[#0D0C0B]">3. Dust Protection</h4>
                <p className="text-xs text-[#746C63] font-light leading-relaxed">Store inside your complimentary dust bag in a well-ventilated dry area when not in active use.</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: WARRANTY */}
        {activeTab === "warranty" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <h3 className="font-heading font-normal text-2xl sm:text-3xl text-[#0D0C0B]">
              Lifetime Craftsmanship Warranty
            </h3>
            <p className="text-sm sm:text-base text-[#746C63] font-light leading-relaxed">
              We stand behind our atelier standards. Our {product.specs.warranty} covers any defect in materials, hardware, stitching, or zipper failure under normal usage.
            </p>
            <p className="text-xs sm:text-sm text-[#746C63] font-light leading-relaxed">
              If your piece requires servicing, our client concierge will assist you with convenient nationwide courier handling.
            </p>
          </div>
        )}

        {/* TAB 6: REVIEWS */}
        {activeTab === "reviews" && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-6 border-b border-[#E5DED4]">
              <div>
                <h3 className="font-heading font-normal text-2xl sm:text-3xl text-[#0D0C0B]">
                  Client Reviews
                </h3>
                <div className="flex items-center gap-2.5 mt-1.5">
                  <RatingStars rating={product.rating} size="md" />
                  <span className="text-sm font-semibold text-[#0D0C0B]">
                    {product.rating.toFixed(1)} out of 5 ({reviewsList.length} verified reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Review List */}
            <div className="space-y-6 divide-y divide-[#E5DED4]">
              {reviewsList.map((rev) => (
                <div key={rev.id} className="pt-6 first:pt-0 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-[#0D0C0B]">{rev.author}</span>
                      {rev.verifiedPurchase && (
                        <span className="text-[10px] text-[#0D0C0B] bg-[#F8F5EF] border border-[#C9A45C]/40 px-2 py-0.5 font-semibold uppercase tracking-wider flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-[#C9A45C]" />
                          Verified Client
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-[#746C63] font-light">{rev.date}</span>
                  </div>

                  <RatingStars rating={rev.rating} size="sm" />
                  <h4 className="font-semibold text-sm text-[#0D0C0B]">{rev.title}</h4>
                  <p className="text-xs sm:text-sm text-[#746C63] font-light leading-relaxed">{rev.comment}</p>
                </div>
              ))}
            </div>

            {/* Write a Review Form */}
            <div className="pt-8 border-t border-[#E5DED4]">
              <h4 className="font-heading font-normal text-xl text-[#0D0C0B] mb-4">
                Share Your Experience
              </h4>

              {submittedReview ? (
                <div className="p-4 bg-[#FFFFFF] border border-[#C9A45C] text-[#0D0C0B] text-sm font-medium flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#C9A45C]" />
                  <span>Thank you. Your review has been submitted to the atelier.</span>
                </div>
              ) : (
                <form onSubmit={handleReviewSubmit} className="space-y-4 max-w-xl">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#0D0C0B] mb-1">
                      Rating
                    </label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setReviewRating(s)}
                          className="p-1 text-[#C9A45C]"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              s <= reviewRating ? "fill-[#C9A45C] text-[#C9A45C]" : "text-[#E5DED4]"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#0D0C0B] mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        placeholder="e.g. Shakil Chowdhury"
                        className="w-full text-xs p-3 border border-[#E5DED4] bg-[#FFFFFF] focus:outline-none focus:border-[#C9A45C]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#0D0C0B] mb-1">
                        Headline
                      </label>
                      <input
                        type="text"
                        value={reviewTitle}
                        onChange={(e) => setReviewTitle(e.target.value)}
                        placeholder="e.g. Masterpiece leather & superb finish"
                        className="w-full text-xs p-3 border border-[#E5DED4] bg-[#FFFFFF] focus:outline-none focus:border-[#C9A45C]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#0D0C0B] mb-1">
                      Review Comments *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      placeholder="Share your experience with the craftsmanship, packaging, and leather feel..."
                      className="w-full text-xs p-3 border border-[#E5DED4] bg-[#FFFFFF] focus:outline-none focus:border-[#C9A45C]"
                    />
                  </div>

                  {reviewError && (
                    <div className="p-3 bg-[#EF4444]/10 border border-[#EF4444]/30 text-[#EF4444] text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{reviewError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmittingReview}
                    className="px-8 py-3.5 bg-[#0D0C0B] hover:bg-[#C9A45C] text-[#F8F5EF] hover:text-[#0D0C0B] font-semibold text-xs uppercase tracking-[0.18em] flex items-center gap-2 transition-all duration-300 shadow-xs disabled:opacity-50"
                  >
                    {isSubmittingReview ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Review</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
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

