"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/hooks/useCart";
import { products } from "@/lib/mockData";
import { ShieldCheck, ArrowRight, CheckCircle2, Building, AlertCircle, ShoppingBag, FileText } from "lucide-react";

export default function B2BPortal() {
  const { addToCart } = useCart();

  // B2B Status states
  const [b2bApproved, setB2bApproved] = useState(false);
  const [loading, setLoading] = useState(false);

  // Business Onboarding Form states
  const [businessForm, setBusinessForm] = useState({
    companyName: "",
    taxId: "", // GSTIN or standard business registration ID
    category: "retail",
    volume: "1000",
  });
  
  // Custom RFQ state
  const [rfqSubmitted, setRfqSubmitted] = useState(false);
  const [rfqForm, setRfqForm] = useState({ productName: "Copper Bottles", quantity: 500, branding: "Yes" });

  // MOQ validation warnings
  const [warnings, setWarnings] = useState<{ [key: string]: string }>({});
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [addedProduct, setAddedProduct] = useState<string | null>(null);

  // Sync state
  useEffect(() => {
    const isApproved = localStorage.getItem("craftore_b2b_status");
    if (isApproved === "approved") {
      setB2bApproved(true);
    }
    
    // Initialize wholesale quantities with MOQs
    const initialQuantities: { [key: string]: number } = {};
    products.forEach((p) => {
      initialQuantities[p.id] = p.moq;
    });
    setQuantities(initialQuantities);
  }, []);

  // Handle Business registration
  const handleRegisterB2B = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessForm.companyName || !businessForm.taxId) return;

    setLoading(true);

    // Simulate tax authority database check
    setTimeout(() => {
      localStorage.setItem("craftore_b2b_status", "approved");
      localStorage.setItem(
        "craftore_b2b_details",
        JSON.stringify({
          companyName: businessForm.companyName,
          taxId: businessForm.taxId,
          role: "wholesaler",
        })
      );
      setB2bApproved(true);
      setLoading(false);
    }, 2500);
  };

  // Add wholesale item to cart (with MOQ verification)
  const handleAddWholesale = (product: typeof products[0]) => {
    const qty = quantities[product.id] || product.moq;

    if (qty < product.moq) {
      setWarnings({
        ...warnings,
        [product.id]: `Wholesale MOQ is ${product.moq} units. Please adjust quantity.`,
      });
      return;
    }

    // Clear warning
    const updatedWarnings = { ...warnings };
    delete updatedWarnings[product.id];
    setWarnings(updatedWarnings);

    // Add to cart with wholesale price
    const defaultVariant = product.variants[0];
    addToCart({
      productId: product.id,
      variantId: defaultVariant?.id || "default",
      productName: `[Wholesale] ${product.name}`,
      variantName: defaultVariant?.name || "Standard Pack",
      name: `[Wholesale] ${product.name} - ${defaultVariant?.name || "Standard Pack"}`,
      sku: `${defaultVariant?.sku || "VYN"}-WS`,
      price: product.b2bPrice, // WHOLESALE PRICE
      quantity: qty,
      image: product.images[0],
      moq: product.moq
    });

    setAddedProduct(product.id);
    setTimeout(() => setAddedProduct(null), 2500);
  };

  // Handle RFQ submit
  const handleRfqSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRfqSubmitted(true);
    setTimeout(() => setRfqSubmitted(false), 5000);
  };

  // 1. If not approved B2B, show Business Register page
  if (!b2bApproved) {
    return (
      <div className="bg-background text-foreground py-16 transition-colors duration-300">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          
          {/* Section banner */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-luxury-gold font-semibold mb-2 block">WHOLESALE PARTNERSHIP</span>
            <h1 className="font-serif text-4xl font-normal tracking-wide text-foreground">B2B Wholesaler Portal</h1>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed font-light">
              Register your business to access up to 45% off retail pricing, custom logo branding, and export invoicing tools.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center border-y border-border/40 py-12">
            {/* Promo columns */}
            <div className="space-y-6">
              <h2 className="font-serif text-2xl font-normal mb-4 flex items-center gap-2">
                <Building className="h-6 w-6 text-primary" />
                Wholesale Benefits
              </h2>
              <div className="space-y-4 text-sm text-muted-foreground font-light leading-relaxed">
                <p>
                  <strong>✔ Discounted Wholesale Pricing:</strong> Direct bulk prices on all copperware, leather craft, and vegan cork catalogs.
                </p>
                <p>
                  <strong>✔ Custom Branding:</strong> Precision laser embossing or leather stamping for customized executive hampers.
                </p>
                <p>
                  <strong>✔ Dedicated Account Support:</strong> Direct coordination with shipping managers for worldwide cargo exports.
                </p>
              </div>
            </div>

            {/* Registration Form */}
            <div className="bg-muted/30 p-8 rounded-lg border border-border/40 relative">
              <h3 className="font-serif text-lg tracking-wide text-foreground mb-6">Business Verification</h3>
              <form onSubmit={handleRegisterB2B} className="space-y-4">
                <div>
                  <label className="block text-[9px] font-semibold uppercase tracking-wider mb-1.5 text-muted-foreground">Company Legal Name</label>
                  <input
                    type="text"
                    required
                    value={businessForm.companyName}
                    onChange={(e) => setForm({ ...businessForm, companyName: e.target.value })}
                    className="w-full rounded border border-border bg-background px-3 py-2 text-xs focus:outline-none"
                    placeholder="Acme Export Ltd"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-semibold uppercase tracking-wider mb-1.5 text-muted-foreground">Tax ID / GSTIN Verification</label>
                  <input
                    type="text"
                    required
                    value={businessForm.taxId}
                    onChange={(e) => setForm({ ...businessForm, taxId: e.target.value })}
                    className="w-full rounded border border-border bg-background px-3 py-2 text-xs focus:outline-none"
                    placeholder="e.g. 08AAAAC1111A1Z1"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[9px] font-semibold uppercase tracking-wider mb-1.5 text-muted-foreground">Business Segment</label>
                    <select
                      value={businessForm.category}
                      onChange={(e) => setForm({ ...businessForm, category: e.target.value })}
                      className="w-full rounded border border-border bg-background px-3 py-2 text-xs focus:outline-none"
                    >
                      <option value="retail">Retail Boutique</option>
                      <option value="corporate">Corporate Gifting</option>
                      <option value="hotel">Luxury Hotel / Dining</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] font-semibold uppercase tracking-wider mb-1.5 text-muted-foreground">Target Annual Volume</label>
                    <select
                      value={businessForm.volume}
                      onChange={(e) => setForm({ ...businessForm, volume: e.target.value })}
                      className="w-full rounded border border-border bg-background px-3 py-2 text-xs focus:outline-none"
                    >
                      <option value="1000">100 - 500 Units</option>
                      <option value="5000">500 - 2,000 Units</option>
                      <option value="10000">Over 2,000 Units</option>
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-foreground hover:bg-foreground/90 text-background py-2.5 rounded text-xs font-semibold tracking-wide transition-colors flex items-center justify-center gap-1.5"
                >
                  {loading ? "Verifying Business details..." : "Verify & Approve B2B Access"}
                  {!loading && <ArrowRight className="h-4 w-4" />}
                </button>
              </form>
            </div>

          </div>

        </div>
      </div>
    );
  }

  // 2. If approved, show Wholesale Dashboard & Products list
  return (
    <div className="bg-background text-foreground py-16 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Dashboard Banner */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-border/40 pb-6 mb-8 gap-4">
          <div>
            <h1 className="font-serif text-3xl font-normal tracking-wide text-foreground">B2B Wholesale Catalog</h1>
            <p className="text-xs text-muted-foreground mt-1">
              Your business is approved. Wholesale catalog pricing (40-50% off retail) is active.
            </p>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem("craftore_b2b_status");
              setB2bApproved(false);
            }}
            className="text-xs text-muted-foreground hover:text-foreground underline"
          >
            Leave Wholesale Dashboard
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Products Table Catalog Grid */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="font-serif text-xl tracking-wide">Bulk Catalog Items</h2>
            <div className="space-y-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex flex-col sm:flex-row gap-5 p-5 rounded-lg border border-border/40 bg-background shadow-sm items-center"
                >
                  <div className="w-20 aspect-square rounded overflow-hidden bg-neutral-100 border border-border/40 shrink-0">
                    <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" />
                  </div>
                  
                  <div className="flex-grow text-xs space-y-1 text-center sm:text-left">
                    <h3 className="font-serif text-sm font-semibold text-foreground">{product.name}</h3>
                    <div className="flex flex-wrap justify-center sm:justify-start gap-4 pt-1.5 text-muted-foreground">
                      <span>Retail: <del>₹{product.price}</del></span>
                      <span>
                        Wholesale: <strong className="text-primary font-bold">₹{product.b2bPrice} / unit</strong>
                      </span>
                      <span>MOQ: <strong className="text-foreground">{product.moq} Units</strong></span>
                    </div>
                    {warnings[product.id] && (
                      <p className="text-destructive font-semibold flex items-center justify-center sm:justify-start gap-1 mt-1 text-[10px]">
                        <AlertCircle className="h-3.5 w-3.5" />
                        {warnings[product.id]}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {/* Bulk Quantity Input */}
                    <input
                      type="number"
                      min={product.moq}
                      value={quantities[product.id] || product.moq}
                      onChange={(e) =>
                        setQuantities({ ...quantities, [product.id]: Number(e.target.value) })
                      }
                      className="w-16 rounded border border-border bg-background px-2 py-1 text-center font-semibold text-xs text-foreground focus:outline-none"
                    />
                    <button
                      onClick={() => handleAddWholesale(product)}
                      className="rounded bg-foreground text-background hover:bg-foreground/90 font-semibold px-4 py-1.5 text-xs transition-colors flex items-center gap-1"
                    >
                      {addedProduct === product.id ? (
                        <>
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                          Added Pack
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="h-3.5 w-3.5" />
                          Bulk Add
                        </>
                      )}
                    </button>
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* Quotations RFQ Form */}
          <div className="lg:col-span-1 bg-muted/20 border border-border/40 p-6 rounded-lg sticky top-24">
            <h2 className="font-serif text-lg tracking-wide text-foreground mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Request Custom RFQ Quote
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed font-light mb-6">
              Need custom engraving, customized gift packaging boxes, or cargo quantities above 1,000 units? Submit a Request for Quote.
            </p>
            {rfqSubmitted ? (
              <div className="text-center py-8 text-emerald-600 text-xs flex flex-col items-center gap-1.5 font-semibold">
                <CheckCircle2 className="h-10 w-10 text-emerald-500 bg-emerald-50 rounded-full p-2" />
                RFQ Quotation Request Received!
              </div>
            ) : (
              <form onSubmit={handleRfqSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold uppercase tracking-wider mb-1.5 text-muted-foreground">Select Product Type</label>
                  <select
                    value={rfqForm.productName}
                    onChange={(e) => setRfqForm({ ...rfqForm, productName: e.target.value })}
                    className="w-full rounded border border-border bg-background px-3 py-2 text-xs focus:outline-none"
                  >
                    <option value="Copper Bottles">Classic Copper Bottles</option>
                    <option value="Carafe Sets">Imperial Carafe Sets</option>
                    <option value="Hampers">Sustainable Custom Hampers</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold uppercase tracking-wider mb-1.5 text-muted-foreground">Target Quantity (Units)</label>
                  <input
                    type="number"
                    min={100}
                    value={rfqForm.quantity}
                    onChange={(e) => setRfqForm({ ...rfqForm, quantity: Number(e.target.value) })}
                    className="w-full rounded border border-border bg-background px-3 py-2 text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase tracking-wider mb-1.5 text-muted-foreground">Add Custom Embossing Logo?</label>
                  <select
                    value={rfqForm.branding}
                    onChange={(e) => setRfqForm({ ...rfqForm, branding: e.target.value })}
                    className="w-full rounded border border-border bg-background px-3 py-2 text-xs focus:outline-none"
                  >
                    <option value="Yes">Yes, require laser-embossed company logo</option>
                    <option value="No">No, plain branding packaging</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full bg-foreground hover:bg-foreground/90 text-background py-2.5 rounded font-semibold transition-colors"
                >
                  Generate Quotation Request
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );

  // Helper set form B2B registration
  function setForm(state: any) {
    setBusinessForm(state);
  }
}