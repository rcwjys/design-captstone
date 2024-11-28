<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Mobile-Friendly Header Section -->
    <div class="py-3 text-center bg-red-600 text-white shadow-md">
      <h1 class="text-3xl font-extrabold sm:text-2xl">Status Report</h1>
      <p class="text-sm sm:text-xs">Laporan terbaru Anda</p>
    </div>

    <!-- Main Content Section -->
    <div class="max-w-5xl mx-auto p-6">
      <ul class="space-y-6">
        <li
          v-for="report in reports"
          :key="report.report_id"
          class="bg-white p-4 rounded-lg shadow-md transform transition-all duration-200 hover:scale-105"
        >
          <!-- Location Section with Icon -->
          <div class="flex items-center mb-2">
            <i class="fas fa-map-marker-alt text-red-600 mr-2"></i>
            <h3 class="text-lg font-semibold text-gray-800">
              Location: {{ report.location_detail }}
            </h3>
          </div>

          <!-- Date Section with Icon -->
          <div class="flex items-center mb-4">
            <i class="fas fa-calendar-alt text-gray-500 mr-2"></i>
            <span class="text-gray-500">{{ formatDate(report.created_at) }}</span>
          </div>

          <!-- View Details Button with Hover Effect -->
          <div class="flex justify-between items-center text-sm mt-4">
            <router-link
              :to="`/report-detail/${report.report_id}`"
              class="text-green-600 hover:underline bg-transparent border-none flex items-center transition-all duration-200 transform hover:scale-110"
            >
              <i class="fas fa-chevron-right mr-2"></i> View Details
            </router-link>
          </div>
        </li>
      </ul>
    </div>

    <BottomNavbar />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getReport } from "../services/reportService/formReportService";
import BottomNavbar from "../layout/BottomNavbar.vue";

const reports = ref([]);
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
  try {
    const response = await getReport();
    reports.value = response;
    console.log(response);
  } catch (error) {
    console.error("Failed to fetch reports:", error);
  }
};

onMounted(() => {
  getReportData();
});
</script>

<style scoped>
/* Add font-awesome link for icons */
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

/* Custom hover effect for links */
.router-link-exact-active {
  color: #16a34a; /* Green color for active link */
}
</style>
