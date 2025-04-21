<template>
  <ARScenePage>
    <template #scene>
      <ARScene ref="ar-scene" :mindarImage="mindarImage" :modelsInTargets="modelsInTargets" :assets="assets"
        :scanningOverlayId="'scanning-overlay'" :loadingOverlayId="'loading-overlay'" />
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
        targetSrc: "./targets/targets_.mind", // Make sure this file has two targets
        filterMinCF: 0.0001,
        filterBeta: 2000,
      },
      modelsInTargets: [
        [
          // Both models on the first target
          new AGltfModelData("BoatScene", "#BoatScene-glb", {
            positionX: 2.5,
            scale: 0.8,
            positionY: -1.5,
            animationClip: "*",
            rotationX: 0,
            rotationY: 30,
            positionZ: -3,
          }),
          new AGltfModelData("PHOENIX", "#PHOENIX-glb", {
            positionX: 0, // Position to the right of the boat
            scale: 0.01,
            positionY: 2.5, // Position above the boat
            animationClip: "*",
            rotationX: 0,
            positionZ: 0,
          }),
        ],
      ],
      // Add both model assets
      assets: [
        new AAssetItem("BoatScene-glb", "./models/BoatScene.glb"),
        new AAssetItem("PHOENIX-glb", "./models/PHOENIX.glb")
      ],
    };
  },
};
</script>