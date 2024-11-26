<template>
  <div>
    <h1>confirmation update</h1>
    <img
      v-if="capturedImage && capturedImage.imageUrl"
      :src="capturedImage.imageUrl"
      alt="Captured Image"
      class="w-full rounded-lg mb-4"
    />
    <div>
      <h1>Are you sure to upload?</h1>
      <button @click="handleUpload">Yes</button>
      <button>No</button>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { formReportStore } from "../../store";
import { updateProgres } from "../../services/staff/staffServices";

const imageStore = formReportStore();
const capturedImage = computed(() => imageStore.capturedImage);

const handleUpload = async () => {
  const staffId = localStorage.getItem("staffId");
  const {activity_id , report_id } = imageStore.transactionDetails
  const file = capturedImage.value ? capturedImage.value.file : null;
  console.log('file c',file);
  const progresData = {
    staff_id: staffId,
    activity_id: activity_id,
    report_id: report_id,
    trx : file
  };
  console.log('progres data',progresData);
  try {
    const response = await updateProgres(progresData);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
</script>

<style></style>
