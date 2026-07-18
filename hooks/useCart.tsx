"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: string; // combination of productId and variantId
  productId: string;
  variantId: string;
  name: string; // displays variant detail description
  productName: string;
  variantName: string;
  sku: string;
  price: number;
  quantity: number;
  image: string;
  moq?: number; // wholesale MOQ threshold
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "id">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);

  // Load cart from localStorage only on client-side mount to prevent hydration mismatch
  useEffect(() => {
    const stored = localStorage.getItem("vanyara_cart");
    if (stored) {
      try {
        setCart(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse cart storage: ", e);
      }
    }
    setMounted(true);
  }, []);

  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem("vanyara_cart", JSON.stringify(newCart));
  };

  const addToCart = (item: Omit<CartItem, "id">) => {
    const id = `${item.productId}-${item.variantId}`;
    const existingIndex = cart.findIndex((i) => i.id === id);

    if (existingIndex > -1) {
      const newCart = [...cart];
      newCart[existingIndex].quantity += item.quantity;
      saveCart(newCart);
    } else {
      saveCart([...cart, { ...item, id }]);
    }
  };

  const removeFromCart = (id: string) => {
    saveCart(cart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    saveCart(
      cart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    saveCart([]);
  };

  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Return provider wrapper with initial loading indicators to align with Next.js compilation rules
  return (
    <CartContext.Provider
      value={{
        cart: mounted ? cart : [],
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal: mounted ? cartTotal : 0,
        cartCount: mounted ? cartCount : 0,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
