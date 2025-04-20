<template>
  <div class="gradient"></div>
</template>

<script>
export default {
  name: "SplashScreen",
  data() {
    return {
      isImageLoaded: false,
    };
  },
};
</script>

<style scoped>
.gradient {
  background: var(--bg-gradient);
  height: 100vh;
  position: absolute;
  width: 100vw;
  animation: gradient-animation 10s infinite alternate;
  background-size: 100% 400%;
  top: 0;
  left: 0;
  z-index: 99 !important;
}


@keyframes gradient-animation {
  0% {
    background-position: 100% 10%;
  }

  100% {
    background-position: 100% 90%;
  }

}
</style>
