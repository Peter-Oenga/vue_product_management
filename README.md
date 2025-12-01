# 📦 Product Management Dashboard  
### A Vue 3 + Vite Inventory & Product Management Web Application

This project is a **modern product management dashboard** built with **Vue 3 (Composition API), Vite, TailwindCSS, Pinia, and DummyJSON API**.  
It enables users to authenticate, view products, filter inventory, search items, and inspect each product’s full details using a clean, modern UI.

This dashboard replicates a **professional e-commerce admin panel**, including:

- 🔐 Login Authentication  
- 📦 Products Listing  
- 🔍 Search & Filters  
- 🏷 Dynamic Category Badges  
- 📊 Real-Time Stock Indicators  
- 📄 Detailed Product View Page  
- ⭐ Customer Review Analytics  
- 🎨 Fully Responsive Layout  
- 🗂 State Management Using Pinia  

---



---

## 🚀 Features

### 🔐 1. Authentication (DummyJSON)

- Logs users in using DummyJSON user accounts  
- Stores user info + token inside a Pinia store  
- Protects internal routes using Vue Router navigation guards  
- Automatically redirects unauthenticated users to `/login`

---

### 📦 2. Products Page (Full Inventory System)

The products page includes:

- 🔍 **Live search** (title-based)
- 🏷 **Category filter** (dynamic)
- 📊 **Stock-level filter** (In stock / Low stock / Out of stock)
- 🖼 **Product image thumbnails**
- 🧩 **Category color-coded badges**
- 📈 **Stock alerts with color indicators**
- ➕ **“Add New Product” CTA button**
- 📑 **Structured table layout** replicating mockups

---

### 📄 3. “View Product” Page

A modern e-commerce product detail layout:

- 🖼 Large high-quality product image  
- 📝 Product title + description  
- 💵 Price section  
- 🏷 Category badge  
- 📉 Stock status with visual indicator (green/yellow/red)  
- 🧭 Breadcrumb navigation  
- ⭐ Static review analytics with progress bars  
- ✏️ Edit button placeholder  

---

### 🛠 4. State Management (Pinia)

Two Pinia stores:

#### ✔ `auth.js`
- Handles login/logout  
- Stores JWT token  
- Stores user info  
- Provides `isAuthenticated` getter  
- Used in router guards  

#### ✔ `products.js`
- Fetches product list from DummyJSON  
- Provides `getProductById(id)`  
- Caches products in state  
- Exposes loading + error states (optional future upgrade)

---

### 🌐 5. DummyJSON API Integration

Used endpoints:

#### 🔐 Login
```http
POST https://dummyjson.com/auth/login
