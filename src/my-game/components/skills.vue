<template>
    <igt-feature style="height:20.45rem;padding:0rem;padding-top:1rem;width:105%" containerClass="bg-gray-200 dark:bg-gray-700">
        Skills
        <div class="pl-2 pt-1 grid grid-cols-2 grid-rows-6 border-2" style="width:96%;height:88%">
        <div style="padding-right:.25rem;font-size:1.108rem" class="row-span-1 col-span-1" :key="skill.id" v-for="skill in skills">
            <igt-exp-level :exp-level="skill"></igt-exp-level>
        </div>
    </div>
    </igt-feature>
</template>

<script>
import {App} from "@/App.ts";
import IgtFeature from "@/components/util/igt-feature"
import IgtExpLevel from "@/components/tools/exp-level/igt-exp-level";

export default{
    name: "skills",
    components: {IgtFeature,IgtExpLevel},
    data(){
        return{
            skills: App.game.features.skills.skills.filter(e=>e.type!=="")
        }
    },
}
</script>

<style scoped>
</style>