<template>
  <div class="logo">
    <Logo />
  </div>
  <!-- <SplashScreen v-if="!isImageLoaded" @image-loaded="isImageLoaded = true" /> -->
  <Loading />
</template>

<script>
import Logo from "../components/Logo.vue";
import SplashScreen from "./SplashScreen.vue";
import Loading from "../components/Loading.vue";

export default {
  name: "PageHome",
  components: {
    SplashScreen,
    Logo,
    Loading,
  },
  data() {
    return {
      isImageLoaded: false,
    };
  },
};
</script>

<style scoped>
.logo {
  position: absolute;
  z-index: 9999;
  left: 0;
  width: 100px;
  background-color: var(--theme-bg);
  border: 0px;
  border-radius: 0 0 45px 0;
}
</style>
