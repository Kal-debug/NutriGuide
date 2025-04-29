<template>
  <div
    class="min-h-screen flex
           bg-gray-50 dark:bg-gray-900
           transition-colors duration-300"
  >
    <!-- SIDEBAR - Same as before -->
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
        class="block px-2 py-1 mt-4 rounded
               hover:bg-gray-100 dark:hover:bg-gray-700
               fade-slide-up delay-150"
      >
        Dashboard
      </router-link>

      <router-link
        to="/meals"
        class="block px-2 py-1 mt-2 rounded
               hover:bg-gray-100 dark:hover:bg-gray-700
               fade-slide-up delay-300"
      >
        Manage Meals
      </router-link>

      <router-link
        to="/profile"
        class="block px-2 py-1 mt-2 rounded
               bg-gray-100 dark:bg-gray-700
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
      <!-- Calculation animation overlay -->
      <div 
        v-if="isCalculating" 
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <div class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl text-center max-w-md">
          <div class="flex justify-center mb-4">
            <svg class="animate-spin h-12 w-12 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Calculating Nutrition Targets
          </h3>
          <p class="text-gray-600 dark:text-gray-300">
            {{ calculationStep }}
          </p>
        </div>
      </div>

      <h1
        class="text-3xl font-bold mb-6
               text-gray-900 dark:text-white
               fade-slide-up"
      >
        My Profile
      </h1>

      <!-- PROFILE SUMMARY (shows after submission) -->
      <div v-if="showSummary" class="max-w-3xl mx-auto">
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-8 fade-slide-up">
          <div class="bg-gradient-to-r from-green-400 to-green-600 dark:from-green-500 dark:to-green-700 p-4">
            <h2 class="text-2xl font-bold text-white">Your Profile Summary</h2>
          </div>
          
          <div class="p-6">
            <!-- Personal Information -->
            <div class="mb-6 fade-slide-up delay-150">
              <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3 border-b border-gray-200 dark:border-gray-700 pb-2">
                Personal Information
              </h3>
              
              <div class="grid md:grid-cols-2 gap-4">
                <div class="flex items-center">
                  <div class="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500 dark:text-gray-400">Age</p>
                    <p class="font-medium text-gray-900 dark:text-white">{{ form.age }} years</p>
                  </div>
                </div>
                
                <div class="flex items-center">
                  <div class="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500 dark:text-gray-400">Sex</p>
                    <p class="font-medium text-gray-900 dark:text-white">{{ form.sex.charAt(0).toUpperCase() + form.sex.slice(1) }}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Body Metrics -->
            <div class="mb-6 fade-slide-up delay-300">
              <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3 border-b border-gray-200 dark:border-gray-700 pb-2">
                Body Metrics
              </h3>
              
              <div class="grid md:grid-cols-3 gap-4">
                <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center">
                  <p class="text-sm text-gray-500 dark:text-gray-400">Height</p>
                  <p class="font-bold text-xl text-gray-900 dark:text-white">{{ form.height_cm }} cm</p>
                  <p class="text-sm text-gray-500 dark:text-gray-400">{{ Math.floor(form.height_cm / 2.54 / 12) }}' {{ Math.round((form.height_cm / 2.54) % 12) }}"</p>
                </div>
                
                <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center">
                  <p class="text-sm text-gray-500 dark:text-gray-400">Weight</p>
                  <p class="font-bold text-xl text-gray-900 dark:text-white">{{ form.weight_kg }} kg</p>
                  <p class="text-sm text-gray-500 dark:text-gray-400">{{ Math.round(form.weight_kg * 2.20462) }} lbs</p>
                </div>
                
                <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center">
                  <p class="text-sm text-gray-500 dark:text-gray-400">BMI</p>
                  <p class="font-bold text-xl text-gray-900 dark:text-white">{{ calculateBMI(form.weight_kg, form.height_cm).toFixed(1) }}</p>
                  <p class="text-sm" :class="getBMICategory(calculateBMI(form.weight_kg, form.height_cm)).color">
                    {{ getBMICategory(calculateBMI(form.weight_kg, form.height_cm)).label }}
                  </p>
                </div>
              </div>
              
              <!-- Advanced metrics if available -->
              <div v-if="form.body_fat_pct || form.rhr_bpm" class="grid md:grid-cols-2 gap-4 mt-4">
                <div v-if="form.body_fat_pct" class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center">
                  <p class="text-sm text-gray-500 dark:text-gray-400">Body Fat Percentage</p>
                  <p class="font-bold text-xl text-gray-900 dark:text-white">{{ form.body_fat_pct }}%</p>
                </div>
                
                <div v-if="form.rhr_bpm" class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center">
                  <p class="text-sm text-gray-500 dark:text-gray-400">Resting Heart Rate</p>
                  <p class="font-bold text-xl text-gray-900 dark:text-white">{{ form.rhr_bpm }} BPM</p>
                </div>
              </div>
            </div>
            
            <!-- Activity & Goals -->
            <div class="mb-6 fade-slide-up delay-300">
              <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3 border-b border-gray-200 dark:border-gray-700 pb-2">
                Activity & Goals
              </h3>
              
              <div class="grid md:grid-cols-2 gap-4">
                <div class="flex items-center">
                  <div class="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500 dark:text-gray-400">Activity Level</p>
                    <p class="font-medium text-gray-900 dark:text-white">{{ getActivityLevelLabel(form.activity_level) }}</p>
                  </div>
                </div>
                
                <div class="flex items-center">
                  <div class="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500 dark:text-gray-400">Goal</p>
                    <p class="font-medium text-gray-900 dark:text-white">{{ getGoalLabel(form.goal) }}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Nutrition Targets Summary -->
            <div v-if="nutritionTargets" class="fade-slide-up delay-450">
              <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3 border-b border-gray-200 dark:border-gray-700 pb-2">
                Your Nutrition Targets
              </h3>
              
              <div class="bg-gray-50 dark:bg-gray-700 p-5 rounded-lg">
                <div class="grid grid-cols-4 gap-2 mb-4">
                  <div class="text-center">
                    <div class="text-2xl font-bold text-gray-900 dark:text-white">{{ nutritionTargets.calories }}</div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">Calories</div>
                  </div>
                  <div class="text-center">
                    <div class="text-2xl font-bold text-green-600">{{ nutritionTargets.protein }}g</div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">Protein</div>
                  </div>
                  <div class="text-center">
                    <div class="text-2xl font-bold text-blue-600">{{ nutritionTargets.carbs }}g</div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">Carbs</div>
                  </div>
                  <div class="text-center">
                    <div class="text-2xl font-bold text-yellow-600">{{ nutritionTargets.fat }}g</div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">Fat</div>
                  </div>
                </div>
                
                <!-- Macro distribution pie visualization -->
                <div class="h-4 flex rounded-full overflow-hidden">
                  <div class="bg-green-500" :style="`width: ${nutritionTargets.proteinPercentage}%`"></div>
                  <div class="bg-blue-500" :style="`width: ${nutritionTargets.carbsPercentage}%`"></div>
                  <div class="bg-yellow-500" :style="`width: ${nutritionTargets.fatPercentage}%`"></div>
                </div>
                <div class="flex justify-between text-xs mt-1 text-gray-600 dark:text-gray-400">
                  <span>Protein {{ nutritionTargets.proteinPercentage }}%</span>
                  <span>Carbs {{ nutritionTargets.carbsPercentage }}%</span>
                  <span>Fat {{ nutritionTargets.fatPercentage }}%</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Actions -->
          <div class="bg-gray-50 dark:bg-gray-700 px-6 py-4 flex justify-between items-center fade-slide-up delay-450">
            <button
              @click="editProfile"
              class="flex items-center text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit Profile
            </button>
            
            <button
              @click="navigateToDashboard"
              class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>

      <!-- PROFILE FORM (show when not in summary view) -->
      <form 
        v-if="!showSummary"
        @submit.prevent="onSubmit" 
        class="max-w-md mx-auto space-y-6"
      >
        <!-- Age -->
        <div class="fade-slide-up delay-150">
          <label for="age" class="block font-medium mb-1 text-gray-800 dark:text-gray-200">Age</label>
          <input
            id="age"
            v-model.number="form.age"
            type="number"
            min="0"
            required
            class="w-full border p-2 rounded focus:ring-2 focus:ring-green-500 
                   transition-colors bg-gray-100 dark:bg-gray-700 
                   text-gray-900 dark:text-gray-100"
          />
        </div>

        <!-- Sex -->
        <div class="fade-slide-up delay-150">
          <label for="sex" class="block font-medium mb-1 text-gray-800 dark:text-gray-200">Sex</label>
          <select
            id="sex"
            v-model="form.sex"
            required
            class="w-full border p-2 rounded focus:ring-2 focus:ring-green-500 
                   transition-colors bg-gray-100 dark:bg-gray-700 
                   text-gray-900 dark:text-gray-100"
          >
            <option>male</option>
            <option>female</option>
          </select>
        </div>

        <!-- Height & Weight -->
        <div class="grid grid-cols-2 gap-4 fade-slide-up delay-300">
          <div>
            <label for="height" class="block font-medium mb-1 text-gray-800 dark:text-gray-200">Height (cm)</label>
            <input
              id="height"
              v-model.number="form.height_cm"
              type="number"
              min="0"
              required
              class="w-full border p-2 rounded focus:ring-2 focus:ring-green-500 
                     transition-colors bg-gray-100 dark:bg-gray-700 
                     text-gray-900 dark:text-gray-100"
            />
          </div>
          <div>
            <label for="weight" class="block font-medium mb-1 text-gray-800 dark:text-gray-200">Weight (kg)</label>
            <input
              id="weight"
              v-model.number="form.weight_kg"
              type="number"
              min="0"
              required
              class="w-full border p-2 rounded focus:ring-2 focus:ring-green-500 
                     transition-colors bg-gray-100 dark:bg-gray-700 
                     text-gray-900 dark:text-gray-100"
            />
          </div>
        </div>

        <!-- Activity Level (new) -->
        <div class="fade-slide-up delay-300">
          <label for="activity" class="block font-medium mb-1 text-gray-800 dark:text-gray-200">Activity Level</label>
          <select
            id="activity"
            v-model="form.activity_level"
            required
            class="w-full border p-2 rounded focus:ring-2 focus:ring-green-500 
                   transition-colors bg-gray-100 dark:bg-gray-700 
                   text-gray-900 dark:text-gray-100"
          >
            <option value="sedentary">Sedentary (little or no exercise)</option>
            <option value="light">Lightly active (light exercise 1-3 days/week)</option>
            <option value="moderate">Moderately active (moderate exercise 3-5 days/week)</option>
            <option value="active">Very active (hard exercise 6-7 days/week)</option>
            <option value="veryActive">Extremely active (very hard exercise, physical job)</option>
          </select>
        </div>

        <!-- Advanced Metrics Toggle -->
        <button
          type="button"
          @click="showAdv = !showAdv"
          class="text-green-600 hover:underline fade-slide-up delay-300"
        >
          {{ showAdv ? 'Hide' : 'Show' }} Advanced Metrics
        </button>

        <!-- Advanced Metrics -->
        <div v-if="showAdv" class="space-y-4 fade-slide-up delay-300">
          <div>
            <label for="bodyFat" class="block font-medium mb-1 text-gray-800 dark:text-gray-200">Body Fat %</label>
            <input
              id="bodyFat"
              v-model.number="form.body_fat_pct"
              type="number"
              min="0"
              max="100"
              class="w-full border p-2 rounded focus:ring-2 focus:ring-green-500 
                     transition-colors bg-gray-100 dark:bg-gray-700 
                     text-gray-900 dark:text-gray-100"
            />
          </div>
          <div>
            <label for="rhr" class="block font-medium mb-1 text-gray-800 dark:text-gray-200">Resting HR (bpm)</label>
            <input
              id="rhr"
              v-model.number="form.rhr_bpm"
              type="number"
              min="0"
              class="w-full border p-2 rounded focus:ring-2 focus:ring-green-500 
                     transition-colors bg-gray-100 dark:bg-gray-700 
                     text-gray-900 dark:text-gray-100"
            />
          </div>
        </div>

        <!-- Goal -->
        <div class="fade-slide-up delay-300">
          <label for="goal" class="block font-medium mb-1 text-gray-800 dark:text-gray-200">Goal</label>
          <select
            id="goal"
            v-model="form.goal"
            required
            class="w-full border p-2 rounded focus:ring-2 focus:ring-green-500 
                   transition-colors bg-gray-100 dark:bg-gray-700 
                   text-gray-900 dark:text-gray-100"
          >
            <option value="loss">Weight Loss</option>
            <option value="maintain">Maintenance</option>
            <option value="gain">Weight Gain</option>
          </select>
        </div>

        <!-- Consent -->
        <div class="flex items-center space-x-2 fade-slide-up delay-450">
          <input
            id="consent"
            type="checkbox"
            v-model="form.consent"
            required
            class="form-checkbox h-5 w-5 text-green-600 transition duration-150 ease-in-out"
          />
          <label for="consent" class="text-gray-800 dark:text-gray-200">
            I consent to storing my biometric data
          </label>
        </div>

        <!-- Status message if there's an error -->
        <div v-if="statusMessage" 
             :class="[
               'text-center p-2 rounded fade-slide-up delay-450',
               statusType === 'error' ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200' : 
               'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200'
             ]">
          {{ statusMessage }}
        </div>

        <!-- Submit -->
        <button
          type="submit"
          :disabled="isSubmitting"
          class="w-full py-3 
                 bg-gradient-to-r from-green-400 to-green-600 dark:from-green-500 dark:to-green-700 
                 text-white font-semibold rounded-lg 
                 hover:shadow-lg transition-all duration-300
                 fade-slide-up delay-450"
        >
          {{ isSubmitting ? 'Saving...' : 'Save Profile' }}
        </button>
      </form>
    </main>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { calculateNutritionTargets } from '../utils/nutritionCalculator'

/** Dark-mode logic **/
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

/** Router & Auth **/
const router = useRouter()
const token = localStorage.getItem('authToken')
if (!token) router.push('/login')
const hdrs = { headers: { Authorization: `Bearer ${token}` } }

/** Form state **/
const form = reactive({
  age: null,
  sex: 'male',
  height_cm: null,
  weight_kg: null,
  body_fat_pct: null,
  rhr_bpm: null,
  activity_level: 'moderate', // Default activity level
  goal: 'maintain',
  consent: false
})
const showAdv = ref(false)
const isSubmitting = ref(false)
const statusMessage = ref('')
const statusType = ref('error')

// Show summary toggle
const showSummary = ref(false)
const nutritionTargets = ref(null)

// New calculation state
const isCalculating = ref(false)
const calculationStep = ref('')

/** Helper Functions for Summary **/
function calculateBMI(weight, height) {
  if (!weight || !height) return 0
  // BMI = weight (kg) / (height (m) ^ 2)
  return weight / ((height / 100) * (height / 100))
}

function getBMICategory(bmi) {
  if (bmi < 18.5) return { label: 'Underweight', color: 'text-blue-500 dark:text-blue-400' }
  if (bmi < 25) return { label: 'Normal', color: 'text-green-500 dark:text-green-400' }
  if (bmi < 30) return { label: 'Overweight', color: 'text-yellow-500 dark:text-yellow-400' }
  return { label: 'Obese', color: 'text-red-500 dark:text-red-400' }
}

function getActivityLevelLabel(level) {
  const labels = {
    sedentary: 'Sedentary (little or no exercise)',
    light: 'Lightly active (1-3 days/week)',
    moderate: 'Moderately active (3-5 days/week)',
    active: 'Very active (6-7 days/week)',
    veryActive: 'Extremely active (very hard exercise/physical job)'
  }
  return labels[level] || 'Unknown'
}

function getGoalLabel(goal) {
  const labels = {
    loss: 'Weight Loss',
    maintain: 'Maintain Weight', 
    gain: 'Weight Gain'
  }
  return labels[goal] || 'Unknown'
}

/** Load existing profile **/
async function loadProfile() {
  try {
    const { data } = await axios.get('http://localhost:3000/profile', hdrs)
    console.log('Profile data loaded:', data) // Debug logging
    
    if (data && Object.keys(data).length) {
      Object.assign(form, data)
      form.consent = true
      
      // Set default activity level if not present
      if (!form.activity_level) {
        form.activity_level = 'moderate'
      }
      
      // Check if we should show the summary view
      const savedTargets = localStorage.getItem('nutritionTargets')
      if (savedTargets) {
        nutritionTargets.value = JSON.parse(savedTargets)
        showSummary.value = true
      }
    } else {
      console.log('No existing profile data found')
    }
  } catch (err) {
    console.error('Failed to load profile', err)
    if (err.response) {
      console.error('Response status:', err.response.status)
      console.error('Response data:', err.response.data)
    }
    if (err.response?.status === 401) {
      statusMessage.value = 'Session expired. Please log in again.'
      statusType.value = 'error'
      router.push('/login')
    }
  }
}

/**
 * Perform nutrition calculations with animation
 */
async function calculateNutrition(profileData) {
  isCalculating.value = true
  
  try {
    // Simulate step calculations with delays to show the animation
    calculationStep.value = 'Calculating Basal Metabolic Rate (BMR)...'
    await new Promise(resolve => setTimeout(resolve, 700))
    
    calculationStep.value = 'Calculating Total Daily Energy Expenditure (TDEE)...'
    await new Promise(resolve => setTimeout(resolve, 700))
    
    calculationStep.value = 'Determining nutrition targets based on your goals...'
    await new Promise(resolve => setTimeout(resolve, 700))
    
    // Actually calculate the nutrition targets
    const targets = calculateNutritionTargets(
      profileData, 
      profileData.activity_level
    )
    
    // Add percentage calculations for the visualization
    const totalCals = targets.protein * 4 + targets.carbs * 4 + targets.fat * 9
    targets.calories = Math.round(totalCals)
    targets.proteinPercentage = Math.round((targets.protein * 4 / totalCals) * 100)
    targets.carbsPercentage = Math.round((targets.carbs * 4 / totalCals) * 100)
    targets.fatPercentage = Math.round((targets.fat * 9 / totalCals) * 100)
    
    calculationStep.value = 'Finalizing your personalized plan...'
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Store the nutrition targets for use in the dashboard
    localStorage.setItem('nutritionTargets', JSON.stringify(targets))
    
    nutritionTargets.value = targets
    return targets
  } finally {
    isCalculating.value = false
  }
}

async function onSubmit() {
  // Reset status
  statusMessage.value = ''
  
  if (!form.consent) {
    statusMessage.value = 'You must consent before saving.'
    statusType.value = 'error'
    return
  }

  // Enhanced validation
  const validationErrors = []
  if (!form.age || form.age <= 0) validationErrors.push('Age must be positive')
  if (!form.height_cm || form.height_cm <= 0) validationErrors.push('Height must be positive')
  if (!form.weight_kg || form.weight_kg <= 0) validationErrors.push('Weight must be positive')
  
  if (validationErrors.length > 0) {
    statusMessage.value = validationErrors.join(', ')
    statusType.value = 'error'
    return
  }
  
  isSubmitting.value = true
  
  try {
    // Make sure numbers are actually numbers
    const formData = {
      ...form,
      age: Number(form.age),
      height_cm: Number(form.height_cm),
      weight_kg: Number(form.weight_kg),
      body_fat_pct: form.body_fat_pct ? Number(form.body_fat_pct) : null,
      rhr_bpm: form.rhr_bpm ? Number(form.rhr_bpm) : null
    }
    
    console.log('Sending profile data:', formData)
    
    // Check for token
    if (!token) {
      throw new Error('Authentication token missing')
    }
    
    const response = await axios.post('http://localhost:3000/profile', formData, hdrs)
    
    console.log('Profile saved successfully:', response.data)
    
    statusMessage.value = 'Profile saved successfully!'
    statusType.value = 'success' 
    
    // Save a local copy in localStorage as backup
    localStorage.setItem('userProfile', JSON.stringify(formData))
    
    // Calculate nutrition targets with animation
    await calculateNutrition(formData)
    
    // Show the summary view
    showSummary.value = true
  } catch (err) {
    console.error('Failed to save profile', err)
    
    if (err.response) {
      console.error('Response status:', err.response.status)
      console.error('Response data:', err.response.data)
    }
    
    // Specific error handling based on common issues
    if (err.message === 'Authentication token missing') {
      statusMessage.value = 'You need to log in again'
      setTimeout(() => router.push('/login'), 1500)
    } else if (err.response?.status === 401) {
      statusMessage.value = 'Session expired. Please log in again.'
      setTimeout(() => router.push('/login'), 1500)
    } else if (err.response?.status === 400) {
      statusMessage.value = 'Invalid data. Please check your inputs.'
    } else if (err.message.includes('Network Error')) {
      statusMessage.value = 'Network error. Please check your connection to the server.'
    } else {
      statusMessage.value = err.response?.data?.message || 'Save failed. Please try again.'
    }
    
    statusType.value = 'error'
  } finally {
    isSubmitting.value = false
  }
}

// Function to go back to edit mode
function editProfile() {
  showSummary.value = false
}

// Function to navigate to dashboard
function navigateToDashboard() {
  router.push('/dashboard')
}

// Add logout function that was referenced in the sidebar
function logout() {
  localStorage.removeItem('authToken')
  localStorage.removeItem('userProfile')
  localStorage.removeItem('nutritionTargets')
  router.push('/login')
}

// Add a function to check if API server is reachable
async function checkServerConnection() {
  try {
    await axios.get('http://localhost:3000/health')
    return true
  } catch (err) {
    console.error('API server connection error:', err)
    statusMessage.value = 'Cannot connect to server. Is it running?'
    statusType.value = 'error'
    return false
  }
}

// Update onMounted to include connection check
onMounted(async () => {
  initDarkMode()
  
  // Try to load from localStorage if API fails
  const serverAvailable = await checkServerConnection()
  if (serverAvailable) {
    await loadProfile()
  } else {
    // Try to load from local storage as fallback
    const localProfile = localStorage.getItem('userProfile')
    if (localProfile) {
      Object.assign(form, JSON.parse(localProfile))
      form.consent = true
      statusMessage.value = 'Loaded from local storage. Changes may not be saved to server.'
      statusType.value = 'warning'
      
      // Check if we have nutrition targets saved
      const savedTargets = localStorage.getItem('nutritionTargets')
      if (savedTargets) {
        nutritionTargets.value = JSON.parse(savedTargets)
        showSummary.value = true
      }
    }
  }
})
</script>

<style scoped>
@keyframes fadeSlideUp {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0);   }
}
.fade-slide-up { 
  opacity: 0; 
  animation: fadeSlideUp 0.8s ease-out forwards; 
}
.fade-slide-up.delay-150 { animation-delay: 0.15s; }
.fade-slide-up.delay-300 { animation-delay: 0.3s; }
.fade-slide-up.delay-450 { animation-delay: 0.45s; }

/* Button and input focus states */
button:focus, input:focus, select:focus {
  outline: none;
}
</style>