<template>
  <button v-if="!upgrade.isMaxLevel()" class="btn btn-blue " :disabled="!canBuy">
    <span class="flex flex-col">
      <span style='white-space: pre-line'>{{ upgrade.displayName }}</span>
      <span>Lvl. {{ upgrade.level }} / {{ upgrade.maxLevel }}</span>
      <igt-currency :textFirst="true" :show-image="false" :currency="upgrade.getCost()"></igt-currency>
    </span>
  </button>
</template>

<script>
import IgtCurrency from "@/components/features/wallet/igt-currency";
import {IgtAbstractUpgrade} from "incremental-game-template";

export default {
  name: "igt-upgrade",
  components: {IgtCurrency},
  props: {
    upgrade: {
      type: IgtAbstractUpgrade,
      required: true,
    },
    canBuy: {
      type: Boolean,
      required: true,
    }
  },

}
</script>

<style scoped>

</style>
