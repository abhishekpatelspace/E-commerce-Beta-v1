import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Order } from "@/lib/models";
import { verifyToken } from "@/lib/auth";

export async function PUT(req: Request, { params }: { params: Promise<{ orderId: string }> }) {
  try {
    await connectDB();
    const authHeader = req.headers.get("authorization");
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return NextResponse.json({ error: "Access token is required." }, { status: 401 });
    }

    const decoded = await verifyToken(token);
    if (!decoded || decoded.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized. Admin access only." }, { status: 403 });
    }

    const { orderId } = await params;
    const { status, adminRemarks } = await req.json();

    const validStatuses = ['Pending', 'Paid', 'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Failed'];
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json({ error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` }, { status: 400 });
    }

    const order = await Order.findOne({ orderId: String(orderId) });
    if (!order) {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }

    order.status = status;

    if (status === 'Paid' || status === 'Processing') {
      order.processedAt = order.processedAt || new Date();
    }
    if (status === 'Cancelled') {
      order.cancelledAt = new Date();
    }

    if (adminRemarks !== undefined) {
      order.adminRemarks = adminRemarks;
    }

    await order.save();

    console.log(`[ADMIN] Order ${orderId} status updated to "${status}"${adminRemarks ? ` with remarks: "${adminRemarks}"` : ''}`);
    return NextResponse.json({ message: `Order status updated to ${status}.`, order });
  } catch (e: any) {
    console.error("Admin status update failed:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
