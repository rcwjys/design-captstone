<template>
  <div class="flex flex-col w-full px-6 py-12 min-h-screen bg-white">
    <!-- Form Title -->
    <h1 class="font-bold text-3xl mb-8 text-center text-gray-800 tracking-wide">
      Input Your Data Here
    </h1>

    <!-- Form Container -->
    <form
      @submit.prevent="handleSubmitForm"
      class="bg-white shadow-lg rounded-xl p-6 max-w-lg mx-auto space-y-6 transform transition-transform duration-300 hover:shadow-2xl"
    >
      <!-- Preview Image -->
      <div v-if="capturedImage">
        <div class="block text-sm font-medium text-gray-700 mb-2">
          Preview Image
        </div>
        <img
          :src="capturedImage.imageUrl"
          alt="Captured"
          class="w-80 h-48 object-cover rounded-lg border border-gray-300"
        />
      </div>

      <!-- Image Upload -->
      <div v-else>
        <div class="block text-sm font-medium text-gray-700 mb-2">
          Upload Evidence
        </div>
        <div
          class="border border-dashed border-gray-400 rounded-lg p-6 text-center hover:border-red-500 transition duration-200"
        >
          <input
            type="file"
            accept="image/*"
            id="fileInput"
            @change="handleImageUpload"
            class="hidden"
          />
          <label
            for="fileInput"
            class="text-sm font-medium text-red-600 cursor-pointer hover:text-red-800"
          >
            Click here to upload your evidence
          </label>
        </div>
      </div>

      <!-- Location Field -->
      <div>
        <label
          for="location_detail"
          class="block text-sm font-medium text-gray-700 mb-2"
        >
          Location
        </label>
        <select
          type="text"
          id="location_detail"
          v-model="location_detail"
          class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-red-300 focus:outline-none transition-transform duration-200 transform hover:scale-105"
          placeholder="Enter the location (e.g., Kantin TULT)"
          required
        >
          <option value="" disabled>Select a location</option>
          <option
            v-for="(location, index) in locations"
            :key="index"
            :value="location"
          >
            {{ location }}
          </option>
          <option value="Lainnya">Lainnya</option>
        </select>

        <div v-if="location_detail === 'Lainnya'" class="mt-4">
          <input
            type="text"
            v-model="customLocation"
            placeholder="Enter custom location"
            class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-red-300 focus:outline-none transition-transform duration-200 transform hover:scale-105"
            required
          />
        </div>
      </div>

      <!-- Description Field -->
      <div>
        <label
          for="description"
          class="block text-sm font-medium text-gray-700 mb-2"
        >
          Description
        </label>
        <textarea
          id="description"
          v-model="description"
          rows="4"
          class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-red-300 focus:outline-none transition-transform duration-200 transform hover:scale-105"
          placeholder="Describe the issue or situation here..."
        ></textarea>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        class="w-full py-3 bg-red-500 text-white text-lg font-bold rounded-lg shadow-lg hover:bg-red-600 focus:ring focus:ring-red-300 transition-transform duration-300 transform hover:translate-y-1"
      >
        Submit Data
      </button>
    </form>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { report } from "../services/reportService/formReportService";
import { formReportStore } from "../store";
import router from "../router";

const route = useRoute();
const description = ref("");
const location_detail = ref("");
const imageStore = formReportStore();
const capturedImage = computed(() => imageStore.capturedImage);

const locations = ref([
  "Kantin TULT",
  "Gedung A",
  "Gedung B",
  "Lapangan Utama",
  "Toilet Umum",
]);
const customLocation = ref("");

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imageStore.setCapturedImage({
        file,
        imageUrl: e.target.result,
      });
    };
    reader.readAsDataURL(file);
  }
};

const handleSubmitForm = async () => {
  const userId = localStorage.getItem("userData");
  const file = capturedImage.value?.file;

  if (!file) {
    alert("Please upload an image before submitting.");
    return;
  }

  const finalLocation =
    location_detail.value === "Lainnya"
      ? customLocation.value
      : location_detail.value;

  console.log("Final Location:", finalLocation);

  const formData = {
    evidence: file,
    description: description.value,
    location_detail: finalLocation,
    user_id: userId,
  };

  try {
    await report(formData);
    router.push({ name: "success-report" });
  } catch (error) {
    console.error(error);
    alert("An error occurred while submitting your data.");
  }
};
</script>
