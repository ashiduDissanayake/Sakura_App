<template>
  <component :is="devicePage" />
</template>

<script>
import { store } from './store';
import Router from './router.vue';

export default {
  name: 'App',
  components: {
    Router
  },
  data() {
    return {
      devicePage: Router,
    };
  },
  mounted() {
    this.checkDevice();
    window.addEventListener('resize', this.checkDevice);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkDevice);
  },
  methods: {
    checkDevice() {
      const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      const isMobile = screenWidth < 768; // Adjust the breakpoint according to your design
      if (!isMobile) {
        store.disableAr();
      }
    },
  },
};
</script>
