import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export function formatOrder(o: any) {
  return {
    id: o.id,
    createdAt: o.createdAt instanceof Date ? o.createdAt.toISOString() : String(o.createdAt),
    customer: typeof o.customer === "string" ? JSON.parse(o.customer) : o.customer,
    items: (o.items || []).map((i: any) => ({
      id: `${i.productId}-${i.variantSku}`,
      productId: i.productId,
      slug: i.slug,
      title: i.title,
      category: i.category,
      variantSku: i.variantSku,
      colorName: i.colorName,
      colorHex: i.colorHex,
      sizeOrCapacity: i.sizeOrCapacity,
      price: i.price,
      originalPrice: i.originalPrice || undefined,
      quantity: i.quantity,
      image: i.image,
      stock: 99,
    })),
    paymentMethod: o.paymentMethod || "Cash on Delivery",
    paymentStatus: o.paymentStatus || "Pending (Cash on Delivery)",
    orderStatus: o.orderStatus || "Pending",
    subtotal: o.subtotal,
    shippingFee: o.shippingFee,
    discountAmount: o.discountAmount,
    couponApplied: o.couponApplied || undefined,
    total: o.total,
    trackingHistory: typeof o.trackingHistory === "string" ? JSON.parse(o.trackingHistory) : o.trackingHistory,
    adminNotes: o.adminNotes || undefined,
  };
}

// GET /api/orders - List all orders (Admin)
export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        items: true,
      },
    });

    return NextResponse.json(orders.map(formatOrder));
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

// POST /api/orders - Create a new order with atomic stock deduction
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      customer,
      items,
      paymentMethod = "Cash on Delivery",
      subtotal,
      shippingFee = 0,
      discountAmount = 0,
      couponApplied,
      total,
    } = body;

    if (!customer || !items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Order must contain customer delivery details and at least one item." },
        { status: 400 }
      );
    }

    const now = new Date();
    const orderId = `BG-${now.getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const initialTracking = [
      {
        status: "Pending",
        label: "Order Placed (Cash on Delivery)",
        description: "Your order has been recorded. Our team will verify and prepare your bag for dispatch.",
        timestamp: "Just now",
        completed: true,
        current: true,
      },
      {
        status: "Processing",
        label: "Quality Inspection & Packaging",
        description: "Your bag is being polished, packed in dust bag with authenticity card.",
        timestamp: "Estimated next 2-4 hours",
        completed: false,
        current: false,
      },
      {
        status: "Shipped",
        label: "Dispatched to Courier",
        description: "Handed over to our courier partner for door delivery.",
        timestamp: "Pending",
        completed: false,
        current: false,
      },
      {
        status: "Out for Delivery",
        label: "Out for Delivery",
        description: "Courier rider is on the way. Please keep cash ready.",
        timestamp: "Pending",
        completed: false,
        current: false,
      },
      {
        status: "Delivered",
        label: "Delivered & Paid",
        description: "Bag received and cash collected upon delivery.",
        timestamp: "Pending",
        completed: false,
        current: false,
      },
    ];

    // Execute in transaction
    const result = await prisma.$transaction(async (tx) => {
      // 1. Create Order
      const newOrder = await tx.order.create({
        data: {
          id: orderId,
          createdAt: now,
          paymentMethod,
          paymentStatus: "Pending (Cash on Delivery)",
          orderStatus: "Pending",
          subtotal: parseFloat(String(subtotal)),
          shippingFee: parseFloat(String(shippingFee)),
          discountAmount: parseFloat(String(discountAmount)),
          couponApplied: couponApplied || null,
          total: parseFloat(String(total)),
          customer: customer,
          trackingHistory: initialTracking,
          items: {
            create: items.map((item: any) => ({
              productId: item.productId,
              slug: item.slug,
              title: item.title,
              category: item.category || "Collection",
              variantSku: item.variantSku,
              colorName: item.colorName,
              colorHex: item.colorHex,
              sizeOrCapacity: item.sizeOrCapacity,
              price: parseFloat(String(item.price)),
              originalPrice: item.originalPrice ? parseFloat(String(item.originalPrice)) : null,
              quantity: parseInt(String(item.quantity), 10),
              image: item.image,
            })),
          },
        },
        include: {
          items: true,
        },
      });

      // 2. Decrement variant inventory
      for (const item of items) {
        if (item.variantSku) {
          await tx.productVariant.updateMany({
            where: { sku: item.variantSku },
            data: {
              stock: {
                decrement: parseInt(String(item.quantity), 10),
              },
            },
          });
        }
      }

      // 3. Update coupon usage count if applicable
      if (couponApplied) {
        await tx.coupon.updateMany({
          where: { code: couponApplied.toUpperCase().trim() },
          data: {
            usageCount: {
              increment: 1,
            },
          },
        });
      }

      return newOrder;
    });

    return NextResponse.json(formatOrder(result), { status: 201 });
  } catch (error: any) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create order" },
      { status: 500 }
    );
  }
}
