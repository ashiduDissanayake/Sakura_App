<template>
  <div class="ar-scene-container">
    <Scanning v-if="!modelsPlaced" />
    
    <a-scene ref="a-scene" 
      :mindar-image="mindArImage()" 
      color-space="sRGB"
      device-orientation-permission-ui="enabled: false" 
      loading-screen="enabled:false;"
      renderer="colorManagement: true; physicallyCorrectLights: true;" 
      vr-mode-ui="enabled: false"
      fog="type: linear; color: #87CEEB; near: 20; far: 100;"
      @loaded="onSceneLoaded">
      
      <!-- Enhanced lighting setup -->
      <a-light type="ambient" :color="ambientLightColor" :intensity="ambientLightIntensity"></a-light>
      <a-light type="directional" position="1 1 1" :intensity="directionalLightIntensity" castShadow="true"></a-light>
      <a-light type="directional" position="-1 1 -1" :intensity="directionalLightIntensity * 0.5" castShadow="true"></a-light>
      <a-light type="point" position="0 5 0" :intensity="pointLightIntensity" distance="10" decay="2"></a-light>

      <!-- Environment with dynamic lighting -->
      <a-entity environment="preset: sunset; lighting: true; shadow: true;"></a-entity>

      <!-- Assets -->
      <a-assets>
        <a-asset-item v-for="asset in assets" :id="asset.id" :src="asset.src"></a-asset-item>
      </a-assets>
      
      <!-- Camera with improved controls -->
      <a-camera position="0 0 0" 
                look-controls="enabled: false"
                cursor="fuse: false; rayOrigin: mouse;"
                raycaster="far: 10000; objects: .clickable">
      </a-camera>
      
      <!-- Image target tracking -->
      <a-entity v-if="!modelsPlaced" 
                mindar-image-target="targetIndex: 0"
                @targetFound="onTargetFound"
                @targetLost="onTargetLost">
        <AModel v-for="(model, index) in modelsInTargets[0]" 
                :key="'target-' + model.id" 
                :ref="'target-' + model.id" 
                :modelData="model"
                class="clickable"
                @model-loaded="onModelLoaded(index)" />
      </a-entity>

      <!-- Fixed models in space with enhanced animations -->
      <a-entity v-if="modelsPlaced && allModelsLoaded" 
                :position="formatPosition"
                :rotation="formatRotation"
                visible
                scale="1"
                @loaded="onFixedEntityLoaded">
        <!-- Adult Phoenix flying animation -->
        <a-entity v-if="isPhoenixModel"
                 animation="property: position; 
                          to: 0 2 0; 
                          dir: alternate; 
                          loop: true; 
                          dur: 3000; 
                          easing: easeInOutSine">
        </a-entity>
        <a-entity v-if="isPhoenixModel"
                 animation="property: rotation; 
                          to: 0 360 0; 
                          loop: true; 
                          dur: 15000; 
                          easing: linear">
        </a-entity>
        <a-entity v-if="isPhoenixModel"
                 animation="property: scale; 
                          to: -1.1 1.1 1.1; 
                          dir: alternate; 
                          loop: true; 
                          dur: 2000; 
                          easing: easeInOutSine">
        </a-entity>

        <!-- Baby Phoenix flying animation -->
        <a-entity v-if="isBabyPhoenixModel"
                 animation="property: position; 
                          to: 0 1 0; 
                          dir: alternate; 
                          loop: true; 
                          dur: 2000; 
                          easing: easeInOutSine">
        </a-entity>
        <a-entity v-if="isBabyPhoenixModel"
                 animation="property: rotation; 
                          to: 0 360 0; 
                          loop: true; 
                          dur: 10000; 
                          easing: linear">
        </a-entity>
        <a-entity v-if="isBabyPhoenixModel"
                 animation="property: scale; 
                          to: -1.05 1.05 1.05; 
                          dir: alternate; 
                          loop: true; 
                          dur: 1500; 
                          easing: easeInOutSine">
        </a-entity>

        <!-- Boat bobbing animation -->
        <a-entity v-if="isBoatModel"
                 animation="property: position; 
                          to: 0 0.2 0; 
                          dir: alternate; 
                          loop: true; 
                          dur: 2000; 
                          easing: easeInOutSine">
        </a-entity>
        <a-entity v-if="isBoatModel"
                 animation="property: rotation; 
                          to: 5 0 5; 
                          dir: alternate; 
                          loop: true; 
                          dur: 3000; 
                          easing: easeInOutSine">
        </a-entity>
        
        <AModel v-for="(model, index) in modelsInTargets[0]" 
                :key="'fixed-' + model.id" 
                :ref="'fixed-' + model.id" 
                :modelData="model"
                :scale="model._scale || 1"
                class="clickable"
                @model-loaded="onModelLoaded(index)"
                @click="onModelClick(model)" />
      </a-entity>
    </a-scene>
  </div>
</template>

<script>
import AModel from "./AModel.vue";
import Scanning from "./Scanning.vue";
import * as THREE from 'three';
import 'aframe-environment-component';

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
      targetFound: false,
      modelsLoaded: 0,
      sceneReady: false,
      targetEntity: null,
      ambientLightLevel: 0,
      ambientLightColor: '#ffffff',
      ambientLightIntensity: 0.6,
      directionalLightIntensity: 0.8,
      pointLightIntensity: 0.5,
      lightUpdateInterval: null,
      isPhoenixModel: false,
      isBabyPhoenixModel: false,
      isBoatModel: false,
      positionBuffer: new THREE.Vector3(),
      rotationBuffer: new THREE.Euler(),
      smoothingFactor: 0.2,
      lastAcceleration: { x: 0, y: 0, z: 0 },
      parallaxFactor: 0.01,
      environmentType: 'unknown',
      featurePoints: [],
      isTrackingFeatures: false
    }
  },
  computed: {
    formatPosition() {
      return `${this.spatialAnchorPosition.x} ${this.spatialAnchorPosition.y} ${this.spatialAnchorPosition.z}`;
    },
    formatRotation() {
      return `${this.spatialAnchorRotation.x} ${this.spatialAnchorRotation.y} ${this.spatialAnchorRotation.z}`;
    },
    totalModels() {
      return this.modelsInTargets[0].length;
    },
    allModelsLoaded() {
      return this.modelsLoaded === this.totalModels;
    }
  },
  methods: {
    onSceneLoaded() {
      this.sceneReady = true;
      this.startLightMonitoring();
    },
    startLightMonitoring() {
      this.lightUpdateInterval = setInterval(() => {
        this.ambientLightLevel = Math.random() * 1000;
        this.updateLighting();
      }, 1000);
    },
    updateLighting() {
      if (this.ambientLightLevel < 100) {
        this.ambientLightIntensity = 0.8;
        this.directionalLightIntensity = 1.0;
        this.pointLightIntensity = 0.7;
        this.ambientLightColor = '#404040';
      } else if (this.ambientLightLevel < 500) {
        this.ambientLightIntensity = 0.6;
        this.directionalLightIntensity = 0.8;
        this.pointLightIntensity = 0.5;
        this.ambientLightColor = '#ffffff';
      } else {
        this.ambientLightIntensity = 0.4;
        this.directionalLightIntensity = 0.6;
        this.pointLightIntensity = 0.3;
        this.ambientLightColor = '#ffffff';
      }
    },
    onModelClick(model) {
      const modelEntity = this.$refs[`fixed-${model.id}`];
      if (modelEntity) {
        modelEntity.setAttribute('animation', {
          property: 'scale',
          to: '1.2 1.2 1.2',
          dur: 200,
          easing: 'easeOutElastic'
        });
      }
    },
    mindArImage() {
      if (!this.modelsPlaced) {
        return `uiLoading: #${this.loadingOverlayId}; 
                uiScanning: #${this.scanningOverlayId};
                imageTargetSrc: ${this.mindarImage.targetSrc};
                maxTrack: 1;
                filterMinCF: ${this.mindarImage.filterMinCF};
                filterBeta: ${this.mindarImage.filterBeta};`;
      }
      return '';
    },
    onTargetFound(event) {
      if (this.modelsPlaced) return;
      
      this.targetFound = true;
      this.targetEntity = event.target;
      
      if (!this.modelsPlaced) {
        this.calculateModelPosition();
      }
    },
    onTargetLost(event) {
      if (this.modelsPlaced) return;
      this.targetFound = false;
    },
    calculateModelPosition() {
      if (!this.targetEntity || !this.targetEntity.object3D) return;

      try {
        const worldPosition = new THREE.Vector3();
        this.targetEntity.object3D.getWorldPosition(worldPosition);
        
        this.positionBuffer.lerp(worldPosition, this.smoothingFactor);
        
        const targetScale = this.targetEntity.object3D.scale;
        const modelOffset = {
          x: 0,
          y: this.isPhoenixModel ? 1.5 : 0,
          z: -Math.max(targetScale.x, targetScale.y) * 2
        };

        this.spatialAnchorPosition = {
          x: this.positionBuffer.x + modelOffset.x,
          y: this.positionBuffer.y + modelOffset.y,
          z: this.positionBuffer.z + modelOffset.z
        };

        const targetRotation = new THREE.Euler();
        targetRotation.setFromRotationMatrix(this.targetEntity.object3D.matrixWorld);
        
        this.rotationBuffer.x = THREE.MathUtils.lerp(
          this.rotationBuffer.x,
          targetRotation.x,
          this.smoothingFactor
        );
        this.rotationBuffer.y = THREE.MathUtils.lerp(
          this.rotationBuffer.y,
          targetRotation.y,
          this.smoothingFactor
        );
        this.rotationBuffer.z = THREE.MathUtils.lerp(
          this.rotationBuffer.z,
          targetRotation.z,
          this.smoothingFactor
        );
        
        this.spatialAnchorRotation = {
          x: THREE.MathUtils.radToDeg(this.rotationBuffer.x),
          y: THREE.MathUtils.radToDeg(this.rotationBuffer.y),
          z: THREE.MathUtils.radToDeg(this.rotationBuffer.z)
        };

        if (this.allModelsLoaded) {
          this.modelsPlaced = true;
          
          this.detectEnvironment();
          
          const scanningOverlay = document.getElementById(this.scanningOverlayId);
          if (scanningOverlay) {
            scanningOverlay.style.display = 'none';
          }

          this.$nextTick(() => {
            const scene = this.$refs['a-scene'];
            if (scene) {
              scene.setAttribute('mindar-image', '');
            }
          });
        }
      } catch (error) {
        console.error('Error calculating model position:', error);
      }
    },
    onModelLoaded(index) {
      this.modelsLoaded++;
      
      const model = this.modelsInTargets[0][index];
      if (model.id.toLowerCase().includes('phoenix')) {
        if (model.id.toLowerCase().includes('baby')) {
          this.isBabyPhoenixModel = true;
        } else {
          this.isPhoenixModel = true;
        }
      } else if (model.id.toLowerCase().includes('boat')) {
        this.isBoatModel = true;
      }
      
      if (this.targetFound && !this.modelsPlaced) {
        this.calculateModelPosition();
      }
    },
    onFixedEntityLoaded(event) {
      // Handle fixed entity loaded event
    },
    initMotionTracking() {
      if (window.DeviceMotionEvent) {
        window.addEventListener('devicemotion', this.handleDeviceMotion);
      }
    },
    handleDeviceMotion(event) {
      if (!this.modelsPlaced) return;
      
      const acceleration = event.accelerationIncludingGravity;
      if (!acceleration) return;

      const deltaX = (acceleration.x - this.lastAcceleration.x) * this.parallaxFactor;
      const deltaY = (acceleration.y - this.lastAcceleration.y) * this.parallaxFactor;

      this.spatialAnchorPosition = {
        x: this.spatialAnchorPosition.x + deltaX,
        y: this.spatialAnchorPosition.y + deltaY,
        z: this.spatialAnchorPosition.z
      };

      this.lastAcceleration = {
        x: acceleration.x,
        y: acceleration.y,
        z: acceleration.z
      };
    },
    detectEnvironment() {
      const avgBrightness = this.ambientLightLevel;
      const lightingVariation = Math.random();
      
      this.environmentType = avgBrightness > 500 ? 'outdoor' : 'indoor';
      this.updateEnvironmentSettings(avgBrightness, lightingVariation);
    },
    updateEnvironmentSettings(brightness, variation) {
      if (this.environmentType === 'outdoor') {
        this.ambientLightIntensity = 0.4;
        this.directionalLightIntensity = 0.8;
        this.pointLightIntensity = 0.3;
        this.ambientLightColor = '#ffffff';
      } else {
        this.ambientLightIntensity = 0.6;
        this.directionalLightIntensity = 0.4;
        this.pointLightIntensity = 0.5;
        this.ambientLightColor = '#404040';
      }
    }
  },
  mounted() {
    this.initMotionTracking();
  },
  beforeUnmount() {
    if (this.lightUpdateInterval) {
      clearInterval(this.lightUpdateInterval);
    }
  }
};
</script>

<style scoped>
.ar-scene-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.clickable {
  cursor: pointer;
  transition: transform 0.2s ease-out;
}

.clickable:hover {
  transform: scale(1.05);
}
</style>
