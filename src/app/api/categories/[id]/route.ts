import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// PUT /api/categories/[id] - Update a category
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const updated = await prisma.category.update({
      where: { id },
      data: {
        ...(body.slug && { slug: body.slug.toLowerCase().trim() }),
        ...(body.name && { name: body.name }),
        ...(body.tagline && { tagline: body.tagline }),
        ...(body.description && { description: body.description }),
        ...(body.image && { image: body.image }),
        ...(body.badge !== undefined && { badge: body.badge || null }),
      },
      include: {
        _count: {
          select: { products: true },
        },
      },
    });

    return NextResponse.json({
      id: updated.id,
      slug: updated.slug,
      name: updated.name,
      tagline: updated.tagline,
      description: updated.description,
      image: updated.image,
      productCount: updated._count.products,
      badge: updated.badge || undefined,
    });
  } catch (error) {
    console.error("Error updating category:", error);
    return NextResponse.json(
      { error: "Failed to update category" },
      { status: 500 }
    );
  }
}

// DELETE /api/categories/[id] - Delete a category
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.category.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Category deleted" });
  } catch (error) {
    console.error("Error deleting category:", error);
    return NextResponse.json(
      { error: "Failed to delete category" },
      { status: 500 }
    );
  }
}
