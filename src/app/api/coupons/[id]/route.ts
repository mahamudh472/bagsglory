import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// PUT /api/coupons/[id] - Update coupon (Admin)
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const updated = await prisma.coupon.update({
      where: { id },
      data: {
        ...(body.code && { code: body.code.toUpperCase().trim() }),
        ...(body.description && { description: body.description }),
        ...(body.discountType && { discountType: body.discountType }),
        ...(body.discountValue !== undefined && { discountValue: parseFloat(String(body.discountValue)) }),
        ...(body.minOrderValue !== undefined && { minOrderValue: parseFloat(String(body.minOrderValue)) }),
        ...(body.maxDiscount !== undefined && {
          maxDiscount: body.maxDiscount ? parseFloat(String(body.maxDiscount)) : null,
        }),
        ...(body.expiresAt && { expiresAt: body.expiresAt }),
        ...(body.usageLimit !== undefined && { usageLimit: parseInt(String(body.usageLimit), 10) }),
        ...(body.isActive !== undefined && { isActive: Boolean(body.isActive) }),
      },
    });

    return NextResponse.json({
      id: updated.id,
      code: updated.code,
      description: updated.description,
      discountType: updated.discountType,
      discountValue: updated.discountValue,
      minOrderValue: updated.minOrderValue,
      maxDiscount: updated.maxDiscount || undefined,
      expiresAt: updated.expiresAt,
      usageCount: updated.usageCount,
      usageLimit: updated.usageLimit,
      isActive: updated.isActive,
    });
  } catch (error) {
    console.error("Error updating coupon:", error);
    return NextResponse.json(
      { error: "Failed to update coupon" },
      { status: 500 }
    );
  }
}

// DELETE /api/coupons/[id] - Delete coupon (Admin)
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.coupon.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Coupon deleted" });
  } catch (error) {
    console.error("Error deleting coupon:", error);
    return NextResponse.json(
      { error: "Failed to delete coupon" },
      { status: 500 }
    );
  }
}
