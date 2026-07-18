"use client";

import { useState } from "react";
import { Search, Sparkles, Clock, ArrowRight } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  category: "Wellness" | "Sustainability" | "Artisan Stories";
  excerpt: string;
  readTime: string;
  date: string;
  image: string;
}

const posts: BlogPost[] = [
  {
    id: "ayurveda-copper",
    title: "The Ayurvedic Science of Drinking Copper-Charged Water",
    category: "Wellness",
    excerpt: "Storing water overnight in copper vessels creates a natural alkaline water charging process (Tamra Jal). Learn the metabolic science behind this ancient health practice.",
    readTime: "5 min read",
    date: "July 12, 2026",
    image: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "cork-sustainability",
    title: "Cork: Portuguese Oak Bark Harvesting & Ethical Luxury",
    category: "Sustainability",
    excerpt: "Harvested by hand every nine years, cork oak forests are never cut down. Explore why cork represents the absolute pinnacle of vegan, cruelty-free, carbon-negative raw materials.",
    readTime: "6 min read",
    date: "June 28, 2026",
    image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "rajasthan-artisans",
    title: "Preserving Heritage Coppersmith Guilds in Jaipur",
    category: "Artisan Stories",
    excerpt: "Deep in the lanes of Jaipur, metalsmith families have hand-beaten copper since the 16th century. Meet the craftsmen shaping CraftOre's custom imperial sets.",
    readTime: "8 min read",
    date: "June 14, 2026",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "leather-care",
    title: "Caring for Vegetable-Tanned Full-Grain Leather Belts",
    category: "Sustainability",
    excerpt: "Unlike chrome-tanned mass leather, vegetable tannery leather breathes and darkens naturally. Discover the essential wax routines to keep your CraftOre belt supple for life.",
    readTime: "4 min read",
    date: "May 20, 2026",
    image: "https://images.unsplash.com/photo-1624222247344-550fb8ec5519?auto=format&fit=crop&q=80&w=800",
  },
];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [search, setSearch] = useState("");

  const categories = ["All", "Wellness", "Sustainability", "Artisan Stories"];

  const filteredPosts = posts.filter((post) => {
    const matchesCat = activeCategory === "All" || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="bg-background text-foreground py-16 transition-colors duration-300">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-luxury-gold font-semibold mb-2 block flex items-center justify-center gap-1.5">
            <Sparkles className="h-4 w-4" />
            THE CRAFTORE JOURNAL
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal tracking-wide text-foreground">
            Stories of Mindful Design
          </h1>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed font-light">
            Insights into wellness practices, sustainable materials, and the heritage craft lineages we support.
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-border/40 pb-8 mb-12">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded text-xs font-semibold tracking-wide border transition-all ${
                  activeCategory === cat
                    ? "bg-foreground text-background border-foreground"
                    : "bg-muted/40 hover:bg-muted border-border/40 text-muted-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative max-w-xs w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-md border border-border bg-background py-2 pl-9 pr-4 text-xs focus:border-luxury-gold focus:outline-none focus:ring-1 focus:ring-luxury-gold"
            />
          </div>
        </div>

        {/* Blog Post List */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="group flex flex-col bg-background rounded-lg border border-border/40 overflow-hidden hover:shadow-sm transition-all"
              >
                <div className="relative h-64 w-full bg-neutral-100 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 bg-background/90 text-foreground text-[9px] uppercase font-bold tracking-widest px-2.5 py-1 rounded">
                    {post.category}
                  </span>
                </div>
                <div className="flex flex-col flex-grow p-6">
                  <div className="flex items-center gap-4 text-[10px] text-muted-foreground uppercase tracking-wider mb-3">
                    <span>{post.date}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readTime}</span>
                  </div>
                  <h3 className="font-serif text-xl font-normal leading-snug tracking-wide text-foreground group-hover:text-primary transition-colors mb-3">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed font-light mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <button className="mt-auto text-xs font-semibold text-foreground flex items-center gap-1 hover:text-primary transition-colors self-start">
                    Read Article <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 border border-dashed border-border/40 rounded-lg">
            <p className="text-sm text-muted-foreground">No articles match your search criteria.</p>
          </div>
        )}

      </div>
    </div>
  );
}