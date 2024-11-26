<template>
  <div class="min-h-screen bg-gray-50">
    <div class="bg-red-600 text-white py-6 text-center shadow">
      <h1 class="text-3xl font-bold">Status Report</h1>
      <p class="text-sm">Laporan terbaru Anda</p>
    </div>

    <div class="max-w-5xl mx-auto p-6">
      <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <li
          v-for="report in reports"
          :key="report.report_id"
          class="bg-white rounded-lg shadow p-4 flex flex-col justify-between"
        >
          <h3 class="text-lg font-semibold text-gray-800 mb-2">
            Location: {{ report.location_detail }}
          </h3>
          <span class="text-gray-500">{{ formatDate(report.created_at) }}</span>

          <div v-if="report.evidence" class="mb-4">
            <img
              :src="`${backendUrl}${report.evidence}`"
              alt="Evidence"
              class="w-full h-40 object-cover rounded"
            />
          </div>

          <p class="text-sm text-gray-600 mb-4">
            {{ report.description }}
          </p>

          <div class="flex justify-between items-center text-sm">
            <span
              :class="{
                'text-green-600 font-bold': report.report_status === 'OPEN',
                'text-red-600 font-bold': report.report_status !== 'OPEN',
              }"
            >
              {{ report.report_status }}
            </span>
            <div>
              <router-link
                :to="`/report-detail/${report.report_id}`"
                class="text-green-600"
                >View Details
              </router-link>
            </div>
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
  } catch (error) {}
};

onMounted(() => {
  getReportData();
});
</script>