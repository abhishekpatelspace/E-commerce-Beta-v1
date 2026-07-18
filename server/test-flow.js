import axios from 'axios';
import mongoose from 'mongoose';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const NODE_URL = "http://localhost:5000";
const PYTHON_URL = "http://localhost:5001";
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/craftore";
const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_mock_stripe_key");
const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || "whsec_mock_stripe_webhook";

async function runTests() {
  console.log("====================================================");
  console.log("Starting End-to-End E-Commerce Checkout Integration Test");
  console.log("====================================================\n");

  let connection;
  try {
    connection = await mongoose.connect(MONGODB_URI);
    console.log("✔ Connected to MongoDB.");
  } catch (err) {
    console.error("✘ Failed to connect to MongoDB. Is the service running?");
    console.error(err.message);
    process.exit(1);
  }

  // Define Schemas to verify DB states directly in test
  const Product = mongoose.models.Product || mongoose.model('Product', new mongoose.Schema({}, { strict: false }));
  const Order = mongoose.models.Order || mongoose.model('Order', new mongoose.Schema({}, { strict: false }));

  // 1. Confirm product is in DB and record stock
  const testProductId = "product-001";
  const testVariantId = "product-001-var-std";
  const purchaseQty = 2;
  const discountAmt = 5.00;

  const product = await Product.findOne({ id: testProductId });
  if (!product) {
    console.error(`✘ Test product ${testProductId} not found in DB. Run the server first to seed.`);
    process.exit(1);
  }

  const variant = product.variants.find(v => v.id === testVariantId);
  if (!variant) {
    console.error(`✘ Test variant ${testVariantId} not found under product ${testProductId} in DB.`);
    process.exit(1);
  }

  const initialStock = variant.stock;
  const productPrice = variant.price;
  console.log(`✔ Found product: "${product.name}" | Variant: "${variant.name}"`);
  console.log(`  Current price in DB: ₹${productPrice}`);
  console.log(`  Current stock in DB: ${initialStock} units`);

  // 2. Step 1: Next.js passes Cart State to Node.js backend.
  console.log("\n--- STEP 1: Creating Checkout Session via Node.js API ---");
  const cartState = {
    cart: [
      {
        id: `${testProductId}-${testVariantId}`,
        productId: testProductId,
        variantId: testVariantId,
        productName: product.name,
        variantName: variant.name,
        sku: variant.sku,
        price: productPrice, // Send valid price
        quantity: purchaseQty,
        image: product.images[0]
      }
    ],
    discount: discountAmt,
    shippingForm: {
      name: "Alice Tester",
      address: "123 Dev Lane",
      city: "Silicon City",
      zip: "94016",
      phone: "+1 555-0199",
      method: "standard",
      payment: "stripe"
    }
  };

  let createSessionRes;
  try {
    createSessionRes = await axios.post(`${NODE_URL}/api/checkout/create-session`, cartState);
    console.log("✔ Session successfully created!");
    console.log(`  Stripe Checkout Session URL: ${createSessionRes.data.url.substring(0, 70)}...`);
    console.log(`  Generated Order Reference ID: ${createSessionRes.data.orderId}`);
  } catch (err) {
    console.error("✘ Failed to create checkout session:", err.response?.data || err.message);
    process.exit(1);
  }

  const orderId = createSessionRes.data.orderId;

  // Verify order is created as Pending in MongoDB
  const pendingOrder = await Order.findOne({ orderId });
  if (!pendingOrder) {
    console.error(`✘ Order ${orderId} was not found in MongoDB after creation.`);
    process.exit(1);
  }
  console.log(`✔ Verified Order document created in MongoDB. Status is: "${pendingOrder.status}"`);

  // 3. Step 3: Stripe payment completes -> Stripe triggers Webhook back to Node.js.
  console.log("\n--- STEP 3: Simulating Stripe Webhook ---");
  
  // Construct Stripe Webhook payload
  const webhookPayload = {
    id: "evt_test_" + Math.random().toString(36).substring(7),
    object: "event",
    api_version: "2023-10-16",
    created: Math.floor(Date.now() / 1000),
    data: {
      object: {
        id: pendingOrder.stripeSessionId,
        object: "checkout.session",
        payment_status: "paid",
        metadata: {
          orderId: orderId
        }
      }
    },
    type: "checkout.session.completed"
  };

  const payloadString = JSON.stringify(webhookPayload);
  
  // Generate signed signature header using stripe SDK
  const sigHeader = stripeClient.webhooks.generateTestHeaderString({
    payload: payloadString,
    secret: WEBHOOK_SECRET,
  });

  try {
    const webhookRes = await axios.post(`${NODE_URL}/api/webhook`, payloadString, {
      headers: {
        'stripe-signature': sigHeader,
        'Content-Type': 'application/json'
      }
    });
    console.log("✔ Sent webhook to Node.js backend. Response status:", webhookRes.status);
  } catch (err) {
    console.error("✘ Webhook execution failed:", err.response?.data || err.message);
    process.exit(1);
  }

  // 4. Step 4: Verify Node.js updates order status to 'Paid'
  console.log("\n--- STEP 4: Verifying Order status updated in MongoDB ---");
  
  // Wait a short time for webhook processing and Python call to complete
  console.log("Waiting 2.5 seconds for webhook handler and Python engine process...");
  await new Promise(r => setTimeout(r, 2500));

  const paidOrder = await Order.findOne({ orderId });
  if (!paidOrder) {
    console.error(`✘ Could not find order ${orderId} in database.`);
    process.exit(1);
  }

  if (paidOrder.status !== 'Paid') {
    console.error(`✘ Order status check failed. Expected "Paid", got "${paidOrder.status}"`);
    process.exit(1);
  }
  console.log(`✔ Verified Order status in MongoDB is now: "${paidOrder.status}"`);

  // 5. Step 5: Verify Python engine syncs inventory, generates invoice, updates analytics
  console.log("\n--- STEP 5: Verifying Python Engine Automated Calculations ---");

  // Verify stock was decremented in MongoDB
  const updatedProduct = await Product.findOne({ id: testProductId });
  const updatedVariant = updatedProduct.variants.find(v => v.id === testVariantId);
  const expectedStock = initialStock - purchaseQty;
  
  if (updatedVariant.stock !== expectedStock) {
    console.error(`✘ Stock decrement failed. Expected ${expectedStock}, got ${updatedVariant.stock}`);
    process.exit(1);
  }
  console.log(`✔ Inventory Sync: Variant "${variant.name}" stock reduced from ${initialStock} to ${updatedVariant.stock} (Success)`);

  // Verify invoice file creation
  const invoicePath = path.join(__dirname, '../python_engine/invoices', `invoice_${orderId}.txt`);
  if (!fs.existsSync(invoicePath)) {
    console.error(`✘ Invoice file not found at ${invoicePath}`);
    process.exit(1);
  }
  console.log("✔ Invoicing: Checked file system. Invoice successfully generated!");
  
  const invoiceContents = fs.readFileSync(invoicePath, 'utf8');
  console.log("----- Invoice Contents Preview -----");
  console.log(invoiceContents.split('\n').slice(0, 15).join('\n') + "\n...");
  console.log("------------------------------------");

  // Verify analytics updates
  const analyticsPath = path.join(__dirname, '../python_engine/analytics.json');
  if (!fs.existsSync(analyticsPath)) {
    console.error(`✘ Analytics file not found at ${analyticsPath}`);
    process.exit(1);
  }
  
  try {
    const analytics = JSON.parse(fs.readFileSync(analyticsPath, 'utf8'));
    console.log("✔ Analytics: Checked analytics ledger. Latest metrics:");
    console.log(`  Total revenue: ₹${analytics.total_revenue}`);
    console.log(`  Total orders processed: ${analytics.total_orders}`);
    console.log(`  Total items sold: ${analytics.total_items_sold}`);
    console.log(`  Units of SKU ${variant.sku} sold: ${analytics.sku_sales[variant.sku]}`);
  } catch (err) {
    console.error("✘ Failed to parse analytics JSON file:", err.message);
    process.exit(1);
  }

  console.log("\n====================================================");
  console.log("🎉 ALL END-TO-END FLOW TESTS COMPLETED SUCCESSFULLY! 🎉");
  console.log("====================================================");
  
  await mongoose.disconnect();
}

runTests();
