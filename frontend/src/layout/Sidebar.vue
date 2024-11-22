<template>
  <div class="fixed top-0 left-0 w-64 h-full bg-gray-800 text-white z-50 p-4">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-bold">Tel-U Sano</h2>
      <button @click="$emit('close')" class="text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
    <nav>
      <ul>
        <li>
          <router-link :to="{ name: 'status' }">
            <div class="text-md">Status</div>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'reward' }">
            <div class="text-md">Reward</div>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'profile' }">
            <div class="text-md">Profile</div>
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup></script>

<style></style>
