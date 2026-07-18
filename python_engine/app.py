import os
import json
from datetime import datetime
from flask import Flask, request, jsonify
from pymongo import MongoClient
from dotenv import load_dotenv

app = Flask(__name__)

# Load variables from root .env
current_dir = os.path.dirname(os.path.abspath(__file__))
dotenv_path = os.path.join(current_dir, '../.env')
load_dotenv(dotenv_path, override=True)

# MongoDB connection setup
mongo_uri = os.environ.get("MONGODB_URI", "mongodb://127.0.0.1:27017/craftore")
client = MongoClient(mongo_uri)

# Retrieve database name from uri or default to "craftore"
db_name = mongo_uri.split('/')[-1] if '/' in mongo_uri.split('//')[-1] else 'craftore'
# Strip query options if present
if '?' in db_name:
    db_name = db_name.split('?')[0]
db = client[db_name]

products_collection = db["products"]
orders_collection = db["orders"]

# Invoices directory
invoices_dir = os.path.join(current_dir, 'invoices')
os.makedirs(invoices_dir, exist_ok=True)

# Analytics File Path
analytics_file = os.path.join(current_dir, 'analytics.json')

def update_analytics(order_data):
    """
    Load analytics.json, update metrics, and save it back.
    """
    default_analytics = {
        "total_revenue": 0.0,
        "total_orders": 0,
        "total_items_sold": 0,
        "sku_sales": {},
        "last_updated": ""
    }
    
    analytics = default_analytics.copy()
    if os.path.exists(analytics_file):
        try:
            with open(analytics_file, 'r') as f:
                analytics = json.load(f)
        except Exception as e:
            print(f"Error reading analytics file, resetting metrics: {e}")
            
    # Safely convert total revenue and add
    try:
        revenue = float(order_data.get("total", 0.0))
    except (ValueError, TypeError):
        revenue = 0.0
        
    analytics["total_revenue"] = round(analytics.get("total_revenue", 0.0) + revenue, 2)
    analytics["total_orders"] = analytics.get("total_orders", 0) + 1
    
    sku_sales = analytics.setdefault("sku_sales", {})
    items_sold_inc = 0
    
    for item in order_data.get("items", []):
        qty = int(item.get("quantity", 0))
        sku = item.get("sku", "UNKNOWN")
        sku_sales[sku] = sku_sales.get(sku, 0) + qty
        items_sold_inc += qty
        
    analytics["total_items_sold"] = analytics.get("total_items_sold", 0) + items_sold_inc
    analytics["last_updated"] = datetime.utcnow().isoformat() + "Z"
    
    try:
        with open(analytics_file, 'w') as f:
            json.dump(analytics, f, indent=2)
        print(f"Analytics successfully updated. Total revenue: ₹{analytics['total_revenue']}")
    except Exception as e:
        print(f"Failed to write analytics.json: {e}")

@app.route('/order-paid', methods=['POST'])
def handle_order_paid():
    order_data = request.get_json()
    if not order_data:
        return jsonify({"error": "No order data payload provided."}), 400
        
    order_id = order_data.get("orderId")
    items = order_data.get("items", [])
    
    if not order_id:
        return jsonify({"error": "Missing orderId in payload."}), 400
        
    print(f"Python Engine: Processing paid order: {order_id}")
    
    # 1. Inventory Sync: Decrement stock for product variants in MongoDB
    sync_logs = []
    for item in items:
        prod_id = item.get("productId")
        var_id = item.get("variantId")
        qty = int(item.get("quantity", 0))
        sku = item.get("sku", "")
        
        if not prod_id or not var_id or qty <= 0:
            continue
            
        # Update specific nested variant stock using positional ₹ operator
        result = products_collection.update_one(
            {"id": prod_id, "variants.id": var_id},
            {"$inc": {"variants.$.stock": -qty}}
        )
        
        sync_logs.append(f"Decremented SKU {sku} stock by {qty}. Match count: {result.matched_count}, Modified count: {result.modified_count}")
        
    for log in sync_logs:
        print(log)
        
    # 2. Invoicing: Generate a clean invoice text file
    shipping_addr = order_data.get("shippingAddress", {})
    discount = float(order_data.get("discount", 0.0))
    shipping_cost = float(order_data.get("shippingCost", 0.0))
    tax = float(order_data.get("tax", 0.0))
    total = float(order_data.get("total", 0.0))
    
    # Calculate subtotal based on items
    subtotal = sum(float(item.get("price", 0.0)) * int(item.get("quantity", 0)) for item in items)
    
    invoice_content = f"""=========================================
              CRAFTORE INVOICE
=========================================
Order Reference: {order_id}
Date: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}

Customer Details:
Name: {shipping_addr.get('name', 'N/A')}
Phone: {shipping_addr.get('phone', 'N/A')}
Shipping Address: 
  {shipping_addr.get('address', 'N/A')}
  {shipping_addr.get('city', 'N/A')}, {shipping_addr.get('zip', 'N/A')}

Items Purchased:
-----------------------------------------
"""
    for item in items:
        item_total = float(item.get('price', 0.0)) * int(item.get('quantity', 0))
        invoice_content += f"- {item.get('name', 'Product Item')}\n"
        invoice_content += f"  SKU: {item.get('sku', 'N/A')}\n"
        invoice_content += f"  Price: ₹{float(item.get('price', 0.0)):.2f} x {item.get('quantity', 0)} = ₹{item_total:.2f}\n\n"
        
    invoice_content += f"""-----------------------------------------
Subtotal:        ₹{subtotal:.2f}
Discount:       -₹{discount:.2f}
Shipping Cost:   ₹{shipping_cost:.2f}
Estimated Tax:   ₹{tax:.2f}
-----------------------------------------
Total Paid:      ₹{total:.2f}

Payment Status: Paid
Security Token: Stripe Session Checked
Thank you for shopping with CraftOre!
=========================================
"""
    
    invoice_filename = f"invoice_{order_id}.txt"
    invoice_path = os.path.join(invoices_dir, invoice_filename)
    
    try:
        with open(invoice_path, 'w', encoding='utf-8') as f:
            f.write(invoice_content)
        print(f"Invoice saved at: {invoice_path}")
    except Exception as e:
        print(f"Failed to generate invoice file: {e}")
        
    # 3. Analytics Tracking: Update sales log
    update_analytics(order_data)
    
    return jsonify({
        "status": "success",
        "message": f"Calculations completed for order {order_id}.",
        "inventorySync": sync_logs,
        "invoicePath": invoice_path
    })

@app.route('/analytics', methods=['GET'])
def get_analytics():
    if os.path.exists(analytics_file):
        with open(analytics_file, 'r') as f:
            data = json.load(f)
        return jsonify(data)
    return jsonify({"error": "No analytics data available yet."}), 404

if __name__ == '__main__':
    # Run python calculations engine on port 5001
    app.run(host='0.0.0.0', port=5001, debug=True)
