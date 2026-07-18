"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Leaf, Shield, Heart, Sparkles, Award, Star, ChevronRight, Quote } from "lucide-react";
import { products, categories } from "@/lib/mockData";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function Home() {
  const bestSellers = products.filter((p) => p.rating >= 4.8).slice(0, 4);
  const newArrivals = products.slice(7, 11);

  return (
    <div className="flex flex-col bg-background text-foreground">

      {/* ═══════════════════ 1. HERO ═══════════════════ */}
      <section className="relative min-h-screen w-full overflow-hidden bg-gradient-luxury">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=1920"
            alt="Hero"
            className="h-full w-full object-cover opacity-40"
          />
        </div>
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/4000 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10" />

        {/* Decorative elements */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-luxury-gold/5 rounded-full blur-3xl z-10 animate-float" />
        <div className="absolute bottom-40 left-10 w-48 h-48 bg-luxury-brass/5 rounded-full blur-2xl z-10" />

        <div className="relative z-20 flex h-screen flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            className="max-w-2xl text-white"
          >
            <motion.div variants={fadeUp} custom={0} className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-luxury-gold" />
              <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.4em] text-luxury-gold">
                Artisan Craftsmanship
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              custom={1}
              className="font-serif text-5xl sm:text-7xl font-normal leading-[1.1] tracking-wide mb-6"
            >
              Sustainable
              <br />
              <span className="text-gradient-gold">Luxury</span> for
              <br />
              Mindful Living
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-base sm:text-lg text-neutral-300/90 leading-relaxed font-light mb-10 max-w-md"
            >
              Handcrafted pure copper vessels, organic cork accessories, and premium full-grain leather — designed by heritage Indian artisans.
            </motion.p>

            <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="group rounded-full bg-luxury-gold hover:bg-luxury-gold/90 text-neutral-900 px-8 py-4 text-sm font-semibold tracking-wide transition-all shadow-lg shadow-luxury-gold/20 flex items-center gap-2"
              >
                Shop Collection
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/b2b"
                className="rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 hover:border-white/40 px-8 py-4 text-sm font-semibold tracking-wide transition-all"
              >
                Wholesale Portal
              </Link>
            </motion.div>

            {/* Trust stats */}
            <motion.div
              variants={fadeUp}
              custom={4}
              className="flex gap-8 mt-14 pt-8 border-t border-white/10"
            >
              {[
                { value: "200+", label: "Artisans" },
                { value: "4000K+", label: "Happy Customers" },
                { value: "99.7%", label: "Pure Copper" },
              ].map((stat) => (
                <div key={stat.label}>
                  <span className="block text-2xl font-serif text-luxury-gold">{stat.value}</span>
                  <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-medium">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
          <span className="text-[9px] uppercase tracking-[0.3em] text-neutral-40000">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-luxury-gold/60 to-transparent" />
        </div>
      </section>

      {/* ═══════════════════ 2. MARQUEE TRUST BAR ═══════════════════ */}
      <section className="py-6 bg-luxury-cream border-y border-border/30 overflow-hidden">
        <div className="flex items-center justify-center gap-12 text-xs font-semibold uppercase tracking-[0.25em] text-luxury-charcoal/60">
          {["Free Shipping Over ₹8000", "•", "Handcrafted in India", "•", "99.7% Pure Copper", "•", "30-Day Returns", "•", "Certified Vegan Options"].map((item, i) => (
            <span key={i} className="whitespace-nowrap">{item}</span>
          ))}
        </div>
      </section>

      {/* ═══════════════════ 3. CATEGORY DIRECTORY ═══════════════════ */}
      <section className="py-24 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-luxury-gold font-semibold mb-2 block">Explore</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-wide">
              Curated Categories
            </h2>
          </div>
          <Link href="/products" className="mt-4 md:mt-0 text-sm font-semibold text-foreground hover:text-primary flex items-center gap-1 transition-colors group">
            View All
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { name: "Copper Vessels", image: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&q=80&w=800", href: "/products?category=copper-bottles", count: products.filter(p => p.categoryId === "copper-bottles").length },
            { name: "Gift Sets", image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800", href: "/products?category=copper-gift-sets", count: products.filter(p => p.categoryId === "copper-gift-sets").length },
            { name: "Artisan Leather", image: "https://images.unsplash.com/photo-1624222247344-54000fb8ec5519?auto=format&fit=crop&q=80&w=800", href: "/products?category=leather-belts", count: products.filter(p => p.categoryId === "leather-belts").length },
            { name: "Handcrafted Bags", image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&q=80&w=800", href: "/products?category=bags", count: products.filter(p => p.categoryId === "bags").length },
          ].map((cat, idx) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
            >
              <Link href={cat.href} className="group relative block h-80 overflow-hidden rounded-2xl bg-neutral-900">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                <div className="absolute inset-0 flex flex-col justify-end p-6 z-20 text-white">
                  <span className="text-[9px] uppercase tracking-[0.3em] text-luxury-gold/80 mb-1">{cat.count} Products</span>
                  <h3 className="font-serif text-xl tracking-wide mb-2">{cat.name}</h3>
                  <span className="text-xs font-medium tracking-wider flex items-center gap-1 opacity-0 group-hover:opacity-8000 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    Explore <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════════════════ 4. BEST SELLERS ═══════════════════ */}
      <section className="py-24 bg-neutral-4000 border-y border-border/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-14">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-luxury-gold font-semibold mb-2 block">Most Loved</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-wide">
                Best Sellers
              </h2>
              <p className="mt-3 text-sm text-muted-foreground font-light max-w-md">
                Our most sought-after products, beloved by wellness and design enthusiasts worldwide.
              </p>
            </div>
            <Link
              href="/products"
              className="mt-4 sm:mt-0 text-sm font-semibold text-foreground hover:text-primary flex items-center gap-1 transition-colors group"
            >
              View All <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
              >
                <Link
                  href={`/products/${product.id}`}
                  className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-40000 border border-border/30"
                >
                  <div className="relative aspect-square w-full overflow-hidden bg-neutral-8000">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <span className="absolute left-3 top-3 bg-luxury-gold text-neutral-900 text-[8px] uppercase font-bold tracking-[0.2em] px-3 py-1.5 rounded-full">
                      Best Seller
                    </span>
                  </div>
                  <div className="flex flex-col flex-1 p-5">
                    <span className="text-[9px] text-muted-foreground uppercase tracking-[0.2em] mb-2">
                      {categories.find(c => c.id === product.categoryId)?.name || product.categoryId}
                    </span>
                    <h3 className="font-serif text-sm font-normal tracking-wide text-foreground mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-1 mb-3">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-neutral-200'}`} />
                      ))}
                      <span className="text-[10px] text-muted-foreground ml-1">({product.reviews.length})</span>
                    </div>
                    <div className="mt-auto pt-3 border-t border-border/30 flex items-center justify-between">
                      <span className="text-lg font-serif font-medium text-foreground">₹{product.price}</span>
                      <span className="text-[10px] font-semibold text-primary tracking-wide uppercase group-hover:underline">Shop Now</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ 5. BRAND VALUES ═══════════════════ */}
      <section className="py-24 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-luxury-gold font-semibold mb-2 block">Why CraftOre</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-wide">
            Our Promise to You
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Leaf, title: "Sustainably Sourced", desc: "8000% biodegradable or recyclable organic elements in every product." },
            { icon: Shield, title: "Toxin & BPA Free", desc: "Pure, non-reactive food-safe materials — 99.7% copper & borosilicate glass." },
            { icon: Award, title: "Heritage Crafts", desc: "Directly supporting 200+ local metalsmiths and leather artisans." },
            { icon: Heart, title: "Ayurvedic Wellness", desc: "Designed to support healthy living through mineral-charged hydration." },
          ].map((badge, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="group text-center p-8 rounded-2xl border border-border/30 bg-white hover:shadow-lg hover:border-luxury-gold/20 transition-all duration-40000"
            >
              <div className="mx-auto w-14 h-14 flex items-center justify-center rounded-full bg-luxury-gold/10 text-luxury-gold mb-5 group-hover:scale-110 group-hover:bg-luxury-gold/20 transition-all duration-300">
                <badge.icon className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <h3 className="text-sm font-semibold tracking-wide text-foreground mb-2">{badge.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed font-light">{badge.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════════════════ 6. TESTIMONIALS ═══════════════════ */}
      <section className="py-24 bg-neutral-4000 border-y border-border/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-luxury-gold font-semibold mb-2 block">Testimonials</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-wide">
              What Our Customers Say
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Ananya R.", role: "Wellness Blogger", text: "The copper bottle has completely changed my morning routine. The craftsmanship is unlike anything I've seen — it feels like holding a piece of art.", rating: 5 },
              { name: "Marcus W.", role: "Corporate Buyer", text: "We ordered 40000 units for our company's wellness initiative. CraftOre's team handled custom branding flawlessly. Our employees loved the quality.", rating: 5 },
              { name: "Sophie L.", role: "Interior Designer", text: "The Imperial Carafe Set is stunning on any table. My clients always ask where I sourced it. Premium quality at a fair price.", rating: 5 },
            ].map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.5 }}
                className="relative p-8 bg-white rounded-2xl border border-border/30 shadow-sm hover:shadow-lg transition-all duration-40000"
              >
                <Quote className="h-8 w-8 text-luxury-gold/20 mb-4" />
                <p className="text-sm text-muted-foreground leading-relaxed font-light mb-6 italic">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div className="pt-4 border-t border-border/30">
                  <h4 className="text-sm font-semibold text-foreground">{testimonial.name}</h4>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest">{testimonial.role}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ 7. CORPORATE / B2B CTA ═══════════════════ */}
      <section className="relative py-28 overflow-hidden bg-gradient-luxury">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-luxury-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-luxury-brass/5 rounded-full blur-3xl" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-12 bg-luxury-gold/60" />
              <span className="text-[11px] uppercase tracking-[0.4em] text-luxury-gold font-semibold">Corporate & Export</span>
              <div className="h-px w-12 bg-luxury-gold/60" />
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-tight mb-6">
              Elevate Your Corporate
              <br />
              <span className="text-gradient-gold">Gifting Experience</span>
            </h2>
            <p className="max-w-2xl mx-auto text-sm sm:text-base text-neutral-300/80 leading-relaxed font-light mb-10">
              Custom logo engraving, premium packaging, and tiered bulk discounts for businesses worldwide. Join 8000+ corporate partners.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/b2b"
                className="group rounded-full bg-luxury-gold hover:bg-luxury-gold/90 text-neutral-900 px-8 py-4 text-sm font-semibold transition-all shadow-lg shadow-luxury-gold/20 flex items-center gap-2"
              >
                Access B2B Portal
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/contact?type=corporate"
                className="rounded-full border border-white/20 hover:bg-white/10 hover:border-white/40 text-white px-8 py-4 text-sm font-semibold transition-all"
              >
                Request Catalog
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════ 8. JOURNAL / BLOG ═══════════════════ */}
      <section className="py-24 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-14">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-luxury-gold font-semibold mb-2 block">Stories</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-wide">The CraftOre Journal</h2>
            <p className="mt-3 text-sm text-muted-foreground font-light">Stories behind natural wellness, sustainable fashion, and artisan preservation.</p>
          </div>
          <Link href="/blog" className="mt-4 sm:mt-0 text-sm font-semibold text-foreground hover:text-primary flex items-center gap-1 transition-colors group">
            Read All <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: "The Ayurvedic Science of Drinking Copper Water",
              excerpt: "Stored overnight, water absorbs trace copper elements (Tamra Jal). Discover how this naturally purifies water and benefits digestion.",
              date: "July 12, 2026",
              image: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&q=80&w=800",
              readTime: "5 min read",
            },
            {
              title: "Cork: The Ultimate Cruelty-Free Luxury Alternative",
              excerpt: "How Portuguese cork oak bark is harvested without harming trees, making it the ideal material for ethical vegan fashion accessories.",
              date: "June 28, 2026",
              image: "https://images.unsplash.com/photo-1598033129183-c4f4000c736f10?auto=format&fit=crop&q=80&w=800",
              readTime: "4 min read",
            },
          ].map((blog, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.5 }}
            >
              <Link href="/blog" className="group flex flex-col bg-white rounded-2xl border border-border/30 overflow-hidden hover:shadow-lg transition-all duration-40000">
                <div className="h-64 overflow-hidden bg-neutral-8000">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-7">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[10px] font-semibold text-luxury-gold uppercase tracking-wider">{blog.date}</span>
                    <span className="text-[10px] text-muted-foreground">•</span>
                    <span className="text-[10px] text-muted-foreground">{blog.readTime}</span>
                  </div>
                  <h3 className="font-serif text-lg tracking-wide text-foreground mb-3 group-hover:text-primary transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed font-light mb-4">{blog.excerpt}</p>
                  <span className="text-xs font-semibold text-foreground flex items-center gap-1 group-hover:text-primary transition-colors">
                    Read Article <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════════════════ 9. NEWSLETTER ═══════════════════ */}
      <section className="py-20 bg-neutral-4000 border-t border-border/30">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <Sparkles className="h-8 w-8 text-luxury-gold mx-auto mb-4" />
          <h2 className="font-serif text-2xl sm:text-3xl font-normal tracking-wide mb-3">
            Join the CraftOre Community
          </h2>
          <p className="text-sm text-muted-foreground font-light mb-8 max-w-md mx-auto">
            Get early access to new collections, exclusive artisan stories, and 10% off your first order.
          </p>
          <form
            onSubmit={(e) => { e.preventDefault(); }}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow rounded-full border border-border bg-white px-6 py-3.5 text-sm focus:border-luxury-gold focus:outline-none focus:ring-2 focus:ring-luxury-gold/20 transition-all"
            />
            <button
              type="submit"
              className="rounded-full bg-foreground hover:bg-foreground/90 text-background px-8 py-3.5 text-sm font-semibold tracking-wide transition-all shadow-sm"
            >
              Subscribe
            </button>
          </form>
          <p className="mt-4 text-[10px] text-muted-foreground/60">No spam, unsubscribe anytime. We respect your privacy.</p>
        </div>
      </section>
    </div>
  );
}
