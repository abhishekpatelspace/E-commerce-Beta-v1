import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Product, Order } from "@/lib/models";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_mock_stripe_key");

export async function POST(req: Request) {
  try {
    await connectDB();
    const { cart, discount = 0, shippingForm, customerEmail = "guest@craftore.com" } = await req.json();

    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      return NextResponse.json({ error: "Shopping cart is empty or invalid." }, { status: 400 });
    }
    if (!shippingForm || !shippingForm.name || !shippingForm.address) {
      return NextResponse.json({ error: "Shipping details are missing or invalid." }, { status: 400 });
    }

    const validatedItems = [];
    let cartSubtotal = 0;

    for (const item of cart) {
      const dbProduct = await Product.findOne({ id: item.productId });
      if (!dbProduct) {
        return NextResponse.json({ error: `Product ${item.productName} (ID: ${item.productId}) does not exist in our catalog.` }, { status: 400 });
      }

      const dbVariant = dbProduct.variants.find((v: any) => v.id === item.variantId);
      if (!dbVariant) {
        return NextResponse.json({ error: `Variant ${item.variantName} for product ${item.productName} does not exist.` }, { status: 400 });
      }

      if (dbVariant.price !== item.price) {
        return NextResponse.json({
          error: `Price mismatch for ${item.productName} (${item.variantName}). Client sent: ₹${item.price}, DB lists: ₹${dbVariant.price}`
        }, { status: 400 });
      }

      validatedItems.push({
        productId: item.productId,
        variantId: item.variantId,
        name: `${dbProduct.name} - ${dbVariant.name}`,
        sku: dbVariant.sku,
        price: dbVariant.price,
        quantity: item.quantity,
        image: dbProduct.images[0] || item.image
      });

      cartSubtotal += dbVariant.price * item.quantity;
    }

    if (discount > 0 && discount > Math.round(cartSubtotal * 0.10) + 1) {
      return NextResponse.json({ error: "Invalid discount amount. Retail discounts are capped at 10%." }, { status: 400 });
    }

    const shippingCost = cartSubtotal > 2000 ? 0 : 100;
    const taxRate = 0.08;
    const taxableAmount = cartSubtotal - discount;
    const tax = Math.max(0, taxableAmount * taxRate);
    const finalTotal = Math.max(0, taxableAmount + shippingCost + tax);

    const orderId = `CRO-ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    const order = new Order({
      orderId,
      customerEmail,
      items: validatedItems,
      total: finalTotal,
      status: 'Pending',
      shippingAddress: {
        name: shippingForm.name,
        address: shippingForm.address,
        city: shippingForm.city,
        zip: shippingForm.zip,
        phone: shippingForm.phone
      },
      paymentMethod: shippingForm.payment || 'stripe',
      discount,
      shippingCost,
      tax
    });

    await order.save();

    if (shippingForm.payment === 'cod') {
      return NextResponse.json({ url: null, orderId: orderId, status: 'Pending' });
    }

    const lineItems: any[] = validatedItems.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: item.image ? [item.image] : [],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    if (shippingCost > 0) {
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: `Shipping (${shippingForm.method === 'express' ? 'Express' : 'Standard'})`,
          },
          unit_amount: Math.round(shippingCost * 100),
        },
        quantity: 1,
      });
    }

    if (tax > 0) {
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Sales Tax (8%)',
          },
          unit_amount: Math.round(tax * 100),
        },
        quantity: 1,
      });
    }

    const stripeDiscounts: any[] = [];
    const isMock = process.env.STRIPE_SECRET_KEY && process.env.STRIPE_SECRET_KEY.includes('mock');

    if (discount > 0) {
      if (isMock) {
        stripeDiscounts.push({ coupon: 'mock_coupon_id' });
      } else {
        const coupon = await stripe.coupons.create({
          amount_off: Math.round(discount * 100),
          currency: 'usd',
          duration: 'once'
        });
        stripeDiscounts.push({ coupon: coupon.id });
      }
    }

    const successUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/checkout?status=success&session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/checkout?status=cancel`;

    let session;
    if (isMock) {
      const mockSessionId = `cs_mock_${Math.random().toString(36).substring(2, 15)}`;
      session = {
        id: mockSessionId,
        url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/checkout?status=success&session_id=${mockSessionId}`
      };
      console.log(`Mocking Stripe Session creation: ${session.id}`);
    } else {
      session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        discounts: stripeDiscounts,
        success_url: successUrl,
        cancel_url: cancelUrl,
        metadata: {
          orderId: orderId
        }
      });
    }

    order.stripeSessionId = session.id;
    await order.save();

    return NextResponse.json({ url: session.url, orderId: orderId });
  } catch (error: any) {
    console.error('Checkout session creation failed:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
