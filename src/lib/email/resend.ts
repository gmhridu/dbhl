import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  department: string;
  subject: string;
  message: string;
}

function generateContactEmailHTML(formData: ContactFormData): string {
  const submittedAt = new Date().toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: Arial, sans-serif;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">

        <!-- Header -->
        <div style="background-color: #1a1a1a; padding: 40px 30px; text-align: center; border-radius: 8px 8px 0 0;">
          <div style="font-size: 48px; font-weight: bold; color: #ffffff; margin-bottom: 10px; font-family: Georgia, serif;">
            D
          </div>
          <div style="font-size: 18px; color: #ffffff; letter-spacing: 2px; text-transform: uppercase;">
            DBHL Enterprises
          </div>
        </div>

        <!-- Content -->
        <div style="padding: 30px; background-color: #ffffff;">
          <h2 style="color: #1a1a1a; font-size: 24px; margin-bottom: 20px; border-bottom: 3px solid #3b82f6; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>

          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #e2e8f0;">
            <h3 style="color: #1e40af; font-size: 16px; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 1px;">
              Contact Information
            </h3>

            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; width: 120px; color: #475569;">
                  Name:
                </td>
                <td style="padding: 8px 0; color: #1a1a1a;">${formData.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #475569;">
                  Email:
                </td>
                <td style="padding: 8px 0;">
                  <a href="mailto:${formData.email}" style="color: #3b82f6; text-decoration: none;">
                    ${formData.email}
                  </a>
                </td>
              </tr>
              ${
                formData.phone
                  ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #475569;">
                  Phone:
                </td>
                <td style="padding: 8px 0; color: #1a1a1a;">${formData.phone}</td>
              </tr>
              `
                  : ""
              }
              ${
                formData.company
                  ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #475569;">
                  Company:
                </td>
                <td style="padding: 8px 0; color: #1a1a1a;">${formData.company}</td>
              </tr>
              `
                  : ""
              }
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #475569;">
                  Department:
                </td>
                <td style="padding: 8px 0;">
                  <span style="background-color: #3b82f6; color: #ffffff; padding: 4px 12px; border-radius: 20px; font-size: 12px; text-transform: capitalize;">
                    ${formData.department}
                  </span>
                </td>
              </tr>
            </table>
          </div>

          <!-- Subject -->
          <div style="background-color: #fefefe; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #3b82f6;">
            <h3 style="color: #1e40af; font-size: 16px; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 1px;">
              Subject
            </h3>
            <p style="margin: 0; font-size: 18px; font-weight: 600; color: #1a1a1a;">
              ${formData.subject}
            </p>
          </div>

          <!-- Message -->
          <div style="background-color: #fefefe; padding: 20px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #e2e8f0;">
            <h3 style="color: #1e40af; font-size: 16px; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 1px;">
              Message
            </h3>
            <div style="white-space: pre-wrap; font-size: 15px; line-height: 1.7; color: #374151;">
              ${formData.message}
            </div>
          </div>

          <!-- Timestamp -->
          <div style="text-align: center; padding: 15px; background-color: #f1f5f9; border-radius: 8px; margin-bottom: 20px;">
            <p style="margin: 0; font-size: 14px; color: #64748b;">
              Submitted on ${submittedAt}
            </p>
          </div>

          <!-- Call to Action -->
          <div style="text-align: center; margin-top: 30px;">
            <a href="mailto:${formData.email}?subject=Re: ${encodeURIComponent(formData.subject)}" style="display: inline-block; background-color: #3b82f6; color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px; text-transform: uppercase; letter-spacing: 1px;">
              Reply to ${formData.name}
            </a>
          </div>
        </div>

        <!-- Footer -->
        <div style="background-color: #1a1a1a; padding: 25px 30px; text-align: center; border-radius: 0 0 8px 8px;">
          <p style="margin: 0 0 10px 0; font-size: 14px; color: #9ca3af;">
            This message was sent from the DBHL Enterprises contact form
          </p>
          <p style="margin: 0; font-size: 12px; color: #6b7280;">
            © ${new Date().getFullYear()} DBHL Enterprises. All rights reserved.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function generateConfirmationEmailHTML(formData: ContactFormData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank you for contacting DBHL Enterprises</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: Arial, sans-serif;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">

        <!-- Header -->
        <div style="background-color: #1a1a1a; padding: 40px 30px; text-align: center; border-radius: 8px 8px 0 0;">
          <div style="font-size: 48px; font-weight: bold; color: #ffffff; margin-bottom: 10px; font-family: Georgia, serif;">
            D
          </div>
          <div style="font-size: 18px; color: #ffffff; letter-spacing: 2px; text-transform: uppercase;">
            DBHL Enterprises
          </div>
        </div>

        <!-- Content -->
        <div style="padding: 30px; background-color: #ffffff;">
          <h2 style="color: #1a1a1a; font-size: 24px; margin-bottom: 20px; border-bottom: 3px solid #3b82f6; padding-bottom: 10px;">
            Thank You for Your Message
          </h2>

          <p style="font-size: 16px; line-height: 1.6; color: #374151; margin-bottom: 20px;">
            Dear ${formData.name},
          </p>

          <p style="font-size: 16px; line-height: 1.6; color: #374151; margin-bottom: 20px;">
            Thank you for reaching out to DBHL Enterprises. We have received your message regarding "<strong>${formData.subject}</strong>" and appreciate your interest in our services.
          </p>

          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
            <h3 style="color: #1e40af; font-size: 16px; margin-bottom: 10px;">What happens next?</h3>
            <ul style="color: #374151; line-height: 1.6; margin: 0; padding-left: 20px;">
              <li>Our team will review your message within 24 hours</li>
              <li>A specialist from our ${formData.department} department will respond to you</li>
              <li>We'll provide you with detailed information and next steps</li>
            </ul>
          </div>

          <p style="font-size: 16px; line-height: 1.6; color: #374151; margin-bottom: 20px;">
            If you have any urgent questions, please don't hesitate to call us directly or send an additional message.
          </p>

          <div style="text-align: center; margin: 30px 0;">
            <p style="font-size: 16px; font-weight: bold; color: #1a1a1a; margin-bottom: 10px;">
              Need immediate assistance?
            </p>
            <p style="font-size: 14px; color: #64748b;">
              Email: info@dbhl-enterprises.com
            </p>
          </div>

          <!-- Message Summary -->
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #e2e8f0;">
            <h3 style="color: #1e40af; font-size: 16px; margin-bottom: 10px;">Your Message Summary:</h3>
            <p style="margin: 5px 0; color: #374151;"><strong>Subject:</strong> ${formData.subject}</p>
            <p style="margin: 5px 0; color: #374151;"><strong>Department:</strong> ${formData.department}</p>
            ${formData.company ? `<p style="margin: 5px 0; color: #374151;"><strong>Company:</strong> ${formData.company}</p>` : ""}
          </div>
        </div>

        <!-- Footer -->
        <div style="background-color: #1a1a1a; padding: 25px 30px; text-align: center; border-radius: 0 0 8px 8px;">
          <p style="margin: 0 0 10px 0; font-size: 14px; color: #9ca3af;">
            DBHL Enterprises - Your trusted partner in networking solutions
          </p>
          <p style="margin: 0; font-size: 12px; color: #6b7280;">
            © ${new Date().getFullYear()} DBHL Enterprises. All rights reserved.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export async function sendContactEmail(formData: ContactFormData) {
  try {
    const emailHtml = generateContactEmailHTML(formData);

    const { data, error } = await resend.emails.send({
      from: "DBHL Contact Form <noreply@dbhl-enterprises.com>",
      to: ["Dlevy@dbhl-enterprises.com"],
      subject: `New Contact Form Submission: ${formData.subject}`,
      html: emailHtml,
      replyTo: formData.email,
    });

    if (error) {
      console.error("Error sending email:", error);
      throw new Error("Failed to send email");
    }

    return { success: true, messageId: data?.id };
  } catch (error) {
    console.error("Email service error:", error);
    throw error;
  }
}

// Send confirmation email to the person who submitted the form
export async function sendConfirmationEmail(formData: ContactFormData) {
  try {
    const emailHtml = generateConfirmationEmailHTML(formData);

    const { data, error } = await resend.emails.send({
      from: "DBHL Enterprises <noreply@dbhl-enterprises.com>",
      to: [formData.email],
      subject: "Thank you for contacting DBHL Enterprises",
      html: emailHtml,
    });

    if (error) {
      console.error("Error sending confirmation email:", error);
      throw new Error("Failed to send confirmation email");
    }

    return { success: true, messageId: data?.id };
  } catch (error) {
    console.error("Confirmation email service error:", error);
    throw error;
  }
}
