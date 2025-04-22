<script>
/**
 * ARScenePage Component
 *
 * This component is responsible for rendering an AR scene page with a splash screen.
 * It uses the `SplashScreen` component to display a loading screen until the AR scene is fully rendered.
 *
 * Component Details:
 * - **Name**: ARScenePage
 * - **Components**:
 *   - `SplashScreen`: A child component used to display a splash/loading screen.
 *
 * Data:
 * - `showSplashScreen` (Boolean): Controls the visibility of the splash screen.
 *   - Default: `true`
 *
 * Computed Properties:
 * - `splashScreen`: Returns the current value of `showSplashScreen`.
 *
 * Lifecycle Hooks:
 * - `mounted`: Executes when the component is mounted to the DOM.
 *   - Queries the `<a-scene>` element from the DOM.
 *   - Adds an event listener to the `renderstart` event of the `<a-scene>` element.
 *     - When the `renderstart` event is triggered:
 *       - Logs "RENDER START" to the console.
 *       - Sets `showSplashScreen` to `false` to hide the splash screen.
 *       - Ensures the event handler runs only once using a `haveRun` flag.
 *
 * Notes:
 * - The `renderstart` event is specific to A-Frame (a WebXR framework) and is triggered when the rendering process starts.
 * - The `bind(this)` ensures that the event listener has the correct `this` context to modify the `showSplashScreen` property.
 */
import SplashScreen from "./SplashScreen.vue";
import Logo from "../components/Logo.vue";

export default {
  name: "ARScenePage",
  components: {
    SplashScreen,
    Logo,
  },
  data() {
    return {
      showSplashScreen: true,
    };
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
};
</script>

<template>
  <SplashScreen v-if="splashScreen" />
  <!--    slot-->
  <slot name="scene"></slot>
</template>
