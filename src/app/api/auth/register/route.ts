import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const {
      companyName,
      contactName,
      email,
      phone,
      website,
      businessType,
      country,
      annualRevenue,
      yearsInBusiness,
      businessDescription,
      password
    } = await request.json();

    // Validate required fields
    if (!companyName || !contactName || !email || !phone || !businessType || !country || !businessDescription || !password) {
      return NextResponse.json(
        { error: 'All required fields must be filled' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate password strength
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }

    // Check if distributor with this email already exists
    const existingDistributor = await db.distributor.findUnique({
      where: { email }
    });

    if (existingDistributor) {
      return NextResponse.json(
        { error: 'A distributor with this email already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new distributor
    const distributor = await db.distributor.create({
      data: {
        email,
        password: hashedPassword,
        name: contactName,
        company: companyName,
        phone,
        website: website || null,
        businessType,
        country,
        annualRevenue: annualRevenue || null,
        yearsInBusiness: yearsInBusiness || null,
        businessDescription,
        isActive: true,
        isApproved: false // Requires manual approval
      }
    });

    // Remove password from response
    const { password: _, ...distributorWithoutPassword } = distributor;

    return NextResponse.json({
      message: 'Registration successful. Your application is pending approval.',
      distributor: distributorWithoutPassword
    }, { status: 201 });

  } catch (error) {
    console.error('Registration error:', error);

    // Handle Prisma unique constraint errors
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return NextResponse.json(
        { error: 'A distributor with this email already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
