"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search, SlidersHorizontal, ArrowUpDown, Plus, Check, ChevronLeft, ChevronRight, Grid3X3, LayoutList } from "lucide-react";
import { products, categories } from "@/lib/mockData";
import { useCart } from "@/hooks/useCart";

const ITEMS_PER_PAGE = 12;

function ProductsCatalog() {
  const searchParams = useSearchParams();
  const { addToCart } = useCart();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceFilter, setPriceFilter] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [addedProductId, setAddedProductId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    const catParam = searchParams.get("category");
    if (catParam) setSelectedCategory(catParam);
    const searchParam = searchParams.get("search");
    if (searchParam && searchParam !== "true") setSearch(searchParam);
  }, [searchParams]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedCategory, priceFilter, sortBy]);

  const handleQuickAdd = (e: React.MouseEvent, product: typeof products[0]) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultVariant = product.variants[0];
    addToCart({
      productId: product.id,
      variantId: defaultVariant?.id || "default",
      productName: product.name,
      variantName: defaultVariant?.name || "Standard",
      name: `${product.name} - ${defaultVariant?.name || "Standard"}`,
      sku: defaultVariant?.sku || `VYN-${product.id.slice(0, 3).toUpperCase()}`,
      price: defaultVariant?.price || product.price,
      quantity: 1,
      image: product.images[0],
      moq: product.moq,
    });
    setAddedProductId(product.id);
    setTimeout(() => setAddedProductId(null), 2000);
  };

  const filteredProducts = products.filter((product) => {
    const matchesCat = selectedCategory === "All" || product.categoryId === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase());
    let matchesPrice = true;
    if (priceFilter === "under-4000") matchesPrice = product.price < 4000;
    else if (priceFilter === "4000-8000") matchesPrice = product.price >= 4000 && product.price <= 8000;
    else if (priceFilter === "over-8000") matchesPrice = product.price > 8000;
    return matchesCat && matchesSearch && matchesPrice;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const getCategoryLabel = (id: string) => {
    const cat = categories.find((c) => c.id === id);
    return cat ? cat.name : id.replace(/-/g, " ");
  };

  return (
    <div className="bg-background text-foreground py-12 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Page Header */}
        <div className="border-b border-border/40 pb-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-luxury-gold font-semibold mb-1 block">Our Collection</span>
              <h1 className="font-serif text-3xl sm:text-4xl font-normal tracking-wide">Catalog Showcase</h1>
              <p className="mt-2 text-sm text-muted-foreground font-light">
                Showing {sortedProducts.length} premium sustainable items.
              </p>
            </div>
            <div className="flex items-center gap-3 w-full md:max-w-xs justify-between md:justify-end">
              {/* Mobile Filter Toggle Button */}
              <button
                onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                className="flex lg:hidden items-center gap-2 px-4 py-2.5 rounded-md border border-border bg-background text-xs font-semibold hover:bg-muted/50 transition-colors"
              >
                <SlidersHorizontal className="h-4 w-4" />
                {mobileFiltersOpen ? "Hide Filters" : "Filters & Sort"}
              </button>
              <div className="relative max-w-xs w-full">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-md border border-border bg-background py-2.5 pl-9 pr-4 text-sm focus:border-luxury-gold focus:outline-none focus:ring-1 focus:ring-luxury-gold transition-colors"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* Sidebar Filters */}
          <div className={`lg:col-span-1 space-y-6 ${mobileFiltersOpen ? "block" : "hidden lg:block"}`}>
            {/* Category Filter */}
            <div className="border border-border/40 rounded-xl p-5 bg-card">
              <h3 className="text-xs font-semibold uppercase tracking-wider mb-4 flex items-center gap-1.5 text-foreground">
                <SlidersHorizontal className="h-3.5 w-3.5" />
                Filter Categories
              </h3>
              <div className="space-y-1">
                <button
                  onClick={() => setSelectedCategory("All")}
                  className={`block w-full text-left text-xs font-medium transition-all py-2 px-3 rounded-md ${
                    selectedCategory === "All"
                      ? "bg-foreground text-background font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  All Products ({products.length})
                </button>
                {categories.map((cat) => {
                  const count = products.filter((p) => p.categoryId === cat.id).length;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`block w-full text-left text-xs font-medium transition-all py-2 px-3 rounded-md ${
                        selectedCategory === cat.id
                          ? "bg-foreground text-background font-semibold"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      }`}
                    >
                      {cat.name} ({count})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Filter */}
            <div className="border border-border/40 rounded-xl p-5 bg-card">
              <h3 className="text-xs font-semibold uppercase tracking-wider mb-4 text-foreground">
                Filter by Price
              </h3>
              <div className="space-y-1">
                {[
                  { label: "All Prices", value: "All" },
                  { label: "Under ₹4000", value: "under-4000" },
                  { label: "₹4000 to ₹8000", value: "4000-8000" },
                  { label: "Over ₹8000", value: "over-8000" },
                ].map((price) => (
                  <button
                    key={price.value}
                    onClick={() => setPriceFilter(price.value)}
                    className={`block w-full text-left text-xs font-medium transition-all py-2 px-3 rounded-md ${
                      priceFilter === price.value
                        ? "bg-foreground text-background font-semibold"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                  >
                    {price.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div className="border border-border/40 rounded-xl p-5 bg-card">
              <h3 className="text-xs font-semibold uppercase tracking-wider mb-4 flex items-center gap-1.5 text-foreground">
                <ArrowUpDown className="h-3.5 w-3.5" />
                Sort Catalog
              </h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-luxury-gold transition-colors"
              >
                <option value="featured">Best Matches</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Average Rating</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {paginatedProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {paginatedProducts.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.id}`}
                      className="group relative flex flex-col bg-card rounded-xl border border-border/40 overflow-hidden hover:shadow-lg hover:border-border transition-all duration-300"
                    >
                      <div className="relative aspect-[4/3] w-full bg-neutral-100 overflow-hidden">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {product.rating >= 4.8 && (
                          <span className="absolute left-3 top-3 bg-luxury-gold/90 text-neutral-900 text-[9px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-md">
                            Top Rated
                          </span>
                        )}
                        <button
                          onClick={(e) => handleQuickAdd(e, product)}
                          className="absolute right-3 bottom-3 p-2.5 rounded-full bg-background/90 backdrop-blur-sm text-foreground hover:bg-foreground hover:text-background shadow-md transition-all duration-200 hover:scale-110"
                          title="Quick Add to Cart"
                        >
                          {addedProductId === product.id ? (
                            <Check className="h-4 w-4 text-emerald-600" />
                          ) : (
                            <Plus className="h-4 w-4" />
                          )}
                        </button>
                      </div>

                      <div className="flex flex-col flex-1 p-5">
                        <span className="text-[9px] text-muted-foreground uppercase tracking-widest mb-1.5">
                          {getCategoryLabel(product.categoryId)}
                        </span>
                        <h3 className="font-serif text-sm font-normal tracking-wide text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                          {product.name}
                        </h3>
                        <p className="mt-1.5 text-xs text-muted-foreground font-light line-clamp-2 leading-relaxed">
                          {product.description}
                        </p>

                        <div className="mt-auto flex items-center justify-between pt-4 border-t border-border/30 mt-4">
                          <span className="text-base font-semibold text-foreground">₹{product.price}</span>
                          <div className="flex items-center gap-1">
                            <span className="text-amber-500 text-xs">★</span>
                            <span className="text-[11px] text-muted-foreground font-semibold">{product.rating}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-12 pt-8 border-t border-border/30">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="flex items-center gap-1 text-xs font-semibold px-4 py-2.5 rounded-md border border-border/40 hover:bg-muted/50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="h-3.5 w-3.5" />
                      Previous
                    </button>
                    
                    <div className="flex items-center gap-1 mx-2">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-9 h-9 rounded-md text-xs font-semibold transition-all ${
                            currentPage === page
                              ? "bg-foreground text-background shadow-sm"
                              : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="flex items-center gap-1 text-xs font-semibold px-4 py-2.5 rounded-md border border-border/40 hover:bg-muted/50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      Next
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-24 border border-dashed border-border/40 rounded-xl">
                <Search className="h-10 w-10 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-sm text-muted-foreground font-medium">No products found matching your criteria.</p>
                <button
                  onClick={() => {
                    setSearch("");
                    setSelectedCategory("All");
                    setPriceFilter("All");
                  }}
                  className="mt-4 text-xs font-semibold text-primary hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default function Products() {
  return (
    <Suspense fallback={<div className="py-24 text-center text-sm text-muted-foreground">Loading catalog...</div>}>
      <ProductsCatalog />
    </Suspense>
  );
}