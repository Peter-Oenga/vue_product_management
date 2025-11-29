<template> 
  <div class="space-y-8">

    <!-- PAGE HEADER -->
    <div>
      <h1 class="text-3xl font-bold text-gray-900">Products</h1>
      <p class="text-gray-500 mt-1">
        Manage your inventory and view product performance.
      </p>
    </div>

    <!-- SEARCH + FILTERS + ADD BUTTON -->
    <div class="bg-white p-5 rounded-xl shadow-sm flex items-center gap-4">

      <!-- Search -->
      <div class="flex items-center bg-gray-100 px-4 py-3 rounded-lg flex-1">
        <span class="text-gray-500 mr-3">🔍</span>
        <input 
          type="text"
          placeholder="Search by product name..."
          v-model="searchQuery"
          class="bg-transparent w-full outline-none text-gray-700"
        />
      </div>

      <!-- Category Filter -->
      <select
        v-model="selectedCategory"
        class="border border-gray-300 rounded-lg px-4 py-3 text-gray-700 bg-white"
      >
        <option value="">Category</option>
        <option v-for="cat in apiCategories" :key="cat">
          {{ cat }}
        </option>
      </select>

      <!-- Stock Filter -->
      <select
        v-model="stockStatus"
        class="border border-gray-300 rounded-lg px-4 py-3 text-gray-700 bg-white"
      >
        <option value="">Stock Status</option>
        <option value="in">In Stock</option>
        <option value="low">Low Stock</option>
        <option value="out">Out of Stock</option>
      </select>

      <!-- Add Product Button -->
      <button
        @click="goToAddProduct"
        class="bg-blue-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-800 transition"
      >
        + Add New Product
      </button>

    </div>

    <!-- PRODUCTS TABLE -->
    <div class="bg-white rounded-xl shadow-sm mt-4">

      <!-- TABLE HEADER -->
      <div class="grid grid-cols-6 px-6 py-4 border-b text-gray-500 text-sm font-medium">
        <div class="col-span-2">Product</div>
        <div>Category</div>
        <div>Price</div>
        <div>Stock</div>
        <div class="text-right">Actions</div>
      </div>

      <!-- NO RESULTS -->
      <div v-if="filteredProducts.length === 0" class="p-6 text-gray-400">
        No products found.
      </div>

      <!-- TABLE BODY -->
      <div v-else>
        <div 
          v-for="product in paginatedProducts" 
          :key="product.id"
          class="grid grid-cols-6 px-6 py-4 border-b hover:bg-gray-50"
        >

          <!-- Product Info -->
          <div class="col-span-2 flex items-center space-x-4">
            <img 
              :src="product.thumbnail || product.images?.[0]" 
              class="w-12 h-12 rounded-full object-cover" 
            />
            <div>
              <p class="font-semibold text-gray-800">{{ product.title }}</p>
              <p class="text-gray-500 text-sm truncate w-64">{{ product.description }}</p>
            </div>
          </div>

          <!-- Category Badge -->
          <div>
            <span class="px-3 py-1 text-sm rounded-full capitalize" :class="badgeColor(product.category)">
              {{ product.category }}
            </span>
          </div>

          <!-- Price -->
          <div>
            <p class="font-medium text-gray-800">$ {{ product.price.toFixed(2) }}</p>
          </div>

          <!-- Stock -->
          <div class="flex items-center space-x-2">
            <span 
              class="w-3 h-3 rounded-full"
              :class="{
                'bg-green-500': product.stock > 50,
                'bg-yellow-500': product.stock > 10 && product.stock <= 50,
                'bg-red-500': product.stock <= 10
              }"
            ></span>
            <span class="text-gray-700 text-sm">
              {{ product.stock > 50 ? product.stock + ' In Stock' :
                product.stock > 10 ? product.stock + ' Low Stock' : 
                'Out of Stock' }}
            </span>
          </div>

          <!-- ACTION MENU -->
          <div class="flex justify-end relative">
            <button 
              @click="toggleMenu(product.id)" 
              class="text-gray-500 hover:text-gray-700 text-xl px-2"
            >
              ⋮
            </button>

            <!-- Dropdown -->
            <div 
              v-if="openMenu === product.id"
              class="absolute right-0 top-6 bg-white shadow-lg rounded-md w-32 z-10 border"
            >
              <button 
                @click="viewProduct(product.id)"
                class="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
              >
                View
              </button>

              <button 
                @click="editProduct(product.id)"
                class="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
              >
                Edit
              </button>

              <!-- DELETE BUTTON -->
              <button
                @click="deleteProduct(product.id)"
                class="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-600"
              >
                Delete
              </button>

            </div>
          </div>

        </div>
      </div>

      <!-- PAGINATION CONTROLS -->
      <div class="flex justify-center items-center gap-3 py-6">
        <button 
          @click="currentPage--"
          :disabled="currentPage === 1"
          class="px-4 py-2 border rounded-lg text-gray-600 disabled:opacity-50"
        >
          Previous
        </button>

        <span class="font-medium text-gray-700">
          Page {{ currentPage }} of {{ totalPages }}
        </span>

        <button 
          @click="currentPage++"
          :disabled="currentPage === totalPages"
          class="px-4 py-2 border rounded-lg text-gray-600 disabled:opacity-50"
        >
          Next
        </button>
      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '../stores/products'

const router = useRouter()
const productStore = useProductStore()

// Dropdown menu
const openMenu = ref(null)
const toggleMenu = (id) => {
  openMenu.value = openMenu.value === id ? null : id
}

// Navigation
const viewProduct = (id) => {
  openMenu.value = null
  router.push(`/products/${id}`)
}

const editProduct = (id) => {
  openMenu.value = null
  router.push(`/products/${id}/edit`)
}

// DELETE PRODUCT
const deleteProduct = (id) => {
  openMenu.value = null
  if (confirm("Are you sure you want to delete this product?")) {
    productStore.deleteProduct(id)
  }
}

// Search + filters
const searchQuery = ref("")
const selectedCategory = ref("")
const stockStatus = ref("")

// Pagination
const itemsPerPage = 10
const currentPage = ref(1)

const totalPages = computed(() =>
  Math.ceil(filteredProducts.value.length / itemsPerPage)
)

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredProducts.value.slice(start, end)
})

// Reset to page 1 when filters change
watch([searchQuery, selectedCategory, stockStatus], () => {
  currentPage.value = 1
})

// API categories
const apiCategories = [
  "smartphones",
  "laptops",
  "fragrances",
  "skincare",
  "groceries",
  "home-decoration"
]

// Add new product
const goToAddProduct = () => router.push("/products/new")

// Load products on mount
onMounted(() => {
  productStore.fetchProducts()
})

// Category badge colors
const badgeColor = (category) => {
  switch (category) {
    case "smartphones":
    case "laptops":
      return "bg-blue-100 text-blue-700"
    case "fragrances":
      return "bg-purple-100 text-purple-700"
    case "skincare":
      return "bg-pink-100 text-pink-700"
    case "groceries":
      return "bg-green-100 text-green-700"
    case "home-decoration":
      return "bg-yellow-100 text-yellow-700"
    default:
      return "bg-gray-100 text-gray-600"
  }
}

// FILTERED LIST
const filteredProducts = computed(() => {
  return productStore.products.filter(p => {
    const searchMatch = p.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    const categoryMatch = selectedCategory.value 
      ? p.category.toLowerCase() === selectedCategory.value.toLowerCase()
      : true

    const stockMatch =
      stockStatus.value === "in"   ? p.stock > 50 :
      stockStatus.value === "low"  ? p.stock > 10 && p.stock <= 50 :
      stockStatus.value === "out"  ? p.stock <= 10 :
      true

    return searchMatch && categoryMatch && stockMatch
  })
})
</script>
