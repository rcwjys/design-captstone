<template>
  <div class="flex flex-col h-screen bg-white-50 overflow-hidden">
    <!-- Header -->
    <header class="flex items-center justify-center w-full p-8 absolute  z-50">
      <h1 class="text-3xl font-bold text--800 tracking-tight">
        Welcome to
        <span class="text-red-600">Tel-U Sano</span>
      </h1>
    </header>

    <!-- Hero Section -->
    <section class="flex flex-col items-center justify-center flex-grow text-center px-6 sm:px-12 -mt-25 sm:-mt-30">
  <div class="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
    <img
      src="../assets/images/hero-img.jpg"
      alt="Hero Image"
      class="rounded-xl w-full h-60 object-cover mb-6"
        />
        <p class="text-gray-800 text-lg font-medium leading-relaxed mb-6">
          Empowering your journey to a <span class="font-semibold text-red-600">cleaner world</span>.
          <br />Join us today and make a difference!
        </p>
        <div class="flex justify-center gap-4 mb-0">
          <button
            @click="navigateToCamera('form-report')"
            class="bg-transparent border-2 border-red-600 text-red-600 font-bold rounded-full px-6 py-3 text-lg w-40 text-center hover:bg-red-600 hover:text-white transition-colors duration-300"
        >
            Get Started
          </button>
        </div>
      </div>
    </section>

    <!-- Bottom Navbar -->
    <BottomNavbar />
  </div>
</template>

<script setup>
import router from "../router";
import BottomNavbar from "../layout/BottomNavbar.vue";
import { formReportStore } from "../store";

// Store for navigation
const navigationStore = formReportStore();

const navigateToCamera = (route) => {
  navigationStore.setRedirectTo(route);
  router.push({ name: "report" });
};
</script>

<style scoped>
/* Gradient Text Style */
.gradient-text {
  background: linear-gradient(to right, #FF6F61, #00BFAE); /* Subtle gradient effect */
  -webkit-background-clip: text;
  color: transparent;
  font-family: 'Poppins', sans-serif; /* Clean, modern font */
}

</style>
