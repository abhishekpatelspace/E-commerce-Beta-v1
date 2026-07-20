import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Order } from "@/lib/models";
import { verifyToken } from "@/lib/auth";

export async function POST(req: Request, { params }: { params: Promise<{ orderId: string }> }) {
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

    const { orderId } = await params;
    const order = await Order.findOne({ orderId: String(orderId) });
    if (!order) {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }

    if (decoded.role !== "admin" && order.customerEmail !== decoded.email) {
      return NextResponse.json({ error: "Unauthorized to cancel this order." }, { status: 403 });
    }

    if (order.status !== "Pending" && order.status !== "Paid" && order.status !== "Processing") {
      return NextResponse.json({ error: `Cannot cancel an order with status "${order.status}".` }, { status: 400 });
    }

    order.status = "Cancelled";
    order.cancelledAt = new Date();
    await order.save();

    console.log(`Order ${orderId} has been successfully cancelled by ${decoded.email}.`);
    return NextResponse.json({ message: "Order cancelled successfully.", order });
  } catch (e: any) {
    console.error("Failed to cancel order:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
