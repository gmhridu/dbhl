import { NextRequest, NextResponse } from "next/server";
import { generateCaptcha, generateCaptchaHash } from "@/lib/captcha";

export async function GET(request: NextRequest) {
  try {
    const captcha = generateCaptcha();
    const timestamp = Date.now();
    const hash = generateCaptchaHash(captcha.answer, timestamp);

    return NextResponse.json({
      question: captcha.question,
      options: captcha.options,
      timestamp,
      hash,
      // Don't send the answer to the client!
    });
  } catch (error) {
    console.error("Error generating captcha:", error);
    return NextResponse.json(
      { error: "Failed to generate captcha" },
      { status: 500 }
    );
  }
}
