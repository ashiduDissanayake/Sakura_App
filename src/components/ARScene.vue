<template>
  <Scanning />
  <a-scene ref="a-scene" :mindar-image="mindArImage()" color-space="sRGB"
    device-orientation-permission-ui="enabled: false" loading-screen="enabled:false;"
    renderer="colorManagement: true; physicallyCorrectLights: true;" vr-mode-ui="enabled: false">
    <!-- Enhanced lighting setup -->
    <a-light type="ambient" color="#ffffff" intensity="0.6"></a-light>
    <a-light type="directional" position="1 1 1" intensity="0.8" castShadow="true"></a-light>
    <a-light type="directional" position="-1 1 -1" intensity="0.4" castShadow="true"></a-light>
    <a-light type="point" position="0 5 0" intensity="0.5" distance="10" decay="2"></a-light>

    <!-- Environment and fog for realism -->
    <a-entity environment="preset: sunset; lighting: true; shadow: true;"></a-entity>
    <a-entity fog="type: linear; color: #87CEEB; near: 10; far: 50;"></a-entity>

    <a-assets>
      <a-asset-item v-for="asset in assets" :id="asset.id" :src="asset.src"></a-asset-item>
    </a-assets>
    <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>
    
    <!-- Image target with enhanced model rendering -->
    <a-entity mindar-image-target="targetIndex: 0">
      <AModel v-for="model in modelsInTargets[0]" :key="model.id" :ref="model.id" :modelData="model" />
    </a-entity>

    <!-- Spatial anchors for models with enhanced visibility -->
    <a-entity v-if="modelsPlaced" 
              :position="spatialAnchorPosition" 
              :rotation="spatialAnchorRotation"
              :visible="true"
              :scale="1"
              :animation="'property: rotation; to: 0 360 0; dur: 10000; loop: true; easing: linear'">
      <AModel v-for="model in modelsInTargets[0]" 
              :key="model.id" 
              :ref="model.id" 
              :modelData="model"
              :animation="'property: rotation; to: 0 360 0; dur: 10000; loop: true; easing: linear'" />
    </a-entity>
  </a-scene>
</template>

<script>
import AModel from "./AModel.vue";
import Scanning from "./Scanning.vue";

export default {
  name: "ARScene",
  components: {
    Scanning,
    AModel,
  },
  props: {
    scanningOverlayId: {
      type: String,
      default: "scanning-overlay",
    },
    loadingOverlayId: {
      type: String,
      default: "loading-overlay",
    },
    assets: {
      type: Array,
      required: true,
    },
    modelsInTargets: {
      type: Array,
      required: true,
    },
    mindarImage: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      modelsPlaced: false,
      spatialAnchorPosition: { x: 0, y: 0, z: 0 },
      spatialAnchorRotation: { x: 0, y: 0, z: 0 },
      targetVisible: false
    }
  },
  methods: {
    mindArImage() {
      return `uiLoading: #${this.loadingOverlayId}; 
              uiScanning: #${this.scanningOverlayId};
              imageTargetSrc: ${this.mindarImage.targetSrc};
              maxTrack: 1;
              filterMinCF: ${this.mindarImage.filterMinCF};
              filterBeta: ${this.mindarImage.filterBeta};`;
    },
    getNumberOfTargets() {
      return this.modelsInTargets.length;
    },
    onTargetFound(event) {
      if (!this.modelsPlaced) {
        const targetEntity = event.target;
        this.spatialAnchorPosition = targetEntity.object3D.position;
        this.spatialAnchorRotation = targetEntity.object3D.rotation;
        this.modelsPlaced = true;
      }
      this.targetVisible = true;
    },
    onTargetLost() {
      this.targetVisible = false;
    }
  },
  mounted() {
    const scene = this.$refs['a-scene'];
    scene.addEventListener('targetFound', this.onTargetFound);
    scene.addEventListener('targetLost', this.onTargetLost);
  },
  beforeDestroy() {
    const scene = this.$refs['a-scene'];
    scene.removeEventListener('targetFound', this.onTargetFound);
    scene.removeEventListener('targetLost', this.onTargetLost);
  }
};
</script>

<style>
.a-entity {
  will-change: transform;
}
</style>
