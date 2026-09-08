import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { formatOrder } from "../route";

// GET /api/orders/[id] - Fetch single order for Live Tracking & Details
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const sanitized = id.trim().toUpperCase();

    const order = await prisma.order.findFirst({
      where: {
        id: {
          equals: sanitized,
          mode: "insensitive",
        },
      },
      include: {
        items: true,
      },
    });

    if (!order) {
      return NextResponse.json(
        { error: "Order reference ID not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(formatOrder(order));
  } catch (error) {
    console.error("Error fetching order:", error);
    return NextResponse.json(
      { error: "Failed to fetch order details" },
      { status: 500 }
    );
  }
}

// PATCH /api/orders/[id] - Update Order status, payment status & tracking step (Admin)
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status, paymentStatus, note } = body;

    const existingOrder = await prisma.order.findUnique({
      where: { id },
      include: { items: true },
    });

    if (!existingOrder) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    let updatedTrackingHistory = Array.isArray(existingOrder.trackingHistory)
      ? (existingOrder.trackingHistory as any[])
      : typeof existingOrder.trackingHistory === "string"
      ? JSON.parse(existingOrder.trackingHistory)
      : [];

    if (status) {
      updatedTrackingHistory = updatedTrackingHistory.map((step: any) => {
        const stepMatches = step.status === status;
        return {
          ...step,
          completed: stepMatches || step.completed,
          current: stepMatches,
          timestamp: stepMatches && (step.timestamp === "Pending" || !step.timestamp) ? "Just now" : step.timestamp,
        };
      });
    }

    const updated = await prisma.order.update({
      where: { id },
      data: {
        ...(status && { orderStatus: status }),
        ...(paymentStatus && { paymentStatus }),
        ...(note !== undefined && { adminNotes: note }),
        ...(status && { trackingHistory: updatedTrackingHistory }),
      },
      include: {
        items: true,
      },
    });

    return NextResponse.json(formatOrder(updated));
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json(
      { error: "Failed to update order" },
      { status: 500 }
    );
  }
}
