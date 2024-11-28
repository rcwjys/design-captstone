<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center">
    <div class="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-300">
      <h1 class="text-3xl font-bold text-center mb-6 text-gray-800">Report Detail</h1>

      <!-- Report Container -->
      <div class="space-y-6">
        <!-- Report ID -->
        <div class="flex items-center justify-between border-b pb-4">
          <h2 class="text-lg font-semibold text-gray-800">Report ID: <span class="text-blue-600">{{ report.report_id }}</span></h2>
        </div>

        <!-- Description -->
        <div class="mb-4">
          <span class="font-semibold text-gray-800">Description:</span>
          <p class="text-gray-700 mt-2">{{ report.description }}</p>
        </div>

        <!-- Evidence Image (Only if available) -->
        <div v-if="report.evidence" class="mb-6">
          <img :src="`${backendUrl}${report.evidence}`" alt="Evidence" class="w-full h-auto rounded-lg shadow-md object-cover">
        </div>

        <!-- Status -->
        <div class="mb-4">
          <span class="font-semibold text-gray-800">Report Status : </span>
          <span
            :class="{
              'text-green-600 font-bold': report.report_status === 'OPEN',
              'text-red-600 font-bold': report.report_status !== 'OPEN'
            }"
            class="text-lg"
          >
            {{ report.report_status }}
          </span>
        </div>

        <!-- Date Created -->
        <div class="mb-6">
          <span class="font-semibold text-gray-800">Created At:</span>
          <p class="text-gray-700 mt-2">{{ formatDate(report.created_at) }}</p>
        </div>

        <!-- Action Button -->
        <div class="text-center mt-6">
          <router-link
            :to="`/status`"
            class="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-200 transform hover:scale-105"
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
    report.value = response;
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  getReportData();
});
</script>

<style scoped>
/* Add font-awesome link for icons */
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

/* Hover effect for action button */
.router-link-exact-active {
  color: #2563eb; /* Blue color for active link */
}

@media (min-width: 768px) {
  .text-lg {
    font-size: 1.125rem;
  }
}
</style>
