"use client";

import { motion } from "framer-motion";
import { Leaf, Award, Heart, Sparkles } from "lucide-react";

export default function About() {
  return (
    <div className="bg-background text-foreground py-16 transition-colors duration-300">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs uppercase tracking-[0.3em] text-luxury-gold font-semibold mb-2 block"
          >
            OUR HERITAGE & JOURNEY
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="font-serif text-4xl sm:text-5xl font-normal tracking-wide text-foreground"
          >
            Crafted for Generations
          </motion.h1>
          <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed font-light">
            Reconciling ancient Indian artisan techniques with modern minimalist luxury aesthetics.
          </p>
        </div>

        {/* Brand Mission Story */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-8 border-y border-border/40 mb-16">
          <div className="h-[400px] rounded-lg overflow-hidden bg-neutral-100">
            <img
              src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800"
              alt="Artisan copper forming process"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h2 className="font-serif text-2xl font-normal mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-luxury-gold" />
              Empowering Artisan Guilds
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground font-light mb-4">
              CraftOre was born in Rajasthan, India, where hand-beating copper is a sacred lineage craft passed down from generation to generation. Seeing these heritage guilds struggle against industrial plastic mold manufacturing, we set out to build a contemporary bridge.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground font-light">
              By merging ancestral copper hammer work with premium borosilicate glass, vegetable-tanned harness leathers, and plant cork fabrics, we create functional accessories that respect both historical heritage and organic wellness.
            </p>
          </div>
        </section>

        {/* Founders & Leadership */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-luxury-gold font-semibold mb-1 block">Leadership</span>
            <h2 className="font-serif text-3xl font-normal tracking-wide">Meet Our Founders</h2>
            <p className="mt-3 text-sm text-muted-foreground font-light max-w-lg mx-auto leading-relaxed">
              A team of artisan advocates, wellness entrepreneurs, and sustainable design thinkers driving CraftOre's global mission.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Arjun Mehta",
                role: "Co-Founder & CEO",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
                bio: "Former McKinsey consultant turned artisan advocate. Arjun left corporate consulting to preserve Rajasthan's 400-year-old coppersmith guilds through modern D2C commerce.",
                linkedin: "#",
              },
              {
                name: "Priya Kapoor",
                role: "Co-Founder & Creative Director",
                image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400",
                bio: "An NID-trained industrial designer with 12 years in luxury packaging. Priya leads product design, ensuring every CraftOre piece balances heritage aesthetics with modern minimalism.",
                linkedin: "#",
              },
              {
                name: "Vikram Singh",
                role: "Co-Founder & COO",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
                bio: "Supply chain expert with deep roots in Rajasthan's artisan communities. Vikram manages our network of 200+ craftsmen and oversees ethical sourcing across all product lines.",
                linkedin: "#",
              },
            ].map((founder, idx) => (
              <motion.div
                key={founder.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.5 }}
                className="group bg-card rounded-xl border border-border/40 overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="aspect-[4/3] overflow-hidden bg-neutral-100">
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-lg font-normal tracking-wide text-foreground">{founder.name}</h3>
                  <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-semibold block mt-1 mb-3">{founder.role}</span>
                  <p className="text-xs text-muted-foreground leading-relaxed font-light">{founder.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Brand Core Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-muted/40 rounded-xl border border-border/40">
            <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
              <Leaf className="h-6 w-6" strokeWidth={1.5} />
            </div>
            <h3 className="text-base font-semibold tracking-wide mb-2">Sustainable Ecology</h3>
            <p className="text-xs text-muted-foreground leading-relaxed font-light">
              We pledge to completely avoid toxic plastic resins. Our materials comprise natural copper, wood caps, bamboo, and certified vegan cork.
            </p>
          </div>

          <div className="p-6 bg-muted/40 rounded-xl border border-border/40">
            <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
              <Award className="h-6 w-6" strokeWidth={1.5} />
            </div>
            <h3 className="text-base font-semibold tracking-wide mb-2">Artisan Empowerment</h3>
            <p className="text-xs text-muted-foreground leading-relaxed font-light">
              Every metalsmith, weaver, and leather craftsman working on our line is paid a premium living wage, preserving heritage work conditions.
            </p>
          </div>

          <div className="p-6 bg-muted/40 rounded-xl border border-border/40">
            <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
              <Heart className="h-6 w-6" strokeWidth={1.5} />
            </div>
            <h3 className="text-base font-semibold tracking-wide mb-2">Ayurvedic Wellness</h3>
            <p className="text-xs text-muted-foreground leading-relaxed font-light">
              We design vesselware meant to naturally charge your drinking water, supporting healthy metabolism and glowing skin parameters.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}