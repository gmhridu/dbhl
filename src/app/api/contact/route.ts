import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import ZAI from 'z-ai-web-dev-sdk';

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, company, subject, message, department } = await request.json();

    // Validate required fields
    if (!name || !email || !subject || !message || !department) {
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

    // Save contact form submission to database
    const contact = await db.contact.create({
      data: {
        name,
        email,
        phone: phone || null,
        company: company || null,
        subject,
        message,
        department
      }
    });

    // Send email notification (using Z-AI SDK for demonstration)
    try {
      const zai = await ZAI.create();
      
      // In a real implementation, you would use an email service like SendGrid, Mailgun, etc.
      // For now, we'll just log the email content
      console.log('Email notification would be sent here:', {
        to: 'info@dbhl-enterprises.com',
        subject: `New Contact Form Submission: ${subject}`,
        body: `
          New contact form submission from ${name}
          
          Name: ${name}
          Email: ${email}
          Phone: ${phone || 'Not provided'}
          Company: ${company || 'Not provided'}
          Department: ${department}
          Subject: ${subject}
          
          Message:
          ${message}
          
          Submitted at: ${new Date().toISOString()}
        `
      });

      // You could also use the Z-AI SDK to generate a response or categorize the inquiry
      const categorization = await zai.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that categorizes customer inquiries. Please categorize the following message into one of: sales, support, billing, general, partnership.'
          },
          {
            role: 'user',
            content: `Subject: ${subject}\n\nMessage: ${message}`
          }
        ],
        max_tokens: 10
      });

      console.log('AI categorization:', categorization.choices[0]?.message?.content);

    } catch (emailError) {
      console.error('Email sending error:', emailError);
      // Don't fail the request if email sending fails, just log it
    }

    return NextResponse.json({
      message: 'Contact form submitted successfully',
      contact: {
        id: contact.id,
        name: contact.name,
        email: contact.email,
        subject: contact.subject,
        createdAt: contact.createdAt
      }
    });

  } catch (error) {
    console.error('Contact form submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // This would be protected by authentication in a real app
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;

    const [contacts, total] = await Promise.all([
      db.contact.findMany({
        orderBy: { createdAt: 'desc' },
        skip: offset,
        take: limit
      }),
      db.contact.count()
    ]);

    return NextResponse.json({
      contacts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}