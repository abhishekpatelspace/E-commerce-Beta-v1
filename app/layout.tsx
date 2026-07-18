import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { CartProvider } from "@/hooks/useCart";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "CraftOre | Premium Sustainable Lifestyle Products",
    template: "%s | CraftOre",
  },
  description: "Discover handcrafted copper bottles, premium leather belts, vegan leather accessories, and bespoke corporate gifts. Scalable D2C + B2B luxury ecommerce.",
  keywords: [
    "copper bottles",
    "leather belts",
    "vegan leather",
    "handcrafted bags",
    "luxury gifts",
    "corporate bulk orders",
    "sustainable lifestyle",
    "CraftOre",
  ],
  authors: [{ name: "CraftOre Team" }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans min-h-screen bg-background text-foreground antialiased`}
        suppressHydrationWarning
      >
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
