<template>
  <router-view />
</template>

<script setup>
// no script needed
</script>

<style>
  :root {
    color-scheme: light;
  }

  :root.dark {
    color-scheme: dark;
  }

  /* Add smooth transitions for theme changes */
  *,
  *::before,
  *::after {
    transition: background-color 0.3s ease, 
                border-color 0.3s ease,
                color 0s,
                fill 0s,
                opacity 0.3s ease,
                box-shadow 0.3s ease;
  }

  /* Exceptions for elements that shouldn't have transitions */
  .no-transition,
  .no-transition *,
  button:active,
  a:active {
    transition: none !important;
  }
</style>