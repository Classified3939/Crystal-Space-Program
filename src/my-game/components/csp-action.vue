<template>
    <div class="mt-3 p-4 bg-green-500 w-72 h-24 border-green-700 border-4 shadow-lg hover-highlight flex flex-row items-center"
         @click="action.toggle()">
      <div class="flex flex-col w-full space-y-1">
        <p class="text-center text-white">{{this.action.description }}</p>
        <span class="text-center text-white"> 
            <span class="fa fa-clock"/> {{this.action.duration / this.action.skill.reward | numberFormat }}&nbsp;
            <span class="fas fa-arrow-alt-circle-up"/> {{this.action.duration | numberFormat}}&nbsp;
            <span class="fas fa-utensils"/> {{this.action.drain}}
        </span>
        <igt-progress-bar v-if="(((this.action.currentProgress <= this.action.duration) && 
                    (this.action.duration / this.action.skill.reward > 0.1)) && this.action.isStarted)"
            :percentage="progressPercentage"></igt-progress-bar>
        <igt-progress-bar v-else-if="(this.action.duration / this.action.skill.reward > 0.1
                    || !this.action.isStarted)"
            :percentage="progressPercentage" fgClass="bg-blue-500"></igt-progress-bar>
        <igt-progress-bar v-else-if="this.action.isStarted" :percentage="100"></igt-progress-bar>
        <igt-progress-bar v-else :percentage="0"></igt-progress-bar>
      </div>
    </div>
  </template>
  
  <script>
  
  
  import IgtProgressBar from "@/components/util/igt-progress-bar";
  import {SkillActionFeature} from "@/my-game/features/Actions/SkillActionFeature";
  
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
    },
  
  }
  </script>
  
  <style scoped>
  
  </style>