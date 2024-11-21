import { defineStore } from "pinia";

export const formReportStore = defineStore("formReport", {
  state: () => ({
    capturedImage: null,
  }),

  actions: {
    setCapturedImage(imageData) {
      this.capturedImage = imageData;
    },
    clearCapturedImage() {
      // Membersihkan URL blob
      if (this.capturedImage) {
        URL.revokeObjectURL(this.capturedImage);
        this.capturedImage = null;
      }
    },
  },
});
