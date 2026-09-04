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
      <div className="min-h-screen bg-white py-16 flex items-center justify-center font-sans">
        <div className="max-w-md w-full mx-4 bg-slate-50 p-8 border border-slate-200 text-center shadow-sm space-y-4">
          <div className="w-14 h-14 rounded-full bg-white border border-slate-200 text-slate-400 flex items-center justify-center mx-auto">
            <Truck className="w-6 h-6" />
          </div>
          <h1 className="font-heading font-bold text-2xl text-[#1E293B]">
            Your Shopping Cart is Empty
          </h1>
          <p className="text-sm text-slate-500">
            Please add items to your cart before proceeding to Cash on Delivery checkout.
          </p>
          <Link
            href="/shop"
            className="inline-block px-6 py-3 bg-[#0084D4] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#0073B6] transition-colors rounded-none"
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
    <div className="bg-white min-h-screen py-10 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Checkout Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <Link
              href="/cart"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#0084D4] mb-2 uppercase tracking-wider"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Cart</span>
            </Link>
            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#1E293B]">
              Cash on Delivery Checkout
            </h1>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-600 bg-slate-50 border border-slate-200 px-4 py-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Zero prepayment • Inspect parcel before payment</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Delivery & Customer Information (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. Contact Info */}
            <div className="bg-white p-6 border border-slate-200 shadow-xs space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#1E293B] pb-2 border-b border-slate-100">
                1. Customer & Contact Information
              </h2>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-[#1E293B] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tanvir Ahmed"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className={`w-full text-xs p-3 border bg-slate-50 focus:bg-white focus:outline-none focus:border-[#0084D4] transition-colors rounded-none ${
                      errors.fullName ? "border-rose-500" : "border-slate-200"
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-[11px] text-rose-500 mt-1">{errors.fullName}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#1E293B] mb-1">
                      Phone Number (For Courier Contact) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 01712-345678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`w-full text-xs p-3 border bg-slate-50 focus:bg-white focus:outline-none focus:border-[#0084D4] transition-colors rounded-none ${
                        errors.phone ? "border-rose-500" : "border-slate-200"
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-[11px] text-rose-500 mt-1">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1E293B] mb-1">
                      Email Address (For Order Confirmation) *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. tanvir@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full text-xs p-3 border bg-slate-50 focus:bg-white focus:outline-none focus:border-[#0084D4] transition-colors rounded-none ${
                        errors.email ? "border-rose-500" : "border-slate-200"
                      }`}
                    />
                    {errors.email && (
                      <p className="text-[11px] text-rose-500 mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Shipping Address */}
            <div className="bg-white p-6 border border-slate-200 shadow-xs space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#1E293B] pb-2 border-b border-slate-100">
                2. Nationwide Delivery Address
              </h2>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-[#1E293B] mb-1">
                    Street Address & House / Apartment No. *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. House #14, Road #7, Block C, Banani"
                    value={formData.streetAddress}
                    onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
                    className={`w-full text-xs p-3 border bg-slate-50 focus:bg-white focus:outline-none focus:border-[#0084D4] transition-colors rounded-none ${
                      errors.streetAddress ? "border-rose-500" : "border-slate-200"
                    }`}
                  />
                  {errors.streetAddress && (
                    <p className="text-[11px] text-rose-500 mt-1">{errors.streetAddress}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#1E293B] mb-1">
                      City / Area *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dhaka"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full text-xs p-3 border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#0084D4] rounded-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1E293B] mb-1">
                      District *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dhaka"
                      value={formData.districtState}
                      onChange={(e) => setFormData({ ...formData, districtState: e.target.value })}
                      className="w-full text-xs p-3 border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#0084D4] rounded-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1E293B] mb-1">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 1213"
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      className="w-full text-xs p-3 border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#0084D4] rounded-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1E293B] mb-1">
                    Special Delivery Instructions (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Please deliver after 3:00 PM or call security before arrival."
                    value={formData.deliveryNotes}
                    onChange={(e) => setFormData({ ...formData, deliveryNotes: e.target.value })}
                    className="w-full text-xs p-3 border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#0084D4] rounded-none"
                  />
                </div>
              </div>
            </div>

            {/* 3. Payment Method */}
            <div className="bg-white p-6 border border-slate-200 shadow-xs space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#1E293B] pb-2 border-b border-slate-100">
                3. Payment Method
              </h2>

              <div className="border-2 border-[#0084D4] bg-sky-50/40 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#0084D4] text-white flex items-center justify-center">
                    <Banknote className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#1E293B]">
                      Cash on Delivery (COD)
                    </h3>
                    <p className="text-xs text-slate-500">
                      Pay cash upon physical parcel inspection at your doorstep.
                    </p>
                  </div>
                </div>
                <CheckCircle2 className="w-5 h-5 text-[#0084D4]" />
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary & Place Order (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-50 p-6 border border-slate-200 shadow-xs space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#1E293B] pb-2 border-b border-slate-200">
                Order Review ({cart.reduce((c, i) => c + i.quantity, 0)} Items)
              </h2>

              {/* Items preview */}
              <div className="divide-y divide-slate-200 max-h-64 overflow-y-auto pr-1 space-y-3">
                {cart.map((item) => (
                  <div key={item.id} className="pt-3 first:pt-0 flex items-center gap-3">
                    <div className="relative w-14 h-16 bg-white border border-slate-200 shrink-0">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-[#1E293B] truncate">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        {item.colorName} • Qty: {item.quantity}
                      </p>
                      <span className="text-xs font-bold text-[#0084D4]">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon input */}
              <div className="pt-2 border-t border-slate-200">
                <CouponBox />
              </div>

              {/* Totals */}
              <div className="space-y-2 pt-3 border-t border-slate-200 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-[#1E293B]">{formatPrice(cartSubtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Discount Applied</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Courier Delivery</span>
                  <span className="font-bold text-[#1E293B]">
                    {shippingFee === 0 ? "Free" : formatPrice(shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between items-baseline text-sm pt-3 border-t border-slate-200">
                  <span className="font-bold text-[#1E293B]">Total Due Upon Delivery</span>
                  <span className="font-extrabold text-lg text-[#0084D4]">{formatPrice(cartTotal)}</span>
                </div>
              </div>

              {/* Place Order CTA Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-[#0084D4] hover:bg-[#0073B6] disabled:opacity-75 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md rounded-none"
              >
                {isSubmitting ? (
                  <span>Securing Your Order...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Confirm Order (Cash on Delivery)</span>
                  </>
                )}
              </button>

              <div className="text-center text-[11px] text-slate-500 pt-1 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero advance deposit needed • Pay when parcel arrives</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
