<template>
  <div class="flex max-h-screen w-full justify-center items-center ">
    <div
      class="flex flex-col justify-between items-center py-16 px-4 h-full w-full"
    >      
      <h1 class="font-bold text-2xl">Title Here</h1>
      <div class="flex justify-center items-center flex-grow">
        <img src="../assets/images/hero-img.jpg" alt="Hero Image" />
      </div>

      <div class="flex flex-col gap-2 w-full justify-end pb-6">
        <div class="text-center mb-4">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat
          accusantium id voluptate quasi.
        </div>
        <button
          @click="navigateToCamera('form-report')"
          class="bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl px-4 py-2.5 text-lg w-full text-center"
        >
          Get Start
        </button>
      </div>
    </div>
    <BottomNavbar />
  </div>
</template>

<script setup>
import router from "../router";
import BottomNavbar from "../layout/BottomNavbar.vue";
import { formReportStore } from "../store";

const navigationStore = formReportStore();

const navigateToCamera = (route) => {
  navigationStore.setRedirectTo(route);
  router.push({ name: "report" });
};

</script>
