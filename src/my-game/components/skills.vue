<template>
    <igt-feature style="height:45rem; width:20rem;" containerClass="bg-gray-200 dark:bg-gray-700">
        Skills
        <igt-tabs>
            <igt-tab name="Physical" :selected="true">
                <skill-tab skillType="Physical"></skill-tab>
            </igt-tab>
            <igt-tab name="Mental">
                <skill-tab skillType="Mental"></skill-tab>
            </igt-tab>
            <igt-tab name="Combat">
                <skill-tab skillType="Combat"></skill-tab>
            </igt-tab>
        </igt-tabs>
    </igt-feature>
</template>

<script>
import {App} from "@/App.ts";
import IgtFeature from "@/components/util/igt-feature"
import IgtTabs from "@/components/util/igt-tabs";
import SkillTab from "@/my-game/components/skill-tab"
import IgtTab from "@/components/util/igt-tab";

export default{
    name: "skills",
    components: {IgtFeature, SkillTab, IgtTabs, IgtTab},
    data(){
        return{
            skills: App.game.features.skills
        }
    },
}
</script>

<style scoped>
</style>