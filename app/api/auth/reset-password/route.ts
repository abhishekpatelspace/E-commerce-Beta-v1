import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/lib/models";
import { hashPassword } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email, otp, newPassword } = await req.json();

    if (!email || !otp || !newPassword) {
      return NextResponse.json({ error: "Email, OTP and new password are required." }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User profile not found." }, { status: 400 });
    }

    if (user.otp !== otp || !user.otpExpires || user.otpExpires < new Date()) {
      return NextResponse.json({ error: "Invalid or expired OTP." }, { status: 400 });
    }

    user.password = hashPassword(newPassword);
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    console.log(`[AUTH RESET-PASSWORD] Password updated for email: ${email}`);

    return NextResponse.json({ message: "Password updated successfully." });
  } catch (e: any) {
    console.error("Password reset failed:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
