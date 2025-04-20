<template>
  <div @click="goToHome" class="logo">
    <img src="https://cse40.cse.uom.lk/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcse40-logo.85c5e857.webp&w=828&q=75" alt="" srcset="">
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
    /* top: 5vh; */
    left: 25vw;
}
</style>