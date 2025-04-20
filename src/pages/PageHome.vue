<template>
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
      mindarImage: {
        targetSrc: "./targets/targets.mind",
        filterMinCF: 0.00001,
        filterBeta: 0.001,
      },
      modelsInTargets: [
        [
          new AGltfModelData("duck", "#duck-glb", {
          }),
        ],
      ],
      assets: [new AAssetItem("duck-glb", "./models/duck.glb")],
    };
  },
};
</script>
