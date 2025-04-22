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
        targetSrc: "./targets/targets_.mind",
        filterMinCF: 0.0001,
        filterBeta: 1.0,
        warmupTolerance: 5,
        missTolerance: 5
      },
      modelsInTargets: [
        [
          // First model - Boat
          new AGltfModelData("BoatScene", "#BoatScene-glb", {
            positionX: 1, // Position to the left
            scale: 0.6,
            positionY: 0,
            animationClip: "*",
            rotationX: 0,
            rotationY: 30,
            positionZ: 0,
          }),
          // Second model - Phoenix
          new AGltfModelData("PHOENIX", "#PHOENIX-glb", {
            positionX: 0,
            scale: 0.02,
            positionY: 3,
            animationClip: "*",
            rotationX: 0,
            positionZ: 0,
          }),
        ],
      ],
      assets: [
        new AAssetItem("BoatScene-glb", "./models/BoatSceneOcilate.glb"),
        new AAssetItem("PHOENIX-glb", "./models/PHOENIX.glb")
      ],
    };
  },
};
</script>