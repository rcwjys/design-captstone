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
        <h1 class="text-xl font-bold">Create Reward</h1>
      </div>
    </div>
    <div class="p-2">
      <div class="bg-white p-6 shadow-md rounded-lg">
        <form @submit.prevent="handleCreateReward">
          <div class="flex flex-col gap-2 w-full">
            <div class="mb-5 w-full">
              <label class="block mb-2 text-sm font-medium text-gray-900"
                >Name</label
              >
              <input
                type="text"
                placeholder="Name"
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
                placeholder="Price"
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
                placeholder="Stock"
                v-model="reward_stock"
                class="p-4 rounded-full border w-full"
              />
            </div>
            <div
              class="mb-5 flex flex-col items-center"
              v-if="inputImage && inputImage.imageUrl"
            >
              <img
                :src="inputImage.imageUrl"
                alt="Input Image"
                class="items-center rounded-lg mb-4 w-1/2"
              />
            </div>
            <div class="mb-5" v-if="!inputImage || !inputImage.imageUrl">
              <label class="block mb-2 text-sm font-medium text-gray-900"
                >Image</label
              >
              <input
                type="file"
                accept="image/*"
                id="fileInput"
                @change="handleImageUpload"
                class="block text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 p-2.5 w-full"
              />
            </div>
          </div>
          <div class="flex justify-center w-full mt-10">
            <Button>Create Reward</Button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import Button from "../../components/Button.vue";
import { createReward } from "../../services/staff/staffServices";
import { formReportStore } from "../../store";
import router from "../../router";

const reward_name = ref("");
const reward_price = ref(0);
const reward_stock = ref(0);
const reward_image = ref(null);

const imageStore = formReportStore();

const inputImage = computed(() => imageStore.capturedImage);

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    reward_image.value = file;

    const reader = new FileReader();
    reader.onload = (e) => {
      imageStore.setCapturedImage({
        file: file,
        fileName: file.name,
        imageUrl: e.target.result,
      });
    };
    reader.readAsDataURL(file);
  }
};

const handleCreateReward = async () => {
  const file = inputImage.value ? inputImage.value.file : null;
  const rewardData = {
    reward_name: reward_name.value,
    reward_price: reward_price.value,
    reward_stock: reward_stock.value,
    reward: file,
  };
  console.log("reward data", rewardData);
  try {
    const response = await createReward(rewardData);
    console.log(response);
    router.push({ name: "staff-reward" });
  } catch (error) {
    console.log(error);
  }
};
</script>
