<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Header -->
    <header class="bg-red-600 text-white py-6 px-4 shadow-lg">
      <h1 class="text-3xl font-bold">Home Dashboard</h1>
      <p class="text-sm mt-2">Welcome back! Here's an overview of your data.</p>
    </header>

    <!-- Main Content -->
    <main class="px-6 py-10">
      <!-- Statistics Cards -->
      <section
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
      >
        <div class="bg-white p-6 shadow-md rounded-lg">
          <h2 class="text-gray-600 text-sm font-semibold">Total Reports</h2>
          <p class="text-4xl font-bold text-blue-600 mt-2">120</p>
          <p class="text-sm text-gray-500">+12 this week</p>
        </div>
        <div class="bg-white p-6 shadow-md rounded-lg">
          <h2 class="text-gray-600 text-sm font-semibold">Pending Actions</h2>
          <p class="text-4xl font-bold text-red-500 mt-2">8</p>
          <p class="text-sm text-gray-500">-3 since yesterday</p>
        </div>
        <div class="bg-white p-6 shadow-md rounded-lg">
          <h2 class="text-gray-600 text-sm font-semibold">Resolved Cases</h2>
          <p class="text-4xl font-bold text-green-500 mt-2">95</p>
          <p class="text-sm text-gray-500">+5 this week</p>
        </div>
        <div class="bg-white p-6 shadow-md rounded-lg">
          <h2 class="text-gray-600 text-sm font-semibold">New Users</h2>
          <p class="text-4xl font-bold text-purple-600 mt-2">20</p>
          <p class="text-sm text-gray-500">+8 today</p>
        </div>
      </section>

      <!-- Activity Overview -->
      <!-- <section class="bg-white p-6 shadow-md rounded-lg mb-10">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">Activity Overview</h2>
          <div class="h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
            <p>Graph Placeholder (e.g., activity chart)</p>
          </div>
        </section> -->

      <!-- Recent Reports -->
      <section>
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Recent Reports</h2>
        <div class="bg-white p-6 shadow-md rounded-lg">
          <ul>
            <li
              v-for="report in reports"
              :key="report.report_id"
              class="border-b last:border-0 py-4 flex justify-between items-center"
            >
              <div>
                <h3 class="text-gray-800 font-medium">
                  {{ report.report_id }}
                </h3>
                <h3 class="text-gray-800 font-medium">
                  {{ report.description }}
                </h3>
                <h3 class="text-gray-800 font-medium">
                  {{ report.evidence }}
                </h3>
                <img
                  :src="getEvidenceUrl(report.evidence)"
                  alt="Evidence Image"
                  class="w-64 h-64 object-cover rounded-lg border"
                />
                <h3 class="text-gray-800 font-medium">
                  {{ report.report_status }}
                </h3>
              </div>
              <button class="text-blue-600 hover:underline text-sm">
                View Details
              </button>
            </li>
          </ul>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getReport } from "../../services/staff/staffServices";

const reports = ref([]);
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const getEvidenceUrl = (evidencePath) => `${BACKEND_URL}${evidencePath}`;

const getReports = async () => {
  try {
    console.log(BACKEND_URL)
    const response = await getReport();
    console.log(response);
    reports.value = response;
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  getReports();
});
</script>

<style></style>
