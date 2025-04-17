## Gubbies

This is an app that will simulate being an owner of a store that contains inventory.

You will manage items quantities, prices and promotions all within the application.


# Functional Requirements
## 1. User Management
- FR1.1: The system should allow for role-based access control (RBAC) to manage users and their permissions.
- FR1.2: The system should allow for user account creation, modification, and deletion.
- FR1.3: Roles should include: Administrator, Manager, Warehouse Staff, Sales Personnel, and Finance Team.
- FR1.4: Users should be able to reset passwords securely via email or SMS.
## 2. Inventory Tracking
- FR2.1: The system should allow for real-time tracking of stock levels for each product.
- FR2.2: The system should support tracking inventory across multiple locations or warehouses.
- FR2.3: The system should track products using unique identifiers (e.g., SKU, barcode, or RFID tags).
- FR2.4: The system should update inventory levels in real time when items are sold, purchased, or returned.
## 3. Product Management
- FR3.1: The system should allow adding, editing, and deleting product details (e.g., name, description, price, SKU, and supplier).
- FR3.2: The system should support custom product attributes such as color, size, weight, etc.
- FR3.3: The system should support bulk import and export of product data (via CSV, Excel, etc.).
- FR3.4: The system should allow for categorizing products into different types (e.g., raw materials, finished goods, etc.).
## 4. Stock Movements
- FR4.1: The system should track all stock movements, including incoming shipments (purchase orders), outgoing shipments (sales orders), and internal transfers between warehouses.
- FR4.2: The system should allow for stock adjustments (e.g., stock counting, manual changes, damaged goods).
- FR4.3: The system should allow users to return products to suppliers or customers and update stock accordingly.
## 5. Barcode Scanning  (Probably won't need)
- FR5.1: The system should support barcode scanning to quickly identify products and update inventory levels.
- FR5.2: The system should support generating barcodes for new products.
## 6. Order Management
- FR6.1: The system should allow users to create, manage, and track purchase orders (POs) to suppliers.
- FR6.2: The system should allow users to create, manage, and track sales orders (SOs) from customers.
- FR6.3: The system should automatically update stock levels when POs and SOs are processed.
- FR6.4: The system should support partial order fulfillment and allow for backordering.
- FR6.5: The system should generate alerts or notifications when an order is ready for shipment or delivery.
## 7. Inventory Forecasting
- FR7.1: The system should be able to forecast demand based on historical sales data.
- FR7.2: The system should automatically suggest re-order points and quantities based on demand forecasting.
- FR7.3: The system should generate alerts when stock levels are running low or when items are overstocked.
## 8. Reporting and Analytics
- FR8.1: The system should generate customizable inventory reports, including stock levels, stock movements, and sales history.
- FR8.2: The system should provide a report for stock aging to identify slow-moving items.
- FR8.3: The system should provide profitability reports based on inventory turnover and cost of goods sold (COGS).
- FR8.4: The system should provide real-time dashboards displaying inventory metrics (e.g., stock levels, orders, and sales).
## 9. Supplier & Vendor Management
- FR9.1: The system should allow for managing vendor information, including contact details, lead times, and order history.
- FR9.2: The system should allow users to track supplier performance (e.g., on-time delivery rate, quality).
## 10. Returns Management
- FR10.1: The system should allow for processing returns from customers and updating stock levels accordingly.
- FR10.2: The system should allow for returning goods to suppliers and tracking the status of returns.
## 11. Stock Alerts and Notifications
- FR11.1: The system should send notifications for low stock levels or when items need to be reordered.
- FR11.2: The system should send alerts for products approaching expiration (for perishable goods).
- FR11.3: The system should send notifications for order status changes (e.g., order shipped, backorder).
## 12. Integration with Other Systems
- FR12.1: The system should integrate with e-commerce platforms (e.g., Shopify, WooCommerce) to sync online orders and inventory levels.
- FR12.2: The system should integrate with accounting software to manage financial records related to inventory.
- FR12.3: The system should allow integration with ERP or other enterprise systems.