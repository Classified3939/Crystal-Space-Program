<template>
    <igt-feature style="height:45rem; width:20rem;" containerClass="justify-between bg-gray-200 dark:bg-gray-700">
        Actions
        <div v-for="actionFeature in actionList" :key="actionFeature.skillAction.description">
            <csp-action :actionFeature="actionFeature"></csp-action>
        </div>
    </igt-feature>
</template>

<script>
import {App} from "@/App.ts";
import IgtFeature from "@/components/util/igt-feature"
import CspAction from "@/my-game/components/csp-action";

export default{
    name: "action-test",
    components: {CspAction, IgtFeature},
    data(){
        return{
            actionList: App.game.features.actionList.actions
        }
    },
}
</script>

<style scoped>
</style>