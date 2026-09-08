import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import {
  INITIAL_CATEGORIES,
  INITIAL_COUPONS,
  INITIAL_ORDERS,
  INITIAL_PRODUCTS,
} from "../src/data/mockData";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting Neon PostgreSQL database seeding...");

  // 1. Seed Categories
  console.log(`📦 Seeding ${INITIAL_CATEGORIES.length} categories...`);
  const categoryMap = new Map<string, string>(); // slug -> id

  for (const cat of INITIAL_CATEGORIES) {
    const upserted = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {
        name: cat.name,
        tagline: cat.tagline,
        description: cat.description,
        image: cat.image,
        badge: cat.badge || null,
      },
      create: {
        id: cat.id,
        slug: cat.slug,
        name: cat.name,
        tagline: cat.tagline,
        description: cat.description,
        image: cat.image,
        badge: cat.badge || null,
      },
    });
    categoryMap.set(cat.slug, upserted.id);
  }

  // 2. Seed Products with Variants and Reviews
  console.log(`👜 Seeding ${INITIAL_PRODUCTS.length} products...`);
  for (const prod of INITIAL_PRODUCTS) {
    const categoryId = categoryMap.get(prod.category);
    if (!categoryId) {
      console.warn(`Category slug "${prod.category}" not found for product "${prod.title}". Skipping.`);
      continue;
    }

    // Delete existing variants/reviews for clean upsert
    const existing = await prisma.product.findUnique({ where: { slug: prod.slug } });
    if (existing) {
      await prisma.productVariant.deleteMany({ where: { productId: existing.id } });
      await prisma.review.deleteMany({ where: { productId: existing.id } });
    }

    const createdProduct = await prisma.product.upsert({
      where: { slug: prod.slug },
      update: {
        title: prod.title,
        shortDescription: prod.shortDescription,
        description: prod.description,
        categoryId: categoryId,
        categoryName: prod.categoryName,
        basePrice: prod.basePrice,
        compareAtPrice: prod.compareAtPrice || null,
        rating: prod.rating,
        reviewCount: prod.reviewCount,
        isFeatured: prod.isFeatured || false,
        isNewArrival: prod.isNewArrival || false,
        isBestSeller: prod.isBestSeller || false,
        tags: prod.tags || [],
        specs: prod.specs as any,
        features: prod.features || [],
      },
      create: {
        id: prod.id,
        title: prod.title,
        slug: prod.slug,
        shortDescription: prod.shortDescription,
        description: prod.description,
        categoryId: categoryId,
        categoryName: prod.categoryName,
        basePrice: prod.basePrice,
        compareAtPrice: prod.compareAtPrice || null,
        rating: prod.rating,
        reviewCount: prod.reviewCount,
        isFeatured: prod.isFeatured || false,
        isNewArrival: prod.isNewArrival || false,
        isBestSeller: prod.isBestSeller || false,
        tags: prod.tags || [],
        specs: prod.specs as any,
        features: prod.features || [],
      },
    });

    // Seed Variants
    if (prod.variants && prod.variants.length > 0) {
      for (const variant of prod.variants) {
        await prisma.productVariant.upsert({
          where: { sku: variant.sku },
          update: {
            productId: createdProduct.id,
            colorName: variant.colorName,
            colorHex: variant.colorHex,
            sizeOrCapacity: variant.sizeOrCapacity,
            materialOption: variant.materialOption || null,
            stock: variant.stock,
            priceOffset: variant.priceOffset || 0,
            images: variant.images || [],
          },
          create: {
            productId: createdProduct.id,
            sku: variant.sku,
            colorName: variant.colorName,
            colorHex: variant.colorHex,
            sizeOrCapacity: variant.sizeOrCapacity,
            materialOption: variant.materialOption || null,
            stock: variant.stock,
            priceOffset: variant.priceOffset || 0,
            images: variant.images || [],
          },
        });
      }
    }

    // Seed Reviews
    if (prod.reviews && prod.reviews.length > 0) {
      for (const rev of prod.reviews) {
        await prisma.review.create({
          data: {
            id: rev.id,
            productId: createdProduct.id,
            author: rev.author,
            rating: rev.rating,
            date: rev.date,
            title: rev.title,
            comment: rev.comment,
            verifiedPurchase: rev.verifiedPurchase ?? true,
            avatar: rev.avatar || null,
          },
        });
      }
    }
  }

  // 3. Seed Coupons
  console.log(`🎟️ Seeding ${INITIAL_COUPONS.length} coupons...`);
  for (const coup of INITIAL_COUPONS) {
    await prisma.coupon.upsert({
      where: { code: coup.code.toUpperCase().trim() },
      update: {
        description: coup.description,
        discountType: coup.discountType,
        discountValue: coup.discountValue,
        minOrderValue: coup.minOrderValue,
        maxDiscount: coup.maxDiscount || null,
        expiresAt: coup.expiresAt,
        usageCount: coup.usageCount,
        usageLimit: coup.usageLimit,
        isActive: coup.isActive,
      },
      create: {
        id: coup.id,
        code: coup.code.toUpperCase().trim(),
        description: coup.description,
        discountType: coup.discountType,
        discountValue: coup.discountValue,
        minOrderValue: coup.minOrderValue,
        maxDiscount: coup.maxDiscount || null,
        expiresAt: coup.expiresAt,
        usageCount: coup.usageCount,
        usageLimit: coup.usageLimit,
        isActive: coup.isActive,
      },
    });
  }

  // 4. Seed Orders
  console.log(`📋 Seeding ${INITIAL_ORDERS.length} orders...`);
  for (const ord of INITIAL_ORDERS) {
    const existingOrder = await prisma.order.findUnique({ where: { id: ord.id } });
    if (existingOrder) {
      await prisma.orderItem.deleteMany({ where: { orderId: existingOrder.id } });
      await prisma.order.delete({ where: { id: ord.id } });
    }

    await prisma.order.create({
      data: {
        id: ord.id,
        createdAt: new Date(ord.createdAt),
        paymentMethod: ord.paymentMethod || "Cash on Delivery",
        paymentStatus: ord.paymentStatus || "Pending (Cash on Delivery)",
        orderStatus: ord.orderStatus || "Pending",
        subtotal: ord.subtotal,
        shippingFee: ord.shippingFee,
        discountAmount: ord.discountAmount || 0,
        couponApplied: ord.couponApplied || null,
        total: ord.total,
        adminNotes: ord.adminNotes || null,
        customer: ord.customer as any,
        trackingHistory: ord.trackingHistory as any,
        items: {
          create: ord.items.map((item) => ({
            productId: item.productId,
            slug: item.slug,
            title: item.title,
            category: item.category,
            variantSku: item.variantSku,
            colorName: item.colorName,
            colorHex: item.colorHex,
            sizeOrCapacity: item.sizeOrCapacity,
            price: item.price,
            originalPrice: item.originalPrice || null,
            quantity: item.quantity,
            image: item.image,
          })),
        },
      },
    });
  }

  // 5. Seed Default Admin User
  console.log("👤 Seeding default Administrator user...");
  const adminEmail = process.env.ADMIN_EMAIL || "admin@bagsglory.com";
  const defaultPassword = process.env.ADMIN_PASSWORD || "Admin@123";
  const hashedPassword = await bcrypt.hash(defaultPassword, 10);

  await prisma.user.upsert({
    where: { email: adminEmail.toLowerCase().trim() },
    update: {
      name: "Atelier Administrator",
      role: "ADMIN",
    },
    create: {
      email: adminEmail.toLowerCase().trim(),
      password: hashedPassword,
      name: "Atelier Administrator",
      role: "ADMIN",
    },
  });

  console.log(`✅ Default admin account ready: ${adminEmail} / ${defaultPassword}`);
  console.log("✅ Neon PostgreSQL database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

