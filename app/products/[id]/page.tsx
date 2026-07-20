"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { products, categories, Variant, Review } from "@/lib/mockData";
import { useCart } from "@/hooks/useCart";
import { ShieldCheck, Truck, RefreshCw, ShoppingBag, Star, Sparkles, Check, AlertCircle } from "lucide-react";

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const productId = params?.id as string;

  // Find product
  const product = products.find((p) => p.id === productId);

  // States
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(product?.variants[0] || null);
  const [activeImage, setActiveImage] = useState(product?.images[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [reviewForm, setReviewForm] = useState({ name: "", rating: 5, comment: "" });
  const [reviewsList, setReviewsList] = useState<Review[]>(product?.reviews || []);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Initialize variant and image if product changes
  useEffect(() => {
    if (product) {
      setSelectedVariant((prev) => prev || product.variants[0] || null);
      setActiveImage((prev) => prev || product.images[0] || "");
      setReviewsList((prev) => prev.length ? prev : product.reviews);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center">
        <h2 className="font-serif text-3xl mb-4">Product Not Found</h2>
        <p className="text-muted-foreground mb-8">The requested catalog item does not exist.</p>
        <Link href="/products" className="rounded bg-foreground text-background px-6 py-2.5 text-sm font-semibold">
          Return to Catalog
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedVariant) return;
    addToCart({
      productId: product.id,
      variantId: selectedVariant.id,
      productName: product.name,
      variantName: selectedVariant.name,
      name: `${product.name} - ${selectedVariant.name}`,
      sku: selectedVariant.sku,
      price: selectedVariant.price,
      quantity,
      image: product.images[0],
      moq: product.moq
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 3000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    setTimeout(() => router.push("/checkout"), 300);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (reviewForm.name && reviewForm.comment) {
      const newReview = {
        id: `r-new-${Date.now()}`,
        userName: reviewForm.name,
        rating: Number(reviewForm.rating),
        comment: reviewForm.comment,
        date: new Date().toISOString().split("T")[0],
      };
      setReviewsList([newReview, ...reviewsList]);
      setReviewSubmitted(true);
      setReviewForm({ name: "", rating: 5, comment: "" });
      setTimeout(() => setReviewSubmitted(false), 4000);
    }
  };

  // Get other recommendations (random 2 items from different categories/products)
  const recommendations = products.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="bg-background text-foreground py-16 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumbs */}
        <nav className="text-xs text-muted-foreground/80 mb-8 flex gap-2">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-foreground">Catalog</Link>
          <span>/</span>
          <span className="text-foreground font-medium">{product.name}</span>
        </nav>

        {/* 1. Main Specs Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          {/* Images Gallery Container */}
          <div className="lg:col-span-7 space-y-4">
            <div className="aspect-[4/3] rounded-lg overflow-hidden bg-neutral-100 border border-border/40 flex items-center justify-center">
              {activeImage ? (
                <img
                  src={activeImage}
                  alt={product.name}
                  className="h-full w-full object-cover transition-all"
                />
              ) : (
                <div className="h-full w-full bg-neutral-200 animate-pulse" />
              )}
            </div>
            <div className="flex gap-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`relative w-24 aspect-[4/3] rounded border overflow-hidden transition-all ${
                    activeImage === img ? "border-luxury-gold ring-1 ring-luxury-gold" : "border-border/40 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="thumbnail" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details Specs Container */}
          <div className="lg:col-span-5 flex flex-col">
            <span className="text-xs uppercase tracking-[0.25em] text-luxury-gold font-semibold mb-2 block flex items-center gap-1.5">
              <Sparkles className="h-4 w-4" />
              Mindful sustainable choice
            </span>
            <h1 className="font-serif text-3xl font-normal leading-snug tracking-wide mb-3">{product.name}</h1>
            
            {/* Price & Rating */}
            <div className="flex items-center gap-6 border-b border-border/40 pb-4 mb-6">
              <span className="text-2xl font-serif text-foreground font-medium">
                ₹{selectedVariant ? selectedVariant.price : product.price}
              </span>
              <div className="flex items-center gap-1.5 border-l border-border/40 pl-6">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span className="text-sm font-semibold">{product.rating}</span>
                <span className="text-xs text-muted-foreground">({reviewsList.length} reviews)</span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed font-light mb-6">
              {product.longDescription}
            </p>

            {/* Variants Selectors */}
            <div className="space-y-6 mb-8">
              <div>
                <span className="block text-xs font-semibold uppercase tracking-wider mb-3 text-muted-foreground">Select Variant / Option</span>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      className={`px-4 py-2 border rounded text-xs font-semibold tracking-wide transition-all ${
                        selectedVariant?.id === v.id
                          ? "bg-foreground text-background border-foreground"
                          : "border-border/40 text-muted-foreground hover:border-foreground hover:text-foreground"
                      }`}
                    >
                      {v.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Inventory Status & SKU */}
            {selectedVariant && (
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-6">
                <span>SKU: <strong className="text-foreground">{selectedVariant.sku}</strong></span>
                <span>
                  Availability:{" "}
                  <strong className={selectedVariant.stock > 10 ? "text-emerald-600" : "text-amber-600"}>
                    {selectedVariant.stock > 10 ? `${selectedVariant.stock} In Stock` : `Only ${selectedVariant.stock} Left!`}
                  </strong>
                </span>
              </div>
            )}

            {/* Quantity Selector & Action CTAs */}
            <div className="flex gap-4 mb-8">
              <div className="flex items-center border border-border/45 rounded-md">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3.5 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  -
                </button>
                <span className="px-3 text-sm font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3.5 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!selectedVariant}
                className="flex-grow flex items-center justify-center gap-2 rounded-md bg-foreground text-background hover:bg-foreground/90 font-semibold py-3 text-sm transition-all disabled:opacity-50"
              >
                {added ? (
                  <>
                    <Check className="h-4.5 w-4.5 text-emerald-400" />
                    Added to Bag
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-4.5 w-4.5" />
                    Add to Cart Bag
                  </>
                )}
              </button>
            </div>

            <button
              onClick={handleBuyNow}
              disabled={!selectedVariant}
              className="w-full rounded-md border border-foreground text-foreground hover:bg-muted/40 font-semibold py-3 text-sm transition-all mb-8 disabled:opacity-50"
            >
              Order & Buy It Now
            </button>

            {/* Highlights Trust */}
            <div className="border-t border-border/40 pt-6 space-y-3.5 text-xs text-muted-foreground">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="h-4.5 w-4.5 text-primary" strokeWidth={1.5} />
                <span>Ayurvedic purity certified & non-reactive vessels.</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Truck className="h-4.5 w-4.5 text-primary" strokeWidth={1.5} />
                <span>Free shipping globally on orders above ₹8000.</span>
              </div>
              <div className="flex items-center gap-2.5">
                <RefreshCw className="h-4.5 w-4.5 text-primary" strokeWidth={1.5} />
                <span>30-day hassle-free sustainability returns commitment.</span>
              </div>
            </div>

          </div>
        </div>

        {/* 2. Reviews Section */}
        <section className="py-12 border-t border-border/40 grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
          {/* Reviews List */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="font-serif text-xl tracking-wide mb-6">Customer Reviews</h3>
            {reviewsList.length > 0 ? (
              <div className="space-y-6">
                {reviewsList.map((review) => (
                  <div key={review.id} className="border-b border-border/30 pb-5">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="text-xs font-semibold text-foreground">{review.userName}</h4>
                        <span className="text-[9px] text-muted-foreground">{review.date}</span>
                      </div>
                      <div className="flex text-amber-500 text-xs">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                      </div>
                    </div>
                    <p className="text-xs leading-relaxed text-muted-foreground font-light">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">No reviews written for this product yet.</p>
            )}
          </div>

          {/* Write a Review */}
          <div className="lg:col-span-1 bg-muted/30 p-6 rounded-lg border border-border/45">
            <h3 className="font-serif text-base tracking-wide mb-4">Share Your Thoughts</h3>
            {reviewSubmitted ? (
              <div className="text-center py-8 text-emerald-600 text-xs flex flex-col items-center gap-1.5 font-semibold">
                <Check className="h-10 w-10 text-emerald-500 bg-emerald-50 rounded-full p-2" />
                Review submitted successfully!
              </div>
            ) : (
              <form onSubmit={handleAddReview} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-wider mb-1.5 text-muted-foreground">Your Name</label>
                  <input
                    type="text"
                    required
                    value={reviewForm.name}
                    onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                    className="w-full rounded border border-border bg-background px-3 py-2 text-xs focus:border-luxury-gold focus:outline-none"
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-wider mb-1.5 text-muted-foreground">Rating Selection</label>
                  <select
                    value={reviewForm.rating}
                    onChange={(e) => setReviewForm({ ...reviewForm, rating: Number(e.target.value) })}
                    className="w-full rounded border border-border bg-background px-3 py-2 text-xs focus:border-luxury-gold focus:outline-none"
                  >
                    <option value={5}>5 Stars (Excellent)</option>
                    <option value={4}>4 Stars (Good)</option>
                    <option value={3}>3 Stars (Average)</option>
                    <option value={2}>2 Stars (Poor)</option>
                    <option value={1}>1 Star (Unacceptable)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-wider mb-1.5 text-muted-foreground">Comments</label>
                  <textarea
                    rows={4}
                    required
                    value={reviewForm.comment}
                    onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                    className="w-full rounded border border-border bg-background px-3 py-2 text-xs focus:border-luxury-gold focus:outline-none"
                    placeholder="Write details..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-foreground text-background rounded hover:bg-foreground/90 font-semibold py-2.5 text-xs transition-colors"
                >
                  Submit Review
                </button>
              </form>
            )}
          </div>
        </section>

        {/* 3. Recommendations Grid */}
        <section className="py-12 border-t border-border/40">
          <h3 className="font-serif text-2xl font-normal tracking-wide mb-8">Frequently Bought Together</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((rec) => (
              <Link
                key={rec.id}
                href={`/products/${rec.id}`}
                className="group flex flex-col bg-background rounded-lg border border-border/40 overflow-hidden hover:shadow-md transition-all"
              >
                <div className="relative aspect-square w-full bg-neutral-100 overflow-hidden">
                  <img src={rec.images[0]} alt={rec.name} className="h-full w-full object-cover transition-transform group-hover:scale-103" />
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <span className="text-[8px] text-muted-foreground uppercase tracking-widest">{categories.find(c => c.id === rec.categoryId)?.name || rec.categoryId.replace(/-/g, " ")}</span>
                  <h4 className="font-serif text-sm font-normal text-foreground line-clamp-1 group-hover:text-primary mt-1">{rec.name}</h4>
                  <span className="text-xs font-medium mt-3">₹{rec.price}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
