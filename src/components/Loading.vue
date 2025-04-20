<template>
  <div :id="loadingOverlayId" class="overlay">
    <div style="padding-inline: 3rem">
      <img
        :src="logo"
        style="width: 100%; max-height: 300px; object-fit: contain"
        alt="logo"
      />
    </div>
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
import logo from "../assets/images/sakura-petal1.png";

export default defineComponent({
  name: "Loading",
  components: {
    LottieAnimation,
  },
  data() {
    return {
      lottieOptions: {
        
      },
      logo,
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
  background-color: var(--theme-bg);
}
</style>
