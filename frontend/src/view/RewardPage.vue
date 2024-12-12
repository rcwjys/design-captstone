<template>
  <div class="min-h-screen bg-gray-100">
    <Modal v-if="isModalOpen" />
    <ModalError v-if="isModalErrorOpen">{{ errorMessage }}</ModalError>
    <div
      class="flex justify-between items-center bg-red-600 text-white py-4 px-6 shadow-lg"
    >
      <h1 class="text-3xl font-bold">Rewards</h1>
    </div>

    <div class="p-4">
      <section
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <div
          v-for="reward in rewards"
          :key="reward.reward_id"
          class="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300"
        >
          <h3 class="text-lg font-semibold text-gray-800 mb-4 truncate">
            {{ reward.reward_name }}
          </h3>

          <img
            :src="`${backendUrl}${reward.reward_image}`"
            :alt="reward.reward_name"
            class="w-full h-40 object-cover rounded mb-4"
          />

          <div class="text-sm text-gray-600 mb-4">
            <pi><strong>Stock:</strong> {{ reward.reward_stock }}</pi>
            <p>
              <strong>Price:</strong>
              {{
                reward.reward_price <= 1
                  ? reward.reward_price + " point"
                  : reward.reward_price + " points"
              }}
            </p>
          </div>

          <div class="mt-auto flex space-x-4">
            <button
              @click="handleClaimReward(reward.reward_id)"
              class="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            >
              Claim
            </button>
          </div>
        </div>
      </section>
    </div>

    <BottomNavbar />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import BottomNavbar from "../layout/BottomNavbar.vue";
import { getReward } from "../services/staff/staffServices";
import { claimReward } from "../services/reportService/formReportService";
import Modal from "../components/Modal.vue";
import ModalError from "../components/ModalError.vue";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const rewards = ref([]);
const isModalOpen = ref(false);
const isModalErrorOpen = ref(false);
const errorMessage = ref([]);

const getRewardData = async () => {
  try {
    const response = await getReward();
    rewards.value = response;
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

const handleClaimReward = async (rewardId) => {
  const rewardData = {
    reward_id: rewardId,
    user_id: localStorage.getItem("userData"),
    claim_qty: 1,
  };
  console.log(rewardData);
  try {
    const response = await claimReward(rewardData);
    console.log(response);
    isModalOpen.value = true;
  } catch (error) {
    isModalErrorOpen.value = true;
    errorMessage.value = error;
    console.log(error);
  }
};

const closeModal = () => {
  isModalOpen.value = false;
};

onMounted(() => {
  getRewardData();
});
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
