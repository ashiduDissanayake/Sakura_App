<template>
  <div class="gradient" id="loading-overlay">
    <div class="logo">
      <img src="../assets/images/logo.webp" alt="" srcset="" />
    </div>
  </div>
</template>

<script>
export default {
  name: "SplashScreen",
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
  display: flex;
  justify-content: center;
  align-items: center;
}

@keyframes gradient-animation {
  0% {
    background-position: 100% 10%;
  }

  100% {
    background-position: 100% 90%;
  }
}

.logo img {
  width: 400px;
  height: auto;
  object-fit: contain;
}

@media screen and (max-width: 768px) {
  .logo img {
    width: 80vw;
  }
  
}
</style>
