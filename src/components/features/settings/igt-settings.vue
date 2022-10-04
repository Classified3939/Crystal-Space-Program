<template>
  <igt-feature :containerClass="'bg-gray-200 dark:bg-gray-700 w-full'">
    <br>
    <button class="btn btn-red" @click="resetSave">Reset Save</button>
    <button class="btn btn-green" @click="manualSave">Manual Save</button>
  </igt-feature>
</template>

<script>
import IgtFeature from "@/components/util/igt-feature";
import {IgtSettings} from "incremental-game-template";
import {App} from "@/App";

export default {
  name: "igt-settings",
  components: {IgtFeature},
  props: {
    settingsFeature: {
      type: IgtSettings,
      required: true,
    },
  },
  methods: {
    resetSave() {
      const confirmed = confirm("Are you sure you want to delete your save? This will not give you any rewards");
      if (!confirmed) {
        return;
      }
      App.game.deleteSave();
      location.reload();
    },
    manualSave(){
      App.game.save();
    }
  },
}
</script>

<style scoped>

</style>
