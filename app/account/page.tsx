"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { User, LogOut, Package, Heart, Settings, Key, CheckCircle, Mail, HelpCircle, MessageSquare } from "lucide-react";
import { products } from "@/lib/mockData";
import { jsPDF } from "jspdf";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from "firebase/auth";

interface OrderDetail {
  orderId: string;
  date: string;
  placedAt?: string;
  processedAt?: string;
  cancelledAt?: string;
  itemsCount: number;
  total: number;
  status: string;
  shippingAddress: any;
  adminRemarks?: string;
  discount?: number;
  shippingCost?: number;
  tax?: number;
  items?: any[];
  customerEmail?: string;
  paymentMethod?: string;
}

export default function Account() {
  const backendUrl = "";
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("orders");
  
  // Auth Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  // Sign Up states
  const [isSignUp, setIsSignUp] = useState(false);
  const [signUpName, setSignUpName] = useState("");
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Recovery states
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [recoveryOtp, setRecoveryOtp] = useState("");

  // User order search and filters
  const [userSearchQuery, setUserSearchQuery] = useState("");
  const [userStatusFilter, setUserStatusFilter] = useState("All");

  // Profile states
  const [orders, setOrders] = useState<OrderDetail[]>([]);
  const [wishlist, setWishlist] = useState<typeof products>([]);
  const [name, setName] = useState("John Doe");
  const [address, setAddress] = useState("Sector 5, Jaipur, Rajasthan");
  const [profileSaved, setProfileSaved] = useState(false);
  const [gender, setGender] = useState("Male");
  const [dob, setDob] = useState("");
  const [nationality, setNationality] = useState("");

  // Expanded order detail view
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  // Cancel order modal states
  const [cancelModal, setCancelModal] = useState<{ open: boolean; orderId: string; loading: boolean; error: string; success: string }>({
    open: false, orderId: "", loading: false, error: "", success: ""
  });

  const filteredUserOrders = (orders || []).filter((order) => {
    const shippingName = order.shippingAddress?.name || "";
    const matchesSearch = 
      order.orderId.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
      shippingName.toLowerCase().includes(userSearchQuery.toLowerCase());
    const matchesStatus = userStatusFilter === "All" || order.status === userStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // Sync state
  useEffect(() => {
    const userFlag = localStorage.getItem("craftore_user");
    if (userFlag) {
      setIsLoggedIn(true);
      const parsed = JSON.parse(userFlag);
      setName(parsed.name || "John Doe");
      setEmail(parsed.email || "dev@craftore.com");
      setGender(parsed.gender || "Male");
      setDob(parsed.dob || "");
      setNationality(parsed.nationality || "");
    }

    // Load orders from database & localstorage
    const fetchOrders = async () => {
      try {
        const userFlag = localStorage.getItem("craftore_user");
        let emailQuery = "";
        let token = "";
        if (userFlag) {
          try {
            const parsed = JSON.parse(userFlag);
            if (parsed.email) {
              emailQuery = `?email=${encodeURIComponent(parsed.email)}`;
            }
            if (parsed.token) {
              token = parsed.token;
            }
          } catch (e) {}
        }
        const res = await fetch(`${backendUrl}/api/orders${emailQuery}`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        const storedOrders = localStorage.getItem("craftore_orders");
        let localList = [];
        if (storedOrders) {
          try {
            localList = JSON.parse(storedOrders);
            if (userFlag) {
              const parsed = JSON.parse(userFlag);
              if (parsed.email) {
                localList = localList.filter((o: any) => o.customerEmail === parsed.email);
              }
            }
          } catch (e) {}
        }
        if (res.ok) {
          const dbOrders = await res.json();
          // Merge by orderId to keep list unique
          const mergedMap = new Map();
          [...dbOrders, ...localList].forEach((o) => {
            if (o.orderId) mergedMap.set(o.orderId, o);
          });
          // Sort by date descending
          const sorted = Array.from(mergedMap.values()).sort((a: any, b: any) => {
            return new Date(b.date || b.placedAt).getTime() - new Date(a.date || a.placedAt).getTime();
          });
          setOrders(sorted);
        } else {
          setOrders(localList);
        }
      } catch (err) {
        console.error("Failed to fetch database orders:", err);
        const storedOrders = localStorage.getItem("craftore_orders");
        if (storedOrders) {
          try {
            setOrders(JSON.parse(storedOrders));
          } catch (e) {}
        }
      }
    };
    fetchOrders();

    // Load wishlist
    const storedWishlist = localStorage.getItem("craftore_wishlist");
    if (storedWishlist) {
      try {
        const ids: string[] = JSON.parse(storedWishlist);
        const matching = products.filter((p) => ids.includes(p.id));
        setWishlist(matching);
      } catch (e) {}
    }
  }, [isLoggedIn]);

  // Auth Handlers
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegisterSuccess(false);
    setSuccessMessage("");
    try {
      let data;
      let token = "";
      
      // Try Firebase authentication first
      const isFirebaseMock = !process.env.NEXT_PUBLIC_FIREBASE_API_KEY || process.env.NEXT_PUBLIC_FIREBASE_API_KEY === "mock_api_key";
      if (!isFirebaseMock) {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          token = await userCredential.user.getIdToken();
          
          data = {
            name: userCredential.user.displayName || email.split("@")[0],
            email: userCredential.user.email,
            role: email === "abhishekpatelspace@gmail.com" ? "admin" : "customer",
            token: token
          };
        } catch (fbErr: any) {
          console.warn("Firebase sign in failed, falling back to local auth:", fbErr.message);
        }
      }
      
      // Fallback to local Express API login if Firebase skipped or failed
      if (!data) {
        const res = await fetch(`${backendUrl}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password })
        });
        data = await res.json();
        if (!res.ok) {
          setAuthError(data.error || "Invalid credentials.");
          return;
        }
        
        if (res.status === 202 && data.requiresVerification) {
          setOtpSent(true);
          setAuthError("");
          return;
        }
      }

      localStorage.setItem("craftore_user", JSON.stringify(data));
      setIsLoggedIn(true);
      setAuthError("");
    } catch (err) {
      setAuthError("Failed to connect to authentication server.");
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("");
    if (password !== signUpConfirmPassword) {
      setAuthError("Passwords do not match!");
      return;
    }
    
    try {
      let success = false;
      const isFirebaseMock = !process.env.NEXT_PUBLIC_FIREBASE_API_KEY || process.env.NEXT_PUBLIC_FIREBASE_API_KEY === "mock_api_key";
      
      if (!isFirebaseMock) {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const token = await userCredential.user.getIdToken();
          
          // Sync profile to MongoDB backend
          const syncRes = await fetch(`${backendUrl}/api/auth/sync-profile`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
              name: signUpName,
              gender,
              dob,
              nationality
            })
          });
          
          if (syncRes.ok) {
            success = true;
            setSuccessMessage("Account created successfully with Firebase Auth! Use the credentials to login.");
            setIsSignUp(false);
            setPassword("");
          } else {
            const syncData = await syncRes.json();
            setAuthError(syncData.error || "Profile sync failed.");
            return;
          }
        } catch (fbErr: any) {
          console.warn("Firebase sign up failed, falling back to local signup:", fbErr.message);
        }
      }
      
      if (!success) {
        const res = await fetch(`${backendUrl}/api/auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: signUpName, email, password, gender, dob, nationality })
        });
        const data = await res.json();
        if (!res.ok) {
          setAuthError(data.error || "Registration failed.");
          return;
        }
        
        setOtpSent(true);
        setIsRegisterSuccess(true);
        setAuthError("");
      }
    } catch (err) {
      setAuthError("Failed to connect to authentication server.");
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegisterSuccess(false);
    setSuccessMessage("");
    try {
      const res = await fetch(`${backendUrl}/api/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (!res.ok) {
        setAuthError(data.error || "Failed to trigger OTP.");
        return;
      }
      
      setOtpSent(true);
      setAuthError("");
    } catch (err) {
      setAuthError("Failed to connect to authentication server.");
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${backendUrl}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp })
      });
      const data = await res.json();
      if (!res.ok) {
        setAuthError(data.error || "Invalid OTP code.");
        return;
      }
      
      setSuccessMessage("Account created successfully! Use the credentials received on your mail or the ones you created to login.");
      setAuthError("");
      setOtpSent(false);
      setIsSignUp(false);
      setPassword("");
    } catch (err) {
      setAuthError("Failed to connect to authentication server.");
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setSuccessMessage("");
    const isFirebaseMock = !process.env.NEXT_PUBLIC_FIREBASE_API_KEY || process.env.NEXT_PUBLIC_FIREBASE_API_KEY === "mock_api_key";

    if (!isFirebaseMock) {
      try {
        await sendPasswordResetEmail(auth, email);
        setSuccessMessage("A password reset link has been sent to your email address by Firebase.");
        setIsForgotPassword(false);
        return;
      } catch (fbErr: any) {
        console.warn("Firebase password reset failed, falling back to local auth:", fbErr.message);
      }
    }

    // Local / fallback auth: Trigger reset OTP
    try {
      const res = await fetch(`${backendUrl}/api/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (!res.ok) {
        setAuthError(data.error || "Failed to trigger recovery OTP. Make sure the email is registered.");
        return;
      }
      setSuccessMessage("A recovery code has been sent to your email. Please enter it below to set a new password.");
      setIsForgotPassword(false);
      setIsResetPassword(true);
      setRecoveryOtp("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (err) {
      setAuthError("Failed to connect to authentication server. If you are using local MongoDB auth, make sure your local Node.js backend is running and NEXT_PUBLIC_NODE_BACKEND_URL is set correctly.");
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setSuccessMessage("");

    if (newPassword !== confirmNewPassword) {
      setAuthError("New passwords do not match.");
      return;
    }

    try {
      const res = await fetch(`${backendUrl}/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: recoveryOtp, newPassword })
      });
      const data = await res.json();
      if (!res.ok) {
        setAuthError(data.error || "Failed to reset password. Verify the code and try again.");
        return;
      }
      setSuccessMessage("Password reset successfully! Please log in with your new password.");
      setIsResetPassword(false);
      setPassword("");
    } catch (err) {
      setAuthError("Failed to connect to authentication server. If you are using local MongoDB auth, make sure your local Node.js backend is running and NEXT_PUBLIC_NODE_BACKEND_URL is set correctly.");
    }
  };

  const handleSignOut = () => {
    signOut(auth).catch(() => {});
    localStorage.removeItem("craftore_user");
    setIsLoggedIn(false);
  };

  const handleGoogleSignIn = async () => {
    setAuthError("");
    setSuccessMessage("");
    const isFirebaseMock = !process.env.NEXT_PUBLIC_FIREBASE_API_KEY || process.env.NEXT_PUBLIC_FIREBASE_API_KEY === "mock_api_key";
    
    if (isFirebaseMock) {
      // Fallback mock behavior for local developer mode
      const user = { name: "Google Dev User", email: "google-dev@craftore.com", token: "google_oauth_token", role: "customer" };
      localStorage.setItem("craftore_user", JSON.stringify(user));
      setIsLoggedIn(true);
      return;
    }

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      
      // Sync profile details to MongoDB backend
      await fetch(`${backendUrl}/api/auth/sync-profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          name: result.user.displayName || result.user.email?.split("@")[0] || "Google User",
          gender: "Male",
          dob: "",
          nationality: ""
        })
      });

      const data = {
        name: result.user.displayName || result.user.email?.split("@")[0] || "Google User",
        email: result.user.email,
        role: result.user.email === "abhishekpatelspace@gmail.com" ? "admin" : "customer",
        token: token
      };

      localStorage.setItem("craftore_user", JSON.stringify(data));
      setIsLoggedIn(true);
    } catch (fbErr: any) {
      console.error("Firebase Google Login failed:", fbErr.message);
      setAuthError("Google Sign-In failed: " + (fbErr.message || "Please try again."));
    }
  };

  const handleCancelOrder = async (orderId: string) => {
    // Open confirmation modal instead of browser confirm()
    setCancelModal({ open: true, orderId, loading: false, error: "", success: "" });
  };

  const confirmCancelOrder = async () => {
    const orderId = cancelModal.orderId;
    setCancelModal(prev => ({ ...prev, loading: true, error: "" }));
    
    try {
      const userFlag = localStorage.getItem("craftore_user");
      let token = "";
      if (userFlag) {
        try {
          const parsed = JSON.parse(userFlag);
          token = parsed.token || "";
        } catch (e) {}
      }
      const res = await fetch(`${backendUrl}/api/orders/${orderId}/cancel`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (!res.ok) {
        setCancelModal(prev => ({ ...prev, loading: false, error: data.error || "Failed to cancel order." }));
        return;
      }
      
      // Update local state orders list
      const updated = orders.map((o) => 
        o.orderId === orderId 
          ? { ...o, status: "Cancelled", cancelledAt: new Date().toISOString() } 
          : o
      );
      setOrders(updated);
      
      // Also update local storage orders if stored there
      const stored = localStorage.getItem("craftore_orders");
      if (stored) {
        try {
          const list = JSON.parse(stored);
          const updatedLocal = list.map((o: any) => 
            o.orderId === orderId 
              ? { ...o, status: "Cancelled", cancelledAt: new Date().toISOString() } 
              : o
          );
          localStorage.setItem("craftore_orders", JSON.stringify(updatedLocal));
        } catch (e) {}
      }
      
      setCancelModal(prev => ({ ...prev, loading: false, success: "Order cancelled successfully." }));
      // Auto-close after 2 seconds on success
      setTimeout(() => setCancelModal({ open: false, orderId: "", loading: false, error: "", success: "" }), 2000);
    } catch (err) {
      setCancelModal(prev => ({ ...prev, loading: false, error: "Failed to connect to backend server." }));
    }
  };

  const handleDownloadInvoice = (order: OrderDetail) => {
    try {
      const doc = new jsPDF();
      
      // Set fonts and styles
      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.setTextColor(26, 26, 26);
      doc.text("CRAFTORE", 20, 25);
      
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(120, 120, 120);
      doc.text("Premium Sustainable Lifestyle Products", 20, 30);
      doc.text("GSTIN: 09AAACC4112D1Z6", 20, 34);
      doc.text("Email: support@craftore.com | Web: www.craftore.com", 20, 38);
      
      // Invoice label
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.setTextColor(197, 168, 128);
      doc.text("TAX INVOICE", 140, 25);
      
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(26, 26, 26);
      doc.text(`Invoice No: INV-${order.orderId.replace("CRO-ORD-", "")}`, 140, 32);
      doc.text(`Date: ${new Date(order.placedAt || order.date).toLocaleDateString("en-IN")}`, 140, 37);
      doc.text(`Order Ref: ${order.orderId}`, 140, 42);
      
      // Divider line
      doc.setDrawColor(229, 223, 213);
      doc.setLineWidth(0.5);
      doc.line(20, 48, 190, 48);
      
      // Bill To details
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text("BILL TO:", 20, 56);
      
      doc.setFont("helvetica", "normal");
      const shippingName = order.shippingAddress?.name || "Customer";
      const shippingAddr = typeof order.shippingAddress === "object"
        ? `${order.shippingAddress.address || ""}, ${order.shippingAddress.city || ""}, ${order.shippingAddress.zip || ""}`
        : (order.shippingAddress || "N/A");
      const shippingPhone = order.shippingAddress?.phone || "N/A";
      
      doc.text(shippingName, 20, 62);
      const splitAddress = doc.splitTextToSize(shippingAddr, 80);
      doc.text(splitAddress, 20, 67);
      doc.text(`Phone: ${shippingPhone}`, 20, 80);
      
      // Table headers
      let y = 92;
      doc.setFillColor(249, 246, 240);
      doc.rect(20, y, 170, 8, "F");
      
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.text("Sl.", 22, y + 5);
      doc.text("Item Details", 35, y + 5);
      doc.text("Qty", 120, y + 5);
      doc.text("Unit Price (INR)", 135, y + 5);
      doc.text("Amount (INR)", 165, y + 5);
      
      // Table items
      doc.setFont("helvetica", "normal");
      y += 8;
      
      const discount = order.discount || 0;
      const shippingCost = typeof order.shippingCost === "number" ? order.shippingCost : 100;

      let itemsSubtotal = 0;
      const items = order.items && order.items.length > 0 ? order.items : [
        { name: `Premium Package Items (${order.itemsCount} unit(s))`, quantity: order.itemsCount, price: (order.total - shippingCost - (order.tax || 0)) / order.itemsCount }
      ];
      
      items.forEach((item, idx) => {
        const itemAmt = item.price * item.quantity;
        itemsSubtotal += itemAmt;
        
        doc.line(20, y, 190, y);
        
        doc.text((idx + 1).toString(), 22, y + 6);
        const splitName = doc.splitTextToSize(item.name || "E-commerce Item", 75);
        doc.text(splitName, 35, y + 6);
        
        doc.text(item.quantity.toString(), 122, y + 6);
        doc.text(`Rs. ${Number(item.price).toFixed(2)}`, 137, y + 6);
        doc.text(`Rs. ${itemAmt.toFixed(2)}`, 167, y + 6);
        
        y += 10;
      });
      
      doc.line(20, y, 190, y);
      
      // Totals Breakdown
      y += 10;
      doc.setFont("helvetica", "normal");
      doc.text("Subtotal:", 120, y);
      doc.text(`Rs. ${itemsSubtotal.toFixed(2)}`, 165, y);
      
      if (discount > 0) {
        y += 6;
        doc.text("Discount Applied:", 120, y);
        doc.text(`-Rs. ${discount.toFixed(2)}`, 165, y);
      }
      
      const taxableAmount = Math.max(0, itemsSubtotal - discount);
      const gstRate = 8;
      const gstAmount = typeof order.tax === "number" ? order.tax : (taxableAmount * 0.08);

      y += 6;
      doc.text(`GST (${gstRate}%):`, 120, y);
      doc.text(`Rs. ${gstAmount.toFixed(2)}`, 165, y);
      
      y += 6;
      doc.text("Delivery Charges:", 120, y);
      doc.text(`Rs. ${shippingCost.toFixed(2)}`, 165, y);
      
      y += 8;
      doc.setDrawColor(26, 26, 26);
      doc.line(115, y - 4, 190, y - 4);
      doc.setFont("helvetica", "bold");
      doc.text("Grand Total:", 120, y);
      doc.text(`Rs. ${order.total.toFixed(2)}`, 165, y);
      doc.line(115, y + 2, 190, y + 2);
      
      // Footer terms
      y += 24;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(120, 120, 120);
      doc.text("Terms & Conditions:", 20, y);
      
      doc.setFont("helvetica", "normal");
      y += 4;
      doc.text("1. This is a computer-generated tax invoice and requires no physical signature.", 20, y);
      y += 4;
      doc.text("2. All disputes are subject to local jurisdiction authorities only.", 20, y);
      
      doc.save(`invoice_${order.orderId}.pdf`);
    } catch (err: any) {
      console.error("PDF generation failed:", err);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const currentUser = localStorage.getItem("craftore_user");
    if (currentUser) {
      const parsed = JSON.parse(currentUser);
      localStorage.setItem("craftore_user", JSON.stringify({ ...parsed, name, gender, dob, nationality }));
    }
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  };

  // Remove item from wishlist
  const handleRemoveWishlist = (productId: string) => {
    const updated = wishlist.filter((item) => item.id !== productId);
    setWishlist(updated);
    localStorage.setItem("craftore_wishlist", JSON.stringify(updated.map((item) => item.id)));
    // Dispatch standard storage event to update Navbar count
    window.dispatchEvent(new Event("storage"));
  };

  // If not logged in, show Auth Gate
  if (!isLoggedIn) {
    return (
      <div className="bg-background text-foreground py-20 transition-colors duration-300">
        <div className="mx-auto max-w-md px-4">
          <div className="border border-border/40 p-8 rounded-lg bg-background shadow-sm">
            <div className="text-center mb-8">
              <span className="text-xs uppercase tracking-[0.25em] text-luxury-gold font-semibold mb-1 block">SECURE GATEWAY</span>
              <h2 className="font-serif text-2xl font-normal text-foreground">Welcome to CraftOre</h2>
              <p className="text-xs text-muted-foreground mt-2 font-light">
                {isForgotPassword 
                  ? "Recover your account password." 
                  : isResetPassword 
                    ? "Enter your recovery OTP and new password."
                    : isSignUp 
                      ? "Create your customer account to start shopping." 
                      : "Sign in to track orders and save your wishlist catalog."}
              </p>
            </div>

            {authError && (
              <div className="bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 text-xs p-3 rounded text-center font-medium border border-red-200 dark:border-red-950/30 mb-5">
                {authError}
              </div>
            )}

            {successMessage && (
              <div className="bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 text-xs p-3.5 rounded text-center font-medium border border-emerald-200 dark:border-emerald-950/30 mb-5 leading-relaxed">
                {successMessage}
              </div>
            )}

            {/* Conditional Auth Gateway view */}
            {otpSent ? (
              /* OTP verification form */
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div className={`text-xs p-3.5 rounded leading-relaxed font-light mb-4 border ${
                  isRegisterSuccess 
                    ? "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-950/30"
                    : "bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-950/30"
                }`}>
                  {isRegisterSuccess ? (
                    <span><strong>Success!</strong> Account created. We have sent your 6-digit verification code to <strong className="text-foreground">{email}</strong>. Please check your email inbox.</span>
                  ) : (
                    <span>We have sent your 6-digit login verification code to <strong className="text-foreground">{email}</strong>. Please check your email inbox.</span>
                  )}
                </div>
                <div>
                  <label className="block text-[9px] font-semibold uppercase tracking-wider mb-1.5 text-muted-foreground">Enter 6-Digit OTP</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full text-center rounded border border-border bg-background px-3 py-2.5 text-sm tracking-[0.4em] font-semibold focus:outline-none focus:border-luxury-gold text-foreground"
                    placeholder="000000"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-foreground hover:bg-foreground/90 text-background py-2.5 rounded text-xs font-semibold tracking-wide transition-colors"
                >
                  Verify & Sign In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOtpSent(false);
                    setAuthError("");
                    setSuccessMessage("");
                  }}
                  className="w-full text-xs text-muted-foreground hover:text-foreground text-center block mt-3"
                >
                  Back to Login / Registration
                </button>
              </form>
            ) : isForgotPassword ? (
              /* Forgot Password Form */
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div>
                  <label className="block text-[9px] font-semibold uppercase tracking-wider mb-1.5 text-muted-foreground">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded border border-border bg-background px-3 py-2.5 text-xs focus:outline-none focus:border-luxury-gold text-foreground"
                    placeholder="john@example.com"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-foreground hover:bg-foreground/90 text-background py-2.5 rounded text-xs font-semibold tracking-wide transition-colors uppercase"
                >
                  Send Recovery Link / OTP
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsForgotPassword(false);
                    setAuthError("");
                    setSuccessMessage("");
                  }}
                  className="w-full text-xs text-muted-foreground hover:text-foreground text-center block mt-3"
                >
                  Back to Sign In
                </button>
              </form>
            ) : isResetPassword ? (
              /* Reset Password Form */
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div>
                  <label className="block text-[9px] font-semibold uppercase tracking-wider mb-1.5 text-muted-foreground">Enter 6-Digit OTP</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={recoveryOtp}
                    onChange={(e) => setRecoveryOtp(e.target.value)}
                    className="w-full text-center rounded border border-border bg-background px-3 py-2.5 text-sm tracking-[0.4em] font-semibold focus:outline-none focus:border-luxury-gold text-foreground"
                    placeholder="000000"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-semibold uppercase tracking-wider mb-1.5 text-muted-foreground">New Password</label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full rounded border border-border bg-background px-3 py-2.5 text-xs focus:outline-none focus:border-luxury-gold text-foreground"
                    placeholder="••••••••"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-semibold uppercase tracking-wider mb-1.5 text-muted-foreground">Confirm New Password</label>
                  <input
                    type="password"
                    required
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    className="w-full rounded border border-border bg-background px-3 py-2.5 text-xs focus:outline-none focus:border-luxury-gold text-foreground"
                    placeholder="••••••••"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-foreground hover:bg-foreground/90 text-background py-2.5 rounded text-xs font-semibold tracking-wide transition-colors uppercase"
                >
                  Reset Password
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsResetPassword(false);
                    setAuthError("");
                    setSuccessMessage("");
                  }}
                  className="w-full text-xs text-muted-foreground hover:text-foreground text-center block mt-3"
                >
                  Back to Sign In
                </button>
              </form>
            ) : isSignUp ? (
              /* Create Account / SignUp Form */
              <form onSubmit={handleSignUp} className="space-y-4">
                <div>
                  <label className="block text-[9px] font-semibold uppercase tracking-wider mb-1.5 text-muted-foreground">Full Name</label>
                  <input
                    type="text"
                    required
                    value={signUpName}
                    onChange={(e) => setSignUpName(e.target.value)}
                    className="w-full rounded border border-border bg-background px-3 py-2.5 text-xs focus:outline-none focus:border-luxury-gold text-foreground"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-semibold uppercase tracking-wider mb-1.5 text-muted-foreground">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded border border-border bg-background px-3 py-2.5 text-xs focus:outline-none focus:border-luxury-gold text-foreground"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[9px] font-semibold uppercase tracking-wider mb-1.5 text-muted-foreground">Gender</label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full rounded border border-border bg-background px-3 py-2.5 text-xs focus:outline-none focus:border-luxury-gold text-foreground"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] font-semibold uppercase tracking-wider mb-1.5 text-muted-foreground">Date of Birth</label>
                    <input
                      type="date"
                      required
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="w-full rounded border border-border bg-background px-3 py-2.5 text-xs focus:outline-none focus:border-luxury-gold text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-semibold uppercase tracking-wider mb-1.5 text-muted-foreground">Nationality</label>
                    <input
                      type="text"
                      required
                      value={nationality}
                      onChange={(e) => setNationality(e.target.value)}
                      className="w-full rounded border border-border bg-background px-3 py-2.5 text-xs focus:outline-none focus:border-luxury-gold text-foreground"
                      placeholder="Indian"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[9px] font-semibold uppercase tracking-wider mb-1.5 text-muted-foreground">Password</label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded border border-border bg-background px-3 py-2.5 text-xs focus:outline-none focus:border-luxury-gold text-foreground"
                    placeholder="••••••••"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-semibold uppercase tracking-wider mb-1.5 text-muted-foreground">Confirm Password</label>
                  <input
                    type="password"
                    required
                    value={signUpConfirmPassword}
                    onChange={(e) => setSignUpConfirmPassword(e.target.value)}
                    className="w-full rounded border border-border bg-background px-3 py-2.5 text-xs focus:outline-none focus:border-luxury-gold text-foreground"
                    placeholder="••••••••"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-foreground hover:bg-foreground/90 text-background py-2.5 rounded text-xs font-semibold tracking-wide transition-colors uppercase"
                >
                  Create Account
                </button>
                <p className="text-center text-xs text-muted-foreground mt-4 font-light">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setIsSignUp(false);
                      setAuthError("");
                      setSuccessMessage("");
                    }}
                    className="text-luxury-gold font-semibold underline"
                  >
                    Sign In
                  </button>
                </p>
              </form>
            ) : (
              /* Sign In Form */
              <form onSubmit={handleSignIn} className="space-y-4">
                <div>
                  <label className="block text-[9px] font-semibold uppercase tracking-wider mb-1.5 text-muted-foreground">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded border border-border bg-background px-3 py-2.5 text-xs focus:outline-none focus:border-luxury-gold text-foreground"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">Password</label>
                    <button
                      type="button"
                      onClick={() => {
                        setIsForgotPassword(true);
                        setAuthError("");
                        setSuccessMessage("");
                      }}
                      className="text-[9px] font-semibold text-luxury-gold hover:underline"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded border border-border bg-background px-3 py-2.5 text-xs focus:outline-none focus:border-luxury-gold text-foreground"
                    placeholder="••••••••"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-foreground hover:bg-foreground/90 text-background py-2.5 rounded text-xs font-semibold tracking-wide transition-colors"
                >
                  Sign In with Password
                </button>
                <div className="relative flex py-3 items-center">
                  <div className="flex-grow border-t border-border/40"></div>
                  <span className="flex-shrink mx-3 text-[10px] text-muted-foreground uppercase tracking-widest">Or</span>
                  <div className="flex-grow border-t border-border/40"></div>
                </div>
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="w-full border border-border bg-muted/40 hover:bg-muted text-foreground py-2.5 rounded text-xs font-semibold tracking-wide transition-colors"
                >
                  Sign In with One-Time OTP
                </button>
                <p className="text-center text-xs text-muted-foreground mt-4 font-light">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setIsSignUp(true);
                      setAuthError("");
                      setSuccessMessage("");
                    }}
                    className="text-luxury-gold font-semibold underline"
                  >
                    Create Account
                  </button>
                </p>
              </form>
            )}

            {/* Google OAuth visual */}
            <div className="mt-6 border-t border-border/40 pt-6">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center gap-2 border border-border hover:bg-muted/40 py-2.5 rounded text-xs font-semibold text-foreground transition-all"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google Login
              </button>
            </div>

            <div className="mt-6 pt-5 border-t border-border/40 text-center">
              <Link
                href="/admin"
                className="text-[10px] font-bold uppercase tracking-[0.15em] text-luxury-gold hover:text-luxury-gold/80 transition-colors"
              >
                Access Merchant & Admin Portal →
              </Link>
            </div>

          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground py-16 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-border/40 pb-6 mb-8 gap-4">
          <div>
            <h1 className="font-serif text-3xl font-normal tracking-wide text-foreground">My Account</h1>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
              Welcome back, <strong className="text-foreground">{name}</strong> ({email})
            </p>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-destructive border border-border/40 hover:border-destructive px-3.5 py-2 rounded transition-all"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 items-start">
          
          {/* 1. Account Tabs Sidebar */}
          <div className="lg:col-span-1 space-y-2 border border-border/40 rounded-lg p-5 bg-muted/20">
            {[
              { id: "orders", label: "My Orders", icon: Package },
              { id: "wishlist", label: "My Wishlist", icon: Heart },
              { id: "profile", label: "Profile Settings", icon: Settings },
              { id: "help", label: "Help & Support", icon: HelpCircle },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3.5 px-4 py-2.5 rounded text-xs font-semibold tracking-wide text-left transition-all ${
                    activeTab === tab.id
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4.5 w-4.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* 2. Tab Contents */}
          <div className="lg:col-span-3">
            
            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div className="space-y-6">
                <h3 className="font-serif text-xl font-normal tracking-wide text-foreground mb-4">Order History</h3>
                {orders.length > 0 ? (
                  <>
                    {/* Search and Filter Controls */}
                    <div className="flex flex-col sm:flex-row gap-4 bg-muted/20 border border-border/40 p-4 rounded-lg">
                      <div className="flex-1">
                        <input
                          type="text"
                          placeholder="Search by Order ID or Recipient Name..."
                          value={userSearchQuery}
                          onChange={(e) => setUserSearchQuery(e.target.value)}
                          className="w-full rounded border border-border bg-background px-3 py-2 text-xs focus:outline-none focus:border-luxury-gold text-foreground"
                        />
                      </div>
                      <div className="w-full sm:w-48">
                        <select
                          value={userStatusFilter}
                          onChange={(e) => setUserStatusFilter(e.target.value)}
                          className="w-full rounded border border-border bg-background px-3 py-2 text-xs focus:outline-none focus:border-luxury-gold text-foreground"
                        >
                          <option value="All">All Statuses</option>
                          <option value="Pending">Pending</option>
                          <option value="Paid">Paid</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>

                    {filteredUserOrders.length > 0 ? (
                      <div className="space-y-4">
                        {filteredUserOrders.map((order) => {
                      const getStatusStep = (status: string) => {
                        switch (status) {
                          case "Pending": return 1;
                          case "Paid": return 2;
                          case "Processing": return 2;
                          case "Shipped": return 3;
                          case "Delivered": return 4;
                          default: return 1;
                        }
                      };

                      const trackingSteps = [
                        { label: "Placed", desc: "Order received" },
                        { label: "Processing", desc: "Item packing" },
                        { label: "Shipped", desc: "In transit" },
                        { label: "Delivered", desc: "Received" }
                      ];

                      const currentStep = getStatusStep(order.status);

                      return (
                        <div
                          key={order.orderId}
                          className="border border-border/45 rounded-lg bg-background shadow-sm hover:shadow transition-shadow text-xs"
                        >
                          {/* Compact Summary Row — always visible */}
                          <button
                            type="button"
                            onClick={() => setExpandedOrder(expandedOrder === order.orderId ? null : order.orderId)}
                            className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 text-left cursor-pointer hover:bg-muted/20 rounded-lg transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              {order.items && order.items.length > 0 && order.items[0].image ? (
                                <img src={order.items[0].image} alt="" className="w-12 h-12 rounded-md object-cover border border-border/30 flex-shrink-0" />
                              ) : (
                                <div className="w-12 h-12 rounded-md bg-muted flex items-center justify-center flex-shrink-0 border border-border/30">
                                  <Package className="h-5 w-5 text-muted-foreground" />
                                </div>
                              )}
                              <div>
                                <span className="font-semibold text-foreground text-xs block">{order.orderId}</span>
                                <span className="text-[10px] text-muted-foreground block mt-0.5">
                                  {order.placedAt ? new Date(order.placedAt).toLocaleString() : order.date}
                                  {order.items && order.items.length > 0 && ` · ${order.items.length} item${order.items.length > 1 ? "s" : ""}`}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="font-semibold text-foreground">₹{order.total?.toFixed(2)}</span>
                              <span className={`inline-flex rounded-full font-bold uppercase tracking-wider text-[9px] px-2.5 py-1 ${
                                order.status === "Delivered"
                                  ? "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400"
                                  : order.status === "Shipped"
                                  ? "bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-400"
                                  : order.status === "Cancelled"
                                  ? "bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900/30"
                                  : "bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400"
                              }`}>
                                {order.status}
                              </span>
                              <svg className={`w-4 h-4 text-muted-foreground transition-transform ${expandedOrder === order.orderId ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                            </div>
                          </button>

                          {/* Expanded Flipkart-style Order Details */}
                          {expandedOrder === order.orderId && (
                            <div className="border-t border-border/30 p-5">
                              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {/* LEFT: Items + Timeline */}
                                <div className="lg:col-span-2 space-y-5">
                                  {order.items && order.items.length > 0 ? (
                                    <div className="space-y-3">
                                      {order.items.map((item: any, idx: number) => (
                                        <div key={idx} className="flex gap-4 p-3 rounded-lg border border-border/20 bg-muted/10 hover:bg-muted/20 transition-colors">
                                          {item.image ? (
                                            <img src={item.image} alt={item.name} className="w-20 h-20 rounded-md object-cover border border-border/30 flex-shrink-0" />
                                          ) : (
                                            <div className="w-20 h-20 rounded-md bg-muted flex items-center justify-center flex-shrink-0 border border-border/30">
                                              <Package className="h-6 w-6 text-muted-foreground" />
                                            </div>
                                          )}
                                          <div className="flex-1 min-w-0">
                                            <span className="block text-sm font-semibold text-foreground leading-tight">{item.name}</span>
                                            {item.variantId && item.variantId !== item.productId && (
                                              <span className="block text-[10px] text-muted-foreground mt-0.5">Variant: {item.variantId}</span>
                                            )}
                                            <span className="block text-xs text-foreground mt-1.5 font-medium">
                                              ₹{item.price?.toFixed(2)} <span className="text-muted-foreground font-normal">× {item.quantity}</span>
                                            </span>
                                            <span className="block text-xs font-semibold text-luxury-gold mt-1">
                                              Subtotal: ₹{(item.quantity * item.price).toFixed(2)}
                                            </span>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  ) : (
                                    <div className="text-center py-6 border border-dashed border-border/30 rounded-lg">
                                      <Package className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                                      <p className="text-[11px] text-muted-foreground">Item details not available for this order.</p>
                                    </div>
                                  )}

                                  {/* Vertical Timeline */}
                                  {order.status !== "Cancelled" ? (
                                    <div className="border-t border-border/20 pt-4">
                                      <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground block mb-3">Order Timeline</span>
                                      <div className="relative pl-6 space-y-4">
                                        {trackingSteps.map((step, index) => {
                                          const stepNum = index + 1;
                                          const isCompleted = currentStep >= stepNum;
                                          return (
                                            <div key={index} className="relative flex items-start gap-3">
                                              {index < trackingSteps.length - 1 && (
                                                <div className={`absolute left-[-15px] top-5 w-[2px] h-full ${isCompleted ? "bg-emerald-500" : "bg-border/40"}`} />
                                              )}
                                              <div className={`absolute left-[-19px] top-0.5 w-[10px] h-[10px] rounded-full border-2 ${
                                                isCompleted ? "bg-emerald-500 border-emerald-500" : "bg-background border-border"
                                              }`} />
                                              <div>
                                                <span className={`block text-xs font-semibold ${isCompleted ? "text-foreground" : "text-muted-foreground"}`}>{step.label}</span>
                                                <span className="block text-[10px] text-muted-foreground">{step.desc}</span>
                                              </div>
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="border-t border-border/20 pt-4 text-center">
                                      <span className="text-red-500 font-semibold text-xs">This order has been cancelled.</span>
                                      {order.cancelledAt && (
                                        <span className="block text-[10px] text-muted-foreground mt-1">Cancelled on {new Date(order.cancelledAt).toLocaleString()}</span>
                                      )}
                                    </div>
                                  )}
                                </div>

                                {/* RIGHT: Delivery + Price + Actions */}
                                <div className="space-y-4">
                                  {/* Delivery Details */}
                                  <div className="border border-border/30 rounded-lg p-4 bg-muted/10">
                                    <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground block mb-3">Delivery Details</span>
                                    {typeof order.shippingAddress === "object" && order.shippingAddress ? (
                                      <div className="space-y-2 text-xs">
                                        <div className="flex items-start gap-2">
                                          <svg className="w-3.5 h-3.5 text-muted-foreground mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                                          <div>
                                            <span className="font-semibold text-foreground block">{order.shippingAddress.name}</span>
                                            <span className="text-muted-foreground block mt-0.5">{order.shippingAddress.address}</span>
                                            <span className="text-muted-foreground block">{order.shippingAddress.city} - {order.shippingAddress.zip}</span>
                                          </div>
                                        </div>
                                        {order.shippingAddress.phone && (
                                          <div className="flex items-center gap-2">
                                            <svg className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                            <span className="text-muted-foreground">{order.shippingAddress.phone}</span>
                                          </div>
                                        )}
                                      </div>
                                    ) : (
                                      <span className="text-xs text-muted-foreground">{String(order.shippingAddress || "N/A")}</span>
                                    )}
                                  </div>

                                  {/* Price Breakdown */}
                                  <div className="border border-border/30 rounded-lg p-4 bg-muted/10">
                                    <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground block mb-3">Price Details</span>
                                    <div className="space-y-2 text-xs">
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">Items ({order.itemsCount})</span>
                                        <span className="text-foreground">₹{((order.total || 0) - (order.shippingCost || 0) - (order.tax || 0) + (order.discount || 0)).toFixed(2)}</span>
                                      </div>
                                      {(order.discount || 0) > 0 && (
                                        <div className="flex justify-between">
                                          <span className="text-emerald-600 dark:text-emerald-400">Discount</span>
                                          <span className="text-emerald-600 dark:text-emerald-400">−₹{order.discount?.toFixed(2)}</span>
                                        </div>
                                      )}
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">Shipping</span>
                                        <span className="text-foreground">{(order.shippingCost || 0) > 0 ? `₹${order.shippingCost?.toFixed(2)}` : "Free"}</span>
                                      </div>
                                      {(order.tax || 0) > 0 && (
                                        <div className="flex justify-between">
                                          <span className="text-muted-foreground">Tax (GST)</span>
                                          <span className="text-foreground">₹{order.tax?.toFixed(2)}</span>
                                        </div>
                                      )}
                                      <div className="border-t border-dashed border-border/40 pt-2 mt-2 flex justify-between font-semibold">
                                        <span className="text-foreground">Total Amount</span>
                                        <span className="text-foreground">₹{order.total?.toFixed(2)}</span>
                                      </div>
                                      <div className="flex justify-between text-[10px] pt-1">
                                        <span className="text-muted-foreground">Paid By</span>
                                        <span className="text-foreground capitalize">{order.paymentMethod || "Online"}</span>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Action Buttons */}
                                  <div className="space-y-2">
                                    {order.status === "Delivered" && (
                                      <button
                                        onClick={() => handleDownloadInvoice(order)}
                                        className="w-full flex items-center justify-center gap-2 py-2.5 border border-border/40 rounded-md hover:bg-muted/30 text-xs font-semibold transition-colors"
                                      >
                                        <Package className="h-3.5 w-3.5" />
                                        Download Invoice
                                      </button>
                                    )}
                                    {(order.status === "Pending" || order.status === "Paid" || order.status === "Processing") && (
                                      <button
                                        onClick={() => handleCancelOrder(order.orderId)}
                                        className="w-full flex items-center justify-center gap-2 py-2.5 border border-red-500/50 rounded-md hover:bg-red-500 hover:text-white text-red-500 text-xs font-semibold transition-all"
                                      >
                                        Cancel Order
                                      </button>
                                    )}
                                  </div>

                                  {/* Admin Remarks */}
                                  {order.adminRemarks && (
                                    <div className="bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-400 text-[10px] p-3 rounded border border-blue-200 dark:border-blue-900/30 flex items-start gap-2">
                                      <MessageSquare className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                                      <span><strong>Admin Note:</strong> {order.adminRemarks}</span>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Order Footer */}
                              <div className="mt-4 pt-3 border-t border-border/20 flex items-center justify-between">
                                <span className="text-[10px] text-muted-foreground">Order #{order.orderId}</span>
                                {order.customerEmail && (
                                  <span className="text-[10px] text-muted-foreground">{order.customerEmail}</span>
                                )}
                              </div>
                            </div>
                          )}

                      </div>
                    );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-10 border border-dashed border-border/40 rounded-lg">
                    <p className="text-sm text-muted-foreground">No orders match your search criteria.</p>
                  </div>
                )}
                  </>
                ) : (
                  <div className="text-center py-20 border border-dashed border-border/40 rounded-lg">
                    <p className="text-sm text-muted-foreground">You haven't placed any orders yet.</p>
                  </div>
                )}
              </div>
            )}

            {/* Wishlist Tab */}
            {activeTab === "wishlist" && (
              <div>
                <h3 className="font-serif text-xl font-normal tracking-wide text-foreground mb-6">Saved Items</h3>
                {wishlist.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlist.map((item) => (
                      <div
                        key={item.id}
                        className="group flex flex-col bg-background rounded-lg border border-border/40 overflow-hidden hover:shadow-sm"
                      >
                        <div className="relative aspect-square bg-neutral-100 overflow-hidden">
                          <img src={item.images[0]} alt={item.name} className="h-full w-full object-cover" />
                        </div>
                        <div className="p-4 flex flex-col flex-1">
                          <h4 className="font-serif text-sm font-normal text-foreground line-clamp-1">{item.name}</h4>
                          <span className="text-xs font-semibold text-foreground mt-1.5">₹{item.price}</span>
                          <div className="mt-4 flex gap-2 pt-3 border-t border-border/40">
                            <Link
                              href={`/products/${item.id}`}
                              className="flex-1 text-center bg-foreground text-background py-1.5 rounded text-[10px] font-semibold"
                            >
                              View Details
                            </Link>
                            <button
                              onClick={() => handleRemoveWishlist(item.id)}
                              className="text-[10px] border border-border/40 hover:border-destructive hover:text-destructive px-2 rounded transition-all"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 border border-dashed border-border/40 rounded-lg">
                    <p className="text-sm text-muted-foreground">Your wishlist is empty.</p>
                  </div>
                )}
              </div>
            )}

            {/* Profile Settings Tab */}
            {activeTab === "profile" && (
              <div className="max-w-xl bg-background border border-border/40 p-6 rounded-lg shadow-sm">
                <h3 className="font-serif text-lg tracking-wide text-foreground mb-6">Profile Details</h3>
                {profileSaved && (
                  <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-semibold p-2.5 bg-emerald-50 rounded mb-4">
                    <CheckCircle className="h-4.5 w-4.5" /> Profile settings saved successfully!
                  </div>
                )}
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-wider mb-1.5 text-muted-foreground">Full Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded border border-border bg-background px-3 py-2 text-xs focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-wider mb-1.5 text-muted-foreground">Email (Cannot change)</label>
                    <input
                      type="email"
                      disabled
                      value={email}
                      className="w-full rounded border border-border bg-muted/40 px-3 py-2 text-xs text-muted-foreground focus:outline-none cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-wider mb-1.5 text-muted-foreground">Gender</label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full rounded border border-border bg-background px-3 py-2 text-xs focus:outline-none text-foreground"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-wider mb-1.5 text-muted-foreground">Date of Birth</label>
                    <input
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="w-full rounded border border-border bg-background px-3 py-2 text-xs focus:outline-none text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-wider mb-1.5 text-muted-foreground">Nationality</label>
                    <input
                      type="text"
                      value={nationality}
                      onChange={(e) => setNationality(e.target.value)}
                      className="w-full rounded border border-border bg-background px-3 py-2 text-xs focus:outline-none text-foreground"
                      placeholder="Indian"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-wider mb-1.5 text-muted-foreground">Primary Shipping Address</label>
                    <textarea
                      rows={3}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full rounded border border-border bg-background px-3 py-2 text-xs focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-foreground hover:bg-foreground/90 text-background rounded font-semibold px-4 py-2 text-xs transition-colors"
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            )}

            {/* Help & Support Tab */}
            {activeTab === "help" && (
              <div className="max-w-2xl space-y-6">
                <h3 className="font-serif text-xl font-normal tracking-wide text-foreground mb-4">Help & Support</h3>
                
                {/* Contact Card */}
                <div className="bg-muted/20 border border-border/40 p-6 rounded-lg">
                  <h4 className="font-semibold text-sm text-foreground mb-3">Contact Our Support Team</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                    Need assistance with your order, return, or have a question about our products? Our dedicated team is here to help.
                  </p>
                  <div className="space-y-3 text-xs">
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-luxury-gold" />
                      <div>
                        <span className="text-muted-foreground">Email: </span>
                        <a href="mailto:abhishekpatelspacework@gmail.com" className="text-luxury-gold font-semibold hover:underline">
                          abhishekpatelspacework@gmail.com
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <HelpCircle className="h-4 w-4 text-luxury-gold" />
                      <div>
                        <span className="text-muted-foreground">Response Time: </span>
                        <span className="text-foreground font-semibold">Within 24 hours</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* FAQ Section */}
                <div className="bg-background border border-border/40 rounded-lg divide-y divide-border/30">
                  <h4 className="font-semibold text-sm text-foreground p-5 pb-3">Frequently Asked Questions</h4>
                  {[
                    { q: "How can I track my order?", a: "Once your order is shipped, the admin will add tracking details which will appear under your order card in the 'My Orders' tab." },
                    { q: "How do I cancel an order?", a: "You can cancel any order with status Pending, Paid, or Processing by clicking the 'Cancel Order' button on the order card. Shipped or Delivered orders cannot be cancelled." },
                    { q: "What is the return policy?", a: "We accept returns within 15 days of delivery. Please contact our support team at the email above with your order ID to initiate a return." },
                    { q: "How long does shipping take?", a: "Standard shipping takes 5–7 business days. Express shipping takes 2–3 business days. Shipping times may vary based on your location." },
                    { q: "Can I change my shipping address after placing an order?", a: "Address changes are possible only for orders in 'Pending' status. Please contact support immediately with your order ID and updated address." },
                    { q: "How do I contact the admin for special requests?", a: "Send an email to our support address with your order ID and detailed request. Our admin team will review and respond within 24 hours." },
                  ].map((faq, i) => (
                    <div key={i} className="p-5">
                      <h5 className="text-xs font-semibold text-foreground mb-1.5">{faq.q}</h5>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>

                {/* Quick Action */}
                <div className="text-center">
                  <a
                    href="mailto:abhishekpatelspacework@gmail.com?subject=CraftOre Support Request"
                    className="inline-flex items-center gap-2 bg-foreground hover:bg-foreground/90 text-background px-6 py-2.5 rounded text-xs font-semibold tracking-wide transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    Send Support Email
                  </a>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Cancel Order Confirmation Modal */}
      {cancelModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => !cancelModal.loading && setCancelModal({ open: false, orderId: "", loading: false, error: "", success: "" })}>
          <div className="bg-background border border-border/50 rounded-lg shadow-xl p-6 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
            {cancelModal.success ? (
              <div className="text-center py-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/30 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="font-serif text-lg text-foreground mb-2">Order Cancelled</h3>
                <p className="text-xs text-muted-foreground">{cancelModal.success}</p>
              </div>
            ) : (
              <>
                <div className="text-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-950/30 flex items-center justify-center mx-auto mb-4">
                    <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.27 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-lg text-foreground mb-1">Cancel Order?</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Are you sure you want to cancel order <strong className="text-foreground">{cancelModal.orderId}</strong>? This action cannot be undone.
                  </p>
                </div>

                {cancelModal.error && (
                  <div className="bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 text-xs p-3 rounded text-center font-medium border border-red-200 dark:border-red-950/30 mb-4">
                    {cancelModal.error}
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={() => setCancelModal({ open: false, orderId: "", loading: false, error: "", success: "" })}
                    disabled={cancelModal.loading}
                    className="flex-1 border border-border hover:bg-muted/40 text-foreground py-2.5 rounded text-xs font-semibold tracking-wide transition-colors disabled:opacity-50"
                  >
                    Keep Order
                  </button>
                  <button
                    onClick={confirmCancelOrder}
                    disabled={cancelModal.loading}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2.5 rounded text-xs font-semibold tracking-wide transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {cancelModal.loading ? (
                      <>
                        <svg className="animate-spin h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Cancelling...
                      </>
                    ) : (
                      "Yes, Cancel Order"
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

    </div>
  );
}