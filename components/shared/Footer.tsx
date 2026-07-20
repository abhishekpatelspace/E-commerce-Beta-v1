"use client";

import Link from "next/link";
import { Instagram, Twitter, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-luxury-charcoal text-neutral-400">
      {/* Main Grid */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2 pr-8">
            <div className="flex items-center gap-3 mb-5">
              <img
                src="/logo.png"
                alt="CraftOre Logo"
                className="h-9 w-auto object-contain rounded-md"
              />
              <span className="font-serif text-xl tracking-[0.2em] font-semibold text-white uppercase">
                CraftOre
              </span>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-neutral-400/80 max-w-sm">
              Handcrafted premium sustainable lifestyle products — from pure copper vessels to vegetable-tanned leather goods. Designed by heritage Indian artisans.
            </p>
            <div className="mt-6 flex space-x-3">
              {[
                { icon: Instagram, label: "Instagram" },
                { icon: Twitter, label: "Twitter" },
                { icon: Facebook, label: "Facebook" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-luxury-gold/20 hover:text-luxury-gold flex items-center justify-center transition-all duration-300"
                  title={label}
                >
                  <Icon className="h-4 w-4" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Collections */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-luxury-gold mb-5">Collections</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/products?category=copper-bottles" className="hover:text-white transition-colors">Copper Bottles</Link></li>
              <li><Link href="/products?category=copper-gift-sets" className="hover:text-white transition-colors">Gift Sets</Link></li>
              <li><Link href="/products?category=glass-bottles" className="hover:text-white transition-colors">Glass Bottles</Link></li>
              <li><Link href="/products?category=leather-belts" className="hover:text-white transition-colors">Leather Belts</Link></li>
              <li><Link href="/products?category=vegan-belts" className="hover:text-white transition-colors">Vegan Belts</Link></li>
            </ul>
          </div>

          {/* Business */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-luxury-gold mb-5">Business</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/b2b" className="hover:text-white transition-colors">Wholesale Portal</Link></li>
              <li><Link href="/contact?type=corporate" className="hover:text-white transition-colors">Corporate Gifting</Link></li>
              <li><Link href="/admin" className="hover:text-white transition-colors">Admin Dashboard</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-luxury-gold mb-5">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">Our Story</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Journal</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/account" className="hover:text-white transition-colors">My Account</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>&copy; {new Date().getFullYear()} CraftOre Global. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-neutral-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-neutral-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-neutral-300 transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}