<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="bg-white p-6 rounded-lg shadow-md">
      <h1 class="text-2xl font-bold mb-4">Confirmation</h1>

      <div v-if="capturedImage && capturedImage.imageUrl" class="mb-4">
        <img
          :src="capturedImage.imageUrl"
          alt="Captured Image"
          class="w-full rounded-lg object-cover"
        />
      </div>

      <p class="text-lg mb-4">Are you sure to upload?</p>

      <div class="flex justify-end space-x-2">
        <router-link
          :to="{ name: 'staff-transaction' }"
          class="flex items-center justify-center bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
        >
          Cancel
        </router-link>

        <button
          @click="handleUploadProgres"
          class="flex items-center justify-center bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { formReportStore } from "../../store";
import { updateProgres } from "../../services/staff/staffServices";
import router from "../../router";

const imageStore = formReportStore();
const capturedImage = computed(() => imageStore.capturedImage);

const handleUploadProgres = async () => {
  console.log('e')
  const staffId = localStorage.getItem("staffId");
  const { activity_id, report_id } = imageStore.transactionDetails;
  const file = capturedImage.value ? capturedImage.value.file : null;
  const progresData = {
    staff_id: staffId,
    activity_id: activity_id,
    report_id: report_id,
    trx: file,
  };

  console.log("progres data", progresData);
  try {
    const response = await updateProgres(progresData);
    router.push({ name: "staff-transaction" });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
</script>