<template>
  <div @click="goToHome" class="logo">
    <img src="../assets/images/logo.webp" alt="" srcset="" />
  </div>
</template>

<script>
export default {
  name: "Logo",
  methods: {
    goToHome() {
      window.location = "/";
    },
  },
};
</script>
<style scoped>
.logo img {
  width: 100%;
  height: auto;
  max-width: 200px;
  cursor: pointer;
  transition: transform 0.3s ease;
}
</style>
