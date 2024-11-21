<template>
    <div
      v-if="visible"
      :class="alertClass"
      class="px-2 py-1 rounded relative flex justify-center text-center"
    >
      {{ message }}
    </div>
  </template>
  
  <script setup>
  import { computed, ref } from "vue";
  
  const props = defineProps({
    message: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "success",
    },
  });
  
  const visible = ref(true);
  
  const alertClass = computed(() => {
    if (props.type === "success") {
      return "bg-green-300 border border-green-400 text-green-700";
    } else if (props.type === "error") {
      return "bg-red-300 border border-red-400 text-red-700";
    }
    return "";
  });
  </script>
  