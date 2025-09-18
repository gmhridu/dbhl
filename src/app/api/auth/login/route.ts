import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "@/lib/db";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 },
      );
    }

    // Find distributor by email
    const distributor = await db.distributor.findUnique({
      where: { email },
    });

    if (!distributor) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }

    // Check if distributor is active
    if (!distributor.isActive) {
      return NextResponse.json(
        { error: "Account is deactivated" },
        { status: 403 },
      );
    }

    // Check if distributor is approved
    if (!distributor.isApproved) {
      return NextResponse.json(
        {
          error: "Account is pending approval. Please wait for admin approval.",
        },
        { status: 403 },
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(
      password,
      distributor.password,
    );

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }

    // Update last login time
    await db.distributor.update({
      where: { id: distributor.id },
      data: { lastLoginAt: new Date() },
    });

    // Create JWT token
    const token = jwt.sign(
      {
        id: distributor.id,
        email: distributor.email,
        name: distributor.name,
        company: distributor.company,
      },
      JWT_SECRET,
      { expiresIn: "7d" },
    );

    // Create response with token in cookie
    const response = NextResponse.json({
      message: "Login successful",
      user: {
        id: distributor.id,
        email: distributor.email,
        name: distributor.name,
        company: distributor.company,
      },
    });

    // Set HTTP-only cookie with token
    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
