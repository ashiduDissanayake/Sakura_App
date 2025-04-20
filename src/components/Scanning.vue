<template>
  <div :id="scanningOverlayId" class="overlay">
    <LottieAnimation
      :animation-data="scanAnimation"
      :loop="true"
      :autoplay="true"
      style="width: 300px; height: 300px"
    />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { LottieAnimation } from "lottie-web-vue";
import scanAnimation from "../assets/lottie/scan.json";

export default defineComponent({
  name: "Scanning",
  components: {
    LottieAnimation,
  },
  data() {
    return {
      scanAnimation,
      scanningOverlayId: "scanning-overlay",
    };
  },
});
</script>

<style scoped>
.overlay {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.overlay.hidden {
  display: none !important;
}
</style>
