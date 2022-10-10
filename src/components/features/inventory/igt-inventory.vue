<template>
  <igt-feature :containerClass="'bg-gray-200 dark:bg-gray-700 max-w-sm h-80'">
    <div class="flex flex-row flex-wrap w-1/3 justify-start">
      Inventory
    </div>

    <div class="flex flex-row flex-wrap w-full justify-start h-full overflow-y-scroll">
      <div v-for="(slot, index) in slots" :key="index + '-' + slot.item.id">
        <igt-inventory-slot :inventorySlot="slot"
                            :is-selected="index === selectedIndex"
                            :index="index"
                            @interact="interact"
                            @click.native="selectItem(index)"
        ></igt-inventory-slot>
      </div>
    </div>
  </igt-feature>
</template>

<script>
import IgtFeature from "@/components/util/igt-feature";
import IgtInventorySlot from "@/components/features/inventory/igt-inventory-slot";
import {Inventory} from "@/my-game/features/inventory/Inventory";

export default {
  name: "igt-inventory",
  components: {
    IgtInventorySlot,
    IgtFeature
  },
  props: {
    inventoryFeature: {
      type: Inventory,
      required: true,
    },
  },
  data() {
    return {
      selectedIndex: -1,
    }
  },
  computed: {
    slots() {
      return this.inventoryFeature.slots;
    },
    selectedSlot() {
      return this.slots[this.selectedIndex];
    },
    showHighlight() {
      return this.selectedSlot && !this.selectedSlot.isEmpty();
    }
  },

  methods: {
    interact(data) {
      this.inventoryFeature.interactIndices(data.from, data.to)
      this.selectedIndex = data.to
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
