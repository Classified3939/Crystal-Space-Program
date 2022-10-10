<template>
    <igt-inventory-slot
        v-if="!this.singleSlotInventory.slots[0].isEmpty()"
        :inventorySlot="singleSlotInventory.slots[0]"
        :index="0"
        @itemClick="itemClick"
        >
    </igt-inventory-slot>
</template>

<script>
import IgtInventorySlot from "@/components/features/inventory/igt-inventory-slot";

import {InventorySlot} from "incremental-game-template";
import {Inventory} from "@/my-game/features/inventory/Inventory";


export default {
  name: "held-stack",
  components: {
    IgtInventorySlot
  },
  props: {
    singleSlotInventory: {
      type: Inventory,
      required: true,
    },
    mainInventoryFeature:{
        type: Inventory,
        required: true,
    },
    isItemHeld:{
        type: Boolean,
        default: false,
    },
  },
  methods: {
    itemClick(data) {
      if (this.singleSlotInventory.slots[0].isEmpty()){
        console.warn(this.singleSlotInventory.slots[0].isEmpty())
        this.mainInventoryFeature.swapBetweenInventories(0,data.from, this.singleSlotInventory)
      }
    },
    consumeItem(data) {
      this.inventoryFeature.consumeItem(this.selectedIndex, data.amount)
    },
    dropStack() {
      this.inventoryFeature.dropStack(this.selectedIndex)
    },
    selectItem(index) {
      this.selectedIndex = index;
    },
  },
}

</script>

<style scoped>

</style>