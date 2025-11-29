<template>
  <div class="flex min-h-screen bg-gray-100">

    <!-- Sidebar -->
    <aside class="w-64 bg-white border-r px-6 py-8 flex flex-col justify-between">
      
      <!-- TOP SECTION -->
      <div>
        <!-- Logo -->
        <div class="flex items-center mb-10">
          <div class="w-10 h-10 bg-blue-900 rounded-full mr-3"></div>
          <div>
            <p class="text-gray-900 font-bold text-lg">E-Commerce</p>
            <p class="text-gray-500 text-sm">Admin Panel</p>
          </div>
        </div>

        <!-- Menu Links -->
        <nav class="space-y-2">
          <RouterLink 
            to="/dashboard"
            class="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-100"
            active-class="bg-blue-100 text-blue-900 font-semibold"
          >
            <span>📊</span>
            <span>Dashboard</span>
          </RouterLink>

          <RouterLink 
            to="/products"
            class="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-100"
            active-class="bg-blue-100 text-blue-900 font-semibold"
          >
            <span>📦</span>
            <span>Products</span>
          </RouterLink>

          <RouterLink 
            to="/orders"
            class="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-100"
            active-class="bg-blue-100 text-blue-900 font-semibold"
          >
            <span>🛒</span>
            <span>Orders</span>
          </RouterLink>

          <RouterLink 
            to="/customers"
            class="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-100"
            active-class="bg-blue-100 text-blue-900 font-semibold"
          >
            <span>👥</span>
            <span>Customers</span>
          </RouterLink>
        </nav>
      </div>

      <!-- BOTTOM SECTION -->
      <div class="space-y-4">
        <RouterLink 
          to="/settings"
          class="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-100"
          active-class="bg-blue-100 text-blue-900 font-semibold"
        >
          <span>⚙️</span>
          <span>Settings</span>
        </RouterLink>

        <button 
          @click="logout"
          class="w-full bg-blue-900 text-white py-2 rounded-md hover:bg-blue-800 transition flex items-center justify-center space-x-2"
        >
          <span>↪</span>
          <span>Logout</span>
        </button>
      </div>

    </aside>

    <!-- MAIN CONTENT -->
    <main class="flex-1 p-10">
      <router-view />
    </main>

  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const logout = () => {
  auth.logout()
  router.push('/login')
}
</script>
