import { defineStore } from "pinia";

export const formReportStore = defineStore("formReport", {
  state: () => ({
    capturedImage: null,
    redirectTo: "",
    transactionDetails: {},
    rewardId: null,
  }),

  actions: {
    setCapturedImage(imageData) {
      this.capturedImage = imageData;
    },
    clearCapturedImage() {
      if (this.capturedImage) {
        URL.revokeObjectURL(this.capturedImage);
        this.capturedImage = null;
      }
    },
    setRedirectTo(route) {
      this.redirectTo = route;
    },
    clearRedirectTo() {
      this.redirectTo = "";
    },
    setTransactionDetails(data) {
      this.transactionDetails = data;
    },
    setRewardId(id) {
      this.rewardId = id;
    },
  },
});
