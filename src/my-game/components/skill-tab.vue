<template>
    <div class="pl-0 grid grid-cols-2 grid-rows-2" style="width:100%">
        <div class="row-span-1 col-span-1" :key="skill.id" v-for="skill in skills">
            <igt-exp-level :exp-level="skill"></igt-exp-level>
        </div>
    </div>
</template>

<script>
import {App} from "@/App.ts";
import IgtExpLevel from "@/components/tools/exp-level/igt-exp-level";

export default{
    name: "skill-tab",
    components: {IgtExpLevel},
    props:{
        skillType:{
            type: String,
            required: true,
        },
    },
    data(){
        return{
            skills: App.game.features.skills.getSkillsOfType(this.skillType),
        }
    },
}
</script>

<style scoped>
</style>