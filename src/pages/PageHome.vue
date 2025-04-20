<template>
  <Logo />
  <SplashScreen v-if="!isImageLoaded" @image-loaded="isImageLoaded = true" />
</template>

<script>
import Logo from "../components/Logo.vue"
import SplashScreen from './SplashScreen.vue';

export default {
  name: "PageHome",
  components: {
    SplashScreen,
    Logo,
  },
  data() {
    return {
      isImageLoaded: false,
    };
  }
}
</script>