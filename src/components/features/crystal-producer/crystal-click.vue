<template>
  <button class="btn btn-blue"
    @click="crystalProducerFeature.click(crystalProducerFeature.clicker); console.log('test')">
    <span class="flex flex-col">
      <span>{{ crystalProducerFeature.clicker.displayName }}</span>
      <span>Gain {{ crystalProducerFeature.clicker.amount }} {{ crystalProducerFeature.clicker.resource }}</span>
    </span>
  </button>
</template>


<script>
import {RedCrystalProducer} from "@/components/tools/clickers/AbstractClicker"

export default{
  name: "crystal-click",
  props:{
    crystalProducerFeature:{
      type: RedCrystalProducer,
      required: true,
    },
  },
  computed:{
      console: () => console,
      window: () => window,
    },
};

</script>

<style scoped>

</style>