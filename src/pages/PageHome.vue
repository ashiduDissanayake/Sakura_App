<template>
  <div class="overlay" v-if="!splashScreen">
    <div class="header">
      <div class="logo">
        <Logo />
      </div>
      <div class="header-text">
        <h3>APRIL 28 | 7.00 PM</h3>
        <h5>At Sumanadasa Courtyard</h5>
      </div>
    </div>
    <div class="flex-1"></div>
    <div class="footer">
      <div>
        In Commemoration of the 40th Anniversary of the Department of Computer
        Science & Engineering
      </div>
    </div>
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

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  display: flex;
  color: var(--theme-bg);
  flex-direction: column;
}

.header {
  display: flex;
}

.header-text {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: flex-end;
  padding: 1rem;
}

.logo {
  background-color: var(--theme-bg);
  border: 0px;
  border-radius: 0 0 45px 0;
  width: 100px;
}

.flex-1 {
  flex: 1;
}
.footer {
  padding: 1.5rem;
  margin-right: 2rem;
  font-size: 0.8rem;
}
</style>

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
  computed: {
    splashScreen() {
      return this.showSplashScreen;
    },
  },
  mounted() {
    const ascene = document.querySelector("a-scene");
    ascene.addEventListener(
      "renderstart",
      function onAframeRenderStart() {
        let haveRun = false;
        return function () {
          if (haveRun) return;
          haveRun = true;
          this.showSplashScreen = false;
        }.bind(this);
      }.call(this)
    );
  },
  data() {
    return {
      showSplashScreen: true,
      mindarImage: {
        targetSrc: "./targets/targets_.mind",
        filterMinCF: 0.0001,
        filterBeta: 0.001,
        warmupTolerance: 5,
        missTolerance: 5,
      },
      modelsInTargets: [
        [
          // First model - Boat
          // new AGltfModelData("BoatScene", "#BoatScene-glb", {
          //   positionX: 0,
          //   scale: 0.5,
          //   positionY: -5,
          //   animationClip: "*",
          //   rotationX: 0,
          //   rotationY: 30,
          //   positionZ: -5,
          // }),

          // Adult Phoenix
          new AGltfModelData("PHOENIX", "#PHOENIX-glb", {
            positionX: 0,
            scale: 0.02,
            positionY: 1.5,
            animationClip: "*",
            rotationX: 0,
            rotationY: -30,
            positionZ: -3,
          }),
          // Baby Phoenix
          new AGltfModelData("BABY_PHOENIX", "#PHOENIX-glb", {
            positionX: 1,
            scale: 0.01,
            positionY: 0.5,
            animationClip: "*",
            rotationX: 0,
            rotationY: 60,
            positionZ: -3.5,
          }),
        ],
      ],
      assets: [
        // new AAssetItem("BoatScene-glb", "./models/BoatSceneOcilate.glb"),
        new AAssetItem("PHOENIX-glb", "./models/PHOENIX.glb"),
      ],
    };
  },
};
</script>
