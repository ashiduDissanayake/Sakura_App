<template>
  <div @click="goToHome" class="logo">
    <img src="/mavisuru-logo.png" alt="logo">
  </div>
</template>
<script>
export default {
  name: 'Logo',
  methods:{
    goToHome(){
      window.location = "/";
    },
  }
}
</script>
<style scoped>
.logo img {
    width: 50vw;
    position: absolute;
    z-index: 999;
    top: 5vh;
    left: 25vw;
}
</style>