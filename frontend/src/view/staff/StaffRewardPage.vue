<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Header -->
    <div
      class="flex justify-between items-center bg-red-600 text-white py-4 px-2 shadow-lg"
    >
      <h1 class="text-3xl font-bold">Rewards Management</h1>
    </div>

    <div class="p-2">
      <div class="flex justify-start mb-4">
        <div class="my-4">
          <router-link
            :to="{ name: 'create-reward' }"
            class="bg-red-600 text-white rounded-lg hover:bg-red-700 w-32 p-4 text-center"
          >
            Create Reward
          </router-link>
        </div>
      </div>

      <section
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
      >
        <div
          v-for="reward in rewards"
          :key="reward.reward_id"
          class="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between"
        >
          <h3 class="text-lg font-semibold text-gray-800 mb-4">
            {{ reward.reward_name }}
          </h3>
          <img
            :src="`${backendUrl}${reward.reward_image}`"
            :alt="reward.reward_name"
            class="w-full h-40 object-cover rounded mb-4"
          />
          <div class="text-sm text-gray-600 mb-4">
            <p><strong>Stock:</strong> {{ reward.reward_stock }}</p>
            <p><strong>Price:</strong> ${{ reward.reward_price }}</p>
          </div>
          <div class="mt-auto flex space-x-4">
            <button
              @click="navigateToEditReward(reward.reward_id)"
              class="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-4 py-2 text-sm"
            >
              Edit
            </button>
            <button
              @click="deleteReward(reward.reward_id)"
              class="bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg px-4 py-2 text-sm"
            >
              Delete
            </button>
          </div>
        </div>
      </section>
    </div>

    <StaffBottomNavbar />
  </div>
</template>

<script setup>
import StaffNavbar from "../../layout/StaffNavbar.vue";
import StaffBottomNavbar from "../../layout/StaffBottomNavbar.vue";
import { getReward } from "../../services/staff/staffServices";
import { onMounted, ref } from "vue";
import router from "../../router";
import { formReportStore } from "../../store";

const rewards = ref([]);
const backendUrl = import.meta.env.VITE_BACKEND_URL;
const rewardStore = formReportStore()

const getRewardData = async () => {
  try {
    const response = await getReward();
    rewards.value = response;
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

const navigateToEditReward = (rewardId) => {
  console.log(rewardId);
  rewardStore.setRewardId(rewardId);
  router.push({ name: "edit-reward", params: { rewardId } });
};

onMounted(() => {
  getRewardData();
});
</script>
