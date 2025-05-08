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
        subject: "You Have a New Message",
        html: `
            <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 8px; background-color: #f9f9f9;">
              <div style="text-align: center; margin-bottom: 20px;">
                <img src="cid:company-logo" alt="Batara Mining Logo" style="max-width: 180px; height: auto;" />
              </div>
              <h2 style="text-align: center; color: #2c3e50;">📬 Pesan Baru dari Form Kontak</h2>
              <hr style="margin: 20px 0; border: none; border-top: 1px solid #ccc;" />
              <p><strong>👤 Nama Pengirim:</strong><br/> ${name}</p>
              <p><strong>📧 Email Pengirim:</strong><br/> ${email}</p>
              <p><strong>📝 Pesan:</strong><br/>
                <div style="margin-top: 8px; padding: 10px; background-color: #fff; border: 1px solid #ddd; border-radius: 6px;">
                  ${message.replace(/\n/g, "<br/>")}
                </div>
              </p>
              <hr style="margin: 20px 0; border: none; border-top: 1px solid #ccc;" />
              <p style="font-size: 0.9em; color: #888;">Email ini dikirim otomatis dari formulir website Anda.</p>
            </div>
          `,
        attachments: [
          {
            filename: 'btr.png',
            path: 'public/btr.png',
            cid: 'company-logo' // Referenced in the HTML with cid:company-logo
          }
        ]
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
