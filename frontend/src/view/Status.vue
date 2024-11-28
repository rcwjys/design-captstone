<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-gradient-to-r from-red-600 to-pink-500 text-white py-8 text-center shadow-lg rounded-b-lg">
      <h1 class="text-4xl font-extrabold">Status Report</h1>
      <p class="text-lg">Laporan terbaru Anda</p>
    </div>

    <!-- Main Content -->
    <div class="max-w-6xl mx-auto p-6">
      <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <li
          v-for="report in reports"
          :key="report.report_id"
          class="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col justify-between"
        >
          <h3 class="text-xl font-semibold text-gray-800 mb-3">
            Location: {{ report.location_detail }}
          </h3>
          <span class="text-gray-500 text-sm">{{ formatDate(report.created_at) }}</span>

          <!-- Evidence Image -->
          <div v-if="report.evidence" class="my-4">
            <img
              :src="`${backendUrl}${report.evidence}`"
              alt="Evidence"
              class="w-full h-40 object-cover rounded-lg"
            />
          </div>

          <p class="text-sm text-gray-700 mb-4">
            {{ report.description }}
          </p>

          <!-- Status and View Details -->
          <div class="flex justify-between items-center text-sm">
            <span
              :class="{
                'text-green-600 font-semibold': report.report_status === 'OPEN',
                'text-red-600 font-semibold': report.report_status !== 'OPEN',
              }"
              class="inline-flex items-center gap-2"
            >
              <span
                v-if="report.report_status === 'OPEN'"
                class="w-3 h-3 bg-green-600 rounded-full"
              ></span>
              <span
                v-else
                class="w-3 h-3 bg-red-600 rounded-full"
              ></span>
              {{ report.report_status }}
            </span>

            <div>
              <router-link
                :to="`/report-detail/${report.report_id}`"
                class="text-blue-600 hover:underline"
              >
                View Details
              </router-link>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <!-- Bottom Navbar -->
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
    console.error(error);
  }
};

onMounted(() => {
  getReportData();
});
</script>

<style scoped>
/* Hover effects for the report cards */
li:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Subtle gradient for the header */
.bg-gradient-to-r {
  background: linear-gradient(45deg, #ff6f61, #ff466f);
}

/* Text styles */
h1 {
  font-family: 'Poppins', sans-serif;
  font-weight: 800;
}

p {
  font-family: 'Roboto', sans-serif;
}

/* Responsive layout tweaks */
@media (max-width: 640px) {
  h1 {
    font-size: 2xl;
  }
}
</style>
