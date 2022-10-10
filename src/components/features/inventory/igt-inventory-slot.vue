<template>
  <div class="w-16 h-16 lg:w-20 lg:h-20 b-2 bg-gray-500 m-2 p-2 border-gray-300 border-4 text-white text-sm lg:text-md"
       draggable="true"
       @dragstart="startDrag($event,index)"
       @drop="onDrop($event, index)"
       @dragover.prevent
       @dragenter.prevent>
    <div v-if="!inventorySlot.isEmpty()">
      <div class="flex flex-col">
        <div v-if="!this.hasIcon">{{ inventorySlot.item.name }}</div>
        <img v-else width="100%" height="100%" draggable="false" style="position:relative" :src="require(`@/assets/`+inventorySlot.item.iconPath)" :alt="inventorySlot.item.name">
        <div class="relative -top-2 lg:-top-3 text-center z-10">{{ inventorySlot.amount }} / {{ inventorySlot.item.maxStack }}</div>
      </div>
    </div>
  </div>
</template>

<script>

import {InventorySlot} from "incremental-game-template";

export default {
  name: "igt-inventory-slot",

  props: {
    inventorySlot: {
      type: InventorySlot,
      required: true,
    },
    isSelected: {
      type: Boolean,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  computed: {
    canDrag() {
      return !this.inventorySlot.isEmpty();
    },
    hasIcon(){
      return this.inventorySlot.item.hasIcon !== undefined
    }
  },
  methods: {
    startDrag(evt, index) {
      if (!this.canDrag) {
        evt.preventDefault();
        return;
      }
      evt.dataTransfer.dropEffect = 'move'
      evt.dataTransfer.effectAllowed = 'move'
      evt.dataTransfer.setData('index', index);
    },
    onDrop(evt, indexTo) {
      const indexFrom = parseInt(evt.dataTransfer.getData('index'));
      this.$emit('interact', {'from': indexFrom, 'to': indexTo})
    }
  },

}
</script>

<style scoped>

</style>
