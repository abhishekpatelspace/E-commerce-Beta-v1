import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/lib/models";
import { generateToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json({ error: "Email and OTP are required." }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User profile not found." }, { status: 400 });
    }

    if (user.otp !== otp || !user.otpExpires || user.otpExpires < new Date()) {
      return NextResponse.json({ error: "Invalid or expired OTP." }, { status: 400 });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

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
    console.error("OTP verification failed:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
