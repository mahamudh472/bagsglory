import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/coupons - List all coupons
export async function GET() {
  try {
    const coupons = await prisma.coupon.findMany({
      orderBy: { createdAt: "desc" },
    });

    const formatted = coupons.map((c) => ({
      id: c.id,
      code: c.code,
      description: c.description,
      discountType: c.discountType as "percentage" | "fixed",
      discountValue: c.discountValue,
      minOrderValue: c.minOrderValue,
      maxDiscount: c.maxDiscount || undefined,
      expiresAt: c.expiresAt,
      usageCount: c.usageCount,
      usageLimit: c.usageLimit,
      isActive: c.isActive,
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("Error fetching coupons:", error);
    return NextResponse.json(
      { error: "Failed to fetch coupons" },
      { status: 500 }
    );
  }
}

// POST /api/coupons - Create new coupon
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      code,
      description,
      discountType = "percentage",
      discountValue,
      minOrderValue = 0,
      maxDiscount,
      expiresAt,
      usageLimit = 100,
      isActive = true,
    } = body;

    if (!code || discountValue === undefined || !expiresAt) {
      return NextResponse.json(
        { error: "Missing required coupon fields" },
        { status: 400 }
      );
    }

    const created = await prisma.coupon.create({
      data: {
        code: code.toUpperCase().trim(),
        description: description || `Enjoy discount with ${code}`,
        discountType,
        discountValue: parseFloat(String(discountValue)),
        minOrderValue: parseFloat(String(minOrderValue)),
        maxDiscount: maxDiscount ? parseFloat(String(maxDiscount)) : null,
        expiresAt,
        usageCount: 0,
        usageLimit: parseInt(String(usageLimit), 10),
        isActive: Boolean(isActive),
      },
    });

    return NextResponse.json(
      {
        id: created.id,
        code: created.code,
        description: created.description,
        discountType: created.discountType,
        discountValue: created.discountValue,
        minOrderValue: created.minOrderValue,
        maxDiscount: created.maxDiscount || undefined,
        expiresAt: created.expiresAt,
        usageCount: created.usageCount,
        usageLimit: created.usageLimit,
        isActive: created.isActive,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating coupon:", error);
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "A coupon with this code already exists" },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create coupon" },
      { status: 500 }
    );
  }
}
