<template>
  <div class="min-h-screen bg-gray-100 p-4">
    <div class="flex items-center">
      <router-link
        :to="{ name: 'staff-home' }"
        class="bg-red-600 text-white rounded-lg hover:bg-red-700 mr-3 p-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
      </router-link>
    </div>
    <div class="flex flex-col items-center gap-10">
      <h2 class="text-2xl font-semibold">Reports Chart</h2>
      <div class="bg-white rounded-xl p-4 w-full">
        <h2 class="text-md font-semibold">Location Chart</h2>
        <apexchart
          :key="lineChartsOptions.xaxis.categories.join('-')"
          type="bar"
          :options="lineChartsOptions"
          :series="series"
        ></apexchart>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getReport } from "../../services/staff/staffServices";

const lineChartsOptions = ref({
  chart: {
    type: "bar",
    height: 350,
  },
  xaxis: {
    categories: [],
  },
});

const series = ref([]);

const getLocations = async () => {
  try {
    const response = await getReport();
    console.log("Full API response:", response);

    const locationCounts = response.reduce((acc, item) => {
      acc[item.location_detail] = (acc[item.location_detail] || 0) + 1;
      return acc;
    }, {});
    console.log("Location counts:", locationCounts);

    lineChartsOptions.value.xaxis.categories = Object.keys(locationCounts);
    series.value = [
      {
        name: "Reports",
        data: Object.values(locationCounts),
      },
    ];
  } catch (error) {
    console.error("Error fetching locations:", error);
  }
};

onMounted(() => {
  getLocations();
});
</script>
