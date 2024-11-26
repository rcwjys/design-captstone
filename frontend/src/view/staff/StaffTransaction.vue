<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Header -->
    <div
      class="flex justify-between items-center bg-red-600 text-white py-4 px-2 shadow-lg"
    >
      <div>
        <h1 class="text-3xl font-bold">Transaction</h1>
      </div>
    </div>

    <!-- Main Content -->
    <main class="px-6 py-10">
      <section>
        <h2 class="text-xl font-semibold text-gray-800 mb-4">
          Progress Reports
        </h2>
        <!-- Table for Large Screens -->
        <div class="hidden md:block bg-white p-6 shadow-md rounded-lg">
          <table class="table-auto w-full text-left border-collapse">
            <thead>
              <tr class="bg-gray-100 border-b">
                <th class="py-3 px-4 font-medium text-gray-600">Activity ID</th>
                <th class="py-3 px-4 font-medium text-gray-600">Staff</th>
                <th class="py-3 px-4 font-medium text-gray-600">Report ID</th>
                <th class="py-3 px-4 font-medium text-gray-600">Issued By</th>
                <th class="py-3 px-4 font-medium text-gray-600">
                  Report Status
                </th>
                <th class="py-3 px-4 font-medium text-gray-600">Created At</th>
                <th class="py-3 px-4 font-medium text-gray-600">Evidence</th>
                <th class="py-3 px-4 font-medium text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="progres in progress"
                :key="progres.activity_id"
                class="border-b hover:bg-gray-50"
              >
                <td class="py-3 px-4 text-gray-800">
                  {{ progres.activity_id }}
                </td>
                <td class="py-3 px-4 text-gray-800">
                  {{ progres.staff.name }} ({{ progres.staff.staff_id }})
                </td>
                <td class="py-3 px-4 text-gray-800">
                  {{ progres.report.report_id }}
                </td>
                <td class="py-3 px-4 text-gray-800">
                  {{ progres.report.issued_by.name }} ({{
                    progres.report.issued_by.user_id
                  }})
                </td>
                <td
                  class="py-3 px-4 text-gray-800"
                  :class="{
                    'text-green-500':
                      progres.report.report_status === 'PROCESSED',
                    'text-red-500':
                      progres.report.report_status !== 'PROCESSED',
                  }"
                >
                  {{ progres.report.report_status }}
                </td>
                <td class="py-3 px-4 text-gray-800">
                  {{ new Date(progres.created_at).toLocaleString() }}
                </td>
                <td class="py-3 px-4 text-gray-800">
                  <div v-if="progres.evidence">
                    <img :src="adjustedEvidenceUrl(progres.evidence)" alt="" />
                  </div>
                  <span v-else class="text-gray-500 italic">No Evidence</span>
                </td>
                <td class="py-3 px-4 text-gray-800">
                  <button
                    @click="navigateToCamera(
                      'staff-confirmation',
                      progres.activity_id,
                      progres.report.report_id
                    )"
                    class="bg-red-600 hover:bg-ref-700 text-white font-medium rounded-xl px-4 py-2.5 text-lg text-center"
                  >
                    Take Evidence
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Card Layout for Mobile -->
        <div class="md:hidden space-y-6">
          <div
            v-for="progres in progress"
            :key="progres.activity_id"
            class="bg-white p-4 rounded-lg shadow-md"
          >
            <div class="mb-4">
              <h3 class="text-lg font-semibold text-gray-800">
                Activity ID: {{ progres.activity_id }}
              </h3>
              <p class="text-sm text-gray-600">
                Staff: {{ progres.staff.name }} ({{ progres.staff.staff_id }})
              </p>
              <p class="text-sm text-gray-600">
                Report ID: {{ progres.report.report_id }}
              </p>
              <p class="text-sm text-gray-600">
                Issued By: {{ progres.report.issued_by.name }} ({{
                  progres.report.issued_by.user_id
                }})
              </p>
            </div>
            <div>
              <p class="text-sm font-semibold text-gray-600">
                Report Status:
                <span
                  :class="{
                    'text-green-500':
                      progres.report.report_status === 'PROCESSED',
                    'text-red-500':
                      progres.report.report_status !== 'PROCESSED',
                  }"
                >
                  {{ progres.report.report_status }}
                </span>
              </p>
              <p class="text-sm text-gray-600">
                Created At:
                {{ new Date(progres.created_at).toLocaleString() }}
              </p>
            </div>
            <div class="my-4">
              <div v-if="progres.evidence">
                <img
                  :src="adjustedEvidenceUrl(progres.evidence)"
                  alt=""
                  class="w-full h-40 object-cover rounded-md"
                />
              </div>
              <span v-else class="text-gray-500 italic">No Evidence</span>
            </div>
            <div>
              <button
                @click="navigateToCamera(
                  'staff-confirmation',
                  progres.activity_id,
                  progres.report.report_id
                )"
                class="w-full bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg px-4 py-2"
              >
                Take Evidence
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>

    <StaffBottomNavbar />
  </div>
</template>


<script setup>
import { onMounted, ref } from "vue";
import { getProgres } from "../../services/staff/staffServices";
import router from "../../router";
import { formReportStore } from "../../store";
import StaffNavbar from "../../layout/StaffNavbar.vue";
import StaffBottomNavbar from "../../layout/StaffBottomNavbar.vue";

const progress = ref([]);

const navigationStore = formReportStore();
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const navigateToCamera = (route, activity_id, report_id) => {
  navigationStore.setRedirectTo(route);
  navigationStore.setTransactionDetails({ activity_id, report_id });
  console.log("r", route);
  console.log("a", activity_id, report_id);
  router.push({ name: "report" });
};

const adjustedEvidenceUrl = (evidence) => {
  return `${backendUrl}${evidence.replace("/trx/", "/report-evidence/")}`;
};

const getProgresData = async () => {
  try {
    const response = await getProgres();
    console.log(response);
    progress.value = response;
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  getProgresData();
});
</script>
