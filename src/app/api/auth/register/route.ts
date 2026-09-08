import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hashPassword, getAuthSession } from "@/lib/auth";

// POST /api/auth/register - Register initial admin or add staff
export async function POST(request: Request) {
  try {
    const { email, password, name, role = "ADMIN" } = await request.json();

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check if any users exist in the system
    const userCount = await prisma.user.count();

    // If users already exist, only authenticated ADMIN can create new users
    if (userCount > 0) {
      const session = await getAuthSession();
      if (!session || session.role !== "ADMIN") {
        return NextResponse.json(
          { error: "Unauthorized. Only existing Administrators can create new accounts." },
          { status: 403 }
        );
      }
    }

    const existing = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existing) {
      return NextResponse.json(
        { error: "A user with this email already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        email: normalizedEmail,
        password: hashedPassword,
        name,
        role: role.toUpperCase(),
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Admin account registered successfully",
        user,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Failed to register user" },
      { status: 500 }
    );
  }
}
