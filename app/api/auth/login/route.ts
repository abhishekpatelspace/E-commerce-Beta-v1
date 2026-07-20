import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/lib/models";
import { verifyPassword, generateToken } from "@/lib/auth";
import { sendVerificationEmail } from "@/lib/mail";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user || !verifyPassword(password, user.password)) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 400 });
    }

    if (!user.isVerified) {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      user.otp = otp;
      user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
      await user.save();

      console.log(`[AUTH LOGIN] User not verified. Sent new OTP for ${email}: ${otp}`);

      await sendVerificationEmail(email, otp);

      return NextResponse.json({
        requiresVerification: true,
        email: user.email
      }, { status: 202 });
    }

    const token = generateToken({ id: user._id, email: user.email, role: user.role });

    return NextResponse.json({
      name: user.name,
      email: user.email,
      role: user.role,
      token,
      gender: user.gender,
      dob: user.dob,
      nationality: user.nationality
    });
  } catch (e: any) {
    console.error("Login authentication failed:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
