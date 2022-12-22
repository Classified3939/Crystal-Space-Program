<template>
    <div style="height:6.5rem" class="mt-3 p-4 border-4 shadow-lg hover-highlight flex flex-row items-center" :class="this.btnColor"
         @click="action.toggle()">
      <div class="flex flex-col w-full space-y-1">
        <p class="text-center text-white">{{this.action.description }}</p>
        <span class="text-center text-white"> 
            <span class="fa fa-clock"/> {{this.action.tickDuration * (1/60) | numberFormat }}&nbsp;
            <span class="fas fa-utensils"/> {{this.action.drain}}
        </span>
        <igt-progress-bar v-if="(((this.action.canPerform()) && 
                    (this.action.duration / this.action.skill.reward > 0.1)) && this.action.isStarted)"
            :percentage="progressPercentage"
            :fgClass="this.progressColor"></igt-progress-bar>
        <igt-progress-bar v-else-if="(this.action.duration / this.action.skill.reward > 0.1
                    && (!this.action.isStarted && this.action.canPerform()))"
            :percentage="progressPercentage" :fgClass="this.pauseColor"></igt-progress-bar>
        <igt-progress-bar v-else-if="!(this.action.canPerform())" fgClass="bg-yellow-500" :percentage="100"></igt-progress-bar>
        <igt-progress-bar v-else-if="this.action.isStarted" :percentage="100"></igt-progress-bar>
        <igt-progress-bar v-else :percentage="0"></igt-progress-bar>
      </div>
    </div>
  </template>
  
  <script>
  
  
  import IgtProgressBar from "@/components/util/igt-progress-bar";
  import {SkillActionFeature} from "@/my-game/features/Actions/SkillActionFeature";
  import {TravelAction} from "@/my-game/features/Actions/ActionTypes/TravelAction"
  
  export default {
    name: "csp-action",
    components: {IgtProgressBar},
    props: {
      actionFeature: {
        type: SkillActionFeature,
        required: true,
      },
    },
    computed: {
        action(){
            return this.actionFeature.skillAction;
        },
        progress() {
            return this.action.getProgress();
        },
        progressPercentage() {
            return this.progress.getPercentage();
        },
        btnColor(){
          if (this.action.skill.type === "Combat"){
            return ("bg-red-600 border-red-800");
          }
          else if (this.action instanceof TravelAction){
            return ("bg-blue-500 border-blue-700");
          }
          else if (this.action.skill.type === ""){
            return ("bg-gray-600 border-gray-800")
          }
          else{
            return ("bg-green-500 border-green-700");
          }
        },
        progressColor(){
          if (this.action.skill.type === "Combat"){
            return ("bg-green-500")
          }
          else{
            return ("bg-pink-500")
          }
        },
        pauseColor(){
          if (this.action instanceof TravelAction){
            return ("bg-purple-800")
          }
          else{
            return ("bg-blue-500")
          }
        },
    },
  
  }
  </script>
  
  <style scoped>
  
  </style>