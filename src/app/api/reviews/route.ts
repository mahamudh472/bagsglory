import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// POST /api/reviews - Add customer review and update aggregate product rating
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { productId, author, rating, title, comment, verifiedPurchase = true, avatar } = body;

    if (!productId || !author || !rating || !title || !comment) {
      return NextResponse.json(
        { error: "Missing required review fields" },
        { status: 400 }
      );
    }

    const product = await prisma.product.findFirst({
      where: {
        OR: [{ id: productId }, { slug: productId }],
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    const createdReview = await prisma.review.create({
      data: {
        productId: product.id,
        author,
        rating: parseInt(String(rating), 10),
        date: new Date().toISOString().split("T")[0],
        title,
        comment,
        verifiedPurchase: Boolean(verifiedPurchase),
        avatar: avatar || null,
      },
    });

    // Recalculate average rating & review count
    const allReviews = await prisma.review.findMany({
      where: { productId: product.id },
    });

    const totalRatings = allReviews.reduce((sum, r) => sum + r.rating, 0);
    const newAverage = Number((totalRatings / allReviews.length).toFixed(1));

    await prisma.product.update({
      where: { id: product.id },
      data: {
        rating: newAverage,
        reviewCount: allReviews.length,
      },
    });

    return NextResponse.json(
      {
        id: createdReview.id,
        author: createdReview.author,
        rating: createdReview.rating,
        date: createdReview.date,
        title: createdReview.title,
        comment: createdReview.comment,
        verifiedPurchase: createdReview.verifiedPurchase,
        avatar: createdReview.avatar || undefined,
        newProductRating: newAverage,
        newReviewCount: allReviews.length,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json(
      { error: "Failed to create review" },
      { status: 500 }
    );
  }
}
