// src/stores/products.js
import { defineStore } from "pinia";
import { useAuthStore } from "./auth"; // ensure correct path

export const useProductStore = defineStore("products", {
  state: () => ({
    products: [],
    isLoading: false,
    error: null,
  }),

  actions: {
    // -------------------------
    // FETCH ALL PRODUCTS
    // -------------------------
    async fetchProducts() {
      this.isLoading = true;
      this.error = null;

      try {
        const res = await fetch("https://dummyjson.com/products?limit=100");
        const data = await res.json();
        this.products = data.products || [];
      } catch (err) {
        this.error = "Failed to load products.";
      } finally {
        this.isLoading = false;
      }
    },

    // -------------------------
    // GET PRODUCT BY ID
    // -------------------------
    getProductById(id) {
      return this.products.find((p) => p.id === id);
    },

    // -------------------------
    // ADD PRODUCT (POST)
    // -------------------------
    async addProduct(payload) {
      this.isLoading = true;
      this.error = null;

      try {
        const auth = useAuthStore();

        const res = await fetch("https://dummyjson.com/products/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(auth.token ? { Authorization: `Bearer ${auth.token}` } : {}),
          },
          body: JSON.stringify(payload),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to add product.");
        }

        // Add new product instantly to UI list
        this.products.unshift(data);

        return data;
      } catch (err) {
        console.error("addProduct error:", err);
        this.error = err.message || "Failed to add product.";
        throw err;
      } finally {
        this.isLoading = false;
      }
    },

    // -------------------------
    // DELETE PRODUCT
    // -------------------------
    deleteProduct(id) {
      this.products = this.products.filter((p) => p.id !== id);
    },
  },
});
