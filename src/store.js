import { reactive } from "vue";

export const store = reactive({
  isAreEnabled: true,
  disableAr(){
    this.isAreEnabled = false;
  }
});
