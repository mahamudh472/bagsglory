"use client";

import React, { useState } from "react";
import {
  Tag,
  Plus,
  Edit2,
  Trash2,
  X,
  Copy,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Coupon } from "@/types";
import { formatPrice } from "@/utils/currency";

export default function AdminCouponsPage() {
  const { coupons, addCoupon, updateCoupon, deleteCoupon } = useStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Form State
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [discountType, setDiscountType] = useState<"percentage" | "fixed">("percentage");
  const [discountValue, setDiscountValue] = useState<number>(10);
  const [minOrderValue, setMinOrderValue] = useState<number>(1500);
  const [maxDiscount, setMaxDiscount] = useState<number | undefined>(1000);
  const [expiresAt, setExpiresAt] = useState("2027-12-31");
  const [usageLimit, setUsageLimit] = useState<number>(500);
  const [isActive, setIsActive] = useState(true);

  const openAddModal = () => {
    setEditingCoupon(null);
    setCode("");
    setDescription("");
    setDiscountType("percentage");
    setDiscountValue(10);
    setMinOrderValue(1500);
    setMaxDiscount(1000);
    setExpiresAt("2027-12-31");
    setUsageLimit(500);
    setIsActive(true);
    setIsModalOpen(true);
  };

  const openEditModal = (coupon: Coupon) => {
    setEditingCoupon(coupon);
    setCode(coupon.code);
    setDescription(coupon.description);
    setDiscountType(coupon.discountType);
    setDiscountValue(coupon.discountValue);
    setMinOrderValue(coupon.minOrderValue);
    setMaxDiscount(coupon.maxDiscount);
    setExpiresAt(coupon.expiresAt);
    setUsageLimit(coupon.usageLimit);
    setIsActive(coupon.isActive);
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    const couponPayload: Omit<Coupon, "id" | "usageCount"> = {
      code: code.trim().toUpperCase(),
      description,
      discountType,
      discountValue: Number(discountValue),
      minOrderValue: Number(minOrderValue),
      maxDiscount: discountType === "percentage" && maxDiscount ? Number(maxDiscount) : undefined,
      expiresAt,
      usageLimit: Number(usageLimit),
      isActive,
    };

    if (editingCoupon) {
      updateCoupon(editingCoupon.id, couponPayload);
    } else {
      addCoupon(couponPayload);
    }

    setIsModalOpen(false);
  };

  const handleCopyCode = (codeText: string) => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(codeText);
      setCopiedCode(codeText);
      setTimeout(() => setCopiedCode(null), 2000);
    }
  };

  return (
    <div className="flex-1 flex flex-col font-sans bg-slate-50 text-slate-800 min-h-screen">
      <AdminHeader
        title="Coupons & Promotions"
        subtitle="Create promotional promo codes, threshold discounts, and seasonal offers"
      />

      <main className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 flex-1">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
            Total Active Coupons: {coupons.filter((c) => c.isActive).length}
          </span>
          <button
            onClick={openAddModal}
            className="px-4 py-2.5 bg-[#0084D4] hover:bg-[#0073B6] text-white rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Create Promo Coupon</span>
          </button>
        </div>

        {/* Coupons Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
            <table className="w-full text-left text-xs min-w-[650px]">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-6 font-bold">Coupon Code</th>
                  <th className="py-3.5 px-4 font-bold">Discount Rate</th>
                  <th className="py-3.5 px-4 font-bold">Min Spend</th>
                  <th className="py-3.5 px-4 font-bold">Usage Metrics</th>
                  <th className="py-3.5 px-4 font-bold">Expiry</th>
                  <th className="py-3.5 px-4 font-bold">Status</th>
                  <th className="py-3.5 px-6 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {coupons.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/75 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs text-[#0084D4] bg-sky-50 border border-sky-200 px-2.5 py-1 rounded-lg">
                          {c.code}
                        </span>
                        <button
                          onClick={() => handleCopyCode(c.code)}
                          className="p-1 text-slate-400 hover:text-[#0084D4] transition-colors"
                          title="Copy Code"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        {copiedCode === c.code && (
                          <span className="text-[10px] text-emerald-600 font-bold">
                            Copied!
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1 max-w-xs truncate">
                        {c.description}
                      </div>
                    </td>
                    <td className="py-4 px-4 font-bold text-slate-900 font-mono">
                      {c.discountType === "percentage"
                        ? `${c.discountValue}% OFF`
                        : `${formatPrice(c.discountValue)} OFF`}
                      {c.maxDiscount && (
                        <span className="block text-[10px] text-slate-400 font-normal">
                          Max: {formatPrice(c.maxDiscount)}
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 font-semibold text-slate-600 font-mono">
                      {formatPrice(c.minOrderValue)}
                    </td>
                    <td className="py-4 px-4 font-mono text-slate-500">
                      <strong className="text-slate-900">{c.usageCount}</strong> / {c.usageLimit} uses
                    </td>
                    <td className="py-4 px-4 text-slate-500 font-mono">
                      {c.expiresAt}
                    </td>
                    <td className="py-4 px-4">
                      <button
                        onClick={() => updateCoupon(c.id, { isActive: !c.isActive })}
                        className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full transition-colors ${
                          c.isActive
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                            : "bg-slate-100 text-slate-500 border border-slate-200 hover:bg-slate-200"
                        }`}
                      >
                        {c.isActive ? "Active" : "Disabled"}
                      </button>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openEditModal(c)}
                          className="p-1.5 text-slate-400 hover:text-[#0084D4] hover:bg-sky-50 rounded-lg transition-colors"
                          title="Edit Coupon"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete coupon "${c.code}"?`)) {
                              deleteCoupon(c.id);
                            }
                          }}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Delete Coupon"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 font-sans">
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col my-auto">
              <div className="p-4 sm:p-6 border-b border-slate-200 flex items-center justify-between shrink-0 bg-slate-50/80">
                <div className="flex items-center gap-2">
                  <Tag className="w-5 h-5 text-[#0084D4]" />
                  <h3 className="font-heading font-bold text-xl text-slate-800">
                    {editingCoupon ? "Edit Promotional Coupon" : "Create Promo Code"}
                  </h3>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleFormSubmit} className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Coupon Promo Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    placeholder="e.g. GLORY15"
                    className="w-full text-xs font-mono uppercase font-bold p-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-[#0084D4] focus:ring-1 focus:ring-[#0084D4]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Description & Terms
                  </label>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="e.g. Special 15% discount on all premium bags"
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-[#0084D4] focus:ring-1 focus:ring-[#0084D4]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Discount Type
                    </label>
                    <select
                      value={discountType}
                      onChange={(e) => setDiscountType(e.target.value as any)}
                      className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-[#0084D4] focus:ring-1 focus:ring-[#0084D4]"
                    >
                      <option value="percentage">Percentage (%)</option>
                      <option value="fixed">Fixed Amount (৳ BDT)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Discount Value *
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={discountValue}
                      onChange={(e) => setDiscountValue(Number(e.target.value))}
                      className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 font-mono font-bold focus:outline-none focus:border-[#0084D4] focus:ring-1 focus:ring-[#0084D4]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Min Order Value (৳ BDT)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={minOrderValue}
                      onChange={(e) => setMinOrderValue(Number(e.target.value))}
                      className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 font-mono focus:outline-none focus:border-[#0084D4] focus:ring-1 focus:ring-[#0084D4]"
                    />
                  </div>

                  {discountType === "percentage" && (
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Max Discount Cap (৳ BDT)
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={maxDiscount || ""}
                        onChange={(e) =>
                          setMaxDiscount(e.target.value ? Number(e.target.value) : undefined)
                        }
                        className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 font-mono focus:outline-none focus:border-[#0084D4] focus:ring-1 focus:ring-[#0084D4]"
                      />
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="date"
                      value={expiresAt}
                      onChange={(e) => setExpiresAt(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-[#0084D4] focus:ring-1 focus:ring-[#0084D4]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Usage Limit
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={usageLimit}
                      onChange={(e) => setUsageLimit(Number(e.target.value))}
                      className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 font-mono focus:outline-none focus:border-[#0084D4] focus:ring-1 focus:ring-[#0084D4]"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#0084D4] hover:bg-[#0073B6] text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
                  >
                    {editingCoupon ? "Save Changes" : "Create Coupon"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
