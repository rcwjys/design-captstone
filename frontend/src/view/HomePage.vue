<template>
  <div class="flex max-h-screen w-full h-screen justify-center items-center">
    <div
      class="flex flex-col justify-between items-center py-16 px-4 h-full w-full"
    >
      <div class="flex items-center w-full absolute top-4 left-0 px-4">
        <button @click="toggleSidebar" class="mr-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
        <h1 class="flex-1 text-center font-bold text-2xl">Title Here</h1>
      </div>

      <Sidebar v-if="isSidebarVisible" @close="toggleSidebar" />

      <!-- Hero Image Section -->
      <div class="flex justify-center items-center flex-grow">
        <img src="../assets/images/hero-img.jpg" alt="Hero Image" />
      </div>

      <!-- Content Section with Button at the Bottom -->
      <div class="flex flex-col gap-2 w-full justify-end pb-6">
        <div class="text-center mb-4">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat
          accusantium id voluptate quasi.
        </div>
        <router-link
          to="/camera"
          class="bg-red-600 hover:bg-blue-700 text-white font-medium rounded-xl px-4 py-2.5 text-lg w-full text-center"
        >
          Get Start
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Sidebar from "../layout/Sidebar.vue";

const isSidebarVisible = ref(false);

const toggleSidebar = () => {
  isSidebarVisible.value = !isSidebarVisible.value;
};
</script>

<style scoped>
h1 {
  margin-left: -4rem;
}
</style>