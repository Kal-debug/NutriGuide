<template>
  <div class="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300">
    <!-- NAVBAR -->
    <nav
      ref="navbar"
      class="fixed w-full top-0 z-50 transition-all duration-300 shadow-md"
      :class="[
        scrolled ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm' : 'bg-white dark:bg-gray-900',
        isHidden ? '-translate-y-full' : 'translate-y-0'
      ]"
    >
      <div class="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <div class="flex items-center space-x-3">
          <img 
            src="/Users/ka/Downloads/nutrition-app 2/src/images/nutrilogo.png" 
            alt="NutriGuide Logo" 
            class="h-10 sm:h-12 md:h-14 lg:h-16 w-auto" 
            loading="lazy" 
          />
          <span class="text-2xl font-bold text-gray-800 dark:text-white">NutriGuide</span>
        </div>
        <div class="flex items-center space-x-4">
          <button
            @click="toggleDarkMode"
            aria-label="Toggle dark mode"
            class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <!-- Sun icon for dark mode -->
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
            <!-- Moon icon for light mode -->
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
          <router-link
            to="/signup"
            aria-label="Sign up for NutriGuide"
            class="px-4 py-2 bg-gradient-to-r from-green-400 to-green-600 dark:from-green-500 dark:to-green-700 text-white rounded hover:shadow-lg hover:translate-y-0.5 transition-all duration-300"
          >
            Sign Up
          </router-link>
          <router-link
            to="/login"
            aria-label="Log in to your account"
            class="px-4 py-2 border border-green-500 dark:border-green-400 text-green-600 dark:text-green-400 rounded hover:bg-green-50 dark:hover:bg-green-900/30 transition-all duration-300"
          >
            Log In
          </router-link>
        </div>
      </div>
    </nav>

    <!-- push content below nav -->
    <main class="pt-24 flex-1">
      <!-- HERO -->
      <section class="relative h-screen bg-hero lazy-bg">
        <div class="absolute inset-0 bg-black opacity-40 dark:opacity-50"></div>
        <div class="relative z-10 flex flex-col justify-center items-center h-full text-center px-6">
          <h1 class="text-white text-5xl md:text-6xl font-extrabold mb-4 fade-slide-up">
            Hit Your Nutrition Goals
          </h1>
          <p class="text-white text-lg md:text-xl mb-8 fade-slide-up delay-150">
            Log meals, track macros, and reach your targets—one bite at a time.
          </p>
          <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 fade-slide-up delay-300">
            <router-link
              to="/signup"
              class="px-8 py-3 bg-gradient-to-r from-green-400 to-green-600 dark:from-green-500 dark:to-green-700 text-white rounded-lg font-semibold hover:shadow-lg hover:translate-y-0.5 transition-all duration-300"
            >
              Get Started
            </router-link>
            <a
              href="#features"
              class="px-8 py-3 border border-white text-white rounded-lg font-semibold hover:bg-white/20 transition-all duration-300"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      <!-- FEATURES -->
      <section id="features" class="py-20 bg-white dark:bg-gray-900">
        <div class="max-w-6xl mx-auto px-6">
          <h2 class="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
            Why You'll Love It
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="p-8 bg-gray-50 dark:bg-gray-800 rounded-xl shadow hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 text-center focus-within:ring-2 focus-within:ring-green-500">
              <div class="mb-4 text-green-500 dark:text-green-400 flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 class="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Easy Food Search</h3>
              <p class="text-gray-600 dark:text-gray-300">Search thousands of foods or scan barcodes instantly.</p>
            </div>
            <div class="p-8 bg-gray-50 dark:bg-gray-800 rounded-xl shadow hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 text-center focus-within:ring-2 focus-within:ring-green-500">
              <div class="mb-4 text-green-500 dark:text-green-400 flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 class="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Live Progress Charts</h3>
              <p class="text-gray-600 dark:text-gray-300">Visualize your macros and trends over time.</p>
            </div>
            <div class="p-8 bg-gray-50 dark:bg-gray-800 rounded-xl shadow hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 text-center focus-within:ring-2 focus-within:ring-green-500">
              <div class="mb-4 text-green-500 dark:text-green-400 flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 class="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Weekly Meal Plans</h3>
              <p class="text-gray-600 dark:text-gray-300">Get personalized weekly meal plans to stay on track.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- TESTIMONIALS -->
      <section class="py-20 bg-gray-100 dark:bg-gray-800">
        <div class="max-w-6xl mx-auto px-6 text-center">
          <h2 class="text-3xl font-bold mb-12 text-gray-800 dark:text-white">What Our Users Say</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="bg-white dark:bg-gray-700 p-8 rounded-xl shadow hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
              <p class="italic mb-6 text-gray-600 dark:text-gray-300">
                "NutriGuide changed the way I eat. Tracking macros has never been easier!"
              </p>
              <div class="font-semibold text-gray-800 dark:text-white">— Alex P.</div>
            </div>
            <div class="bg-white dark:bg-gray-700 p-8 rounded-xl shadow hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
              <p class="italic mb-6 text-gray-600 dark:text-gray-300">
                "The meal plans are a game‑changer. I feel more energetic than ever."
              </p>
              <div class="font-semibold text-gray-800 dark:text-white">— Jamie L.</div>
            </div>
            <div class="bg-white dark:bg-gray-700 p-8 rounded-xl shadow hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
              <p class="italic mb-6 text-gray-600 dark:text-gray-300">
                "Love the barcode scanning—no more manual entry."
              </p>
              <div class="font-semibold text-gray-800 dark:text-white">— Sam K.</div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA BANNER -->
      <section class="py-16 bg-gradient-to-r from-green-400 to-green-600 dark:from-green-500 dark:to-green-700 text-white text-center">
        <div class="max-w-4xl mx-auto px-6">
          <h2 class="text-2xl md:text-3xl font-bold mb-6">
            Ready to crush your nutrition goals?
          </h2>
          <router-link
            to="/signup"
            class="px-8 py-3 bg-white text-green-600 dark:text-green-700 rounded-lg font-semibold hover:bg-gray-100 hover:shadow-lg hover:translate-y-0.5 transition-all duration-300"
          >
            Sign Up Now
          </router-link>
        </div>
      </section>
    </main>

    <!-- FOOTER -->
    <footer class="py-12 bg-gray-800 dark:bg-gray-950 text-gray-400">
      <div class="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <div class="mb-6 md:mb-0">&copy; 2025 NutriGuide. All rights reserved.</div>
        <div class="space-x-6">
          <a href="#" class="hover:text-white transition">About</a>
          <a href="#" class="hover:text-white transition">Contact</a>
          <a href="#" class="hover:text-white transition">Privacy</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';

// Dark mode state
const isDarkMode = ref(false);

// Navbar scroll behavior states
const scrolled = ref(false);
const isHidden = ref(false);
const navbar = ref<HTMLElement | null>(null);
const lastScrollY = ref(0);

// Function to check and initialize dark mode
const initDarkMode = () => {
  // Check localStorage or system preference
  const savedMode = localStorage.getItem('nutriguide-dark-mode');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  isDarkMode.value = savedMode === 'true' || (savedMode === null && prefersDark);
  
  // Apply dark mode to document if needed
  applyDarkMode();
};

// Apply dark mode based on current state
const applyDarkMode = () => {
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

// Toggle dark mode function
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  localStorage.setItem('nutriguide-dark-mode', isDarkMode.value.toString());
  applyDarkMode();
};

// Scroll handling composable
const useScroll = () => {
  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    
    // Update navbar transparency state
    scrolled.value = currentScrollY > 20;
    
    // Handle navbar hide/show based on scroll direction
    if (currentScrollY > lastScrollY.value && currentScrollY > 100) {
      isHidden.value = true; // Scrolling down, hide navbar
    } else {
      isHidden.value = false; // Scrolling up, show navbar
    }
    
    lastScrollY.value = currentScrollY;
  };
  
  // Initialize event listeners
  onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initialize lazy loading for background images
    const lazyBackgrounds = document.querySelectorAll('.lazy-bg');
    
    if ('IntersectionObserver' in window) {
      const lazyBackgroundObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('loaded');
            lazyBackgroundObserver.unobserve(entry.target);
          }
        });
      });
      
      lazyBackgrounds.forEach((bg) => {
        lazyBackgroundObserver.observe(bg);
      });
    } else {
      // Fallback for browsers without IntersectionObserver
      setTimeout(() => {
        lazyBackgrounds.forEach((bg) => {
          bg.classList.add('loaded');
        });
      }, 100);
    }
  });
  
  // Clean up event listeners
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });
  
  return {
    scrolled,
    isHidden
  };
};

// Initialize scroll functionality
const { scrolled: scrolledState } = useScroll();

// Call initDarkMode during component mount
onMounted(() => {
  initDarkMode();
});
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
</style>