import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/lib/models";
import { sendVerificationEmail } from "@/lib/mail";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "Email address not registered. Please sign up." }, { status: 400 });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    console.log(`[AUTH SEND-OTP] Generated login OTP for ${email}: ${otp}`);

    await sendVerificationEmail(email, otp);

    return NextResponse.json({
      message: "OTP sent successfully.",
      email
    });
  } catch (e: any) {
    console.error("Failed to send OTP:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
