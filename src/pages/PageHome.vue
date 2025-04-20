<template>
  <Logo />
  <!-- <SplashScreen v-if="!isImageLoaded" @image-loaded="isImageLoaded = true" /> -->
  <Loading/>
</template>

<script>
import Logo from "../components/Logo.vue"
import SplashScreen from './SplashScreen.vue';
import Loading from "../components/Loading.vue";

export default {
  name: "PageHome",
  components: {
    SplashScreen,
    Logo,
    Loading
  },
  data() {
    return {
      isImageLoaded: false,
    };
  }
}
</script>