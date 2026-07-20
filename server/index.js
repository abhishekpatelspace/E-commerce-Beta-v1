import express from 'express';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import mongoose from 'mongoose';
import stripe from 'stripe';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import admin from 'firebase-admin';

// Configure dotenv to point to the root .env file
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env'), override: true });

const app = express();
const PORT = process.env.PORT || 5000;
const stripeClient = stripe(process.env.STRIPE_SECRET_KEY);

// Define Schemas & Models
const variantSchema = new mongoose.Schema({
  id: { type: String, required: true },
  sku: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  color: String,
  size: String
});

const productSchema = new mongoose.Schema({
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

const Product = mongoose.model('Product', productSchema);

const orderItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  variantId: { type: String, required: true },
  name: { type: String, required: true },
  sku: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  image: String
});

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  stripeSessionId: { type: String, unique: true, sparse: true },
  customerEmail: { type: String, default: "guest@craftore.com" },
  date: { type: Date, default: Date.now },
  placedAt: { type: Date, default: Date.now },
  processedAt: { type: Date },
  cancelledAt: { type: Date },
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

const Order = mongoose.model('Order', orderSchema);

// User Schema & Model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // salt:hash
  role: { type: String, default: "customer" }, // "customer" | "admin"
  isVerified: { type: Boolean, default: false },
  otp: { type: String },
  otpExpires: { type: Date },
  gender: { type: String },
  dob: { type: String },
  nationality: { type: String }
});

const User = mongoose.model('User', userSchema);

// Password Cryptography Helpers (PBKDF2)
function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

function verifyPassword(password, storedPassword) {
  try {
    const [salt, originalHash] = storedPassword.split(':');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return hash === originalHash;
  } catch (e) {
    return false;
  }
}

// HS256 Token Helpers
function generateToken(payload) {
  const secret = process.env.JWT_SECRET || "craftore_default_secure_secret_token_key";
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString('base64url');
  const body = Buffer.from(JSON.stringify({ ...payload, exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60 })).toString('base64url');
  const signature = crypto.createHmac('sha256', secret).update(`${header}.${body}`).digest('base64url');
  return `${header}.${body}.${signature}`;
}

// Initialize Firebase Admin SDK
let firebaseAdminApp = null;
const hasFirebaseCreds = process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY;

if (hasFirebaseCreds) {
  try {
    const privateKey = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n');
    firebaseAdminApp = admin.initializeApp({
      credential: admin.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: privateKey
      })
    });
    console.log("✔ Firebase Admin SDK successfully initialized.");
  } catch (err) {
    console.error("✘ Failed to initialize Firebase Admin SDK:", err.message);
  }
} else {
  console.warn("⚠️ Firebase environment credentials not found. Firebase features will run in dev/mock fallback mode.");
}

async function verifyToken(token) {
  if (firebaseAdminApp) {
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      return {
        id: decodedToken.uid,
        email: decodedToken.email,
        role: decodedToken.email === "abhishekpatelspace@gmail.com" ? "admin" : "customer"
      };
    } catch (fbErr) {
      console.warn("Firebase token verification failed, checking custom JWT signature...");
    }
  }

  const secret = process.env.JWT_SECRET || "craftore_default_secure_secret_token_key";
  try {
    const [header, body, signature] = token.split('.');
    if (!header || !body || !signature) return null;
    const verifiedSignature = crypto.createHmac('sha256', secret).update(`${header}.${body}`).digest('base64url');
    if (signature !== verifiedSignature) return null;
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString());
    if (payload.exp && Date.now() / 1000 > payload.exp) return null;
    return payload;
  } catch (e) {
    return null;
  }
}

async function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: "Access token is required." });

  const payload = await verifyToken(token);
  if (!payload) return res.status(403).json({ error: "Invalid or expired token." });

  req.user = payload;
  next();
}

function requireAdmin(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: "Unauthorized. Admin access only." });
  }
  next();
}

// Nodemailer Transporter Configuration (Gmail SMTP)
const mailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});

// Email verification OTP sender helper
async function sendVerificationEmail(email, otp) {
  const mailOptions = {
    from: `"CraftOre Security" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: 'Your CraftOre Verification Code',
    text: `Your CraftOre verification code is: ${otp}. It will expire in 10 minutes.`,
    html: `
      <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 8px;">
        <h2 style="color: #c5a880; font-family: serif; border-bottom: 1px solid #eee; padding-bottom: 10px; margin-top: 0;">Verify Your CraftOre Account</h2>
        <p>Thank you for signing up with CraftOre. Please enter the following 6-digit verification code to complete your registration:</p>
        <div style="background-color: #f9f6f0; border: 1px solid #e5dfd5; padding: 15px; font-size: 28px; font-weight: bold; letter-spacing: 6px; text-align: center; margin: 25px 0; color: #1a1a1a; border-radius: 4px;">
          ${otp}
        </div>
        <p style="font-size: 12px; color: #888; border-top: 1px solid #eee; padding-top: 15px; margin-top: 20px;">
          This OTP is valid for 10 minutes. If you did not request this, please ignore this email.
        </p>
      </div>
    `
  };
  try {
    await mailTransporter.sendMail(mailOptions);
    console.log(`✔ Verification email sent successfully to ${email}`);
  } catch (err) {
    console.error('Failed to send verification email:', err);
  }
}

// Welcome credentials email sender
async function sendWelcomeCredentialsEmail(email, name, password) {
  const mailOptions = {
    from: `"CraftOre Support" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: 'Welcome to CraftOre - Your Account Details',
    text: `Hello ${name},\n\nYour account has been created successfully!\n\nHere are your login credentials:\nEmail: ${email}\nPassword: ${password}\n\nPlease use these credentials to sign in.\n\nBest regards,\nCraftOre Team`,
    html: `
      <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 8px;">
        <h2 style="color: #c5a880; font-family: serif; border-bottom: 1px solid #eee; padding-bottom: 10px; margin-top: 0;">Welcome to CraftOre</h2>
        <p>Hello <strong>${name}</strong>,</p>
        <p>Your account has been successfully registered on our premium sustainable lifestyle store. Here are your account login details:</p>
        <div style="background-color: #f9f6f0; border: 1px solid #e5dfd5; padding: 15px; margin: 20px 0; border-radius: 4px;">
          <p style="margin: 5px 0;"><strong>Login Email:</strong> ${email}</p>
          <p style="margin: 5px 0;"><strong>Password:</strong> ${password}</p>
        </div>
        <p>Please keep these credentials secure. You can log in using these details or the password you specified during registration.</p>
        <p style="font-size: 12px; color: #888; border-top: 1px solid #eee; padding-top: 15px; margin-top: 20px;">
          Best regards,<br/>
          <strong>The CraftOre Team</strong>
        </p>
      </div>
    `
  };
  try {
    await mailTransporter.sendMail(mailOptions);
    console.log(`✔ Welcome credentials email sent successfully to ${email}`);
  } catch (err) {
    console.error('Failed to send welcome credentials email:', err);
  }
}

// MongoDB Connection with Local Fallback
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/craftore";
const LOCAL_MONGODB_URI = "mongodb://127.0.0.1:27017/craftore";

async function connectDB() {
  try {
    console.log(`Connecting to MongoDB URI...`);
    await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
    console.log('Connected to MongoDB successfully.');
    await seedProducts();
    await seedAdminUser();
  } catch (err) {
    console.error(`MongoDB connection to primary URI failed:`, err.message);
    if (MONGODB_URI !== LOCAL_MONGODB_URI) {
      console.log(`Attempting fallback connection to local MongoDB: ${LOCAL_MONGODB_URI}`);
      try {
        await mongoose.connect(LOCAL_MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
        console.log('Connected to fallback local MongoDB successfully.');
        await seedProducts();
        await seedAdminUser();
      } catch (localErr) {
        console.error('Local MongoDB connection error:', localErr.message);
      }
    }
  }
}

connectDB();

// Seed mock products into MongoDB if they don't exist
async function seedProducts() {
  try {
    const seedFile = path.join(__dirname, 'products-seed.json');
    if (fs.existsSync(seedFile)) {
      const seedData = JSON.parse(fs.readFileSync(seedFile, 'utf8'));
      let seededCount = 0;
      for (const item of seedData) {
        const exists = await Product.findOne({ id: item.id });
        if (!exists) {
          await Product.create(item);
          seededCount++;
        }
      }
      if (seededCount > 0) {
        console.log(`Seeded ${seededCount} new products successfully.`);
      } else {
        console.log('All seed products are already present in the database.');
      }
    } else {
      console.warn('products-seed.json not found. Skipping seed.');
    }
  } catch (error) {
    console.error('Failed to seed products:', error);
  }
}

// Seed mock admin user
async function seedAdminUser() {
  try {
    const adminEmail = "abhishekpatelspace@gmail.com";
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (!existingAdmin) {
      const adminPassword = "9131725993";
      const hashedPassword = hashPassword(adminPassword);
      await User.create({
        name: "Abhishek Patel",
        email: adminEmail,
        password: hashedPassword,
        role: "admin",
        isVerified: true
      });
      console.log("✔ Admin user successfully seeded in database.");
    } else {
      console.log("Admin user already exists in database.");
    }
  } catch (error) {
    console.error('Failed to seed admin user:', error);
  }
}

// CORS Middleware
app.use(cors());

// Route specific body-parsing configuration (stripe webhook needs raw body)
app.use((req, res, next) => {
  if (req.originalUrl === '/api/webhook') {
    next();
  } else {
    express.json()(req, res, next);
  }
});

// Authentication Endpoints
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password, gender, dob, nationality } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Missing required fields." });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered." });
    }

    // Generate 6-digit OTP code
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 mins expiry

    const hashedPassword = hashPassword(password);
    await User.create({
      name,
      email,
      password: hashedPassword,
      role: "customer",
      isVerified: false,
      otp,
      otpExpires,
      gender,
      dob,
      nationality
    });

    console.log(`[AUTH REGISTER] Generated OTP for customer email ${email}: ${otp}`);

    // Send actual verification email
    await sendVerificationEmail(email, otp);

    // Also send login credentials to their email
    await sendWelcomeCredentialsEmail(email, name, password);

    res.json({
      message: "Registration successful. Please verify the OTP sent to your email.",
      email: email
    });
  } catch (e) {
    console.error('Registration failed:', e);
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/auth/verify-otp', async (req, res) => {
  const { email, otp } = req.body;
  try {
    if (!email || !otp) {
      return res.status(400).json({ error: "Email and OTP are required." });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User profile not found." });
    }
    if (user.otp !== otp || !user.otpExpires || user.otpExpires < new Date()) {
      return res.status(400).json({ error: "Invalid or expired OTP." });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    const token = generateToken({ id: user._id, email: user.email, role: user.role });
    res.json({
      name: user.name,
      email: user.email,
      role: user.role,
      token,
      gender: user.gender,
      dob: user.dob,
      nationality: user.nationality
    });
  } catch (e) {
    console.error('OTP verification failed:', e);
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }
    const user = await User.findOne({ email });
    if (!user || !verifyPassword(password, user.password)) {
      return res.status(400).json({ error: "Invalid email or password." });
    }

    if (!user.isVerified) {
      // Trigger new OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      user.otp = otp;
      user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
      await user.save();
      console.log(`[AUTH LOGIN] User not verified. Sent new OTP for ${email}: ${otp}`);

      // Send actual verification email
      await sendVerificationEmail(email, otp);

      return res.status(202).json({
        requiresVerification: true,
        email: user.email
      });
    }

    const token = generateToken({ id: user._id, email: user.email, role: user.role });
    res.json({
      name: user.name,
      email: user.email,
      role: user.role,
      token,
      gender: user.gender,
      dob: user.dob,
      nationality: user.nationality
    });
  } catch (e) {
    console.error('Login authentication failed:', e);
    res.status(500).json({ error: e.message });
  }
});

// Sync Firebase User Profile details to MongoDB
app.post('/api/auth/sync-profile', authenticateToken, async (req, res) => {
  const { name, gender, dob, nationality } = req.body;
  try {
    const email = req.user.email;
    if (!email) {
      return res.status(400).json({ error: "Email is missing from verified credentials token." });
    }
    
    // Check if user already exists in DB
    let user = await User.findOne({ email: String(email) });
    if (!user) {
      // Create user profile document in DB
      user = await User.create({
        name: name || email.split("@")[0],
        email: email,
        password: "firebase_authenticated_external_account",
        role: email === "abhishekpatelspace@gmail.com" ? "admin" : "customer",
        isVerified: true,
        gender,
        dob,
        nationality
      });
      console.log(`[PROFILE SYNC] Saved new Firebase user profile for email: ${email}`);
    } else {
      // Update existing user details
      if (name) user.name = name;
      if (gender) user.gender = gender;
      if (dob) user.dob = dob;
      if (nationality) user.nationality = nationality;
      user.isVerified = true;
      await user.save();
      console.log(`[PROFILE SYNC] Updated user profile for email: ${email}`);
    }
    
    res.json({ message: "Profile successfully synchronized.", user });
  } catch (err) {
    console.error('Failed to sync profile:', err);
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/auth/send-otp', async (req, res) => {
  const { email } = req.body;
  try {
    if (!email) {
      return res.status(400).json({ error: "Email is required." });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Email address not registered. Please sign up." });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    console.log(`[AUTH SEND-OTP] Generated login OTP for ${email}: ${otp}`);

    // Send actual verification email
    await sendVerificationEmail(email, otp);

    res.json({
      message: "OTP sent successfully.",
      email: email
    });
  } catch (e) {
    console.error('Failed to send OTP:', e);
    res.status(500).json({ error: e.message });
  }
});

// Get Orders Endpoint (secured with authentication)
app.get('/api/orders', authenticateToken, async (req, res) => {
  try {
    const { email } = req.query;
    let query = {};
    
    if (req.user.role === 'admin') {
      if (email) {
        query.customerEmail = String(email);
      }
    } else {
      query.customerEmail = req.user.email;
    }
    
    const orders = await Order.find(query).sort({ date: -1 });
    res.json(orders);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Cancel Order Endpoint (secured with authentication)
app.post('/api/orders/:orderId/cancel', authenticateToken, async (req, res) => {
  const { orderId } = req.params;
  try {
    const order = await Order.findOne({ orderId: String(orderId) });
    if (!order) {
      return res.status(404).json({ error: "Order not found." });
    }

    if (req.user.role !== 'admin' && order.customerEmail !== req.user.email) {
      return res.status(403).json({ error: "Unauthorized to cancel this order." });
    }

    // User can cancel if status is Pending, Paid, or Processing
    if (order.status !== 'Pending' && order.status !== 'Paid' && order.status !== 'Processing') {
      return res.status(400).json({ error: `Cannot cancel an order with status "${order.status}".` });
    }

    order.status = 'Cancelled';
    order.cancelledAt = new Date();
    await order.save();

    console.log(`Order ${orderId} has been successfully cancelled by ${req.user.email}.`);
    res.json({ message: "Order cancelled successfully.", order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Update Order Status Endpoint (secured with admin authentication)
app.put('/api/orders/:orderId/status', authenticateToken, requireAdmin, async (req, res) => {
  const { orderId } = req.params;
  const { status, adminRemarks } = req.body;
  try {
    const validStatuses = ['Pending', 'Paid', 'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Failed'];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({ error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
    }

    const order = await Order.findOne({ orderId: String(orderId) });
    if (!order) {
      return res.status(404).json({ error: "Order not found." });
    }

    order.status = status;

    // Set timestamps based on status
    if (status === 'Paid' || status === 'Processing') {
      order.processedAt = order.processedAt || new Date();
    }
    if (status === 'Cancelled') {
      order.cancelledAt = new Date();
    }

    // Save admin remarks if provided
    if (adminRemarks !== undefined) {
      order.adminRemarks = adminRemarks;
    }

    await order.save();

    console.log(`[ADMIN] Order ${orderId} status updated to "${status}"${adminRemarks ? ` with remarks: "${adminRemarks}"` : ''}`);
    res.json({ message: `Order status updated to ${status}.`, order });
  } catch (err) {
    console.error('Admin status update failed:', err);
    res.status(500).json({ error: err.message });
  }
});

// Checkout Session Endpoint
app.post('/api/checkout/create-session', async (req, res) => {
  const { cart, discount = 0, shippingForm, customerEmail = "guest@craftore.com" } = req.body;

  if (!cart || !Array.isArray(cart) || cart.length === 0) {
    return res.status(400).json({ error: "Shopping cart is empty or invalid." });
  }
  if (!shippingForm || !shippingForm.name || !shippingForm.address) {
    return res.status(400).json({ error: "Shipping details are missing or invalid." });
  }

  try {
    // 1. Validate prices against MongoDB
    const validatedItems = [];
    let cartSubtotal = 0;

    for (const item of cart) {
      // Find product in MongoDB
      const dbProduct = await Product.findOne({ id: item.productId });
      if (!dbProduct) {
        return res.status(400).json({ error: `Product ${item.productName} (ID: ${item.productId}) does not exist in our catalog.` });
      }

      // Find the specific variant
      const dbVariant = dbProduct.variants.find(v => v.id === item.variantId);
      if (!dbVariant) {
        return res.status(400).json({ error: `Variant ${item.variantName} for product ${item.productName} does not exist.` });
      }

      // Check if price matches
      if (dbVariant.price !== item.price) {
        return res.status(400).json({
          error: `Price mismatch for ${item.productName} (${item.variantName}). Client sent: ₹${item.price}, DB lists: ₹${dbVariant.price}`
        });
      }

      // Add to validated list
      validatedItems.push({
        productId: item.productId,
        variantId: item.variantId,
        name: `${dbProduct.name} - ${dbVariant.name}`,
        sku: dbVariant.sku,
        price: dbVariant.price,
        quantity: item.quantity,
        image: dbProduct.images[0] || item.image
      });

      cartSubtotal += dbVariant.price * item.quantity;
    }

    // Security Check: Validate discount amount is not forged/arbitrary
    if (discount > 0 && discount > Math.round(cartSubtotal * 0.10) + 1) {
      return res.status(400).json({ error: "Invalid discount amount. Retail discounts are capped at 10%." });
    }

    // 2. Calculate shipping, tax, total
    const shippingCost = cartSubtotal > 2000 ? 0 : 100;
    const taxRate = 0.08;
    const taxableAmount = cartSubtotal - discount;
    const tax = Math.max(0, taxableAmount * taxRate);
    const finalTotal = Math.max(0, taxableAmount + shippingCost + tax);

    // 3. Create a unique Order Reference in DB
    const orderId = `CRO-ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    const order = new Order({
      orderId,
      customerEmail,
      items: validatedItems,
      total: finalTotal,
      status: 'Pending',
      shippingAddress: {
        name: shippingForm.name,
        address: shippingForm.address,
        city: shippingForm.city,
        zip: shippingForm.zip,
        phone: shippingForm.phone
      },
      paymentMethod: shippingForm.payment || 'stripe',
      discount,
      shippingCost,
      tax
    });

    await order.save();

    if (shippingForm.payment === 'cod') {
      return res.json({ url: null, orderId: orderId, status: 'Pending' });
    }

    // 4. Construct Stripe checkout session line items
    const lineItems = validatedItems.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: item.image ? [item.image] : [],
        },
        unit_amount: Math.round(item.price * 100), // Stripe expects cents
      },
      quantity: item.quantity,
    }));

    // Add shipping cost as a line item if applicable
    if (shippingCost > 0) {
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: `Shipping (${shippingForm.method === 'express' ? 'Express' : 'Standard'})`,
          },
          unit_amount: Math.round(shippingCost * 100),
        },
        quantity: 1,
      });
    }

    // Add tax as a line item if applicable
    if (tax > 0) {
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Sales Tax (8%)',
          },
          unit_amount: Math.round(tax * 100),
        },
        quantity: 1,
      });
    }

    // Handle discounts via Stripe coupons
    const stripeDiscounts = [];
    const isMock = process.env.STRIPE_SECRET_KEY && process.env.STRIPE_SECRET_KEY.includes('mock');

    if (discount > 0) {
      if (isMock) {
        stripeDiscounts.push({ coupon: 'mock_coupon_id' });
      } else {
        const coupon = await stripeClient.coupons.create({
          amount_off: Math.round(discount * 100),
          currency: 'usd',
          duration: 'once'
        });
        stripeDiscounts.push({ coupon: coupon.id });
      }
    }

    // 5. Create Stripe session
    const successUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/checkout?status=success&session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/checkout?status=cancel`;

    let session;
    if (isMock) {
      const mockSessionId = `cs_mock_${Math.random().toString(36).substring(2, 15)}`;
      session = {
        id: mockSessionId,
        url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/checkout?status=success&session_id=${mockSessionId}`
      };
      console.log(`Mocking Stripe Session creation: ${session.id}`);
    } else {
      session = await stripeClient.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        discounts: stripeDiscounts,
        success_url: successUrl,
        cancel_url: cancelUrl,
        metadata: {
          orderId: orderId
        }
      });
    }

    // 6. Save stripe session ID in Order
    order.stripeSessionId = session.id;
    await order.save();

    res.json({ url: session.url, orderId: orderId });

  } catch (error) {
    console.error('Checkout session creation failed:', error);
    res.status(500).json({ error: error.message });
  }
});

// Stripe Webhook Endpoint
app.post('/api/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;
  const isMock = process.env.STRIPE_SECRET_KEY && process.env.STRIPE_SECRET_KEY.includes('mock');

  try {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "whsec_mock_stripe_webhook";
    event = stripeClient.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    if (isMock) {
      console.log('Webhook signature verification failed or skipped in Mock mode. Parsing body directly.');
      try {
        event = JSON.parse(req.body.toString());
      } catch (jsonErr) {
        return res.status(400).send(`Webhook Mock Error (Invalid JSON body): ${jsonErr.message}`);
      }
    } else {
      console.error('Webhook signature verification failed:', err.message);
      return res.status(400).send(`Webhook Verification Error: ${err.message}`);
    }
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const orderId = session.metadata.orderId;

    console.log(`Stripe webhook: Checkout completed for session ${session.id}. Order: ${orderId}`);

    try {
      // Find order and mark as Paid
      const order = await Order.findOneAndUpdate(
        { orderId: orderId },
        { status: 'Paid', processedAt: new Date() },
        { new: true }
      );

      if (order) {
        console.log(`Order ${orderId} status updated to Paid.`);

        // Forward paid order details to the Python Calculations Engine
        const pythonUrl = process.env.PYTHON_ENGINE_URL || "http://localhost:5001";
        try {
          const response = await axios.post(`${pythonUrl}/order-paid`, {
            orderId: order.orderId,
            items: order.items,
            total: order.total,
            discount: order.discount,
            shippingCost: order.shippingCost,
            tax: order.tax,
            shippingAddress: order.shippingAddress,
            date: order.date
          });
          console.log(`Successfully forwarded data to Python Engine. Status: ${response.status}`);
        } catch (pyError) {
          console.error(`Error forwarding order to Python Calculations Engine: ${pyError.message}`);
        }
      } else {
        console.error(`Order ${orderId} was not found in MongoDB database.`);
      }
    } catch (dbError) {
      console.error(`Database error while processing paid order: ${dbError.message}`);
    }
  }

  res.json({ received: true });
});

app.listen(PORT, () => {
  console.log(`Node.js checkout backend running on port ${PORT}`);
});
