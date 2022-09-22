<template>
    <div style="position:relative" class="pl-0 mr-0 h-2/5">
        <img width="256" height="256" style="position:relative; z-index:1" :src="require(`@/assets/empty-crystal.png`)" alt="mana">
        <img v-if="percentage < 100" width="256" height="256" v-bind:style="styleObject" :src="require(`@/assets/colored-crystal.png`)" alt="mana">
        <img v-else width="256" height="256" v-bind:style="styleObject" :src="require(`@/assets/filled-crystal.png`)" alt="mana">
    </div>
  </template>
  
  <script>
  
  export default {
    name: "csp-progress-bar",
    props: {
      percentage: {
        type: Number,
        required: true,
      },
    },
    computed: {
        styleObject: function(){
            return{
                position: "relative",
                zIndex: "2",
                top: "-256px",
                left: "0px",
                clipPath: "inset("+(100-this.percentage)+"% 0% 0%)",
                marginRight: "auto"
            };            
        }
    }
  }
  </script>
  
  <style scoped>
  
  </style>