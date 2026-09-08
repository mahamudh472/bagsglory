import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// POST /api/coupons/validate - Real-time validation of coupon codes
export async function POST(request: Request) {
  try {
    const { code, cartSubtotal } = await request.json();

    if (!code) {
      return NextResponse.json(
        { success: false, message: "Please provide a coupon code." },
        { status: 400 }
      );
    }

    const formattedCode = code.toUpperCase().trim();
    const coupon = await prisma.coupon.findUnique({
      where: { code: formattedCode },
    });

    if (!coupon) {
      return NextResponse.json({
        success: false,
        message: "Invalid coupon code. Try GLORY10 or BAGS20.",
      });
    }

    if (!coupon.isActive) {
      return NextResponse.json({
        success: false,
        message: "This coupon has expired or is currently inactive.",
      });
    }

    if (coupon.usageLimit && coupon.usageCount >= coupon.usageLimit) {
      return NextResponse.json({
        success: false,
        message: "This coupon has reached its maximum redemption limit.",
      });
    }

    const subtotal = parseFloat(String(cartSubtotal || 0));
    if (subtotal < coupon.minOrderValue) {
      return NextResponse.json({
        success: false,
        message: `Minimum order value for this coupon is ৳${coupon.minOrderValue.toLocaleString()}. Add more items to your bag.`,
      });
    }

    let calculatedDiscount = 0;
    if (coupon.discountType === "percentage") {
      calculatedDiscount = (subtotal * coupon.discountValue) / 100;
      if (coupon.maxDiscount && calculatedDiscount > coupon.maxDiscount) {
        calculatedDiscount = coupon.maxDiscount;
      }
    } else {
      calculatedDiscount = Math.min(coupon.discountValue, subtotal);
    }

    return NextResponse.json({
      success: true,
      message: `Coupon "${coupon.code}" applied successfully!`,
      coupon: {
        id: coupon.id,
        code: coupon.code,
        description: coupon.description,
        discountType: coupon.discountType as "percentage" | "fixed",
        discountValue: coupon.discountValue,
        minOrderValue: coupon.minOrderValue,
        maxDiscount: coupon.maxDiscount || undefined,
        expiresAt: coupon.expiresAt,
        usageCount: coupon.usageCount,
        usageLimit: coupon.usageLimit,
        isActive: coupon.isActive,
      },
      discountAmount: calculatedDiscount,
    });
  } catch (error) {
    console.error("Error validating coupon:", error);
    return NextResponse.json(
      { success: false, message: "Failed to validate coupon" },
      { status: 500 }
    );
  }
}
