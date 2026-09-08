import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/categories - Fetch all categories with dynamic product count
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { createdAt: "asc" },
      include: {
        _count: {
          select: { products: true },
        },
      },
    });

    const formattedCategories = categories.map((cat) => ({
      id: cat.id,
      slug: cat.slug,
      name: cat.name,
      tagline: cat.tagline,
      description: cat.description,
      image: cat.image,
      productCount: cat._count.products,
      badge: cat.badge || undefined,
    }));

    return NextResponse.json(formattedCategories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

// POST /api/categories - Create a new category
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { slug, name, tagline, description, image, badge } = body;

    if (!slug || !name || !tagline || !description || !image) {
      return NextResponse.json(
        { error: "Missing required fields for category" },
        { status: 400 }
      );
    }

    const created = await prisma.category.create({
      data: {
        slug: slug.toLowerCase().trim(),
        name,
        tagline,
        description,
        image,
        badge: badge || null,
      },
    });

    return NextResponse.json(
      {
        id: created.id,
        slug: created.slug,
        name: created.name,
        tagline: created.tagline,
        description: created.description,
        image: created.image,
        productCount: 0,
        badge: created.badge || undefined,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating category:", error);
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "A category with this slug already exists" },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 }
    );
  }
}
