<template>
  <div
    class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4"
  >
    <div
      class="w-full max-w-4xl p-8 bg-white rounded-lg shadow-xl transform transition-all duration-300 hover:scale-105"
    >
      <h1 class="text-4xl font-bold text-center text-gray-800 mb-6">
        Report Detail
      </h1>

      <!-- Report Container -->
      <div class="space-y-8">
        <!-- Description -->
        <div class="mb-6">
          <span class="font-semibold text-gray-800 text-lg">Description:</span>
          <p class="text-gray-700 mt-2 text-sm leading-relaxed">
            {{ report.description }}
          </p>
        </div>
        <!-- Location -->
        <div class="mb-6">
          <span class="font-semibold text-gray-800 text-lg">Location:</span>
          <p class="text-gray-700 mt-2 text-sm leading-relaxed">
            {{ report.location_detail }}
          </p>
        </div>

        <div v-for="progres in report.process" :key="progres.activity_id">
          <div class="mb-6">
            <span class="font-semibold text-gray-800 text-lg"
              >Finished at:</span
            >
            <p class="text-gray-700 mt-2 text-sm leading-relaxed">
              {{ formatDate(progres.finished_at) }}
            </p>
          </div>

          <div class="mb-6">
            <span class="font-semibold text-gray-800 text-lg"
              >Finished by:</span
            >
            <p class="text-gray-700 mt-2 text-sm leading-relaxed">
              {{ progres.staff.name }}
            </p>
          </div>

          <div v-if="progres.evidence" class="mb-6">
            <img
              :src="`${backendUrl}${progres.evidence}`"
              alt="Evidence"
              class="w-full h-auto rounded-lg shadow-md hover:shadow-xl object-cover transform transition-all duration-300"
            />
          </div>
        </div>

        <!-- Action Button -->
        <div class="text-center mt-6">
          <router-link
            :to="`/status`"
            class="px-8 py-3 text-white bg-red-600 hover:bg-red-700 rounded-full transition-all duration-300 transform hover:scale-110"
          >
            Back to Reports
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getReportById } from "../services/reportService/formReportService";
import { useRoute } from "vue-router";

const route = useRoute();
const report = ref([]);
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const formatDate = (date) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(date).toLocaleDateString("id-ID", options);
};

const getReportData = async () => {
  const reportId = route.params.reportId;
  try {
    const response = await getReportById(reportId);
    console.log(response);
    report.value = response;
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  console.log("tes");
  getReportData();
});
</script>

<style scoped>
/* Hover effect for action button */
.router-link-exact-active {
  color: #e11d48; /* Red color for active link */
}

/* Adding some transition for the image hover effect */
img:hover {
  transform: scale(1.05);
  transition: transform 0.3s ease-in-out;
}

@media (min-width: 768px) {
  .text-xl {
    font-size: 1.25rem;
  }
}

/* Adding some soft shadow to the report card */
.shadow-xl {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
}
</style>
