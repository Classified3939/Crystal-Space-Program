<template>
    <div style="position:relative; display:grid; grid-template-colums:1fr; grid-template-rows:1fr;">
        <img width="256" height="256" style="position:relative; grid-row: 1; grid-column: 1; z-index:0;" :src="require(`@/assets/crystallizer/empty.png`)" alt="crystal">
        <img v-if="percentage < 100" width="256" height="256" v-bind:style="styleObject" :src="require('@/assets/crystallizer/' + progressPath + '.png')" alt="crystal-progress">
        <img class="" v-else width="256" height="256" v-bind:style="styleObject" :src="require('@/assets/crystallizer/' + filledPath + '.png')" alt="crystal-full">
        <br>
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
      crystalName:{
        type: String,
        required: true
      }
    },
    computed: {
        styleObject: function(){
            return{
                position: "relative",
                zIndex: "2",
                gridRow: "1",
                gridColumn: "1",
                clipPath: "inset("+this.getClipPath(this.percentage)+"% 0% 0%)",
            };            
        }
    },
    methods:{
      getClipPath: function(percent){
        if (percent == 100){return 0;}
        else{
          return 55.75-((this.percentage)*0.5575)+8.7 ;
        }
      }
    }
  }
  </script>
  
  <style scoped>
  
  </style>