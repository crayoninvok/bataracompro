// File: src/app/api/contact/route.ts (Next.js 13+ with App Router)
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ message: "Missing fields" }, { status: 400 });
  }
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: process.env.EMAIL_SECURE === "true",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  try {
    await transporter.sendMail({
      from: `"Customer Support" <${process.env.EMAIL_USER}>`,
      to: "sneakybastird@gmail.com",
      subject: "New Contact Form Submission - PT Batara Dharma Persada",
      html: `
           <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; padding: 0; color: #333333;">
      <!-- Header with Logo -->
      <div style="background-color: #1a1a1a; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
        <img src="cid:company-logo" alt="PT Batara Dharma Persada" style="max-width: 200px; height: auto;" />
      </div>
      
      <!-- Main Content -->
      <div style="background-color: #ffffff; padding: 30px; border-left: 1px solid #e0e0e0; border-right: 1px solid #e0e0e0;">
        <h2 style="color: #E85C23; margin-top: 0; font-size: 24px; font-weight: 600;">New Message Received</h2>
        <p style="color: #666666; margin-bottom: 25px; font-size: 16px;">You have received a new message from your website contact form.</p>
        
        <div style="margin-bottom: 25px; padding: 20px; background-color: #f9f9f9; border-radius: 6px; border-left: 4px solid #1FBFB8;">
          <p style="margin: 0 0 15px 0;"><span style="display: block; font-weight: 600; color: #555555; margin-bottom: 5px;">From:</span> ${name}</p>
          <p style="margin: 0 0 15px 0;"><span style="display: block; font-weight: 600; color: #555555; margin-bottom: 5px;">Email:</span> <a href="mailto:${email}" style="color: #1FBFB8; text-decoration: none;">${email}</a></p>
          <p style="margin: 0;"><span style="display: block; font-weight: 600; color: #555555; margin-bottom: 5px;">Message:</span></p>
          <div style="background-color: #ffffff; padding: 15px; border-radius: 4px; border: 1px solid #e0e0e0; margin-top: 10px; line-height: 1.6;">
            ${message.replace(/\n/g, "<br/>")}
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 30px;">
          <a href="mailto:${email}" style="display: inline-block; background-color: #E85C23; color: #ffffff; text-decoration: none; padding: 12px 25px; border-radius: 4px; font-weight: 500;">Reply to Sender</a>
        </div>
      </div>
      
      <!-- Footer -->
      <div style="background-color: #f5f5f5; padding: 20px; text-align: center; color: #777777; font-size: 14px; border-radius: 0 0 8px 8px; border: 1px solid #e0e0e0; border-top: none;">
        <p style="margin-top: 0; margin-bottom: 10px;">© ${new Date().getFullYear()} PT Batara Dharma Persada. All rights reserved.</p>
        <p style="margin: 0;">This is an automated email from your website contact form.</p>
      </div>
    </div>
          `,
      attachments: [
        {
          filename: "btr.png",
          path: "public/btr.png",
          cid: "company-logo", // Referenced in the HTML with cid:company-logo
        },
      ],
    });
    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json(
      { message: "Failed to send email" },
      { status: 500 }
    );
  }
}
