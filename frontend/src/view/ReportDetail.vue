<template>
  <div class="min-h-screen">
    <div class="p-4">
      <h1 class="text-3xl font-bold mb-4">Report Detail</h1>
      <div class="border">
        <h2 class="text-lg font-semibold mb-2">Report ID: {{ report.report_id }}</h2>
        <p class="text-gray-600 mb-2">Description: {{ report.description }}</p>
        <img :src="`${backendUrl}${report.evidence}`" alt="" />
        <p class="text-gray-600 mb-2">
          Report Status: {{ report.report_status }}
        </p>
        <p class="text-gray-600 mb-2">
          Created At: {{ formatDate(report.created_at) }}
        </p>
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
  getReportData();
});
</script>

<style></style>
