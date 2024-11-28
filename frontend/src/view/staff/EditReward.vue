<template>
  <div class="min-h-screen bg-gray-100">
    <div
      class="flex justify-between items-center bg-red-600 text-white py-4 px-2 shadow-lg"
    >
      <div class="flex items-center">
        <router-link
          :to="{ name: 'staff-reward' }"
          class="bg-red-600 text-white rounded-lg hover:bg-red-700 mr-3 p-2"
        >
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
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
        </router-link>
        <h1 class="text-xl font-bold">Edit Reward</h1>
      </div>
    </div>
    <div class="p-2">
      <div class="bg-white p-6 shadow-md rounded-lg">
        <form @submit.prevent="handleEditReward">
          <div class="flex flex-col gap-2 w-full">
            <div class="mb-5 w-full">
              <label class="block mb-2 text-sm font-medium text-gray-900"
                >Name</label
              >
              <input
                type="text"
                :placeholder="`${rewards.reward_name}`"
                v-model="reward_name"
                class="p-4 rounded-full border w-full"
              />
            </div>
            <div class="mb-5">
              <label class="block mb-2 text-sm font-medium text-gray-900"
                >Price</label
              >
              <input
                type="number"
                :placeholder="`${rewards.reward_price}`"
                v-model="reward_price"
                class="p-4 rounded-full border w-full"
              />
            </div>
            <div class="mb-5">
              <label class="block mb-2 text-sm font-medium text-gray-900"
                >Stock</label
              >
              <input
                type="number"
                :placeholder="`${rewards.reward_stock}`"
                v-model="reward_stock"
                class="p-4 rounded-full border w-full"
              />
            </div>
            <div class="mb-5 flex flex-col items-center">
              <label class="block mb-2 text-sm font-medium text-gray-900"
                >Image</label
              >
              <img
                :src="`${backendUrl}${rewards.reward_img}`"
                alt="Input Image"
                class="items-center rounded-lg mb-4 w-1/2"
              />
            </div>
          </div>
          <div class="flex justify-center w-full mt-10">
            <Button>Edit Reward</Button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import Button from "../../components/Button.vue";
import { onMounted, ref } from "vue";
import {
  getRewardById,
  updatedReward,
} from "../../services/staff/staffServices";
import { formReportStore } from "../../store";
import router from "../../router";

const rewards = ref([]);
const rewardStore = formReportStore();
const backendUrl = import.meta.env.VITE_BACKEND_URL;
const reward_name = ref("");
const reward_price = ref(0);
const reward_stock = ref(0);

const handleEditReward = async () => {
  const rewardData = {
    reward_id: rewardStore.rewardId,
    reward_name: reward_name.value,
    reward_price: reward_price.value,
    reward_stock: reward_stock.value,
  };
  console.log("reward data", rewardData);
  try {
    const response = await updatedReward(rewardData, rewardStore.rewardId);
    console.log(response);
    router.push({ name: "staff-reward" });
  } catch (error) {
    console.log(error);
  }
};

const getRewardData = async () => {
  try {
    console.log(rewardStore.rewardId);
    const response = await getRewardById(rewardStore.rewardId);
    rewards.value = response;
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  getRewardData();
});
</script>
