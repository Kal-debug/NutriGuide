<!-- Meals.vue -->
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
             p-6 flex flex-col shadow-lg"
    >
      <!-- Dark Mode Toggle -->
      <div class="flex justify-end">
        <button
          @click="toggleDarkMode"
          aria-label="Toggle dark mode"
          class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <!-- Sun icon (light mode) -->
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
          <!-- Moon icon (dark mode) -->
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

      <!-- Explicitly set to mt-auto to push to bottom -->
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
        class="text-2xl font-bold mb-6 flex items-center gap-4
               text-gray-900 dark:text-white
               fade-slide-up"
      >
        My Meals
        <router-link
          to="/dashboard"
          class="text-sm text-green-500 dark:text-green-400 underline hover:text-green-600"
        >
          Go to Dashboard
        </router-link>
      </h1>

      <!-- toggle form -->
      <button
        type="button"
        @click="toggleForm"
        class="mb-4 px-4 py-2
               bg-gradient-to-r from-green-400 to-green-600
               dark:from-green-500 dark:to-green-700
               text-white rounded-lg font-semibold
               hover:shadow-lg transition-all duration-300
               fade-slide-up delay-150"
      >
        {{ showForm ? 'Cancel' : meal.id ? 'Edit Meal' : 'Add Meal' }}
      </button>

      <!-- add/edit form -->
      <form
        v-if="showForm"
        @submit.prevent="saveMeal"
        class="space-y-4 mb-8 border border-gray-200 dark:border-gray-700
               p-4 rounded-lg fade-slide-up delay-300"
      >
        <div>
          <label class="block mb-1 text-gray-800 dark:text-gray-200">
            Type
          </label>
          <select
            v-model="meal.type"
            class="w-full border border-gray-300 dark:border-gray-600
                   bg-gray-100 dark:bg-gray-700
                   text-gray-900 dark:text-gray-100
                   p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500
                   transition-colors duration-300"
          >
            <option>breakfast</option>
            <option>lunch</option>
            <option>dinner</option>
            <option>snack</option>
          </select>
        </div>

        <div>
          <label class="block mb-1 text-gray-800 dark:text-gray-200">
            Calories
          </label>
          <input
            v-model.number="meal.calories"
            type="number"
            min="0"
            class="w-full border border-gray-300 dark:border-gray-600
                   bg-gray-100 dark:bg-gray-700
                   text-gray-900 dark:text-gray-100
                   p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500
                   transition-colors duration-300"
          />
        </div>

        <div>
          <label class="block mb-1 text-gray-800 dark:text-gray-200">
            Protein (g)
          </label>
          <input
            v-model.number="meal.protein"
            type="number"
            min="0"
            class="w-full border border-gray-300 dark:border-gray-600
                   bg-gray-100 dark:bg-gray-700
                   text-gray-900 dark:text-gray-100
                   p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500
                   transition-colors duration-300"
          />
        </div>

        <div>
          <label class="block mb-1 text-gray-800 dark:text-gray-200">
            Carbs (g)
          </label>
          <input
            v-model.number="meal.carbs"
            type="number"
            min="0"
            class="w-full border border-gray-300 dark:border-gray-600
                   bg-gray-100 dark:bg-gray-700
                   text-gray-900 dark:text-gray-100
                   p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500
                   transition-colors duration-300"
          />
        </div>

        <div>
          <label class="block mb-1 text-gray-800 dark:text-gray-200">
            Fat (g)
          </label>
          <input
            v-model.number="meal.fat"
            type="number"
            min="0"
            class="w-full border border-gray-300 dark:border-gray-600
                   bg-gray-100 dark:bg-gray-700
                   text-gray-900 dark:text-gray-100
                   p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500
                   transition-colors duration-300"
          />
        </div>

        <button
          type="submit"
          class="px-4 py-2
                 bg-gradient-to-r from-green-400 to-green-600
                 dark:from-green-500 dark:to-green-700
                 text-white font-semibold rounded-lg
                 hover:shadow-lg transition-all duration-300"
        >
          {{ meal.id ? 'Update Meal' : 'Save Meal' }}
        </button>

        <button
          type="button"
          @click="resetForm"
          class="px-4 py-2
                bg-gradient-to-r from-gray-400 to-gray-500
                dark:from-gray-600 dark:to-gray-700
                text-white font-semibold rounded-lg
                hover:shadow-lg transition-all duration-300"
        >
          Clear Fields
        </button>

      </form>

      <!-- meals table -->
      <table class="w-full text-left border-collapse fade-slide-up delay-450">
        <thead class="bg-gray-100 dark:bg-gray-800">
          <tr>
            <th class="p-2">Type</th>
            <th class="p-2">Cal</th>
            <th class="p-2">P</th>
            <th class="p-2">C</th>
            <th class="p-2">F</th>
            <th class="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="m in meals"
            :key="m.id"
            class="border-t border-gray-200 dark:border-gray-700"
          >
            <td class="p-2">{{ m.type }}</td>
            <td class="p-2">{{ m.calories }}</td>
            <td class="p-2">{{ m.protein }}</td>
            <td class="p-2">{{ m.carbs }}</td>
            <td class="p-2">{{ m.fat }}</td>
            <td class="p-2 space-x-2">
              <button
                @click="editMeal(m)"
                class="text-green-500 hover:underline dark:text-green-400"
              >
                Edit
              </button>
              <button
                @click="deleteMeal(m.id)"
                class="text-red-500 hover:underline"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <p
        v-if="meals.length === 0"
        class="mt-4 text-gray-500 dark:text-gray-400"
      >
        No meals yet.
      </p>
    </main>
  </div>
</template>

<script setup>
import { reactive, onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

/** Dark‑mode logic (same as your other views) **/
const isDarkMode = ref(false)
const initDarkMode = () => {
  const saved = localStorage.getItem('nutriguide-dark-mode')
  const prefers = window.matchMedia('(prefers-color-scheme: dark)').matches
  isDarkMode.value = saved === 'true' || (saved === null && prefers)
  applyDarkMode()
}
const applyDarkMode = () => {
  document.documentElement.classList.toggle('dark', isDarkMode.value)
}
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  localStorage.setItem('nutriguide-dark-mode', isDarkMode.value)
  applyDarkMode()
}

const router = useRouter()
const token = localStorage.getItem('authToken')
if (!token) router.push('/login')
const hdrs = { headers: { Authorization: `Bearer ${token}` } }

// Meals state
const meals = reactive([])
const meal = reactive({
  id: null,
  type: 'breakfast',
  calories: 0,
  protein: 0,
  carbs: 0,
  fat: 0,
})
const showForm = ref(false)

async function loadMeals () {
  try {
    const { data } = await axios.get('http://localhost:3000/meals', hdrs)
    // backend returns _id (Mongo) → normalise for UI & PUT/DELETE
    const normalised = data.map(m => ({ ...m, id: m.id ?? m._id }))
    meals.splice(0, meals.length, ...normalised)
  } catch {
    router.push('/login')
  }
}

function toggleForm() {
  showForm.value = !showForm.value
  if (!showForm.value) resetForm()
}

function editMeal(m) {
  // Create a deep copy of the meal object to avoid reference issues
  Object.assign(meal, {
    id: m.id,
    type: m.type,
    calories: m.calories,
    protein: m.protein,
    carbs: m.carbs,
    fat: m.fat
  })
  showForm.value = true
}

async function saveMeal () {
  try {
    const payload = { ...meal }            // shallow copy first
    if (payload.id == null) delete payload.id   // only POST clean payload

    if (meal.id) {
      await axios.put(`http://localhost:3000/meals/${meal.id}`, payload, hdrs)
    } else {
      await axios.post('http://localhost:3000/meals', payload, hdrs)
    }

    await loadMeals()
    resetForm()
    showForm.value = false
    window.dispatchEvent(new Event('meals-updated'))
  } catch (e) {
    console.error('Error saving meal:', e)
    alert('Failed to save meal. Please try again.')
  }
}

async function deleteMeal (id) {
  if (!confirm('Delete this meal?')) return
  try {
    await axios.delete(`http://localhost:3000/meals/${id}`, hdrs)
    await loadMeals()
    window.dispatchEvent(new Event('meals-updated'))
  } catch (e) {
    console.error('Error deleting meal:', e)
    alert('Failed to delete meal. Please try again.')
  }
}

function resetForm() {
  meal.id = null
  meal.type = 'breakfast'
  meal.calories = 0
  meal.protein = 0
  meal.carbs = 0
  meal.fat = 0
}

function logout() {
  localStorage.removeItem('authToken')
  router.push('/login')
}

onMounted(() => {
  initDarkMode()
  loadMeals()
})
</script>

<style scoped>
@keyframes fadeSlideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.fade-slide-up {
  opacity: 0;
  animation: fadeSlideUp 0.8s ease-out forwards;
}
.fade-slide-up.delay-150 {
  animation-delay: 0.15s;
}
.fade-slide-up.delay-300 {
  animation-delay: 0.3s;
}
.fade-slide-up.delay-450 {
  animation-delay: 0.45s;
}
</style>