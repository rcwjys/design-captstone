<template>
  <div class="flex flex-col justify-center p-6 gap-10 h-screen">
    <div class="flex flex-col gap-2">
      <AlertMessage
        v-for="(msg, index) in errorMessage"
        :key="index"
        :message="msg"
        type="error"
      />
    </div>

    <div>
      <h1 class="font-bold text-4xl">Hello!</h1>
      <h2 class="text-gray-500 mt-2">
        Please input your username and password
      </h2>
    </div>
    <form @submit.prevent="handleLogin">
      <div class="flex flex-col gap-2 w-full">
        <input
          type="text"
          placeholder="Username"
          v-model="username"
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
        <Button>Login</Button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Joi from "joi";
import { login } from "../services/authService/signupService";
import AlertMessage from "../components/AlertMessage.vue";
import router from "../router";
import Button from "../components/Button.vue";

const username = ref("");
const password = ref("");
const visible = ref(false);
const errorMessage = ref([]);

const handleLogin = async () => {
  const userData = {
    username: username.value,
    password: password.value,
  };

  const schema = Joi.object({
    username: Joi.string().alphanum().required().messages({
      "string.empty": "Username is not allowed to be empty",
      "string.username": "Email must be a valid email address",
    }),
    password: Joi.string().required().messages({
      "string.empty": "Password is not allowed to be empty",
    }),
  });

  const { error } = schema.validate(userData, { abortEarly: false });

  if (error) {
    errorMessage.value = error.details.map((detail) =>
      detail.message.replace(/['"]/g, "")
    );
    console.log(errorMessage.value);
    visible.value = true;
    return;
  }

  try {
    await login(userData);

    router.push({ name: "home" });
  } catch (error) {
    errorMessage.value = ["Username or password is incorrect"];
    console.log("eror", error);
  }
};
</script>
