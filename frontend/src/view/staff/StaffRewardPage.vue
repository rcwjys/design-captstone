<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Header -->
    <div class="flex items-center bg-red-600 text-white py-4 px-2 shadow-lg">
      <h1 class="text-3xl font-bold">Rewards Management</h1>
    </div>

    <section class="flex flex-col mt-10">
      <div
        v-for="reward in rewards"
        :key="reward.reward_id"
        class="w-96 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mx-auto mb-4"
      >
        <a href="#">
          <img
            class="rounded-t-lg w-full h-32 object-fill"
            :src="`${backendUrl}${reward.reward_image}`"
            :alt="reward.reward_name"
          />
        </a>
        <div class="p-5">
          <h5
            class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white capitalize"
          >
            {{ reward.reward_name }}
          </h5>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Price: {{ reward.reward_price }} Points
          </p>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Stock: {{ reward.reward_stock }}
          </p>
          <div class="flex justify-start space-x-2">
            <button
              @click="navigateToEditReward(reward.reward_id)"
              class="bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg text-sm px-4 py-2"
            >
              Edit
            </button>
            <button
              @click="deleteReward(reward.reward_id)"
              class="bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg text-sm px-4 py-2"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </section>

    <div class="fixed inset-x-0 top-[6%] flex justify-center p-4 bg-gray-100">
      <router-link
        :to="{ name: 'create-reward' }"
        class="bg-red-600 px-6 py-3 text-white font-semibold rounded-lg text-center w-[80%]"
      >
        Create Reward
      </router-link>
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
const rewardStore = formReportStore();

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
