"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { products } from "@/lib/mockData";
import { LayoutDashboard, ShoppingBag, ClipboardList, AlertTriangle, Plus, Check, Trash2, ArrowUpRight, Home, LogOut, Truck, MessageSquare } from "lucide-react";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

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
  items?: any[];
  customerEmail?: string;
}

export default function AdminDashboard() {
  const backendUrl = process.env.NEXT_PUBLIC_NODE_BACKEND_URL || "http://localhost:5000";
  const [activeTab, setActiveTab] = useState("overview");

  // Admin authentication states
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminError, setAdminError] = useState("");

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let data;
      let token = "";
      
      const isFirebaseMock = !process.env.NEXT_PUBLIC_FIREBASE_API_KEY || process.env.NEXT_PUBLIC_FIREBASE_API_KEY === "mock_api_key";
      if (!isFirebaseMock) {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, adminEmail, adminPassword);
          token = await userCredential.user.getIdToken();
          
          data = {
            email: userCredential.user.email,
            role: userCredential.user.email === "abhishekpatelspace@gmail.com" ? "admin" : "customer",
            token: token
          };
        } catch (fbErr: any) {
          console.warn("Firebase admin sign in failed, falling back to local:", fbErr.message);
        }
      }
      
      if (!data) {
        const res = await fetch(`${backendUrl}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: adminEmail, password: adminPassword })
        });
        data = await res.json();
        if (!res.ok) {
          setAdminError(data.error || "Authentication failed.");
          return;
        }
      }
      
      if (data.role === "admin") {
        localStorage.setItem("craftore_admin_user", "true");
        localStorage.setItem("craftore_admin_token", data.token || "");
        setIsAdminLoggedIn(true);
        setAdminError("");
      } else {
        setAdminError("Unauthorized. Admin access only.");
      }
    } catch (err) {
      setAdminError("Failed to connect to authentication server.");
    }
  };

  const handleAdminSignOut = () => {
    signOut(auth).catch(() => {});
    localStorage.removeItem("craftore_admin_user");
    localStorage.removeItem("craftore_admin_token");
    setIsAdminLoggedIn(false);
  };

  // State sync logs
  const [orders, setOrders] = useState<OrderDetail[]>([]);
  const [productList, setProductList] = useState<typeof products>([]);
  const [newProductForm, setNewProductForm] = useState({ name: "", category: "copper-bottles", price: 49, stock: 50 });
  const [productAdded, setProductAdded] = useState(false);

  // Filtering / Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredOrders = orders.filter((order) => {
    const shippingName = order.shippingAddress?.name || "";
    const email = order.customerEmail || "guest@craftore.com";
    const matchesSearch = 
      order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shippingName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "All" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  useEffect(() => {
    // Check if admin is logged in
    const isAdmin = localStorage.getItem("craftore_admin_user");
    if (isAdmin === "true") {
      setIsAdminLoggedIn(true);
    }

    // Load products
    setProductList(products);
  }, []);

  // Fetch orders from backend when admin logs in
  useEffect(() => {
    if (!isAdminLoggedIn) return;
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("craftore_admin_token") || "";
        const res = await fetch(`${backendUrl}/api/orders`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        if (res.ok) {
          const dbOrders = await res.json();
          const mapped = dbOrders.map((o: any) => ({
            ...o,
            itemsCount: o.items ? o.items.reduce((a: number, i: any) => a + (i.quantity || 1), 0) : 0,
          }));
          setOrders(mapped);
        }
      } catch (err) {
        console.error("Failed to fetch orders from backend:", err);
      }
    };
    fetchOrders();
  }, [isAdminLoggedIn]);

  // Admin: Update order status via backend API
  const handleUpdateOrderStatus = async (orderId: string, newStatus: string, remarks?: string) => {
    try {
      const token = localStorage.getItem("craftore_admin_token") || "";
      const res = await fetch(`${backendUrl}/api/orders/${orderId}/status`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus, adminRemarks: remarks || undefined })
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Failed to update order status.");
        return;
      }
      
      // Update local state
      setOrders(prev => prev.map(o => 
        o.orderId === orderId 
          ? { ...o, status: newStatus, adminRemarks: remarks || o.adminRemarks, processedAt: data.order?.processedAt || o.processedAt, cancelledAt: data.order?.cancelledAt || o.cancelledAt } 
          : o
      ));
    } catch (err) {
      alert("Failed to connect to backend server.");
    }
  };

  // Add custom product simulation
  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (newProductForm.name) {
      const mockProduct = {
        id: `custom-${Date.now()}`,
        name: newProductForm.name,
        description: "Artisan sustainable custom-added lifestyle item.",
        longDescription: "",
        price: Number(newProductForm.price),
        b2bPrice: Math.floor(newProductForm.price * 0.6),
        moq: 50,
        categoryId: newProductForm.category,
        images: ["https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&q=80&w=800"],
        rating: 5.0,
        features: [],
        variants: [{ id: `var-${Date.now()}`, sku: `CRO-CST-${Date.now().toString().slice(-4)}`, name: "Standard Pack", price: Number(newProductForm.price), stock: Number(newProductForm.stock) }],
        reviews: [],
      };
      setProductList([mockProduct, ...productList]);
      setProductAdded(true);
      setNewProductForm({ name: "", category: "copper-bottles", price: 49, stock: 50 });
      setTimeout(() => setProductAdded(false), 3000);
    }
  };

  // Delete product simulation
  const handleDeleteProduct = (id: string) => {
    setProductList(productList.filter((p) => p.id !== id));
  };

  // Calculations for overview stats
  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0);
  const lowStockCount = productList.filter((p) => p.variants.some((v) => v.stock < 30)).length;

  // Render Admin secure login gate if not logged in
  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
        <div className="max-w-md w-full space-y-8 bg-background border border-border/40 p-8 rounded-lg shadow-sm">
          <div className="text-center">
            <span className="text-xs uppercase tracking-[0.25em] text-luxury-gold font-semibold mb-1 block">ADMIN GATEWAY</span>
            <h2 className="font-serif text-2xl font-normal text-foreground">Secure Login</h2>
            <p className="text-xs text-muted-foreground mt-2 font-light">Authorized administrator access only.</p>
          </div>
          {adminError && (
            <div className="bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 text-xs p-3 rounded text-center font-medium border border-red-200 dark:border-red-950/30">
              {adminError}
            </div>
          )}
          <form onSubmit={handleAdminLogin} className="space-y-4 mt-6">
            <div>
              <label className="block text-[9px] font-semibold uppercase tracking-wider mb-1.5 text-muted-foreground">Admin Email</label>
              <input
                type="email"
                required
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                className="w-full rounded border border-border bg-background px-3 py-2.5 text-xs focus:outline-none focus:border-luxury-gold text-foreground"
                placeholder="abhishekpatelspace@gmail.com"
              />
            </div>
            <div>
              <label className="block text-[9px] font-semibold uppercase tracking-wider mb-1.5 text-muted-foreground">Password</label>
              <input
                type="password"
                required
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="w-full rounded border border-border bg-background px-3 py-2.5 text-xs focus:outline-none focus:border-luxury-gold text-foreground"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-foreground hover:bg-foreground/90 text-background py-2.5 rounded text-xs font-semibold tracking-wide transition-colors uppercase mt-4"
            >
              Authenticate & Enter
            </button>
            <Link
              href="/"
              className="text-xs text-muted-foreground hover:text-foreground text-center block mt-4 font-light underline"
            >
              Return to Storefront
            </Link>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground py-16 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Dashboard Title Header */}
        <div className="border-b border-border/40 pb-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl font-normal tracking-wide text-foreground">Admin Workspace</h1>
            <p className="text-xs text-muted-foreground mt-1">Manage catalog inventories, track sales revenue, and fulfill orders.</p>
          </div>
          
          {/* Quick tab controls */}
          <div className="flex items-center gap-2 flex-wrap">
            <Link
              href="/"
              className="flex items-center gap-1.5 px-4 py-2 border border-luxury-gold text-luxury-gold bg-luxury-cream/10 dark:bg-luxury-gold/5 hover:bg-luxury-gold hover:text-background rounded text-xs font-semibold tracking-wide transition-all mr-2"
            >
              <Home className="h-3.5 w-3.5" strokeWidth={1.8} />
              Storefront Home
            </Link>
            <button
              onClick={handleAdminSignOut}
              className="flex items-center gap-1.5 px-4 py-2 border border-red-500/50 hover:bg-red-500 hover:text-white text-red-500/90 rounded text-xs font-semibold tracking-wide transition-all mr-2"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign Out
            </button>
            {[
              { id: "overview", label: "Dashboard Overview", icon: LayoutDashboard },
              { id: "products", label: "Inventory Products", icon: ShoppingBag },
              { id: "orders", label: "Orders Fulfillment", icon: ClipboardList },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 border rounded text-xs font-semibold tracking-wide transition-all ${
                    activeTab === tab.id
                      ? "bg-foreground text-background border-foreground"
                      : "bg-muted/40 hover:bg-muted border-border/40 text-muted-foreground"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab 1. Overview Dashboard */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Gross Revenues", val: `$${totalRevenue.toLocaleString()}`, change: "+14.2% month-over-month", color: "text-foreground" },
                { title: "Fulfillment Orders", val: orders.length, change: `${orders.filter((o) => o.status === "Processing").length} pending processing`, color: "text-foreground" },
                { title: "Wholesale Accounts", val: "14 Approved", change: "2 new requests pending check", color: "text-primary" },
                { title: "Low Stock Items", val: `${lowStockCount} Flags`, change: "Requires cargo purchase order", color: "text-amber-600" },
              ].map((stat, idx) => (
                <div key={idx} className="border border-border/40 p-5 rounded-lg bg-background shadow-sm text-xs">
                  <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">{stat.title}</span>
                  <h3 className={`font-serif text-2xl font-normal mt-2 mb-1.5 ${stat.color}`}>{stat.val}</h3>
                  <span className="text-muted-foreground font-light flex items-center gap-1.5">
                    <ArrowUpRight className="h-3.5 w-3.5 text-emerald-500" />
                    {stat.change}
                  </span>
                </div>
              ))}
            </div>

            {/* Sales Chart Simulation */}
            <div className="border border-border/40 p-6 rounded-lg bg-background shadow-sm">
              <h3 className="font-serif text-lg tracking-wide text-foreground mb-6">Weekly Sales Analysis</h3>
              <div className="h-64 flex items-end gap-6 pt-8 border-b border-l border-border/40 pl-6 pr-4 relative">
                {/* Simulated Chart Bars */}
                {[
                  { day: "Mon", height: "h-[30%]", val: "$1,200" },
                  { day: "Tue", height: "h-[45%]", val: "$1,800" },
                  { day: "Wed", height: "h-[35%]", val: "$1,400" },
                  { day: "Thu", height: "h-[65%]", val: "$2,600" },
                  { day: "Fri", height: "h-[85%]", val: "$3,400" },
                  { day: "Sat", height: "h-[95%]", val: "$3,800" },
                  { day: "Sun", height: "h-[50%]", val: "$2,000" },
                ].map((bar, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center group relative h-full justify-end">
                    <div className="absolute top-0 opacity-0 group-hover:opacity-100 transition-opacity bg-neutral-900 text-white text-[9px] px-1.5 py-0.5 rounded -translate-y-4">
                      {bar.val}
                    </div>
                    <div className={`w-full ${bar.height} bg-luxury-gold hover:bg-luxury-gold/80 rounded-t transition-all duration-500`} />
                    <span className="text-[10px] text-muted-foreground mt-2">{bar.day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2. Products List */}
        {activeTab === "products" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Products Table */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="font-serif text-xl tracking-wide">Catalog Inventory List</h3>
              <div className="border border-border/40 rounded-lg overflow-hidden bg-background">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-muted/40 border-b border-border/40 text-muted-foreground uppercase font-bold tracking-wider">
                      <th className="p-3">Product Name</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Retail Price</th>
                      <th className="p-3">Stock status</th>
                      <th className="p-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productList.map((product) => {
                      const totalStock = product.variants.reduce((acc, v) => acc + v.stock, 0);
                      const isLowStock = product.variants.some((v) => v.stock < 30);
                      return (
                        <tr key={product.id} className="border-b border-border/30 hover:bg-muted/20 text-foreground">
                          <td className="p-3 font-semibold">{product.name}</td>
                          <td className="p-3 text-muted-foreground uppercase text-[10px] tracking-wide">
                            {product.categoryId.replace("-", " ")}
                          </td>
                          <td className="p-3 font-medium">${product.price}</td>
                          <td className="p-3">
                            <span
                              className={`font-semibold ${isLowStock ? "text-amber-600" : "text-emerald-600"}`}
                            >
                              {totalStock} Left
                            </span>
                          </td>
                          <td className="p-3">
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="text-muted-foreground hover:text-destructive transition-colors"
                              title="Delete Product"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Add Product Form */}
            <div className="lg:col-span-1 bg-muted/20 border border-border/40 p-6 rounded-lg">
              <h3 className="font-serif text-lg tracking-wide mb-4">Add Custom Product</h3>
              {productAdded && (
                <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-semibold p-2.5 bg-emerald-50 rounded mb-4">
                  <Check className="h-4 w-4" /> Custom product added!
                </div>
              )}
              <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold uppercase tracking-wider mb-1 text-muted-foreground">Product Title</label>
                  <input
                    type="text"
                    required
                    value={newProductForm.name}
                    onChange={(e) => setNewProductForm({ ...newProductForm, name: e.target.value })}
                    className="w-full rounded border border-border bg-background px-3 py-2 text-xs focus:outline-none"
                    placeholder="e.g. Maharaja Gold Tumbler"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase tracking-wider mb-1 text-muted-foreground">Category</label>
                  <select
                    value={newProductForm.category}
                    onChange={(e) => setNewProductForm({ ...newProductForm, category: e.target.value })}
                    className="w-full rounded border border-border bg-background px-3 py-2 text-xs focus:outline-none text-foreground"
                  >
                    <option value="copper-bottles">Copper Bottles</option>
                    <option value="copper-gift-sets">Copper Gift Sets</option>
                    <option value="leather-belts">Leather Belts</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold uppercase tracking-wider mb-1 text-muted-foreground">Price ($)</label>
                    <input
                      type="number"
                      required
                      value={newProductForm.price}
                      onChange={(e) => setNewProductForm({ ...newProductForm, price: Number(e.target.value) })}
                      className="w-full rounded border border-border bg-background px-3 py-2 text-xs focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold uppercase tracking-wider mb-1 text-muted-foreground">Stock Qty</label>
                    <input
                      type="number"
                      required
                      value={newProductForm.stock}
                      onChange={(e) => setNewProductForm({ ...newProductForm, stock: Number(e.target.value) })}
                      className="w-full rounded border border-border bg-background px-3 py-2 text-xs focus:outline-none"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-foreground hover:bg-foreground/90 text-background py-2.5 rounded font-semibold transition-colors flex items-center justify-center gap-1.5"
                >
                  <Plus className="h-4 w-4" /> Add Product to Catalog
                </button>
              </form>
            </div>

          </div>
        )}

        {/* Tab 3. Orders Fullfillment */}
        {activeTab === "orders" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="font-serif text-xl tracking-wide">Order Management Console</h3>
              <span className="text-xs text-muted-foreground">{filteredOrders.length} filtered / {orders.length} total orders</span>
            </div>

            {/* Filter controls */}
            <div className="bg-muted/20 border border-border/40 p-4 rounded-lg flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="w-full md:w-1/2">
                <label className="block text-[9px] font-semibold uppercase tracking-wider mb-1.5 text-muted-foreground">Search Orders</label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded border border-border bg-background px-3 py-2 text-xs focus:outline-none focus:border-luxury-gold text-foreground"
                  placeholder="Search by Order ID, Customer Name, or Email..."
                />
              </div>
              <div className="w-full md:w-1/4">
                <label className="block text-[9px] font-semibold uppercase tracking-wider mb-1.5 text-muted-foreground">Filter by Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full rounded border border-border bg-background px-3 py-2 text-xs focus:outline-none focus:border-luxury-gold text-foreground"
                >
                  <option value="All">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="Paid">Paid</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Failed">Failed</option>
                </select>
              </div>
            </div>

            {orders.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-border/40 rounded-lg">
                <p className="text-sm text-muted-foreground">No orders in the system yet.</p>
              </div>
            ) : filteredOrders.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-border/40 rounded-lg">
                <p className="text-sm text-muted-foreground">No orders match your search filter criteria.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map((order) => {
                  const shippingAddr = typeof order.shippingAddress === 'object' && order.shippingAddress
                    ? `${order.shippingAddress.address || ''}, ${order.shippingAddress.city || ''}`
                    : (order.shippingAddress || 'N/A');

                  return (
                    <div key={order.orderId} className="border border-border/40 rounded-lg p-5 bg-background shadow-sm hover:shadow transition-shadow">
                      {/* Order Header */}
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 border-b border-border/30 pb-3 mb-4">
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-1.5 text-xs">
                          <div>
                            <span className="text-muted-foreground">Order:</span>
                            <span className="font-bold text-foreground ml-1">{order.orderId}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Placed:</span>
                            <span className="font-semibold text-foreground ml-1">
                              {order.placedAt ? new Date(order.placedAt).toLocaleString() : (order.date ? new Date(order.date).toLocaleDateString() : 'N/A')}
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Customer:</span>
                            <span className="font-bold text-foreground ml-1">{order.shippingAddress?.name || 'N/A'}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Email:</span>
                            <span className="font-semibold text-primary ml-1">{order.customerEmail || 'guest@craftore.com'}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Items:</span>
                            <span className="font-semibold text-foreground ml-1">{order.itemsCount}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Total:</span>
                            <span className="font-bold text-foreground ml-1">₹{order.total?.toFixed(2)}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Ship To:</span>
                            <span className="font-semibold text-foreground ml-1 max-w-[200px] truncate inline-block align-bottom">{shippingAddr}</span>
                          </div>
                        </div>
                        <span className={`inline-flex rounded-full font-bold uppercase tracking-wider text-[9px] px-2.5 py-1 ${
                          order.status === "Delivered"
                            ? "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400"
                            : order.status === "Shipped"
                            ? "bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-400"
                            : order.status === "Cancelled"
                            ? "bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400"
                            : "bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400"
                        }`}>
                          {order.status}
                        </span>
                      </div>

                      {/* Admin Controls Row */}
                      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-end">
                        {/* Status Dropdown */}
                        <div className="flex-1 min-w-[180px]">
                          <label className="block text-[9px] font-semibold uppercase tracking-wider mb-1.5 text-muted-foreground">Change Status</label>
                          <select
                            value={order.status}
                            onChange={(e) => {
                              const newStatus = e.target.value;
                              handleUpdateOrderStatus(order.orderId, newStatus, order.adminRemarks);
                            }}
                            className="w-full rounded border border-border bg-background px-3 py-2 text-xs focus:outline-none focus:border-luxury-gold text-foreground"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Paid">Paid</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                            <option value="Failed">Failed</option>
                          </select>
                        </div>

                        {/* Admin Remarks Input */}
                        <div className="flex-[2] min-w-[250px]">
                          <label className="block text-[9px] font-semibold uppercase tracking-wider mb-1.5 text-muted-foreground flex items-center gap-1">
                            <MessageSquare className="h-3 w-3" /> Admin / Shipping Remarks
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={order.adminRemarks || ""}
                              onChange={(e) => {
                                // Update local state only (not saved to DB yet)
                                setOrders(prev => prev.map(o => 
                                  o.orderId === order.orderId ? { ...o, adminRemarks: e.target.value } : o
                                ));
                              }}
                              className="flex-1 rounded border border-border bg-background px-3 py-2 text-xs focus:outline-none focus:border-luxury-gold text-foreground"
                              placeholder="e.g. Tracking #IN4829301 via BlueDart"
                            />
                            <button
                              onClick={() => handleUpdateOrderStatus(order.orderId, order.status, order.adminRemarks)}
                              className="px-3 py-2 bg-foreground hover:bg-foreground/90 text-background rounded text-xs font-semibold transition-colors flex items-center gap-1"
                            >
                              <Truck className="h-3.5 w-3.5" />
                              Save
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Current Remarks Display */}
                      {order.adminRemarks && (
                        <div className="mt-3 bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-400 text-[10px] p-2.5 rounded border border-blue-200 dark:border-blue-900/30 flex items-start gap-2">
                          <MessageSquare className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                          <span><strong>Remarks:</strong> {order.adminRemarks}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}