<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Header -->
    <div class="flex justify-between items-center bg-red-600 text-white py-4 px-6 shadow-lg">
      <h1 class="text-3xl font-bold">Rewards Management</h1>
    </div>

    <div class="p-4">
      <!-- Create Reward Button -->
      <div class="mb-6 flex justify-start">
        <router-link
          :to="{ name: 'create-reward' }"
          class="bg-red-600 text-white rounded-lg px-6 py-3 text-center hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300"
        >
          Create Reward
        </router-link>
      </div>

      <!-- Rewards List -->
      <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div
          v-for="reward in rewards"
          :key="reward.reward_id"
          class="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300"
        >
          <!-- Reward Name -->
          <h3 class="text-lg font-semibold text-gray-800 mb-4 truncate">
            {{ reward.reward_name }}
          </h3>

          <!-- Reward Image -->
          <img
            :src="`${backendUrl}${reward.reward_image}`"
            :alt="reward.reward_name"
            class="w-full h-40 object-cover rounded mb-4"
          />

          <!-- Reward Info -->
          <div class="text-sm text-gray-600 mb-4">
            <p><strong>Stock:</strong> {{ reward.reward_stock }}</p>
            <p><strong>Price:</strong> ${{ reward.reward_price }}</p>
          </div>

          <!-- Action Buttons -->
          <div class="mt-auto flex space-x-4">
            <button
              @click="navigateToEditReward(reward.reward_id)"
              class="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            >
              Edit
            </button>
            <button
              @click="deleteReward(reward.reward_id)"
              class="bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300"
            >
              Delete
            </button>
          </div>
        </div>
      </section>
    </div>

    <BottomNavbar />
  </div>
</template>

<script setup>
import BottomNavbar from "../layout/BottomNavbar.vue";

// Add logic for fetching and handling rewards data (if applicable).
</script>

<style scoped>
/* Ensuring smooth transitions for hover effects */
button:hover {
  transform: scale(1.05);
}

button:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(255, 99, 71, 0.5);
}

h3 {
  word-wrap: break-word; /* Ensuring long names don't overflow */
}

img {
  transition: transform 0.3s ease-in-out;
}

img:hover {
  transform: scale(1.05);
}

/* Adding some subtle shadow effect on reward card hover */
.bg-white:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 15px rgba(0, 0, 0, 0.1);
}
</style>
