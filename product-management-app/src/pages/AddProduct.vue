<template>
  <div class="min-h-screen bg-gray-50 px-10 py-10">
    <!-- PAGE TITLE -->
    <h1 class="text-3xl font-bold text-gray-900">Add New Product</h1>
    <p class="text-gray-600 mt-1">
      Enter the details below to add a new item to your inventory.
    </p>

    <!-- FORM CARD -->
    <div class="bg-white mt-10 p-10 rounded-2xl shadow-sm max-w-5xl">
      <!-- PRODUCT INFORMATION -->
      <h2 class="text-lg font-semibold text-gray-900 mb-6">
        Product Information
      </h2>

      <!-- Title -->
      <label class="block text-sm font-medium text-gray-700 mb-1">
        Product Title
      </label>
      <input
        v-model="title"
        type="text"
        placeholder="Enter product title"
        class="w-full mb-6 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:outline-none"
      />

      <!-- Description -->
      <label class="block text-sm font-medium text-gray-700 mb-1">
        Product Description
      </label>
      <textarea
        v-model="description"
        rows="4"
        placeholder="Provide a detailed description of the product"
        class="w-full mb-10 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:outline-none"
      ></textarea>

      <!-- PRICING & INVENTORY -->
      <h2 class="text-lg font-semibold text-gray-900 mb-6">
        Pricing & Inventory
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <!-- Price -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Price</label
          >
          <input
            v-model="price"
            type="number"
            placeholder="$ 0.00"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:outline-none"
          />
        </div>

        <!-- Stock -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Stock Quantity
          </label>
          <input
            v-model="stock"
            type="number"
            placeholder="Enter stock quantity"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:outline-none"
          />
        </div>
      </div>

      <!-- Category -->
      <label class="block text-sm font-medium text-gray-700 mb-1"
        >Category</label
      >
      <select
        v-model="category"
        class="w-full mb-10 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:outline-none"
      >
        <option value="" disabled>Select a category</option>
        <option value="beauty">Beauty</option>
        <option value="fragrances">Fragrances</option>
        <option value="furniture">Furniture</option>
        <option value="groceries">Groceries</option>
        <option value="home-decoration">Home Decoration</option>
        <option value="laptops">Laptops</option>
        <option value="smartphones">Smartphones</option>
      </select>

      <!-- MEDIA -->
      <h2 class="text-lg font-semibold text-gray-900 mb-4">Media</h2>

      <!-- Clickable Upload Box -->
      <div
        @click="triggerFileUpload"
        class="border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 py-12 flex flex-col items-center justify-center cursor-pointer hover:border-blue-900 transition"
      >
        <!-- Upload Icon -->
        <svg
          class="w-12 h-12 text-gray-500 mb-4"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 16V4m0 0L8 8m4-4l4 4M6 16h12"
          />
        </svg>

        <!-- Main Text -->
        <p class="text-blue-900 font-medium text-sm">
          Click to upload <span class="text-gray-500">or drag and drop</span>
        </p>

        <!-- Subtext -->
        <p class="text-gray-400 text-xs mt-1">
          SVG, PNG, JPG or GIF (MAX. 800×400px)
        </p>

        <!-- Show selected file name -->
        <p v-if="selectedFileName" class="text-gray-700 text-sm mt-3">
          Selected: <strong>{{ selectedFileName }}</strong>
        </p>

        <!-- Hidden File Input -->
        <input
          ref="fileInput"
          type="file"
          accept="image/*"
          class="hidden"
          @change="handleFileUpload"
        />

        <!-- URL fallback for DummyJSON -->
       
      </div>

      <!-- ERROR MESSAGE -->
      <p v-if="errorMessage" class="text-red-600 text-sm mb-4">
        {{ errorMessage }}
      </p>

      <!-- BUTTONS -->
      <div class="flex justify-end gap-4 pt-4 border-t">
        <button
          @click="router.push('/products')"
          class="px-5 py-3 border rounded-lg text-gray-600 hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          @click="saveProduct"
          :disabled="isLoading"
          class="px-5 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 disabled:opacity-50"
        >
          {{ isLoading ? "Saving..." : "Save Product" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useProductStore } from "../stores/products";

const router = useRouter();
const productStore = useProductStore();

const title = ref("");
const description = ref("");
const price = ref("");
const stock = ref("");
const category = ref("");
const thumbnail = ref("");

const errorMessage = ref("");
const isLoading = ref(false);

const fileInput = ref(null);
const selectedFileName = ref("");

// Open file picker when user clicks upload box
const triggerFileUpload = () => {
  fileInput.value.click();
};

// Handle local file selection
const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  selectedFileName.value = file.name;

  // Generate local preview URL (DummyJSON does NOT accept files)
  const localURL = URL.createObjectURL(file);

  // Use local preview as thumbnail
  thumbnail.value = localURL;

  console.log("Selected File:", file);
  console.log("Preview URL:", localURL);
};

const saveProduct = async () => {
  errorMessage.value = "";

  if (!title.value.trim()) {
    errorMessage.value = "Product title is required.";
    return;
  }

  if (!price.value || Number(price.value) <= 0) {
    errorMessage.value = "Price must be greater than 0.";
    return;
  }

  isLoading.value = true;

  try {
    await productStore.addProduct({
      title: title.value,
      description: description.value,
      price: Number(price.value),
      stock: Number(stock.value),
      category: category.value,
      thumbnail: thumbnail.value,
    });

    router.push("/products");
  } catch (err) {
    errorMessage.value = "Failed to save product. Try again.";
  }

  isLoading.value = false;
};
</script>

<style scoped>
aside {
  display: none !important;
}
</style>
