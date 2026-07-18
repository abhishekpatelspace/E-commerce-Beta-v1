"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categories } from "@/lib/mockData";

export default function Categories() {
  return (
    <div className="bg-background text-foreground py-16 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-luxury-gold font-semibold mb-2 block">EXPLORE DIRECTORY</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal tracking-wide text-foreground">Our Collections</h1>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed font-light">
            Indulge in premium sustainable products hand-crafted from certified copper, glass, and plant fabrics.
          </p>
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group relative flex flex-col rounded-lg border border-border/40 bg-background overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transition-transform duration-550 group-hover:scale-103"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-350" />
              </div>
              <div className="flex flex-col flex-grow p-6">
                <h3 className="font-serif text-xl font-normal text-foreground tracking-wide mb-2">
                  {category.name}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed font-light mb-6 flex-grow line-clamp-3">
                  {category.description}
                </p>
                <Link
                  href={`/products?category=${category.id}`}
                  className="text-xs font-semibold tracking-wider text-foreground hover:text-primary transition-colors flex items-center gap-1.5 self-start"
                >
                  Explore Collection
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}