<template>
  <div class="min-h-screen bg-gray-100">
    <div
      class="flex justify-between items-center bg-red-600 text-white py-4 px-6 shadow-lg"
    >
      <h1 class="text-3xl font-bold">Profile</h1>
    </div>
    <div class="p-4">
      <div
        class="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300"
      >
        <p>
          <strong>Your Points:</strong>
        </p>
      </div>
    </div>
    <div class="p-4">
      <Button>Logout</Button>
    </div>
    <BottomNavbar />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import BottomNavbar from "../layout/BottomNavbar.vue";
import { getUserData } from "../services/authService/signupService";
import Button from "../components/Button.vue";

const dataUsers = ref([]);

const getDataUsers = async () => {
  try {
    const userId = localStorage.getItem("userData");

    const response = await getUserData(userId);
    console.log("user", response);
    dataUsers.value = response;
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  getDataUsers();
});
</script>
