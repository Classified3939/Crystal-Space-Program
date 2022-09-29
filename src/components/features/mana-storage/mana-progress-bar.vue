<template>
    <div style="position:relative; display:grid; grid-template-colums:1fr; grid-template-rows:1fr; margin: 0 auto; width: auto">
        <img width="256" height="256" style="position:relative; grid-row: 1; grid-column: 1; z-index:1;" :src="require(`@/assets/empty-crystal.png`)" alt="mana">
        <img v-if="percentage < 100" width="256" height="256" v-bind:style="styleObject" :src="require(`@/assets/colored-crystal.png`)" alt="mana-progress">
        <img v-else width="256" height="256" v-bind:style="styleObject" :src="require(`@/assets/filled-crystal.png`)" alt="mana-full">
    </div>
  </template>
  
  <script>
  
  export default {
    name: "mana-progress-bar",
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
                gridRow: "1",
                gridColumn: "1",
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