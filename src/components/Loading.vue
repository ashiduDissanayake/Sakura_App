<template>
  <div :id="loadingOverlayId" class="overlay">
    <div style="padding-inline: 3rem;">
      <img :src="logo" style="width: 100%; max-height: 300px; object-fit: contain;" alt="logo" />
    </div>
    <lottie :animationData="bookAnimation" :loop="true" />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Lottie from "lottie-vuejs"; // Ensure you have a Vue-compatible Lottie library
import scanAnimation from "../assets/lottie/scan.json";
import logo from "../assets/logo-white.png";

export default defineComponent({
  name: "Loading",
  components: {
    Lottie,
  },
  data() {
    return {
      loadingOverlayId: "app-loading-overlay",
      scanAnimation,
      logo,
    };
  },
});
</script>

<style scoped>
#app-loading-overlay {
  background: radial-gradient(100% 100% at 0% 0%, rgba(0, 0, 0, 0.20) 0%, rgba(255, 255, 255, 0.20) 0.01%, rgba(0, 0, 0, 0.00) 100%), #040518;
  z-index: 9999;
}

#app-loading-overlay.hidden {
  display: none !important;
}
</style>