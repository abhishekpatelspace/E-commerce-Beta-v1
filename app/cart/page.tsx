"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { Trash2, ShoppingBag, ArrowRight, Sparkles, Tag, Check, AlertCircle } from "lucide-react";

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, cartTotal } = useCart();

  // Coupon states
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState<string | null>(null);
  const [couponError, setCouponError] = useState("");

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === "WELCOME10") {
      setDiscount(cartTotal * 0.1);
      setCouponApplied("WELCOME10");
      setCouponError("");
      localStorage.setItem("craftore_coupon", "WELCOME10");
    } else if (couponCode.toUpperCase() === "B2B4000") {
      setCouponError("B2B4000 is a wholesale coupon only applicable inside B2B checkout.");
      setDiscount(0);
      setCouponApplied(null);
    } else {
      setCouponError("Invalid coupon code. Try 'WELCOME10'.");
      setDiscount(0);
      setCouponApplied(null);
    }
  };

  // Calculations
  const shipping = cartTotal > 2000 || cartTotal === 0 ? 0 : 100;
  const estimatedTax = (cartTotal - discount) * 0.08;
  const grandTotal = cartTotal - discount + shipping + estimatedTax;

  // Save discount to local storage so checkout can read it
  if (typeof window !== "undefined") {
    localStorage.setItem("craftore_discount", discount.toString());
  }

  return (
    <div className="bg-background text-foreground py-16 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Page Title */}
        <h1 className="font-serif text-3xl font-normal tracking-wide text-foreground mb-8">Shopping Bag</h1>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-border/40 rounded-lg">
            <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
            <h2 className="font-serif text-xl font-normal mb-2">Your Bag is Empty</h2>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed font-light mb-8">
              Looks like you haven't added any luxury sustainable items yet.
            </p>
            <Link href="/products" className="rounded bg-foreground text-background px-6 py-2.5 text-sm font-semibold tracking-wide hover:bg-foreground/90 transition-colors">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* 1. Cart Items List */}
            <div className="lg:col-span-8 space-y-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row gap-6 p-5 rounded-lg border border-border/40 bg-background shadow-sm"
                >
                  <div className="w-full sm:w-28 aspect-square rounded overflow-hidden bg-neutral-8000 border border-border/40">
                    <img src={item.image} alt={item.productName} className="h-full w-full object-cover" />
                  </div>
                  
                  <div className="flex flex-col flex-grow justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <h3 className="font-serif text-base font-normal tracking-wide text-foreground">
                            {item.productName}
                          </h3>
                          <span className="text-[10px] uppercase font-bold tracking-widest text-luxury-gold mt-1.5 block">
                            {item.variantName}
                          </span>
                          <span className="text-[10px] text-muted-foreground mt-1 block">SKU: {item.sku}</span>
                        </div>
                        <span className="text-sm font-semibold text-foreground">₹{item.price}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/40">
                      {/* Quantity Selectors */}
                      <div className="flex items-center border border-border/45 rounded">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2.5 py-1 text-xs text-muted-foreground hover:text-foreground"
                        >
                          -
                        </button>
                        <span className="px-2.5 text-xs font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2.5 py-1 text-xs text-muted-foreground hover:text-foreground"
                        >
                          +
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-muted-foreground hover:text-destructive flex items-center gap-1 text-xs transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                        Remove
                      </button>
                    </div>

                  </div>
                </div>
              ))}
            </div>

            {/* 2. Summary Card */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Summary Details */}
              <div className="border border-border/40 p-6 bg-muted/20 rounded-lg">
                <h3 className="font-serif text-lg tracking-wide text-foreground mb-6">Order Summary</h3>
                
                <div className="space-y-4 text-sm border-b border-border/40 pb-4 mb-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">₹{cartTotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-medium">
                      <span>Discount (10%)</span>
                      <span>-₹{discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-foreground">
                      {shipping === 0 ? "Free Shipping" : `₹${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Estimated Tax (8%)</span>
                    <span className="text-foreground">₹{estimatedTax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between font-semibold text-base mb-6">
                  <span>Grand Total</span>
                  <span>₹{grandTotal.toFixed(2)}</span>
                </div>

                <Link
                  href="/checkout"
                  className="w-full flex items-center justify-center gap-2 rounded-md bg-foreground text-background hover:bg-foreground/90 font-semibold py-3 text-sm transition-colors shadow-sm"
                >
                  Proceed to Checkout
                  <ArrowRight className="h-4.5 w-4.5" />
                </Link>
              </div>

              {/* Coupon Form */}
              <div className="border border-border/40 p-6 bg-background rounded-lg">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-4 flex items-center gap-1.5">
                  <Tag className="h-4 w-4" />
                  Promo Coupon Code
                </h4>
                {couponApplied ? (
                  <div className="flex items-center justify-between text-emerald-600 text-xs font-semibold p-2.5 bg-emerald-4000 rounded">
                    <span className="flex items-center gap-1">
                      <Check className="h-4 w-4" /> Code {couponApplied} Applied
                    </span>
                    <button
                      onClick={() => {
                        setDiscount(0);
                        setCouponApplied(null);
                        localStorage.removeItem("craftore_coupon");
                        localStorage.removeItem("craftore_discount");
                      }}
                      className="underline text-muted-foreground font-normal hover:text-foreground"
                    >
                      Clear
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. WELCOME10"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-grow rounded border border-border bg-background px-3 py-2 text-xs focus:outline-none focus:border-luxury-gold"
                    />
                    <button
                      type="submit"
                      className="bg-muted border border-border hover:bg-muted/70 text-foreground text-xs font-semibold px-4 rounded transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponError && (
                  <div className="flex items-start gap-1 text-[11px] text-destructive mt-2.5">
                    <AlertCircle className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                    <span>{couponError}</span>
                  </div>
                )}
                <div className="text-[10px] text-muted-foreground/80 mt-3 leading-relaxed">
                  * Try entering code <strong className="text-foreground">WELCOME10</strong> for a 10% discount check.
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}