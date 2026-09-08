import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { formatProduct } from "../route";

// GET /api/products/[id] - Fetch single product by ID or Slug
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const product = await prisma.product.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
      include: {
        category: true,
        variants: true,
        reviews: true,
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(formatProduct(product));
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

// PUT /api/products/[id] - Update product details & variants (Admin)
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const existing = await prisma.product.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
      include: { category: true },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    // Resolve category if changing
    let categoryId = existing.categoryId;
    let categoryName = existing.categoryName;

    if (body.category && body.category !== existing.category?.slug) {
      const cat = await prisma.category.findFirst({
        where: {
          OR: [{ slug: body.category }, { id: body.category }],
        },
      });
      if (cat) {
        categoryId = cat.id;
        categoryName = cat.name;
      }
    }

    // If variants were provided, replace them
    if (body.variants && Array.isArray(body.variants)) {
      await prisma.productVariant.deleteMany({
        where: { productId: existing.id },
      });

      for (const v of body.variants) {
        await prisma.productVariant.create({
          data: {
            productId: existing.id,
            sku: v.sku || `${existing.slug}-${v.colorName}-${Date.now()}`,
            colorName: v.colorName,
            colorHex: v.colorHex,
            sizeOrCapacity: v.sizeOrCapacity,
            materialOption: v.materialOption || null,
            stock: parseInt(String(v.stock ?? 10), 10),
            priceOffset: parseFloat(String(v.priceOffset ?? 0)),
            images: v.images || [],
          },
        });
      }
    }

    const updated = await prisma.product.update({
      where: { id: existing.id },
      data: {
        ...(body.title && { title: body.title }),
        ...(body.slug && { slug: body.slug.toLowerCase().trim() }),
        ...(body.shortDescription && { shortDescription: body.shortDescription }),
        ...(body.description && { description: body.description }),
        ...(body.category && { categoryId, categoryName }),
        ...(body.basePrice !== undefined && { basePrice: parseFloat(String(body.basePrice)) }),
        ...(body.compareAtPrice !== undefined && {
          compareAtPrice: body.compareAtPrice ? parseFloat(String(body.compareAtPrice)) : null,
        }),
        ...(body.rating !== undefined && { rating: parseFloat(String(body.rating)) }),
        ...(body.reviewCount !== undefined && { reviewCount: parseInt(String(body.reviewCount), 10) }),
        ...(body.isFeatured !== undefined && { isFeatured: Boolean(body.isFeatured) }),
        ...(body.isNewArrival !== undefined && { isNewArrival: Boolean(body.isNewArrival) }),
        ...(body.isBestSeller !== undefined && { isBestSeller: Boolean(body.isBestSeller) }),
        ...(body.tags && { tags: body.tags }),
        ...(body.specs && { specs: body.specs }),
        ...(body.features && { features: body.features }),
      },
      include: {
        category: true,
        variants: true,
        reviews: true,
      },
    });

    return NextResponse.json(formatProduct(updated));
  } catch (error: any) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update product" },
      { status: 500 }
    );
  }
}

// DELETE /api/products/[id] - Delete a product (Admin)
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const existing = await prisma.product.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    await prisma.product.delete({
      where: { id: existing.id },
    });

    return NextResponse.json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
