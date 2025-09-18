import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendContactEmail, sendConfirmationEmail } from "@/lib/email/resend";
import { verifyCaptchaHash } from "@/lib/captcha";

export async function POST(request: NextRequest) {
  try {
    const {
      name,
      email,
      phone,
      company,
      department,
      subject,
      message,
      captchaAnswer,
      captchaTimestamp,
      captchaHash,
    } = await request.json();

    // Validate required fields
    if (!name || !email || !department || !subject || !message) {
      return NextResponse.json(
        { error: "All required fields must be filled" },
        { status: 400 },
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 },
      );
    }

    // Validate message length
    if (message.length < 10) {
      return NextResponse.json(
        { error: "Message must be at least 10 characters long" },
        { status: 400 },
      );
    }

    // Validate CAPTCHA
    if (!captchaAnswer || !captchaTimestamp || !captchaHash) {
      return NextResponse.json(
        { error: "Please complete the CAPTCHA verification" },
        { status: 400 },
      );
    }

    // Verify CAPTCHA hash
    if (
      !verifyCaptchaHash(
        parseInt(captchaAnswer),
        parseInt(captchaTimestamp),
        captchaHash,
      )
    ) {
      return NextResponse.json(
        { error: "Invalid CAPTCHA verification. Please try again." },
        { status: 400 },
      );
    }

    // Save contact form submission to database
    const contact = await db.contact.create({
      data: {
        name,
        email,
        phone: phone || null,
        company: company || null,
        subject,
        message,
      },
    });

    // Send email notifications
    try {
      const emailData = {
        name,
        email,
        phone,
        company,
        department,
        subject,
        message,
      };

      // Send notification email to DBHL
      await sendContactEmail(emailData);

      // Send confirmation email to customer
      await sendConfirmationEmail(emailData);

      console.log("Email notifications sent successfully");
    } catch (emailError) {
      console.error("Email sending error:", emailError);
      // Don't fail the request if email sending fails, just log it
      // The form submission is still saved in the database
    }

    return NextResponse.json({
      message: "Contact form submitted successfully",
      contact: {
        id: contact.id,
        name: contact.name,
        email: contact.email,
        subject: contact.subject,
        createdAt: contact.createdAt,
      },
    });
  } catch (error) {
    console.error("Contact form submission error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // This would be protected by authentication in a real app
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const department = searchParams.get("department") || "";
    const isRead = searchParams.get("isRead");
    const offset = (page - 1) * limit;

    // Build where clause
    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { subject: { contains: search, mode: "insensitive" } },
        { company: { contains: search, mode: "insensitive" } },
      ];
    }

    if (department) {
      where.subject = { contains: department, mode: "insensitive" };
    }

    if (isRead !== null) {
      where.isRead = isRead === "true";
    }

    const [contacts, total] = await Promise.all([
      db.contact.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: offset,
        take: limit,
      }),
      db.contact.count({ where }),
    ]);

    return NextResponse.json({
      contacts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
