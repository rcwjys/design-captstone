<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Header -->
    <Modal v-if="isModalOpen"
      >Success Take Action. Status update to in progress</Modal
    >
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
      <section
        class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-6 mb-4"
      >
        <div class="bg-white p-6 shadow-md rounded-lg">
          <h2 class="text-gray-600 text-sm font-semibold">Total Reports</h2>
          <p class="text-4xl font-bold text-blue-600 mt-2">
            {{ summary.totalReports }}
          </p>
        </div>
        <div class="bg-white p-6 shadow-md rounded-lg">
          <h2 class="text-gray-600 text-sm font-semibold">Open Actions</h2>
          <p class="text-4xl font-bold text-purple-500 mt-2">
            {{ summary.openReports }}
          </p>
        </div>
        <div class="bg-white p-6 shadow-md rounded-lg">
          <h2 class="text-gray-600 text-sm font-semibold">Prosessed Cases</h2>
          <p class="text-4xl font-bold text-green-500 mt-2">
            {{ summary.processedReports }}
          </p>
        </div>
        <div class="bg-white p-6 shadow-md rounded-lg">
          <h2 class="text-gray-600 text-sm font-semibold">Closed</h2>
          <p class="text-4xl font-bold text-red-600 mt-2">
            {{ summary.closedReports }}
          </p>
        </div>
      </section>

      <div class="flex justify-start mb-6">
        <router-link :to="{ name: 'staff-graphic' }">
          <div class="flex justify-center items-center gap-2 text-blue-500">
            View more statistics
            <span
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                />
              </svg>
            </span>
          </div>
        </router-link>
      </div>

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
                        'text-blue-500': report.report_status === 'OPEN',
                        'text-red-500': report.report_status === 'CLOSED',
                        'text-green-500': report.report_status === 'PROCESSED',
                        'text-gray-800':
                          report.report_status !== 'CLOSED' &&
                          report.report_status !== 'PROCESSED' &&
                          report.report_status !== 'OPEN',
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
                  v-if="
                    report.report_status !== 'CLOSED' &&
                    report.report_status !== 'PROCESSED'
                  "
                  @click="handleShowModal(report)"
                  >Take Action</Button
                >
                <router-link
                  :to="{ name: 'staff-transaction' }"
                  v-if="report.report_status == 'PROCESSED'"
                  class="bg-blue-500 hover:bg-blue-600 text-white py-4 px-4 rounded-md text-center font-semibold"
                >
                  View Transaction
                </router-link>
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
import Modal from "../../components/Modal.vue";

const reports = ref([]);
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const getEvidenceUrl = (evidencePath) => `${BACKEND_URL}${evidencePath}`;

const showModal = ref(false);
const selectedReport = ref({});

const isModalOpen = ref(false);
const summary = ref([]);

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

    const totalReports = response.length;
    const openReports = response.filter(
      (report) => report.report_status === "OPEN"
    ).length;
    const processedReports = response.filter(
      (report) => report.report_status === "PROCESSED"
    ).length;
    const closedReports = response.filter(
      (report) => report.report_status === "CLOSED"
    ).length;

    summary.value = {
      totalReports: totalReports,
      openReports: openReports,
      processedReports: processedReports,
      closedReports: closedReports,
    };
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
    isModalOpen.value = true;
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
