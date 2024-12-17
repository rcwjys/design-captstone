<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Header -->
    <div
      class="flex justify-between items-center bg-red-600 text-white py-4 px-2 shadow-lg"
    >
      <div>
        <h1 class="text-3xl font-bold">Home Dashboard</h1>
        <p class="text-sm mt-2">
          Welcome back! Here's an overview of your data.
        </p>
      </div>
    </div>
    <!-- Main Content -->
    <main class="px-6 pt-4 pb-16">
      <!-- Statistics Cards -->
      <!-- <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
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
      </section> -->

      <section>
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Recent Reports</h2>
        <div class="bg-white p-6 shadow-md rounded-lg w-full">
          <ul>
            <li
              v-for="report in reports"
              :key="report.report_id"
              class="border-b last:border-0 py-4 flex justify-start items-center"
            >
              <div class="flex flex-col w-full">
                <div class="mb-4 space-y-1">
                  <h3 class="text-gray-800 font-medium">
                    Report ID: {{ report.report_id }}
                  </h3>
                  <h3 class="text-gray-800 font-medium">
                    Reported At: {{ formatDate(report.created_at) }}
                  </h3>
                  <p class="text-gray-600">
                    <strong>Location:</strong> {{ report.location_detail }}
                  </p>
                </div>
                <div class="flex justify-center">
                  <img
                    :src="getEvidenceUrl(report.evidence)"
                    alt="Evidence"
                    class="object-cover rounded-lg border text-center w-full"
                  />
                </div>
                <div class="my-4">
                  <h3 class="text-gray-800 font-medium">
                    Status :
                    <span
                      class="font-medium"
                      :class="{
                        'text-red-500': report.report_status === 'CLOSED',
                        'text-green-500': report.report_status === 'PROCESSED',
                        'text-gray-800':
                          report.report_status !== 'CLOSED' &&
                          report.report_status !== 'PROCESSED',
                      }"
                    >
                      {{ report.report_status }}
                    </span>
                  </h3>
                  <h3 class="text-gray-800 font-medium">
                    Description: {{ report.description }}
                  </h3>
                </div>
                <Button 
                  v-if="report.report_status !== 'CLOSED'"
                @click="handleShowModal(report)">Take Action</Button>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </main>

    <!-- Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4"
    >
      <div class="bg-white rounded-lg p-6 shadow-lg w-full max-w-md">
        <h1 class="text-lg font-bold mb-4">Report Detail</h1>
        <p class="text-gray-700 mb-2">
          <strong>Report ID:</strong> {{ selectedReport.report_id }}
        </p>
        <p class="text-gray-700 mb-2">
          <strong>Description:</strong> {{ selectedReport.description }}
        </p>
        <p class="text-gray-700 mb-2">
          <strong>Location:</strong> {{ selectedReport.location_detail }}
        </p>
        <p class="text-gray-700 mb-2">
          <strong>Reported At:</strong>
          {{ formatDate(selectedReport.created_at) }}
        </p>
        <p class="text-gray-700 mb-6">Are you sure to take this report?</p>
        <div class="space-x-4">
          <button
            @click="closeModal"
            class="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
          >
            No
          </button>
          <button
            @click="handleCreateProgres(selectedReport.report_id)"
            class="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
          >
            Yes
          </button>
        </div>
      </div>
    </div>

    <StaffBottomNavbar />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { createProgres, getReport } from "../../services/staff/staffServices";
import StaffBottomNavbar from "../../layout/StaffBottomNavbar.vue";
import Button from "../../components/Button.vue";

const reports = ref([]);
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const getEvidenceUrl = (evidencePath) => `${BACKEND_URL}${evidencePath}`;

const showModal = ref(false);
const selectedReport = ref({});

const handleShowModal = (report) => {
  selectedReport.value = report;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const getReports = async () => {
  try {
    const response = await getReport();
    console.log(response);
    reports.value = response;
  } catch (error) {
    console.error(error);
  }
};

const handleCreateProgres = async (reportId) => {
  const staffId = localStorage.getItem("staffId");
  const progresData = {
    report_id: reportId,
    staff_id: staffId,
  };

  console.log(progresData);
  try {
    const response = await createProgres(progresData);
    console.log(response);
    closeModal();
  } catch (error) {
    console.log(error);
  }
};

const formatDate = (date) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString(undefined, options);
};

onMounted(() => {
  getReports();
});
</script>
