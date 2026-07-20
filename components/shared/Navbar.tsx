"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Heart, ShoppingBag, User, Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/hooks/useCart";



const navigation = [
  { name: "Home", href: "/" },
  { name: "Shop All", href: "/products" },
  {
    name: "Categories",
    href: "/categories",
    children: [
      { name: "Copper Bottles", href: "/products?category=copper-bottles" },
      { name: "Copper Gift Sets", href: "/products?category=copper-gift-sets" },
      { name: "Glass Bottles", href: "/products?category=glass-bottles" },
      { name: "Leather Belts", href: "/products?category=leather-belts" },
      { name: "Vegan Belts", href: "/products?category=vegan-belts" },
      { name: "Handcrafted Bags", href: "/products?category=bags" },
      { name: "Accessories", href: "/products?category=handcrafted-accessories" },
      { name: "Corporate Gifts", href: "/products?category=corporate-gifts" },
    ],
  },
  { name: "B2B Portal", href: "/b2b" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { cartCount: cartItemCount } = useCart();
  const [wishlistCount, setWishlistCount] = useState(0);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) {
      setMobileCategoriesOpen(false);
    }
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!mounted) return;
    const checkWishlist = () => {
      const stored = localStorage.getItem("craftore_wishlist");
      if (stored) {
        try { setWishlistCount(JSON.parse(stored).length); } catch (e) {}
      }
    };
    checkWishlist();
    window.addEventListener("storage", checkWishlist);
    return () => window.removeEventListener("storage", checkWishlist);
  }, [mounted]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = (name: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(name);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };

  const isHomepage = pathname === "/";

  return (
    <header
      className={cn(
        "z-50 w-full transition-all duration-300",
        scrolled
          ? "sticky top-0 bg-background/95 backdrop-blur-xl shadow-sm border-b border-border/40"
          : isHomepage
          ? "absolute top-0 bg-transparent border-b border-white/5"
          : "sticky top-0 bg-background/95 backdrop-blur-xl border-b border-border/40"
      )}
    >
      {/* Announcement Bar */}
      {!scrolled && (
        <div className="bg-luxury-charcoal text-white text-center py-2 text-[10px] font-medium tracking-[0.2em] uppercase">
          <span className="text-luxury-gold">✦</span>
          {" "}Free shipping on orders over ₹8000{" "}
          <span className="text-neutral-400">•</span>
          {" "}Use code <span className="text-luxury-gold font-bold">WELCOME10</span> for 10% off{" "}
          <span className="text-luxury-gold">✦</span>
        </div>
      )}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Mobile Menu Trigger */}
            <div className="flex md:hidden">
              <motion.button
                type="button"
                whileTap={{ scale: 0.9 }}
                className={cn(
                  "-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 transition-colors",
                  isHomepage && !scrolled ? "text-white/80 hover:text-white" : "text-muted-foreground hover:text-foreground"
                )}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" strokeWidth={1.5} />
                ) : (
                  <Menu className="h-6 w-6" strokeWidth={1.5} />
                )}
              </motion.button>
            </div>

            {/* Logo */}
            <div className="flex flex-1 justify-center md:justify-start">
              <Link
                href="/"
                className="flex items-center gap-3 group transition-transform active:scale-[0.98] duration-200"
              >
                <img
                  src="/logo.png"
                  alt="CraftOre Logo"
                  className="h-9 w-auto object-contain rounded-md"
                />
                <span
                  className={cn(
                    "font-serif text-base sm:text-lg md:text-xl tracking-[0.15em] sm:tracking-[0.2em] font-semibold transition-all uppercase",
                    isHomepage && !scrolled
                      ? "text-white"
                      : "text-foreground"
                  )}
                >
                  CraftOre
                </span>
              </Link>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href;

                if (item.children) {
                  const isChildActive = pathname.startsWith("/products") || pathname === "/categories";
                  return (
                    <div
                      key={item.name}
                      className="relative"
                      onMouseEnter={() => handleMouseEnter(item.name)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <motion.button
                        whileTap={{ scale: 0.96 }}
                        whileHover={{ scale: 1.02 }}
                        onClick={(e) => {
                          e.preventDefault();
                          if (activeDropdown === item.name) {
                            setActiveDropdown(null);
                          } else {
                            if (timeoutRef.current) clearTimeout(timeoutRef.current);
                            setActiveDropdown(item.name);
                          }
                        }}
                        className={cn(
                          "flex items-center gap-1 text-[13px] font-medium tracking-wide px-3 py-2 rounded-md transition-all",
                          isHomepage && !scrolled
                            ? "text-white/80 hover:text-white hover:bg-white/10"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                          isChildActive && "text-foreground font-semibold"
                        )}
                      >
                        {item.name}
                        <ChevronDown className={cn(
                          "h-3 w-3 transition-transform duration-200",
                          activeDropdown === item.name && "rotate-180"
                        )} />
                      </motion.button>

                      <AnimatePresence>
                        {activeDropdown === item.name && (
                           <motion.div
                             initial={{ opacity: 0, y: 8, scale: 0.96 }}
                             animate={{ opacity: 1, y: 0, scale: 1 }}
                             exit={{ opacity: 0, y: 8, scale: 0.96 }}
                             transition={{ duration: 0.15, ease: "easeOut" }}
                             className="absolute left-0 mt-1 w-60 rounded-xl border border-border/40 bg-background/95 backdrop-blur-xl shadow-xl overflow-hidden z-50"
                          >
                            <div className="py-2">
                              {item.children.map((child) => (
                                 <Link
                                   key={child.name}
                                   href={child.href}
                                   className="block px-4 py-2.5 text-[13px] text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
                                 >
                                   {child.name}
                                 </Link>
                               ))}
                               <div className="border-t border-border/40 mt-1 pt-1">
                                 <Link
                                   href="/categories"
                                   className="block px-4 py-2 text-[13px] font-medium text-luxury-gold hover:text-luxury-gold/80 hover:bg-muted/50 transition-all"
                                 >
                                   View All Categories
                                 </Link>
                               </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "text-[13px] font-medium tracking-wide px-3 py-2 rounded-md relative block transition-all duration-200 hover:scale-[1.02] active:scale-[0.96]",
                      isHomepage && !scrolled
                        ? "text-white/80 hover:text-white hover:bg-white/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                      isActive && (isHomepage && !scrolled ? "text-white" : "text-foreground font-semibold")
                    )}
                  >
                    {item.name}
                    {mounted && isActive && (
                      <motion.span
                        layoutId="navIndicator"
                        className="absolute bottom-0 left-3 right-3 h-[2px] bg-luxury-gold rounded-full"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Icons */}
            <div className="flex items-center gap-0.5 sm:gap-1 flex-1 justify-end">
              <Link
                href="/products?search=true"
                className={cn(
                  "hidden md:inline-flex p-2.5 rounded-full transition-all duration-200 hover:scale-105 active:scale-90",
                  isHomepage && !scrolled ? "text-white/80 hover:text-white hover:bg-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
                title="Search"
              >
                <Search className="h-[18px] w-[18px]" strokeWidth={1.5} />
              </Link>

              <Link
                href="/account"
                className={cn(
                  "hidden md:inline-flex p-2.5 rounded-full transition-all duration-200 hover:scale-105 active:scale-90",
                  isHomepage && !scrolled ? "text-white/80 hover:text-white hover:bg-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
                title="My Account"
              >
                <User className="h-[18px] w-[18px]" strokeWidth={1.5} />
              </Link>

              <Link
                href="/account?tab=wishlist"
                className={cn(
                  "hidden md:inline-flex relative p-2.5 rounded-full transition-all duration-200 hover:scale-105 active:scale-90",
                  isHomepage && !scrolled ? "text-white/80 hover:text-white hover:bg-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
                title="Wishlist"
              >
                <Heart className="h-[18px] w-[18px]" strokeWidth={1.5} />
                {wishlistCount > 0 && (
                  <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-luxury-gold text-[9px] font-bold text-neutral-900">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <Link
                href="/cart"
                className={cn(
                  "relative p-2.5 rounded-full transition-all duration-200 hover:scale-105 active:scale-90",
                  isHomepage && !scrolled ? "text-white/80 hover:text-white hover:bg-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
                title="Shopping Cart"
              >
                <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.5} />
                {cartItemCount > 0 && (
                  <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-luxury-gold text-[9px] font-bold text-neutral-900">
                    {cartItemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="md:hidden bg-background border-b border-border/40 overflow-hidden"
            >
              <div className="space-y-1 px-4 pb-6 pt-3">
                {/* Mobile Search Bar */}
                <div className="mb-4 relative px-3">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const formData = new FormData(e.currentTarget);
                      const query = formData.get("search")?.toString() || "";
                      setMobileMenuOpen(false);
                      window.location.href = `/products?search=${encodeURIComponent(query)}`;
                    }}
                  >
                    <Search className="absolute left-6 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground/60" />
                    <input
                      type="search"
                      name="search"
                      placeholder="Search products..."
                      className="w-full rounded-full border border-border bg-background py-2 pl-9 pr-4 text-xs focus:border-luxury-gold focus:outline-none transition-colors"
                    />
                  </form>
                </div>

                {navigation.map((item) => (
                  <div key={item.name} className="py-1">
                    {item.children ? (
                      <div>
                        <motion.button
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setMobileCategoriesOpen(!mobileCategoriesOpen)}
                          className="flex w-full items-center justify-between px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-all"
                        >
                          <span>{item.name}</span>
                          <ChevronDown className={cn(
                            "h-4 w-4 transition-transform duration-200",
                            mobileCategoriesOpen && "rotate-180"
                          )} />
                        </motion.button>
                        <AnimatePresence initial={false}>
                          {mobileCategoriesOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <div className="space-y-0.5 pl-4 mt-1 border-l border-border/40 ml-3">
                                {item.children.map((child) => (
                                  <Link
                                    key={child.name}
                                    href={child.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200 active:scale-[0.98]"
                                  >
                                    {child.name}
                                  </Link>
                                ))}
                                <Link
                                  href="/categories"
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="block rounded-lg px-3 py-2 text-sm font-medium text-luxury-gold hover:bg-muted/50 transition-all duration-200 active:scale-[0.98]"
                                >
                                  View All Categories
                                </Link>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "block rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200 active:scale-[0.98]",
                          pathname === item.href && "text-foreground bg-muted/30"
                        )}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}

                {/* Mobile User Quick Links */}
                <div className="grid grid-cols-2 gap-2 px-3 py-2 border-t border-border/40 mt-3 pt-3">
                  <Link
                    href="/account"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-lg border border-border/60 py-2.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/10 transition-colors"
                  >
                    <User className="h-4 w-4" />
                    My Account
                  </Link>
                  <Link
                    href="/account?tab=wishlist"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-lg border border-border/60 py-2.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/10 transition-colors"
                  >
                    <Heart className="h-4 w-4 text-destructive" />
                    Wishlist ({wishlistCount})
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
    </header>
  );
}