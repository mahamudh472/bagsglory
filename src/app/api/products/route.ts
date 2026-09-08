import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Helper function to format Prisma product model to frontend Product interface
export function formatProduct(p: any) {
  return {
    id: p.id,
    title: p.title,
    slug: p.slug,
    shortDescription: p.shortDescription,
    description: p.description,
    category: p.category?.slug || p.categoryId,
    categoryName: p.categoryName || p.category?.name || "Collection",
    basePrice: p.basePrice,
    compareAtPrice: p.compareAtPrice || undefined,
    rating: p.rating,
    reviewCount: p.reviewCount,
    isFeatured: p.isFeatured,
    isNewArrival: p.isNewArrival,
    isBestSeller: p.isBestSeller,
    tags: Array.isArray(p.tags) ? p.tags : typeof p.tags === "string" ? JSON.parse(p.tags) : [],
    specs: typeof p.specs === "string" ? JSON.parse(p.specs) : p.specs,
    features: Array.isArray(p.features) ? p.features : typeof p.features === "string" ? JSON.parse(p.features) : [],
    variants: (p.variants || []).map((v: any) => ({
      sku: v.sku,
      colorName: v.colorName,
      colorHex: v.colorHex,
      sizeOrCapacity: v.sizeOrCapacity,
      materialOption: v.materialOption || undefined,
      stock: v.stock,
      priceOffset: v.priceOffset,
      images: Array.isArray(v.images) ? v.images : typeof v.images === "string" ? JSON.parse(v.images) : [],
    })),
    reviews: (p.reviews || []).map((r: any) => ({
      id: r.id,
      author: r.author,
      rating: r.rating,
      date: r.date,
      title: r.title,
      comment: r.comment,
      verifiedPurchase: r.verifiedPurchase,
      avatar: r.avatar || undefined,
    })),
    createdAt: p.createdAt instanceof Date ? p.createdAt.toISOString().split("T")[0] : String(p.createdAt),
  };
}

// GET /api/products - List products with rich filtering & sorting
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("q");
    const isFeatured = searchParams.get("isFeatured");
    const isBestSeller = searchParams.get("isBestSeller");
    const isNewArrival = searchParams.get("isNewArrival");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const sort = searchParams.get("sort"); // "price-asc" | "price-desc" | "rating" | "newest" | "featured"

    const where: any = {};

    if (category) {
      where.category = { slug: category };
    }

    if (isFeatured === "true") where.isFeatured = true;
    if (isBestSeller === "true") where.isBestSeller = true;
    if (isNewArrival === "true") where.isNewArrival = true;

    if (minPrice || maxPrice) {
      where.basePrice = {};
      if (minPrice) where.basePrice.gte = parseFloat(minPrice);
      if (maxPrice) where.basePrice.lte = parseFloat(maxPrice);
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { shortDescription: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    let orderBy: any = { createdAt: "desc" };
    if (sort === "price-asc") orderBy = { basePrice: "asc" };
    if (sort === "price-desc") orderBy = { basePrice: "desc" };
    if (sort === "rating") orderBy = { rating: "desc" };
    if (sort === "newest") orderBy = { createdAt: "desc" };

    const products = await prisma.product.findMany({
      where,
      orderBy,
      include: {
        category: true,
        variants: true,
        reviews: true,
      },
    });

    return NextResponse.json(products.map(formatProduct));
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// POST /api/products - Create a new product (Admin)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      title,
      slug,
      shortDescription,
      description,
      category,
      categoryName,
      basePrice,
      compareAtPrice,
      rating = 5.0,
      reviewCount = 0,
      isFeatured = false,
      isNewArrival = false,
      isBestSeller = false,
      tags = [],
      specs,
      features = [],
      variants = [],
      reviews = [],
    } = body;

    // Find category ID by category slug or ID
    let categoryRecord = await prisma.category.findFirst({
      where: {
        OR: [{ slug: category }, { id: category }],
      },
    });

    if (!categoryRecord) {
      // Create fallback category if missing
      categoryRecord = await prisma.category.create({
        data: {
          slug: category.toLowerCase().replace(/\s+/g, "-"),
          name: categoryName || category,
          tagline: "Exclusive Collection",
          description: "Handcrafted Luxury Bag Collection",
          image: variants[0]?.images[0] || "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=900",
        },
      });
    }

    const created = await prisma.product.create({
      data: {
        title,
        slug: slug.toLowerCase().trim(),
        shortDescription,
        description,
        categoryId: categoryRecord.id,
        categoryName: categoryRecord.name,
        basePrice: parseFloat(String(basePrice)),
        compareAtPrice: compareAtPrice ? parseFloat(String(compareAtPrice)) : null,
        rating: parseFloat(String(rating)),
        reviewCount: parseInt(String(reviewCount), 10),
        isFeatured: Boolean(isFeatured),
        isNewArrival: Boolean(isNewArrival),
        isBestSeller: Boolean(isBestSeller),
        tags: tags || [],
        specs: specs || {
          dimensions: "",
          capacity: "",
          weight: "",
          laptopFit: "",
          material: "",
          waterResistance: "",
          warranty: "",
        },
        features: features || [],
        variants: {
          create: variants.map((v: any, index: number) => ({
            sku: v.sku || `${slug}-${v.colorName || index}-${Date.now()}`,
            colorName: v.colorName || "Classic",
            colorHex: v.colorHex || "#000000",
            sizeOrCapacity: v.sizeOrCapacity || "Standard",
            materialOption: v.materialOption || null,
            stock: parseInt(String(v.stock ?? 10), 10),
            priceOffset: parseFloat(String(v.priceOffset ?? 0)),
            images: v.images || [],
          })),
        },
        reviews: {
          create: reviews.map((r: any) => ({
            author: r.author,
            rating: parseInt(String(r.rating ?? 5), 10),
            date: r.date || new Date().toISOString().split("T")[0],
            title: r.title || "Excellent Craftsmanship",
            comment: r.comment || "",
            verifiedPurchase: r.verifiedPurchase ?? true,
            avatar: r.avatar || null,
          })),
        },
      },
      include: {
        category: true,
        variants: true,
        reviews: true,
      },
    });

    return NextResponse.json(formatProduct(created), { status: 201 });
  } catch (error: any) {
    console.error("Error creating product:", error);
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "A product with this slug or SKU already exists" },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: error.message || "Failed to create product" },
      { status: 500 }
    );
  }
}
