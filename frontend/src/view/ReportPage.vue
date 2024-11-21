<template>
  <div class="flex flex-col justify-center items-center h-screen">
    <video
      ref="video"
      autoplay
      playsinline
      webkit-playsinline
      muted
      hidden
    ></video>

    <canvas ref="canvas" class="bg-black w-full min-h-full"></canvas>

    <button class="absolute top-4 left-4" @click="back">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6 text-black"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
        />
      </svg>
    </button>

    <button
      @click="TakePicture"
      class="absolute bottom-10 bg-red-600 border-2 rounded-full flex items-center justify-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-8 h-8 text-white"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
        />
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
        />
      </svg>
    </button>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import router from "../router";
import { formReportStore } from "../store";

const canvas = ref(null);
const video = ref(null);
const ctx = ref(null);

const constraints = ref({
  audio: false,
  video: true,
});

onMounted(async () => {
  if (video.value && canvas.value) {
    ctx.value = canvas.value.getContext("2d");

    await navigator.mediaDevices
      .getUserMedia(constraints.value)
      .then(SetStream)
      .catch((e) => {
        console.error(e);
      });
  }
});

function SetStream(stream) {
  video.value.srcObject = stream;
  video.value.play();

  requestAnimationFrame(Draw);
}

function Draw() {
  if (!video.value || !canvas.value || !ctx.value) {
    return;
  }

  ctx.value.drawImage(
    video.value,
    0,
    0,
    canvas.value.width,
    canvas.value.height
  );

  requestAnimationFrame(Draw);
}

function TakePicture() {
  const canvas = document.querySelector("canvas"); 
  const capturedImage = formReportStore();

  canvas.toBlob((blob) => {
    if (blob) {
      const timestamp = new Date().toISOString().replace(/[:.-]/g, "_");
      const fileName = `capture_${timestamp}.png`;

      const file = new File([blob], fileName, { type: "image/png" });

      const imageUrl = URL.createObjectURL(blob);
      capturedImage.setCapturedImage({ file, fileName, imageUrl });

      // Navigasi ke halaman form-report
      router.push({ name: "form-report" });
    }
  }, "image/png");
}

function back() {
  router.back();
}
</script>

<style>

button {
  width: 70px;
  height: 70px;
}
</style>
