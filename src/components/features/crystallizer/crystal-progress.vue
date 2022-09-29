<template>
    <div style="position:relative; display:grid; grid-template-colums:1fr; grid-template-rows:1fr; margin: 0 auto; width: auto">
        <img width="256" height="256" style="position:relative; grid-row: 1; grid-column: 1; z-index:0;" :src="require(`@/assets/crystallizer/0.png`)" alt="crystal">
        <img v-if="percentage < 100" width="256" height="256" v-bind:style="styleObject" :src="require('@/assets/crystallizer/' + progressPath + '.png')" alt="crystal-progress">
        <img v-else width="256" height="256" v-bind:style="styleObject" :src="require('@/assets/crystallizer/' + filledPath + '.png')" alt="crystal-full">
    </div>
  </template>
  
  <script>
  
  export default {
    name: "crystal-progress",
    props: {
      percentage: {
        type: Number,
        required: true,
      },
      progressPath:{
        type: String,
        required: true,
      },
      filledPath:{
        type: String,
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
                clipPath: "inset("+(54.2-((this.percentage)*0.542)+8.73)+"% 0% 0%)",
                marginRight: "auto"
            };            
        }
    }
  }
  </script>
  
  <style scoped>
  
  </style>