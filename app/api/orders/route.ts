import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Order } from "@/lib/models";
import { verifyToken } from "@/lib/auth";

export async function GET(req: Request) {
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

    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    let query: any = {};

    if (decoded.role === "admin") {
      if (email) {
        query.customerEmail = String(email);
      }
    } else {
      query.customerEmail = decoded.email;
    }

    const orders = await Order.find(query).sort({ date: -1 });
    return NextResponse.json(orders);
  } catch (e: any) {
    console.error("Failed to fetch orders:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
