<template>
  <div class="logo" v-if="isImageLoaded">
    <Logo />
  </div>
  <ARScenePage>
    <template #scene>
      <ARScene
        ref="ar-scene"
        :mindarImage="mindarImage"
        :modelsInTargets="modelsInTargets"
        :assets="assets"
        :scanningOverlayId="'scanning-overlay'"
        :loadingOverlayId="'loading-overlay'"
      />
    </template>
  </ARScenePage>
</template>

<script>
import Logo from "../components/Logo.vue";
import { AAssetItem, AGltfModelData } from "../assets/scripts/aframe-helper.js";
import ARScenePage from "./ARScenePage.vue";
import ARScene from "../components/ARScene.vue";

export default {
  name: "PageHome",
  components: {
    ARScenePage,
    ARScene,
    Logo,
  },
  data() {
    return {
      isImageLoaded: false,
      mindarImage: {
        targetSrc: "./targets/targets.mind",
        filterMinCF: 0.00001,
        filterBeta: 0.001,
      },
      modelsInTargets: [
        [
          new AGltfModelData("duck", "#duck-glb", {
            position: { x: 0, y: -0.5, z: -1 },
            scale: { x: 1.5, y: 1.5, z: 1.5 },
            rotation: { x: 0, y: 0, z: 0 },
          }),
        ],
      ],
      assets: [new AAssetItem("duck-glb", "./models/duck.glb")],
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
