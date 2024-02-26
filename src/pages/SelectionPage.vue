<template>
    <div class="selection-page">
        <!-- <h2 class="selection-header">Select the Model</h2> -->
        <div class="selection-buttons zoom-in-animation">
            <LanternsLink/>
        </div>
    </div>
</template>

<script>
import LanternsLink from "../components/LanternsLink.vue";
import MihintaleLink from "../components/MihintaleLink.vue";

export default {
  components: {MihintaleLink, LanternsLink},
  data () {
        return {}
    },
    mounted() {
        const image = new Image();
        image.src = "/mavisuru-poster.png";
    },
}
</script>

<style scoped>
    @keyframes zoom-in {
        0%, 100% {
            transform: scale(0.85);
        }
        50% {
            transform: scale(0.9);
        }
    }

    .zoom-in-animation {
    animation: zoom-in 2s ease-in-out infinite;
    }
    .selection-page {
        background: var(--bg-gradient);
        height: 95vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .selection-header {
        text-align: center;
        margin-top: 3rem;
    }
 
    .selection-buttons {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin: auto 1rem;
        height: 50%;
    }

</style>