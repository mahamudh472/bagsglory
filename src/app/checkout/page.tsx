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
      <div className="min-h-screen bg-[#F8F5EF] py-20 flex items-center justify-center font-sans">
        <div className="max-w-md w-full mx-4 bg-white p-12 border border-[#E5DED4] text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-[#F8F5EF] border border-[#E5DED4] text-[#C9A45C] flex items-center justify-center mx-auto">
            <Truck className="w-6 h-6 stroke-[1.5]" />
          </div>
          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C9A45C] block">
            Curated Bag
          </span>
          <h1 className="font-heading text-3xl text-[#0D0C0B]">
            Your Shopping Bag is Empty
          </h1>
          <p className="text-xs text-[#746C63] font-light max-w-sm mx-auto">
            Please select items to your bag before proceeding to luxury Cash on Delivery checkout.
          </p>
          <Link
            href="/shop"
            className="inline-block px-8 py-3.5 bg-[#0D0C0B] text-white text-xs font-semibold uppercase tracking-[0.18em] hover:bg-[#C9A45C] hover:text-[#0D0C0B] transition-all rounded-none"
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setIsSubmitting(true);

    try {
      const order = await createOrder(formData);
      router.push(`/order-success/${order.id}`);
    } catch (err) {
      console.error("Order creation failed:", err);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#F8F5EF] min-h-screen py-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Checkout Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E5DED4]">
          <div>
            <Link
              href="/cart"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#746C63] hover:text-[#0D0C0B] mb-2 uppercase tracking-[0.16em] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Shopping Bag</span>
            </Link>
            <h1 className="font-heading font-normal text-3xl sm:text-5xl text-[#0D0C0B]">
              Cash on Delivery Checkout
            </h1>
          </div>

          <div className="flex items-center gap-3 text-xs text-[#746C63] bg-white border border-[#E5DED4] px-4 py-2.5">
            <ShieldCheck className="w-4 h-4 text-[#C9A45C]" />
            <span>Zero prepayment • Inspect parcel before payment</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Delivery & Customer Information (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. Contact Info */}
            <div className="bg-white p-6 sm:p-8 border border-[#E5DED4] space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#E5DED4]">
                <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0D0C0B]">
                  1. Customer & Contact Information
                </h2>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#C9A45C]">Step 1 of 3</span>
              </div>

              <div className="space-y-4 pt-1">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#0D0C0B] mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tanvir Ahmed"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className={`w-full text-xs p-3.5 border bg-white focus:outline-none focus:border-[#C9A45C] transition-colors rounded-none ${
                      errors.fullName ? "border-rose-500" : "border-[#E5DED4]"
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-[11px] text-rose-600 mt-1">{errors.fullName}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#0D0C0B] mb-1.5">
                      Phone Number (For Courier Contact) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 01712-345678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`w-full text-xs p-3.5 border bg-white focus:outline-none focus:border-[#C9A45C] transition-colors rounded-none ${
                        errors.phone ? "border-rose-500" : "border-[#E5DED4]"
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-[11px] text-rose-600 mt-1">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#0D0C0B] mb-1.5">
                      Email Address (For Confirmation Receipt) *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. tanvir@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full text-xs p-3.5 border bg-white focus:outline-none focus:border-[#C9A45C] transition-colors rounded-none ${
                        errors.email ? "border-rose-500" : "border-[#E5DED4]"
                      }`}
                    />
                    {errors.email && (
                      <p className="text-[11px] text-rose-600 mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Shipping Address */}
            <div className="bg-white p-6 sm:p-8 border border-[#E5DED4] space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#E5DED4]">
                <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0D0C0B]">
                  2. Nationwide Delivery Destination
                </h2>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#C9A45C]">Step 2 of 3</span>
              </div>

              <div className="space-y-4 pt-1">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#0D0C0B] mb-1.5">
                    Street Address & House / Apartment No. *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. House #14, Road #7, Block C, Banani"
                    value={formData.streetAddress}
                    onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
                    className={`w-full text-xs p-3.5 border bg-white focus:outline-none focus:border-[#C9A45C] transition-colors rounded-none ${
                      errors.streetAddress ? "border-rose-500" : "border-[#E5DED4]"
                    }`}
                  />
                  {errors.streetAddress && (
                    <p className="text-[11px] text-rose-600 mt-1">{errors.streetAddress}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#0D0C0B] mb-1.5">
                      City / Area *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dhaka"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full text-xs p-3.5 border border-[#E5DED4] bg-white focus:outline-none focus:border-[#C9A45C] rounded-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#0D0C0B] mb-1.5">
                      District *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dhaka"
                      value={formData.districtState}
                      onChange={(e) => setFormData({ ...formData, districtState: e.target.value })}
                      className="w-full text-xs p-3.5 border border-[#E5DED4] bg-white focus:outline-none focus:border-[#C9A45C] rounded-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#0D0C0B] mb-1.5">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 1213"
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      className="w-full text-xs p-3.5 border border-[#E5DED4] bg-white focus:outline-none focus:border-[#C9A45C] rounded-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#0D0C0B] mb-1.5">
                    Special Delivery Instructions (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Please deliver after 3:00 PM or call security before arrival."
                    value={formData.deliveryNotes}
                    onChange={(e) => setFormData({ ...formData, deliveryNotes: e.target.value })}
                    className="w-full text-xs p-3.5 border border-[#E5DED4] bg-white focus:outline-none focus:border-[#C9A45C] rounded-none"
                  />
                </div>
              </div>
            </div>

            {/* 3. Payment Method */}
            <div className="bg-white p-6 sm:p-8 border border-[#E5DED4] space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#E5DED4]">
                <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0D0C0B]">
                  3. Payment Method
                </h2>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#C9A45C]">Step 3 of 3</span>
              </div>

              <div className="border border-[#0D0C0B] bg-[#F8F5EF] p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 bg-[#0D0C0B] text-[#C9A45C] flex items-center justify-center">
                    <Banknote className="w-5 h-5 stroke-[1.5]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-[#0D0C0B]">
                      Cash on Delivery (COD)
                    </h3>
                    <p className="text-xs text-[#746C63] font-light mt-0.5">
                      Inspect your handcrafted bag at your doorstep before handing cash to the courier.
                    </p>
                  </div>
                </div>
                <CheckCircle2 className="w-5 h-5 text-[#C9A45C]" />
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary & Place Order (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 border border-[#E5DED4] space-y-5">
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0D0C0B] pb-3 border-b border-[#E5DED4]">
                Order Review ({cart.reduce((c, i) => c + i.quantity, 0)} Items)
              </h2>

              {/* Items preview */}
              <div className="divide-y divide-[#E5DED4] max-h-64 overflow-y-auto pr-1 space-y-3">
                {cart.map((item) => (
                  <div key={item.id} className="pt-3 first:pt-0 flex items-center gap-3.5">
                    <div className="relative w-14 h-16 bg-[#F8F5EF] border border-[#E5DED4] shrink-0">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-semibold text-[#0D0C0B] truncate">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-[#746C63] uppercase tracking-wider">
                        {item.colorName} • Qty: {item.quantity}
                      </p>
                      <span className="text-xs font-semibold text-[#C9A45C]">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon input */}
              <div className="pt-2 border-t border-[#E5DED4]">
                <CouponBox />
              </div>

              {/* Totals */}
              <div className="space-y-2.5 pt-3 border-t border-[#E5DED4] text-xs text-[#746C63]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#0D0C0B]">{formatPrice(cartSubtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#C9A45C] font-semibold">
                    <span>Privilege Savings</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Courier Delivery</span>
                  <span className="font-semibold text-[#0D0C0B]">
                    {shippingFee === 0 ? "Complimentary" : formatPrice(shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between items-baseline text-sm pt-4 border-t border-[#E5DED4]">
                  <span className="font-semibold uppercase tracking-wider text-xs text-[#0D0C0B]">Total Due (COD)</span>
                  <span className="font-normal font-heading text-2xl text-[#0D0C0B]">{formatPrice(cartTotal)}</span>
                </div>
              </div>

              {/* Place Order CTA Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-[#0D0C0B] hover:bg-[#C9A45C] hover:text-[#0D0C0B] disabled:opacity-75 text-white font-semibold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all rounded-none"
              >
                {isSubmitting ? (
                  <span>Securing Your Creation...</span>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5" />
                    <span>Confirm Order (Cash on Delivery)</span>
                  </>
                )}
              </button>

              <div className="text-center text-[11px] text-[#746C63] pt-1 flex items-center justify-center gap-1.5 font-light">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C9A45C]" />
                <span>Zero advance deposit needed • Pay when parcel arrives</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
