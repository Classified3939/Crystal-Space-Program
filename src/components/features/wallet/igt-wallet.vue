<template>
  <igt-feature>
    <p>I have {{redCrystal | numberFormat}} Red Crystals</p>
  </igt-feature>
</template>

<script>
import IgtFeature from "@/components/util/igt-feature";
import {IgtWallet} from "incremental-game-template";
import {CurrencyType} from "@/my-game/features/wallet/CurrencyType"

export default {
  name: "igt-wallet",
  components: {IgtFeature},
  props: {
    walletFeature: {
      type: IgtWallet,
      required: true
    },
  },
  computed: {
    redCrystal(){
      return this.walletFeature.getAmount(CurrencyType.redCrystal);
    }
  }
}
</script>

<style scoped>

</style>
