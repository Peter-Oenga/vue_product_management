<template>
  <div class="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
    
    <!-- Logo Section -->
    <div class="flex items-center mb-12">
      <div class="w-10 h-10 bg-blue-900 rounded-md mr-3"></div>
      <span class="text-2xl font-bold text-blue-900">Platform Logo</span>
    </div>

    <!-- Main Card -->
    <div class="bg-white rounded-xl shadow-md p-10 w-full max-w-sm">
      <!-- Welcome Message -->
      <div class="text-center mb-8">
        <h1 class="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h1>
        <p class="text-gray-500 text-sm">Sign in to manage your products.</p>
      </div>

      <!-- Display Error -->
      <p v-if="errorMessage" class="text-red-500 text-sm mb-4 text-center">{{ errorMessage }}</p>

      <!-- Login Form -->
      <form @submit.prevent="submitLogin" class="space-y-6">

        <!-- Username -->
        <div>
          <label for="username" class="block text-gray-900 mb-1">Username</label>
          <input
            type="text"
            id="username"
            v-model="username"
            placeholder="you@example.com"
            class="w-full border border-gray-300 rounded-md p-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900"
            required
          />
        </div>

        <!-- Password -->
        <div>
          <label for="password" class="block text-gray-900 mb-1">Password</label>
          <div class="relative">
            <input
              type="password"
              id="password"
              v-model="password"
              placeholder="Enter Your Password"
              class="w-full border border-gray-300 rounded-md p-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900"
              required
            />
            <span class="absolute right-3 top-3 cursor-pointer text-gray-400">👁️</span>
          </div>
        </div>

        <!-- Remember Me & Forgot Password -->
        <div class="flex justify-between items-center text-sm text-gray-600">
          <label class="flex items-center space-x-2">
            <input type="checkbox" class="h-4 w-4 border-gray-300 rounded"/>
            <span>Remember me</span>
          </label>
          <a href="#" class="text-blue-900 hover:underline">Forgot Password?</a>
        </div>

        <!-- Login Button -->
        <button
          type="submit"
          class="w-full bg-blue-900 text-white py-3 rounded-md text-lg font-semibold hover:bg-blue-800 transition"
        >
          Login
        </button>
      </form>
    </div>

    <!-- Footer -->
    <footer class="mt-8 text-gray-400 text-xs text-center">
      © 2024 Platform Inc. All Rights Reserved.
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const auth = useAuthStore()

const username = ref('') // Using "username" instead of "email"
const password = ref('')
const errorMessage = ref('')

const submitLogin = async () => {
  errorMessage.value = ''

  console.log('Payload being sent:', {
    username: username.value.trim(),
    password: password.value.trim()
  })

  try {
    const response = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username.value.trim(),
        password: password.value.trim()
      })
    })

    const data = await response.json()

    console.log('Raw response:', response)
    console.log('Response JSON:', data)

    if (!response.ok) {
      throw new Error(data.message || 'Invalid credentials')
    }

    // SUCCESS
    auth.login(data.accessToken, data)
    router.push('/products')

  } catch (err) {
    console.error('Login error:', err)
    errorMessage.value = err.message
  }
}


</script>
