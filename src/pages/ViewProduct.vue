<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- TOP NAV -->
    <header
      class="w-full bg-white border-b px-10 py-4 flex items-center justify-between"
    >
      <h1 class="text-lg font-semibold text-gray-800">Product Management</h1>

      <div class="flex items-center gap-4">
        <!-- Search -->
        <input
          type="text"
          placeholder="Search"
          class="border rounded-lg px-4 py-2 w-64"
        />

        <!-- Add Product Button -->
        <button
          @click="router.push('/products/new')"
          class="bg-blue-900 text-white px-4 py-2 rounded-lg"
        >
          Add Product
        </button>

        <!-- User Icon -->
        <div
          class="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center"
        >
          <span class="text-sm font-bold">P</span>
        </div>
      </div>
    </header>

    <div class="px-10 py-8">
      <!-- Breadcrumb -->
      <div class="text-sm text-gray-500 mb-6">
        <router-link to="/products" class="hover:underline"
          >Products</router-link
        >
        /
        <span class="text-gray-700">{{ product?.title }}</span>
      </div>

      <!-- MAIN SECTION: IMAGE + DETAILS -->
      <div class="flex gap-10">
        <!-- LEFT: LARGE PRODUCT IMAGE -->
        <div class="w-[55%]">
          <img
            v-if="product"
            :src="product.thumbnail || product.images?.[0]"
            class="w-full rounded-xl object-cover"
          />
        </div>

        <!-- RIGHT: PRODUCT INFO -->
        <div class="w-[45%] space-y-6">
          <!-- TITLE -->
          <div class="flex items-start justify-between">
            <h1 class="text-3xl font-bold text-gray-900 leading-tight">
              {{ product?.title }}
            </h1>

            
          </div>

          <!-- SHORT DESCRIPTION -->
          <p class="text-gray-600 text-sm leading-relaxed">
            {{ product?.description }}
          </p>

          <hr />

          <!-- PRICE + CATEGORY + STOCK -->
          <div class="space-y-4">
            <!-- PRICE -->
            <div>
              <p class="text-gray-500 text-sm">Price</p>
              <p class="text-2xl font-semibold">$ {{ product?.price }}</p>
            </div>

            <!-- CATEGORY -->
            <div>
              <p class="text-gray-500 text-sm">Category</p>
              <span
                class="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm capitalize"
              >
                {{ product?.category }}
              </span>
            </div>

            <!-- STOCK -->
            <div>
              <p class="text-gray-500 text-sm">Stock</p>

              <div class="flex items-center gap-2">
                <span
                  class="w-3 h-3 rounded-full"
                  :class="{
                    'bg-green-500': product?.stock > 50,
                    'bg-yellow-500':
                      product?.stock > 10 && product?.stock <= 50,
                    'bg-red-500': product?.stock <= 10,
                  }"
                ></span>

                <span class="text-gray-700 text-sm">
                  {{ stockLabel }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- DESCRIPTION -->
      <div class="mt-12">
        <h2 class="text-lg font-semibold mb-2">Description</h2>
        <p class="text-gray-600 leading-relaxed max-w-4xl">
          {{ product?.description }}
        </p>
      </div>

      <!-- CUSTOMER REVIEWS -->
      <div class="mt-14">
        <h2 class="text-lg font-semibold mb-4">Customer Reviews</h2>

        <div class="bg-white p-8 rounded-xl shadow-sm flex gap-12">
          <!-- LEFT: RATING -->
          <div class="w-1/3 text-center">
            <p class="text-4xl font-bold text-gray-900">4.5</p>

            <div class="text-yellow-400 text-xl my-1">★★★★★</div>

            <p class="text-gray-500 text-sm">Based on 120 reviews</p>
          </div>

          <!-- RIGHT: BAR GRAPH -->
          <div class="flex-1 space-y-3">
            <div
              v-for="n in [5, 4, 3, 2, 1]"
              :key="n"
              class="flex items-center gap-3"
            >
              <span class="text-sm w-3">{{ n }}</span>

              <div class="w-full bg-gray-200 rounded-full h-2">
                <div
                  class="bg-yellow-400 h-2 rounded-full"
                  :style="{ width: ratingWidths[n] }"
                ></div>
              </div>

              <span class="text-sm text-gray-500">{{ ratingPercents[n] }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useProductStore } from "../stores/products";

const route = useRoute();
const router = useRouter();
const productStore = useProductStore();

const product = ref(null);

onMounted(async () => {
  await productStore.fetchProducts();
  product.value = productStore.getProductById(Number(route.params.id));
  console.log("Loaded product:", product.value)

});

const stockLabel = computed(() => {
  if (!product.value) return "";
  if (product.value.stock > 50) return product.value.stock + " In Stock";
  if (product.value.stock > 10) return product.value.stock + " Low Stock";
  return "Out of Stock";
});

const ratingWidths = {
  5: "75%",
  4: "15%",
  3: "5%",
  2: "3%",
  1: "2%",
};

const ratingPercents = {
  5: "75%",
  4: "15%",
  3: "5%",
  2: "3%",
  1: "2%",
};
</script>

<style>
/* Remove sidebar entirely on this page */

</style>
