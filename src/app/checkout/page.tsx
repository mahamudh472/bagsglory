"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Truck,
  CheckCircle2,
  Banknote,
  ArrowLeft,
  Lock,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { CouponBox } from "@/components/cart/CouponBox";
import { DeliveryAddress } from "@/types";
import { formatPrice } from "@/utils/currency";

export default function CheckoutPage() {
  const router = useRouter();
  const {
    cart,
    cartSubtotal,
    discountAmount,
    shippingFee,
    cartTotal,
    appliedCoupon,
    createOrder,
  } = useStore();

  const [formData, setFormData] = useState<DeliveryAddress>({
    fullName: "",
    phone: "",
    email: "",
    streetAddress: "",
    city: "Dhaka",
    districtState: "Dhaka",
    postalCode: "",
    deliveryNotes: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof DeliveryAddress, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If cart is empty, redirect back to catalog
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#F8F6F1] py-16 flex items-center justify-center font-ui">
        <div className="max-w-md w-full mx-4 bg-white p-8 rounded-lg border border-[#E7E2DA] text-center shadow-subtle space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#F8F6F1] border border-[#E7E2DA] text-[#625E58] flex items-center justify-center mx-auto">
            <Truck className="w-5 h-5" />
          </div>
          <h1 className="font-editorial text-2xl text-[#181817]">
            Your Shopping Bag is Empty
          </h1>
          <p className="text-xs text-[#625E58]">
            Please add items to your bag before proceeding to Cash on Delivery checkout.
          </p>
          <Link
            href="/shop"
            className="inline-block px-6 py-2.5 bg-[#181817] text-white rounded-md text-xs font-semibold uppercase tracking-wider hover:bg-[#2C2B29] transition-colors"
          >
            Explore Catalog
          </Link>
        </div>
      </div>
    );
  }

  const validateForm = () => {
    const newErrors: Partial<Record<keyof DeliveryAddress, string>> = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required for courier contact";
    } else if (formData.phone.trim().length < 8) {
      newErrors.phone = "Please enter a valid phone number";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required for order receipt";
    } else if (!formData.email.includes("@")) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.streetAddress.trim()) {
      newErrors.streetAddress = "Street address and house/flat number is required";
    }
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.districtState.trim()) newErrors.districtState = "District / Area is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setIsSubmitting(true);

    try {
      const order = createOrder(formData);
      router.push(`/order-success/${order.id}`);
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#F8F6F1] min-h-screen py-10 font-ui">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Checkout Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E7E2DA]">
          <div>
            <Link
              href="/cart"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#625E58] hover:text-[#181817] mb-2 uppercase tracking-wider"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Bag</span>
            </Link>
            <h1 className="font-editorial text-3xl sm:text-4xl text-[#181817] font-normal">
              Cash on Delivery Checkout
            </h1>
          </div>

          <div className="flex items-center gap-3 text-xs text-[#625E58] bg-white border border-[#E7E2DA] px-4 py-2 rounded-md">
            <ShieldCheck className="w-4 h-4 text-[#2D5A3C]" />
            <span>Zero prepayment • Inspect before cash payment</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Delivery & Customer Information (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. Contact Info */}
            <div className="bg-white rounded-lg p-6 border border-[#E7E2DA] space-y-4">
              <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-[#181817] pb-2 border-b border-[#E7E2DA]">
                1. Customer & Contact Information
              </h2>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-[#181817] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tanvir Ahmed"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className={`w-full text-xs p-3 rounded-md border bg-[#F8F6F1] focus:bg-white focus:outline-none focus:border-[#181817] transition-colors ${
                      errors.fullName ? "border-[#A33B3B]" : "border-[#E7E2DA]"
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-[11px] text-[#A33B3B] mt-1">{errors.fullName}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#181817] mb-1">
                      Phone Number (For Courier Contact) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 01712-345678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`w-full text-xs p-3 rounded-md border bg-[#F8F6F1] focus:bg-white focus:outline-none focus:border-[#181817] transition-colors ${
                        errors.phone ? "border-[#A33B3B]" : "border-[#E7E2DA]"
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-[11px] text-[#A33B3B] mt-1">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#181817] mb-1">
                      Email Address (For Order Receipt) *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. tanvir@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full text-xs p-3 rounded-md border bg-[#F8F6F1] focus:bg-white focus:outline-none focus:border-[#181817] transition-colors ${
                        errors.email ? "border-[#A33B3B]" : "border-[#E7E2DA]"
                      }`}
                    />
                    {errors.email && (
                      <p className="text-[11px] text-[#A33B3B] mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Shipping Address */}
            <div className="bg-white rounded-lg p-6 border border-[#E7E2DA] space-y-4">
              <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-[#181817] pb-2 border-b border-[#E7E2DA]">
                2. Nationwide Delivery Address
              </h2>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-[#181817] mb-1">
                    Street Address & House / Apartment No. *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. House #14, Road #7, Block C, Banani"
                    value={formData.streetAddress}
                    onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
                    className={`w-full text-xs p-3 rounded-md border bg-[#F8F6F1] focus:bg-white focus:outline-none focus:border-[#181817] transition-colors ${
                      errors.streetAddress ? "border-[#A33B3B]" : "border-[#E7E2DA]"
                    }`}
                  />
                  {errors.streetAddress && (
                    <p className="text-[11px] text-[#A33B3B] mt-1">{errors.streetAddress}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#181817] mb-1">
                      City / Area *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dhaka"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full text-xs p-3 rounded-md border border-[#E7E2DA] bg-[#F8F6F1] focus:bg-white focus:outline-none focus:border-[#181817]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#181817] mb-1">
                      District / Division *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dhaka / Chittagong"
                      value={formData.districtState}
                      onChange={(e) => setFormData({ ...formData, districtState: e.target.value })}
                      className="w-full text-xs p-3 rounded-md border border-[#E7E2DA] bg-[#F8F6F1] focus:bg-white focus:outline-none focus:border-[#181817]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#181817] mb-1">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 1213"
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      className="w-full text-xs p-3 rounded-md border border-[#E7E2DA] bg-[#F8F6F1] focus:bg-white focus:outline-none focus:border-[#181817]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#181817] mb-1">
                    Delivery Instructions & Landmarks (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Please call upon arrival or leave with reception"
                    value={formData.deliveryNotes}
                    onChange={(e) => setFormData({ ...formData, deliveryNotes: e.target.value })}
                    className="w-full text-xs p-3 rounded-md border border-[#E7E2DA] bg-[#F8F6F1] focus:bg-white focus:outline-none focus:border-[#181817]"
                  />
                </div>
              </div>
            </div>

            {/* 3. Payment Method */}
            <div className="bg-white rounded-lg p-6 border border-[#E7E2DA] space-y-3">
              <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-[#181817] pb-2 border-b border-[#E7E2DA]">
                3. Payment Selection
              </h2>

              <div className="p-4 rounded-md border border-[#181817] bg-[#F8F6F1] flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <Banknote className="w-5 h-5 text-[#A85A20] shrink-0 mt-0.5" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-xs text-[#181817]">Cash on Delivery (COD)</h3>
                      <span className="text-[10px] text-[#2D5A3C] font-semibold bg-[#2D5A3C]/10 px-2 py-0.5 rounded">
                        Recommended
                      </span>
                    </div>
                    <p className="text-xs text-[#625E58] mt-1">
                      Pay <strong>{formatPrice(cartTotal)}</strong> in cash directly to the courier agent upon parcel delivery.
                    </p>
                  </div>
                </div>
                <CheckCircle2 className="w-4 h-4 text-[#181817] shrink-0" />
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary & Review (5 Cols) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <div className="bg-white rounded-lg p-6 border border-[#E7E2DA] space-y-4">
              <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-[#181817] pb-2 border-b border-[#E7E2DA]">
                Order Summary ({cart.length} items)
              </h2>

              {/* Items preview */}
              <div className="divide-y divide-[#E7E2DA] max-h-72 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.id} className="py-3 first:pt-0 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-14 rounded-md overflow-hidden bg-[#EFEBE4] border border-[#E7E2DA] shrink-0">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-xs text-[#181817] truncate max-w-[180px]">
                          {item.title}
                        </h4>
                        <p className="text-[11px] text-[#625E58]">
                          {item.colorName} • Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <span className="font-semibold text-xs text-[#181817]">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Coupon Box */}
              <div className="pt-2">
                <CouponBox />
              </div>

              {/* Cost breakdown */}
              <div className="space-y-2 pt-4 border-t border-[#E7E2DA] text-xs text-[#625E58]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#181817]">{formatPrice(cartSubtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#2D5A3C] font-semibold">
                    <span>Discount ({appliedCoupon?.code})</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Courier Delivery Fee</span>
                  <span className="font-semibold text-[#181817]">
                    {shippingFee === 0 ? "Free" : formatPrice(shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between items-baseline text-sm pt-3 border-t border-[#E7E2DA]">
                  <span className="font-semibold text-[#181817]">Total Amount Due</span>
                  <span className="font-bold text-lg text-[#181817]">{formatPrice(cartTotal)}</span>
                </div>
              </div>

              {/* Submit CTA: Secondary CTA in Cognac background */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-[#A85A20] hover:bg-[#8E4718] text-white rounded-md font-semibold text-xs uppercase tracking-[0.12em] flex items-center justify-center gap-2 transition-all shadow-subtle disabled:opacity-70"
              >
                <Lock className="w-4 h-4" />
                <span>{isSubmitting ? "Creating Order..." : "Place Cash on Delivery Order"}</span>
              </button>

              <div className="text-center text-[11px] text-[#625E58] pt-1">
                🔒 100% Risk-Free. Pay only after physical inspection.
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
