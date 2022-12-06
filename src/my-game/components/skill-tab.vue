<template>
    <div class="m-1">
        <div class="m-1" :key="skill.id" v-for="skill in skills">
            {{skill.name}}
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