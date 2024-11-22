<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6"
  >
    <div class="w-full max-w-md mb-2">
      <img
        src="../assets/images/success-form.png"
        alt="Success Hero"
        class="w-full h-auto"
      />
    </div>

    <h1 class="text-2xl font-bold text-gray-800 text-center mb-4">
      Laporan Berhasil Dibuat
    </h1>
    <p class="text-gray-600 text-center mb-6">
      Terima kasih telah melaporkan! Kami akan segera menindaklanjuti laporan
      Anda.
    </p>

    <Button @click="navigateToStatus"> Lihat Status Laporan </Button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import Button from "./Button.vue";

const router = useRouter();

const navigateToStatus = () => {
  router.push({ name: "status" });
};
</script>

<style>
/* Tambahkan styling opsional */
</style>
