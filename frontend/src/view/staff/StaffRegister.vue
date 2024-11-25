<template>
  <div class="flex justify-center items-center h-screen">
    <div
      class="w-full max-w-sm p-4 bg-[#F5F9FC] border border-gray-200 rounded-lg shadow sm:p-6 md:p-8"
    >
      <div class="flex flex-col gap-2">
        <AlertMessage
          v-for="(msg, index) in errorMessage"
          :key="index"
          :message="msg"
          type="error"
        />
      </div>

      <div class="mb-6">
        <h1 class="font-bold text-4xl">Register</h1>
        <h2 class="text-gray-500 mt-2">
          Please input your username and password
        </h2>
      </div>
      <form @submit.prevent="handleLogin">
        <div class="flex flex-col gap-2 w-full">
          <input
            type="email"
            placeholder="Email"
            v-model="email"
            class="p-4 rounded-full border"
          />
          <input
            type="text"
            placeholder="Username"
            v-model="name"
            class="p-4 rounded-full border"
          />
          <input
            type="password"
            placeholder="Password"
            v-model="password"
            class="p-4 rounded-full border"
          />
        </div>
        <div class="flex justify-center w-full mt-10">
          <Button>Register</Button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Button from "../../components/Button.vue";
import { register } from "../../services/staff/staffServices";
import { useRouter } from "vue-router";

const email = ref("");
const name = ref("");
const password = ref("");
const errorMessage = ref([]);

const router = useRouter();

const handleLogin = async () => {
  const staffData = {
    email: email.value,
    name: name.value,
    password: password.value,
  };
  try {
    await register(staffData);
    console.log("register sukses");
    router.push({ name: "staff-home" });
  } catch (error) {
    console.log(error);
    errorMessage.value = error;
  }
};
</script>
