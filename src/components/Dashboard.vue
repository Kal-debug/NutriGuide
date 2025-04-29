<template>
  <div
    class="min-h-screen flex
           bg-gray-50 dark:bg-gray-900
           transition-colors duration-300"
  >
    <!-- SIDEBAR -->
    <aside
      class="w-56 bg-white dark:bg-gray-800
             text-gray-900 dark:text-gray-100
             p-6 shadow-lg flex flex-col"
    >
      <!-- Dark Mode Toggle -->
      <div class="flex justify-end">
        <button
          @click="toggleDarkMode"
          aria-label="Toggle dark mode"
          class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <!-- Sun (shown in light mode) -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-gray-700 dark:hidden"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <!-- Moon (shown in dark mode) -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-gray-300 hidden dark:block"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        </button>
      </div>

      <h2 class="text-xl font-bold fade-slide-up">Menu</h2>

      <router-link
        to="/dashboard"
        class="block px-2 py-1 rounded
               hover:bg-gray-100 dark:hover:bg-gray-700
               fade-slide-up delay-150"
      >
        Dashboard
      </router-link>

      <router-link
        to="/meals"
        class="block px-2 py-1 rounded
               hover:bg-gray-100 dark:hover:bg-gray-700
               fade-slide-up delay-300"
      >
        Manage Meals
      </router-link>

      <router-link
        to="/profile"
        class="block px-2 py-1 rounded
               hover:bg-gray-100 dark:hover:bg-gray-700
               fade-slide-up delay-300"
      >
        Profile
      </router-link>

      <button
        @click="logout"
        class="w-full mt-auto py-2
               bg-gradient-to-r from-red-400 to-red-600
               text-white font-semibold rounded-lg
               hover:shadow-lg transition-all duration-300
               fade-slide-up delay-450"
      >
        Log Out
      </button>
    </aside>

    <!-- MAIN CONTENT -->
    <main class="flex-1 p-8">
      <h1
        class="text-3xl font-bold mb-6
               text-gray-900 dark:text-white
               fade-slide-up"
      >
        Today's Summary
      </h1>

      <section class="grid md:grid-cols-3 gap-6 mb-8">
        <!-- Calories Card -->
        <div
          class="p-6 bg-white dark:bg-gray-800
                 rounded-lg shadow hover:shadow-lg
                 transition-all duration-300
                 fade-slide-up"
        >
          <h3 class="font-semibold mb-2 text-gray-800 dark:text-gray-200">
            Calories
          </h3>
          <p class="text-2xl text-gray-900 dark:text-white">
            {{ totals.calories }} / {{ goals.calories }} cal
          </p>
          <div class="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <div 
              class="bg-green-500 h-2.5 rounded-full transition-all duration-500" 
              :style="{ width: `${Math.min(100, (totals.calories / goals.calories) * 100)}%` }"
            ></div>
          </div>
        </div>

        <!-- Macros Card -->
        <div
          class="p-6 bg-white dark:bg-gray-800
                 rounded-lg shadow hover:shadow-lg
                 transition-all duration-300
                 fade-slide-up delay-150"
        >
          <h3 class="font-semibold mb-2 text-gray-800 dark:text-gray-200">
            Macros (g)
          </h3>
          <ul class="text-gray-900 dark:text-gray-100 space-y-1">
            <li class="flex justify-between">
              <span>Protein</span>
              <span>{{ totals.protein }} / {{ goals.protein }}</span>
            </li>
            <li class="flex justify-between">
              <span>Carbs</span>
              <span>{{ totals.carbs }} / {{ goals.carbs }}</span>
            </li>
            <li class="flex justify-between">
              <span>Fat</span>
              <span>{{ totals.fat }} / {{ goals.fat }}</span>
            </li>
          </ul>
        </div>

        <!-- Recent Meals Card -->
        <div
          class="p-6 bg-white dark:bg-gray-800
                 rounded-lg shadow hover:shadow-lg
                 transition-all duration-300
                 fade-slide-up delay-300"
        >
          <h3 class="font-semibold mb-2 text-gray-800 dark:text-gray-200">
            Recent Meals
          </h3>
          <ul class="text-gray-900 dark:text-gray-100 space-y-1 mb-4">
            <li v-for="m in meals.slice(0, 3)" :key="m.id" class="flex justify-between">
              <span>{{ m.type }}</span>
              <span>{{ m.calories }} cal</span>
            </li>
            <li v-if="!meals.length" class="text-gray-500 dark:text-gray-400 italic">
              No meals recorded today
            </li>
          </ul>
          <router-link
            to="/meals"
            class="inline-block text-green-500 hover:underline
                   fade-slide-up delay-450"
          >
            Manage meals →
          </router-link>
        </div>
      </section>
      
      <!-- Macro Chart Section -->
      <section 
        class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8
               fade-slide-up delay-450"
      >
        <MacroChart :totals="totals" :goals="goals" />
      </section>

      <!-- Daily Breakdown -->
      <section 
        class="bg-white dark:bg-gray-800 rounded-lg shadow p-6
               fade-slide-up delay-600"
      >
        <h3 class="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
          Today's Meals
        </h3>
        <div v-if="meals.length === 0" class="text-center py-8 text-gray-500 dark:text-gray-400">
          <p>No meals recorded today</p>
          <router-link
            to="/meals"
            class="inline-block mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Add Meal
          </router-link>
        </div>
        <table v-else class="w-full">
          <thead class="text-left text-gray-700 dark:text-gray-300 border-b dark:border-gray-700">
            <tr>
              <th class="pb-2">Meal</th>
              <th class="pb-2">Time</th>
              <th class="pb-2">Calories</th>
              <th class="pb-2">Protein</th>
              <th class="pb-2">Carbs</th>
              <th class="pb-2">Fat</th>
            </tr>
          </thead>
          <tbody class="text-gray-800 dark:text-gray-200">
            <tr v-for="meal in meals" :key="meal.id" class="border-b dark:border-gray-700">
              <td class="py-3">{{ meal.type }}</td>
              <td class="py-3">{{ formatTime(meal.loggedAt) }}</td>
              <td class="py-3">{{ meal.calories }} cal</td>
              <td class="py-3">{{ meal.protein }}g</td>
              <td class="py-3">{{ meal.carbs }}g</td>
              <td class="py-3">{{ meal.fat }}g</td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  </div>
</template>

<script setup>
import { reactive, onMounted, onUnmounted, ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import MacroChart from '../components/Macrochart.vue'

// Dark-mode logic
const isDarkMode = ref(false)
const initDarkMode = () => {
  const saved = localStorage.getItem('nutriguide-dark-mode')
  const prefers = window.matchMedia('(prefers-color-scheme: dark)').matches
  isDarkMode.value = saved === 'true' || (saved === null && prefers)
  document.documentElement.classList.toggle('dark', isDarkMode.value)
}
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  localStorage.setItem('nutriguide-dark-mode', isDarkMode.value)
  document.documentElement.classList.toggle('dark', isDarkMode.value)
}

// State
const router = useRouter()
const totals = reactive({ calories: 0, protein: 0, carbs: 0, fat: 0 })
const goals  = reactive({ calories: 0, protein: 0, carbs: 0, fat: 0 })
const meals  = reactive([])

// Load today's meals & totals
async function loadToday() {
  const token = localStorage.getItem('authToken')
  if (!token) return router.push('/login')

  try {
    const { data } = await axios.get('http://localhost:3000/meals/today', {
      headers: { Authorization: `Bearer ${token}` }
    })
    Object.assign(totals, data.totals)
    meals.splice(0, meals.length, ...data.meals)
  } catch {
    router.push('/login')
  }
}

// Fetch dynamic goals from server or fallback to localStorage
async function loadGoals() {
  const token = localStorage.getItem('authToken')
  if (!token) return

  try {
    const { data } = await axios.get('http://localhost:3000/nutrition', {
      headers: { Authorization: `Bearer ${token}` }
    })
    goals.calories = data.calorieTarget
    goals.protein  = data.protein
    goals.carbs    = data.carbs
    goals.fat      = data.fat
  } catch {
    const saved = localStorage.getItem('nutritionTargets')
    if (saved) {
      const t = JSON.parse(saved)
      goals.calories = t.calorieTarget
      goals.protein  = t.protein
      goals.carbs    = t.carbs
      goals.fat      = t.fat
    }
  }
}

function formatTime(dateString) {
  const date = new Date(dateString)
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

function logout() {
  localStorage.removeItem('authToken')
  router.push('/login')
}

onMounted(() => {
  initDarkMode()
  loadGoals()
  loadToday()
  window.addEventListener('meals-updated', loadToday)
})

onUnmounted(() => {
  window.removeEventListener('meals-updated', loadToday)
})
</script>

<style scoped>
@keyframes fadeSlideUp {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0);   }
}
.fade-slide-up { opacity: 0; animation: fadeSlideUp 0.8s ease-out forwards; }
.fade-slide-up.delay-150 { animation-delay: 0.15s; }
.fade-slide-up.delay-300 { animation-delay: 0.3s; }
.fade-slide-up.delay-450 { animation-delay: 0.45s; }
.fade-slide-up.delay-600 { animation-delay: 0.6s; }
</style>