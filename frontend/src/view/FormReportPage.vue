<template>
  <div class="flex-col w-full px-6 py-12 min-h-screen">
    <h1 class="font-bold text-lg mb-10">Please Input Your Data Here!</h1>
    <form @submit.prevent="handleSubmitForm" class="max-w-sm mx-auto">
      <div class="mb-5" v-if="capturedImage">
        <label class="block mb-2 text-sm font-medium text-gray-900"
          >Preview Image</label
        >
        <img
          v-if="capturedImage && capturedImage.imageUrl"
          :src="capturedImage.imageUrl"
          alt="Captured Image"
          class="w-full rounded-lg mb-4"
        />
      </div>
      <div class="mb-5" v-if="!capturedImage">
        <label class="block mb-2 text-sm font-medium text-gray-900"
          >Evidence</label
        >
        <input
          type="file"
          accept="image/*"
          id="fileInput"
          @change="handleImageUpload"
          class="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 p-2.5"
        />
      </div>
      <div class="mb-5">
        <label
          for="location_detail"
          class="block mb-2 text-sm font-medium text-gray-900"
          >Location</label
        >
        <input
          type="text"
          id="location_detail"
          v-model="location_detail"
          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
          placeholder="Kantin TULT"
          required
        />
      </div>
      <div class="mb-5">
        <label
          for="description"
          class="block mb-2 text-sm font-medium text-gray-900"
          >Description</label
        >
        <textarea
          id="description"
          v-model="description"
          rows="4"
          class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
          placeholder="Deskripsi penemuan sampah..."
        ></textarea>
      </div>
      <button
        type="submit"
        class="bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl text-lg w-full"
      >
        Submit
      </button>
    </form>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import Joi from "joi";
import { useRoute } from "vue-router";
import { report } from "../services/reportService/formReportService";
import { formReportStore } from "../store";
import router from "../router";

const route = useRoute();
const description = ref("");
const location_detail = ref("");
const evidenceFile = ref(null);

const imageStore = formReportStore();
const capturedImage = computed(() => imageStore.capturedImage);

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    evidenceFile.value = file;

    const reader = new FileReader();
    reader.onload = (e) => {
      capturedImage.value = e.target.result;
    };
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

const handleSubmitForm = async () => {
  const userId = localStorage.getItem("userData");

  const file = capturedImage.value ? capturedImage.value.file : null;
  if (!file) {
    return;
  }

  const formData = {
    evidence: file,
    description: description.value,
    location_detail: location_detail.value,
    user_id: userId,
  };

  try {
    const response = await report(formData);
    console.log(response);
    router.push({ name: "success-report" });
  } catch (error) { 
    console.log(error);
  }
};
</script>

