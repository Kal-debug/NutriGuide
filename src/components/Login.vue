<template>
  <div
    class="min-h-screen flex items-center justify-center
           bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
  >
    <div
      class="w-full max-w-md bg-white dark:bg-gray-800
             rounded-2xl shadow-lg p-8"
    >
      <h2
        class="text-3xl font-extrabold mb-6 text-center
               text-gray-900 dark:text-white fade-slide-up"
      >
        Welcome Back
      </h2>

      <form @submit.prevent="submitLogin" class="space-y-4">
        <div>
          <label
            for="email"
            class="block mb-1 text-gray-800 dark:text-gray-200"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            v-model="form.email"
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600
                   bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100
                   rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500
                   transition-colors duration-300"
          />
        </div>

        <div>
          <label
            for="password"
            class="block mb-1 text-gray-800 dark:text-gray-200"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            v-model="form.password"
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600
                   bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100
                   rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500
                   transition-colors duration-300"
          />
        </div>

        <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>

        <button
          type="submit"
          class="w-full mt-2 py-3
                 bg-gradient-to-r from-green-400 to-green-600
                 dark:from-green-500 dark:to-green-700
                 text-white font-semibold rounded-lg
                 hover:shadow-lg transition-all duration-300"
        >
          Log In
        </button>
      </form>

      <p class="mt-6 text-center text-gray-600 dark:text-gray-400">
        Don’t have an account?
        <router-link
          to="/signup"
          class="text-green-500 hover:underline"
        >
          Sign Up
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const form   = reactive({ email: '', password: '' })
const error  = ref('')

async function submitLogin() {
  error.value = ''
  try {
    const res = await axios.post('http://localhost:3000/login', form)
    localStorage.setItem('authToken', res.data.token)
    router.push('/dashboard')
  } catch (err) {
    error.value = err.response?.data?.error || 'Login failed'
  }
}
</script>