<template>
  <div :id="loadingOverlayId" class="overlay">
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
  name: "Loading",
  components: {
    LottieAnimation,
  },
  data() {
    return {
      scanAnimation,
      loadingOverlayId: "loading-overlay",
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
</style>
