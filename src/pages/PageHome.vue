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
          // TODO: Change the id and src asset of the model
          // Make sure the model is in the public folder
          // The second parameter is the id of the asset with the # prefix
          // The third parameter is the model data, such as position, scale, rotation, etc.
          // Note only certain properties are supported by AGltfModelData,
          // if you want to add more properties like rotationY(if not implemented)
          // , you can extend the class as required
          new AGltfModelData("duck", "#duck-glb", {
            positionX: 0,
            scale: 0.5,
            positionY: 0,
            // try '*' initially to play any animation clip, if not working,
            // assuming "loop" is a valid animation clip name,
            animationClip: "loop",
            rotationX: 0,
            positionZ: 0,
          }),
        ],
      ],
      // TODO: Change the id and path to the model
      assets: [new AAssetItem("duck-glb", "./models/duck.glb")],
    };
  },
};
</script>
