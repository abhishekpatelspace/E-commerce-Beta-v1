"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2 } from "lucide-react";
import { submitToGoogleSheet } from "@/lib/googleSheets";

function ContactContent() {
  const searchParams = useSearchParams();
  const [form, setForm] = useState({
    name: "",
    email: "",
    type: "support",
    company: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Set default type if loaded from Corporate link (?type=corporate)
  useEffect(() => {
    const defaultType = searchParams.get("type");
    if (defaultType === "corporate") {
      setForm((prev) => ({ ...prev, type: "corporate" }));
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setSubmitting(true);
    setSubmitError("");

    const result = await submitToGoogleSheet({
      name: form.name,
      email: form.email,
      type: form.type,
      company: form.company,
      message: form.message,
    });

    setSubmitting(false);

    if (result.success) {
      setSubmitted(true);
      setForm({ name: "", email: "", type: "support", company: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    } else {
      setSubmitError(result.error || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="bg-background text-foreground py-16 transition-colors duration-300">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-luxury-gold font-semibold mb-2 block">GET IN TOUCH</span>
          <h1 className="font-serif text-4xl font-normal tracking-wide text-foreground">Contact CraftOre</h1>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed font-light">
            We are here to assist you with order tracking, custom embossing request details, or bulk corporate gifting catalogs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          {/* 1. Contact Details */}
          <div className="space-y-8 lg:col-span-1 bg-muted/40 p-8 rounded-lg border border-border/40">
            <h3 className="font-serif text-xl font-normal tracking-wide text-foreground mb-6">Our Offices</h3>
            
            <div className="flex gap-4 items-start">
              <MapPin className="h-5 w-5 text-primary mt-1" strokeWidth={1.5} />
              <div>
                <h4 className="text-sm font-semibold">Headquarters</h4>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed font-light">
                  CraftOre Lifestyle Global<br />
                  Artisan Enclave, Sector 5<br />
                  Jaipur, Rajasthan, 302001, India
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <Mail className="h-5 w-5 text-primary mt-1" strokeWidth={1.5} />
              <div>
                <h4 className="text-sm font-semibold">Support & Bulk Sales</h4>
                <p className="mt-1 text-xs text-muted-foreground font-light">
                  Retail: <a href="mailto:hello@craftorelifestyle.com" className="underline hover:text-foreground">hello@craftore.com</a><br />
                  B2B / Export: <a href="mailto:corporate@craftorelifestyle.com" className="underline hover:text-foreground">corporate@craftore.com</a>
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <Phone className="h-5 w-5 text-primary mt-1" strokeWidth={1.5} />
              <div>
                <h4 className="text-sm font-semibold">Phone Support</h4>
                <p className="mt-1 text-xs text-muted-foreground font-light">
                  Mon - Sat, 9:00 AM - 6:00 PM IST<br />
                  +91 (141) 455-8902 / +91 (800) 244-8800
                </p>
              </div>
            </div>
          </div>

          {/* 2. Interactive Form */}
          <div className="lg:col-span-2 bg-background p-8 border border-border/40 rounded-lg shadow-sm relative overflow-hidden">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <CheckCircle2 className="h-14 w-14 text-emerald-500 mb-4 animate-bounce" />
                <h3 className="font-serif text-2xl font-normal text-foreground mb-2">Message Sent Successfully</h3>
                <p className="text-sm text-muted-foreground max-w-sm leading-relaxed font-light">
                  Thank you for reaching out to CraftOre. Our account managers will review your inquiry and contact you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-muted-foreground">Full Name</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full rounded-md border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:border-luxury-gold focus:outline-none focus:ring-1 focus:ring-luxury-gold"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-muted-foreground">Email Address</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full rounded-md border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:border-luxury-gold focus:outline-none focus:ring-1 focus:ring-luxury-gold"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-muted-foreground">Inquiry Type</label>
                    <select
                      value={form.type}
                      onChange={(e) => setForm({ ...form, type: e.target.value })}
                      className="w-full rounded-md border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:border-luxury-gold focus:outline-none focus:ring-1 focus:ring-luxury-gold"
                    >
                      <option value="support">D2C Customer Support</option>
                      <option value="corporate">Corporate Gifting Catalog</option>
                      <option value="wholesale">B2B Wholesale / Export</option>
                      <option value="press">Press & Media</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-muted-foreground">Company Name (Optional)</label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      className="w-full rounded-md border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:border-luxury-gold focus:outline-none focus:ring-1 focus:ring-luxury-gold"
                      placeholder="Acme Corp"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-muted-foreground">Message</label>
                  <textarea
                    rows={6}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full rounded-md border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:border-luxury-gold focus:outline-none focus:ring-1 focus:ring-luxury-gold"
                    placeholder="Describe your request in detail..."
                  />
                </div>

                {submitError && (
                  <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                    {submitError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="flex w-full items-center justify-center gap-2 rounded-md bg-foreground px-5 py-3 text-sm font-semibold tracking-wide text-background hover:bg-foreground/90 transition-colors disabled:opacity-70"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

export default function Contact() {
  return (
    <Suspense fallback={<div className="py-24 text-center text-xs text-muted-foreground">Loading contact details...</div>}>
      <ContactContent />
    </Suspense>
  );
}