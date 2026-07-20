import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/lib/models";
import { verifyToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    await connectDB();
    const authHeader = req.headers.get("authorization");
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return NextResponse.json({ error: "Access token is required." }, { status: 401 });
    }

    const decoded = await verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: "Invalid or expired token." }, { status: 403 });
    }

    const { name, gender, dob, nationality } = await req.json();
    const email = decoded.email;

    if (!email) {
      return NextResponse.json({ error: "Email is missing from verified credentials token." }, { status: 400 });
    }

    let user = await User.findOne({ email: String(email) });
    if (!user) {
      user = await User.create({
        name: name || email.split("@")[0],
        email: email,
        password: "firebase_authenticated_external_account",
        role: email === "abhishekpatelspace@gmail.com" ? "admin" : "customer",
        isVerified: true,
        gender,
        dob,
        nationality
      });
      console.log(`[PROFILE SYNC] Saved new Firebase user profile for email: ${email}`);
    } else {
      if (name) user.name = name;
      if (gender) user.gender = gender;
      if (dob) user.dob = dob;
      if (nationality) user.nationality = nationality;
      user.isVerified = true;
      await user.save();
      console.log(`[PROFILE SYNC] Updated user profile for email: ${email}`);
    }

    return NextResponse.json({ message: "Profile successfully synchronized.", user });
  } catch (e: any) {
    console.error("Failed to sync profile:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
