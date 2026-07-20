import mongoose, { Schema } from "mongoose";

// Variant Schema
const variantSchema = new Schema({
  id: { type: String, required: true },
  sku: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  color: String,
  size: String
});

// Product Schema
const productSchema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: String,
  longDescription: String,
  price: { type: Number, required: true },
  b2bPrice: { type: Number, required: true },
  moq: { type: Number, default: 1 },
  categoryId: String,
  images: [String],
  rating: Number,
  variants: [variantSchema]
});

// Order Item Schema
const orderItemSchema = new Schema({
  productId: { type: String, required: true },
  variantId: { type: String, required: true },
  name: { type: String, required: true },
  sku: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  image: String
});

// Order Schema
const orderSchema = new Schema({
  orderId: { type: String, required: true, unique: true },
  stripeSessionId: { type: String, unique: true, sparse: true },
  customerEmail: { type: String, default: "guest@craftore.com" },
  date: { type: Date, default: Date.now },
  placedAt: { type: Date, default: Date.now },
  processedAt: Date,
  cancelledAt: Date,
  items: [orderItemSchema],
  total: { type: Number, required: true },
  status: {
    type: String,
    enum: ['Pending', 'Paid', 'Failed', 'Cancelled', 'Processing', 'Shipped', 'Delivered'],
    default: 'Pending'
  },
  shippingAddress: {
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    zip: { type: String, required: true },
    phone: { type: String, required: true }
  },
  paymentMethod: { type: String, required: true },
  discount: { type: Number, default: 0 },
  shippingCost: { type: Number, default: 0 },
  tax: { type: Number, default: 0 },
  adminRemarks: { type: String, default: "" }
});

// User Schema
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "customer" },
  isVerified: { type: Boolean, default: false },
  otp: String,
  otpExpires: Date,
  gender: String,
  dob: String,
  nationality: String
});

export const Product = mongoose.models.Product || mongoose.model("Product", productSchema);
export const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export const User = mongoose.models.User || mongoose.model("User", userSchema);
