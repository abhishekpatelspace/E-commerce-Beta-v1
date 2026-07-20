import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/lib/models";
import { hashPassword } from "@/lib/auth";
import { sendVerificationEmail, sendWelcomeCredentialsEmail } from "@/lib/mail";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { name, email, password, gender, dob, nationality } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "Email is already registered." }, { status: 400 });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    const hashedPassword = hashPassword(password);
    await User.create({
      name,
      email,
      password: hashedPassword,
      role: "customer",
      isVerified: false,
      otp,
      otpExpires,
      gender,
      dob,
      nationality
    });

    console.log(`[AUTH REGISTER] Generated OTP for customer email ${email}: ${otp}`);

    await sendVerificationEmail(email, otp);
    await sendWelcomeCredentialsEmail(email, name, password);

    return NextResponse.json({
      message: "Registration successful. Please verify the OTP sent to your email.",
      email
    });
  } catch (e: any) {
    console.error("Registration failed:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
