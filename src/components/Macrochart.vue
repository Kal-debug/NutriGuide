<template>
    <div>
      <h3 class="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
        Macro Breakdown
      </h3>
      <div class="flex flex-col md:flex-row">
        <div class="md:w-2/3">
          <Bar :data="chartData" :options="chartOptions" />
        </div>
        <div class="md:w-1/3 flex flex-col justify-center space-y-4 mt-6 md:mt-0 md:pl-6">
          <div v-for="(macro, index) in macros" :key="macro.name" class="fade-in" :style="{ animationDelay: `${index * 0.15}s` }">
            <div class="flex items-center justify-between mb-1">
              <div class="flex items-center">
                <div 
                  class="w-4 h-4 rounded-full mr-2" 
                  :style="{ backgroundColor: macro.color }"
                ></div>
                <span class="text-gray-800 dark:text-gray-200">{{ macro.name }}</span>
              </div>
              <span class="text-gray-800 dark:text-gray-200">{{ macro.value }} / {{ macro.goal }}g</span>
            </div>
            <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                class="h-2 rounded-full transition-all duration-500" 
                :style="{ 
                  width: `${Math.min(100, (macro.value / macro.goal) * 100)}%`,
                  backgroundColor: macro.color
                }"
              ></div>
            </div>
            <p class="text-xs mt-1 text-gray-600 dark:text-gray-400">
              {{ Math.round((macro.value / macro.goal) * 100) }}% of daily goal
            </p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  import { Bar } from 'vue-chartjs'
  import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  } from 'chart.js'
  
  // Register Chart.js components
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  )
  
  // Define props
  const props = defineProps({
    totals: {
      type: Object,
      required: true
    },
    goals: {
      type: Object,
      required: true
    }
  })
  
  // Colors for different macros
  const colors = {
    protein: '#34D399', // green
    carbs: '#60A5FA',   // blue
    fat: '#FBBF24'      // yellow
  }
  
  // Computed macro data for both chart and progress bars
  const macros = computed(() => [
    { 
      name: 'Protein', 
      value: props.totals.protein, 
      goal: props.goals.protein,
      color: colors.protein
    },
    { 
      name: 'Carbs', 
      value: props.totals.carbs, 
      goal: props.goals.carbs,
      color: colors.carbs
    },
    { 
      name: 'Fat', 
      value: props.totals.fat, 
      goal: props.goals.fat,
      color: colors.fat
    }
  ])
  
  // Chart data
  const chartData = computed(() => ({
    labels: ['Protein', 'Carbs', 'Fat'],
    datasets: [
      {
        label: 'Current (g)',
        data: [props.totals.protein, props.totals.carbs, props.totals.fat],
        backgroundColor: [colors.protein, colors.carbs, colors.fat],
        borderRadius: 6
      },
      {
        label: 'Goal (g)',
        data: [props.goals.protein, props.goals.carbs, props.goals.fat],
        backgroundColor: ['rgba(52, 211, 153, 0.2)', 'rgba(96, 165, 250, 0.2)', 'rgba(251, 191, 36, 0.2)'],
        borderWidth: 1,
        borderColor: [colors.protein, colors.carbs, colors.fat],
        borderRadius: 6
      }
    ]
  }))
  
  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { 
        position: 'top',
        labels: {
          color: (context) => {
            // Use different colors for light/dark mode
            const theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light'
            return theme === 'dark' ? '#e5e7eb' : '#374151'
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.dataset.label || ''
            const value = context.parsed.y || 0
            return `${label}: ${value}g`
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: (context) => {
            const theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light'
            return theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
          }
        },
        ticks: {
          color: (context) => {
            const theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light'
            return theme === 'dark' ? '#e5e7eb' : '#374151'
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: (context) => {
            const theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light'
            return theme === 'dark' ? '#e5e7eb' : '#374151'
          }
        }
      }
    }
  }
  </script>
  
  <style scoped>
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .fade-in {
    animation: fadeIn 0.5s ease-out forwards;
  }
  </style>