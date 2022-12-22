<template>
  <igt-feature
    style="width:100%;height:26.8rem;position:relative;top:-4.5rem"
    containerClass="justify-between bg-gray-200 dark:bg-gray-700"
  >
    Actions
    <div class="grid grid-rows-3 grid-cols-2 border-2 p-2 overflow-y-scroll" style="height:93%">

      <div
        v-for="actionFeature in actionList"
        :key="actionFeature.skillAction.description" style="width:100%;height:99%"
      >
        <csp-action :actionFeature="actionFeature"></csp-action>

      </div>
    </div>
  </igt-feature>
</template>

<script>
import { App } from "@/App.ts";
import IgtFeature from "@/components/util/igt-feature";
import CspAction from "@/my-game/components/csp-action";

export default {
  name: "action-list",
  components: { CspAction, IgtFeature },
  data() {
    return {
      actionList: App.game.features.actionList.actions,
    };
  },
};
</script>

<style scoped></style>
