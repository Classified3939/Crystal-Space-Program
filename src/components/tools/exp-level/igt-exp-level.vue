<template>
  <div>
    <div class="relative pt-0 w-100">
      <div class="flex justify-between">
        <p v-if="expLevel.getLevel() !== expLevel.maxLevel" class="flex">{{expLevel.name}} {{ expLevel.getLevel() }}</p>
        <p v-else class="flex">{{expLevel.name}} X</p>
      </div>
      <igt-progress-bar v-if="expLevel.getLevel() !== expLevel.maxLevel" :percentage="progressPercentage"></igt-progress-bar>
      <igt-progress-bar v-else :percentage=100></igt-progress-bar>
    </div>
  </div>
</template>

<script>
import IgtProgressBar from "@/components/util/igt-progress-bar";
import { IgtExpLevel } from "incremental-game-template";

export default {
  name: "igt-exp-level",
  components: { IgtProgressBar },
  props: {
    expLevel: {
      type: IgtExpLevel,
      required: true,
    },
  },
  computed: {
    progress() {
      return this.expLevel.getLevelProgress();
    },
    progressPercentage() {
      return this.progress.getPercentage();
    },
  },
};
</script>

<style scoped></style>
