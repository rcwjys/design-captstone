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
        <div class="flex items-center gap-4 mb-4">
          <img
            v-if="dataUser.image_url"
            :src="dataUser.image_url"
            alt="Profile Picture"
            class="w-24 h-24 rounded-full border-2 border-gray-300 object-cover"
          />
          <h2 class="text-2xl font-semibold">
            {{ dataUser.name || "Name not available" }}
          </h2>
        </div>
        <div class="flex flex-col mb-2">
          <strong>Email:</strong> {{ dataUser.email || "Email not available" }}
        </div>
        <div class="flex flex-col mb-2">
          <strong>Class:</strong> {{ dataUser.class || "Class not available" }}
        </div>
        <div class="flex flex-col mb-2">
          <strong>Major:</strong> {{ dataUser.major || "Major not available" }}
        </div>
        <div class="flex flex-col mb-2">
          <strong>Type:</strong> {{ dataUser.type || "Type not available" }}
        </div>
        <div class="flex flex-col mb-2">
          <strong>Points:</strong>
          {{ dataUser.point || "Points not available" }}
        </div>
      </div>
    </div>
    <div class="p-4">
      <Button @click="handleLogout">Logout</Button>
    </div>
    <BottomNavbar />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import BottomNavbar from "../layout/BottomNavbar.vue";
import Button from "../components/Button.vue";

const dataUser = ref([]);

const getDataUsers = async () => {
  try {
    const dataUsers = localStorage.getItem("DataUser");
    if (dataUsers) {
      dataUser.value = JSON.parse(dataUsers);
    }
  } catch (error) {
    console.log(error);
  }
};

const handleLogout = () => {
  localStorage.removeItem("userData");
  localStorage.removeItem("DataUser");
  window.location.href = "/";
};

onMounted(() => {
  getDataUsers();
});
</script>
