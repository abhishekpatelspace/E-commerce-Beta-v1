import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Order } from "@/lib/models";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_mock_stripe_key");

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");
  let event: any;
  const isMock = process.env.STRIPE_SECRET_KEY && process.env.STRIPE_SECRET_KEY.includes('mock');

  try {
    const rawBody = await req.text();
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "whsec_mock_stripe_webhook";
    
    if (isMock) {
      console.log('Webhook signature verification skipped in Mock mode. Parsing body directly.');
      try {
        event = JSON.parse(rawBody);
      } catch (jsonErr: any) {
        return new NextResponse(`Webhook Mock Error (Invalid JSON body): ${jsonErr.message}`, { status: 400 });
      }
    } else {
      if (!sig) {
        return new NextResponse("Stripe signature missing", { status: 400 });
      }
      event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
    }
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return new NextResponse(`Webhook Verification Error: ${err.message}`, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    await connectDB();
    const session = event.data.object;
    const orderId = session.metadata.orderId;

    console.log(`Stripe webhook: Checkout completed for session ${session.id}. Order: ${orderId}`);

    try {
      const order = await Order.findOneAndUpdate(
        { orderId: orderId },
        { status: 'Paid', processedAt: new Date() },
        { new: true }
      );

      if (order) {
        console.log(`Order ${orderId} status updated to Paid.`);

        const pythonUrl = process.env.PYTHON_ENGINE_URL || "http://localhost:5001";
        try {
          const response = await fetch(`${pythonUrl}/order-paid`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              orderId: order.orderId,
              items: order.items,
              total: order.total,
              discount: order.discount,
              shippingCost: order.shippingCost,
              tax: order.tax,
              shippingAddress: order.shippingAddress,
              date: order.date
            })
          });
          console.log(`Successfully forwarded data to Python Engine. Status: ${response.status}`);
        } catch (pyError: any) {
          console.error(`Error forwarding order to Python Calculations Engine: ${pyError.message}`);
        }
      } else {
        console.error(`Order ${orderId} was not found in MongoDB database.`);
      }
    } catch (dbError: any) {
      console.error(`Database error while processing paid order: ${dbError.message}`);
    }
  }

  return NextResponse.json({ received: true });
}
