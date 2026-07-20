"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/useCart";
import { CreditCard, Truck, CheckCircle2, ChevronRight, Lock, Loader2, Sparkles } from "lucide-react";

interface OrderDetail {
  orderId: string;
  date: string;
  itemsCount: number;
  total: number;
  status: string;
  shippingAddress: string;
}

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const router = useRouter();

  // Form states
  const [shippingForm, setShippingForm] = useState({
    name: "",
    address: "",
    city: "",
    zip: "",
    phone: "",
    method: "standard",
    payment: "stripe",
  });

  const setForm = (state: typeof shippingForm) => setShippingForm(state);

  // Stripe card state
  const [card, setCard] = useState({ number: "", expiry: "", cvc: "" });

  // checkout states
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<string | null>(null);

  const shippingCost = cartTotal > 2000 ? 0 : 100;
  const tax = (cartTotal - discount) * 0.08;
  const total = cartTotal - discount + shippingCost + tax;

  // Prevent infinite loop on Stripe success redirect check
  const stripeProcessedRef = useRef(false);

  // 1. Load discount from localStorage on mount
  useEffect(() => {
    const savedDiscount = localStorage.getItem("craftore_discount");
    if (savedDiscount) {
      setDiscount(Number(savedDiscount));
    }
  }, []);

  // 2. Capture success redirect from Stripe Webhook payment redirect
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const status = params.get("status");
    const sessionId = params.get("session_id");

    if (status === "success" && sessionId && !stripeProcessedRef.current) {
      stripeProcessedRef.current = true;
      setLoading(true);
      
      const generatedId = `CRO-ORD-${Math.floor(100000 + Math.random() * 900000)}`;
      
      // Save order details to localstorage orders list
      const newOrder: OrderDetail = {
        orderId: generatedId,
        date: new Date().toISOString().split("T")[0],
        itemsCount: cart.length ? cart.reduce((acc, item) => acc + item.quantity, 0) : 1,
        total: total || cartTotal || 0,
        status: "Paid",
        shippingAddress: shippingForm.address ? `${shippingForm.address}, ${shippingForm.city}` : "Verified billing details",
      };

      const existingOrders = localStorage.getItem("craftore_orders");
      let ordersList = [];
      if (existingOrders) {
        try {
          ordersList = JSON.parse(existingOrders);
        } catch (e) {}
      }
      localStorage.setItem("craftore_orders", JSON.stringify([newOrder, ...ordersList]));

      // Clear states & cart
      clearCart();
      localStorage.removeItem("craftore_discount");
      localStorage.removeItem("craftore_coupon");
      
      setCompletedOrder(generatedId);
      setLoading(false);

      // Clean the query parameters so refresh does not duplicate
      router.replace("/checkout");
    }
  }, [router, cart, total, cartTotal, shippingForm.address, shippingForm.city, clearCart]);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingForm.name || !shippingForm.address) return;

    setLoading(true);

    try {
      const backendUrl = (process.env.NEXT_PUBLIC_NODE_BACKEND_URL || "http://localhost:5000").replace(/^['"]|['"]$/g, "");
      const currentUser = localStorage.getItem("craftore_user");
      let customerEmail = "guest@craftore.com";
      if (currentUser) {
        try {
          const parsed = JSON.parse(currentUser);
          if (parsed.email) customerEmail = parsed.email;
        } catch (e) {}
      }

      const response = await fetch(`${backendUrl}/api/checkout/create-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart,
          discount,
          shippingForm,
          customerEmail,
        }),
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error("Invalid response from server:", text);
        throw new Error("Invalid server response (HTML). Please verify that NEXT_PUBLIC_NODE_BACKEND_URL is set to your active backend server in Vercel, not a frontend Vercel domain or placeholder parking page.");
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create checkout session.");
      }

      const data = await response.json();
      
      if (shippingForm.payment === "cod" && data.orderId) {
        // Cash on delivery directly sets the completed order reference!
        // Save order details to localstorage orders list so they show in order history
        const newOrder: OrderDetail = {
          orderId: data.orderId,
          date: new Date().toISOString().split("T")[0],
          itemsCount: cart.reduce((acc, item) => acc + item.quantity, 0),
          total: total || cartTotal || 0,
          status: "Pending",
          shippingAddress: `${shippingForm.address}, ${shippingForm.city}`,
        };

        const existingOrders = localStorage.getItem("craftore_orders");
        let ordersList = [];
        if (existingOrders) {
          try {
            ordersList = JSON.parse(existingOrders);
          } catch (e) {}
        }
        localStorage.setItem("craftore_orders", JSON.stringify([newOrder, ...ordersList]));

        // Clear states & cart
        clearCart();
        localStorage.removeItem("craftore_discount");
        localStorage.removeItem("craftore_coupon");
        
        setCompletedOrder(data.orderId);
        setLoading(false);
      } else if (data.url) {
        // Redirect to Stripe checkout
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned from payment server.");
      }
    } catch (err: any) {
      alert(`Checkout Error: ${err.message}`);
      setLoading(false);
    }
  };

  if (completedOrder) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <div className="flex flex-col items-center justify-center p-8 border border-border/40 bg-background rounded-lg shadow-sm">
          <CheckCircle2 className="h-16 w-16 text-emerald-500 mb-6 animate-pulse" />
          <span className="text-xs uppercase tracking-[0.2em] text-luxury-gold font-semibold mb-2">Order Confirmed</span>
          <h2 className="font-serif text-3xl font-normal mb-3 text-foreground">Thank You for Your Order</h2>
          <p className="text-sm text-muted-foreground leading-relaxed font-light mb-6">
            Your payment was processed securely. We have sent a confirmation details invoice to your email.
          </p>
          
          <div className="w-full bg-muted/30 rounded p-4 border border-border/30 text-xs space-y-2.5 mb-8 text-left">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Order Reference:</span>
              <span className="font-semibold text-foreground">{completedOrder}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Est. Delivery Speed:</span>
              <span className="font-semibold text-foreground">
                {shippingForm.method === "express" ? "2 - 3 Business Days" : "5 - 7 Business Days"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Delivery Location:</span>
              <span className="font-semibold text-foreground line-clamp-1">{shippingForm.address}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <Link
              href="/account"
              className="flex-1 rounded border border-foreground hover:bg-muted/40 font-semibold py-2.5 text-xs transition-colors"
            >
              View Order History
            </Link>
            <Link
              href="/products"
              className="flex-1 rounded bg-foreground text-background hover:bg-foreground/95 font-semibold py-2.5 text-xs transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground py-16 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Info */}
        <h1 className="font-serif text-3xl font-normal tracking-wide text-foreground mb-8">Secure Checkout</h1>

        {cart.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-border/40 rounded-lg">
            <p className="text-sm text-muted-foreground mb-6">Your shopping bag is empty.</p>
            <Link href="/products" className="rounded bg-foreground text-background px-5 py-2.5 text-xs font-semibold">
              Return to Catalog
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* 1. Checkout Form */}
            <div className="lg:col-span-7 bg-background border border-border/40 p-8 rounded-lg shadow-sm">
              <form onSubmit={handlePlaceOrder} className="space-y-8">
                
                {/* Shipping Details */}
                <div>
                  <h3 className="font-serif text-lg text-foreground tracking-wide mb-5 flex items-center gap-2">
                    <Truck className="h-5 w-5 text-primary" strokeWidth={1.5} />
                    1. Shipping Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-semibold uppercase tracking-wider mb-1.5 text-muted-foreground">Full Name</label>
                      <input
                        type="text"
                        required
                        value={shippingForm.name}
                        onChange={(e) => setForm({ ...shippingForm, name: e.target.value })}
                        className="w-full rounded border border-border bg-background px-3.5 py-2 text-xs focus:outline-none focus:border-luxury-gold"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold uppercase tracking-wider mb-1.5 text-muted-foreground">Street Address</label>
                      <input
                        type="text"
                        required
                        value={shippingForm.address}
                        onChange={(e) => setForm({ ...shippingForm, address: e.target.value })}
                        className="w-full rounded border border-border bg-background px-3.5 py-2 text-xs focus:outline-none focus:border-luxury-gold"
                        placeholder="Flat / House / Suite, Street address"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-semibold uppercase tracking-wider mb-1.5 text-muted-foreground">City</label>
                        <input
                          type="text"
                          required
                          value={shippingForm.city}
                          onChange={(e) => setForm({ ...shippingForm, city: e.target.value })}
                          className="w-full rounded border border-border bg-background px-3.5 py-2 text-xs focus:outline-none focus:border-luxury-gold"
                          placeholder="Jaipur"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold uppercase tracking-wider mb-1.5 text-muted-foreground">Postal Code / ZIP</label>
                        <input
                          type="text"
                          required
                          value={shippingForm.zip}
                          onChange={(e) => setForm({ ...shippingForm, zip: e.target.value })}
                          className="w-full rounded border border-border bg-background px-3.5 py-2 text-xs focus:outline-none focus:border-luxury-gold"
                          placeholder="302001"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold uppercase tracking-wider mb-1.5 text-muted-foreground">Phone Number</label>
                      <input
                        type="text"
                        required
                        value={shippingForm.phone}
                        onChange={(e) => setForm({ ...shippingForm, phone: e.target.value })}
                        className="w-full rounded border border-border bg-background px-3.5 py-2 text-xs focus:outline-none focus:border-luxury-gold"
                        placeholder="+91 99999 88888"
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping Speeds */}
                <div>
                  <h3 className="font-serif text-sm tracking-wide uppercase text-muted-foreground mb-4">
                    Shipping Method
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setForm({ ...shippingForm, method: "standard" })}
                      className={`p-4 border rounded-md text-left transition-all ${
                        shippingForm.method === "standard"
                          ? "border-luxury-gold bg-luxury-cream/10 dark:bg-luxury-charcoal/10"
                          : "border-border/40 hover:border-foreground"
                      }`}
                    >
                      <span className="block text-xs font-semibold text-foreground">Standard Delivery</span>
                      <span className="block text-[10px] text-muted-foreground mt-1">5-7 Business Days</span>
                      <span className="block text-xs font-medium text-foreground mt-3">
                        {cartTotal > 2000 ? "Free" : "₹100"}
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setForm({ ...shippingForm, method: "express" })}
                      className={`p-4 border rounded-md text-left transition-all ${
                        shippingForm.method === "express"
                          ? "border-luxury-gold bg-luxury-cream/10 dark:bg-luxury-charcoal/10"
                          : "border-border/40 hover:border-foreground"
                      }`}
                    >
                      <span className="block text-xs font-semibold text-foreground">Express Delivery</span>
                      <span className="block text-[10px] text-muted-foreground mt-1">2-3 Business Days</span>
                      <span className="block text-xs font-medium text-foreground mt-3">
                        {cartTotal > 2000 ? "Free" : "₹100"}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Secure Payment details */}
                <div>
                  <h3 className="font-serif text-lg text-foreground tracking-wide mb-5 flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-primary" strokeWidth={1.5} />
                    2. Secure Payment Gateway Selection
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <button
                      type="button"
                      onClick={() => setForm({ ...shippingForm, payment: "stripe" })}
                      className={`flex justify-center items-center py-2.5 border rounded-md text-xs font-semibold tracking-wide transition-all ${
                        shippingForm.payment === "stripe" ? "border-luxury-gold bg-muted" : "border-border/40"
                      }`}
                    >
                      Stripe (Card Gateway)
                    </button>
                    <button
                      type="button"
                      onClick={() => setForm({ ...shippingForm, payment: "razorpay" })}
                      className={`flex justify-center items-center py-2.5 border rounded-md text-xs font-semibold tracking-wide transition-all ${
                        shippingForm.payment === "razorpay" ? "border-luxury-gold bg-muted" : "border-border/40"
                      }`}
                    >
                      Razorpay (UPI / NetBanking)
                    </button>
                    <button
                      type="button"
                      onClick={() => setForm({ ...shippingForm, payment: "cod" })}
                      className={`flex justify-center items-center py-2.5 border rounded-md text-xs font-semibold tracking-wide transition-all ${
                        shippingForm.payment === "cod" ? "border-luxury-gold bg-muted" : "border-border/40"
                      }`}
                    >
                      Cash on Delivery (COD)
                    </button>
                  </div>

                  {shippingForm.payment === "cod" && (
                    <div className="mb-6 p-5 rounded-lg border border-border/40 bg-muted/10 text-xs text-muted-foreground leading-relaxed">
                      <p><strong>Cash on Delivery selected.</strong> You will pay the delivery person directly in cash upon receiving your premium sustainable items. No online card pre-payment is required.</p>
                    </div>
                  )}

                  {shippingForm.payment === "stripe" ? (
                    <div className="space-y-4 bg-muted/20 p-5 rounded-lg border border-border/40">
                      <div>
                        <label className="block text-[9px] font-semibold uppercase tracking-wider mb-1.5 text-muted-foreground">Card Number</label>
                        <input
                          type="text"
                          required
                          value={card.number}
                          onChange={(e) => setCard({ ...card, number: e.target.value })}
                          className="w-full rounded border border-border bg-background px-3 py-2 text-xs focus:outline-none"
                          placeholder="4242 4242 4242 4242"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[9px] font-semibold uppercase tracking-wider mb-1.5 text-muted-foreground">Expiration Date</label>
                          <input
                            type="text"
                            required
                            value={card.expiry}
                            onChange={(e) => setCard({ ...card, expiry: e.target.value })}
                            className="w-full rounded border border-border bg-background px-3 py-2 text-xs focus:outline-none"
                            placeholder="MM / YY"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] font-semibold uppercase tracking-wider mb-1.5 text-muted-foreground">CVC</label>
                          <input
                            type="password"
                            required
                            value={card.cvc}
                            onChange={(e) => setCard({ ...card, cvc: e.target.value })}
                            className="w-full rounded border border-border bg-background px-3 py-2 text-xs focus:outline-none"
                            placeholder="123"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-5 bg-muted/20 rounded-lg border border-border/40 text-center text-xs text-muted-foreground">
                      Razorpay UPI/QR and Netbanking portals will trigger in a separate pop-up frame upon submission.
                    </div>
                  )}
                </div>

                {/* Place Order CTA */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 rounded-md bg-foreground text-background hover:bg-foreground/90 font-semibold py-3.5 text-sm transition-all disabled:opacity-75"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4.5 w-4.5 animate-spin" />
                      Processing Secure Payment...
                    </>
                  ) : (
                    <>
                      <Lock className="h-4.5 w-4.5" />
                      Authorize Payment & Place Order (₹{total.toFixed(2)})
                    </>
                  )}
                </button>

              </form>
            </div>

            {/* 2. Order items Summary column */}
            <div className="lg:col-span-5 bg-muted/20 border border-border/40 p-6 rounded-lg sticky top-24">
              <h3 className="font-serif text-lg tracking-wide text-foreground mb-6">Bag Summary</h3>
              <div className="space-y-4 max-h-[40vh] overflow-y-auto mb-6 pr-2">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 justify-between items-center text-xs">
                    <div className="flex gap-3 items-center">
                      <img src={item.image} alt={item.productName} className="h-10 w-10 object-cover rounded border border-border/40" />
                      <div>
                        <h4 className="font-semibold text-foreground line-clamp-1">{item.productName}</h4>
                        <span className="text-[10px] text-muted-foreground">{item.variantName} x {item.quantity}</span>
                      </div>
                    </div>
                    <span className="font-medium text-foreground">₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-border/40 pt-4 space-y-3.5 text-xs">
                <div className="flex justify-between text-muted-foreground">
                  <span>Cart Subtotal</span>
                  <span>₹{cartTotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Discount Applied</span>
                    <span>-₹{discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping Cost</span>
                  <span>{shippingCost === 0 ? "Free" : `₹${shippingCost.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Estimated Tax</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold text-sm pt-4 border-t border-border/40">
                  <span>Total Due</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}