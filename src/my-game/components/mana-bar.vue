<template>
    <div style="width:100%;height:100%" class="col-span-5 overflow-hidden h-2 mb-4 text-xs flex rounded" :class="bgClass">
      <div :style="{'width' : percentage * 100 + '%'}"
           class="shadow-none flex flex-col text-left text-xl whitespace-nowrap text-white justify-center"
           :class="fgClass">Mana</div>
    </div>
  </template>
  
  <script>
  
  export default {
    name: "mana-bar",
    props: {
      percentage: {
        type: Number,
        default: 100,
      },
      bgClass: {
        type: String,
        default: 'bg-csp-white'
      },
      fgClass: {
        type: String,
        default: 'bg-blue-500'
      },
    },
  }
  </script>
  
  <style scoped>
  
  </style>
  