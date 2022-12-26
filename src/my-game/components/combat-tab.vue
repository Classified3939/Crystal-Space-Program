<template>
    <igt-feature style="left:1%;position:relative">
        Combat
        <igt-feature style="width:99%;border-width:2px;" class="grid grid-cols-20 grid-rows-20">
            <pre class="text-2xl">Enemy: Infrared-infused Cave Rat Lv5</pre>
            <igt-progress-bar class="mb-0" style="grid-row-start:0;grid-column-start:1;" :percentage=".53" ></igt-progress-bar>

            <div style="height:12.5rem" class="grid grid-rows-2 grid-cols-3 col-span-19 row-span-20">

                <div v-if="actionList" class="row-span-1 col-span-1">
                    <csp-action :actionFeature="actionList[0]"></csp-action>
                </div>
                <div v-if="actionList" class="row-span-1 col-span-1">
                    <csp-action :actionFeature="actionList[2]"></csp-action>
                </div>
                <div v-if="actionList" class="row-span-1 col-span-1">
                    <csp-action :actionFeature="actionList[4]"></csp-action>
                </div>
                <div v-if="actionList" class="row-span-1 col-span-1">
                    <csp-action :actionFeature="actionList[1]"></csp-action>
                </div>
                <div v-if="actionList" class="row-span-1 col-span-1">
                    <csp-action :actionFeature="actionList[3]"></csp-action>
                </div>
                <div v-if="actionList" class="row-span-1 col-span-1">
                    <csp-action :actionFeature="actionList[5]"></csp-action>
                </div>
            </div>
        </igt-feature>
    </igt-feature>
</template>

<script>
import {App} from "@/App.ts";
import IgtFeature from "@/components/util/igt-feature";
import CspAction from "@/my-game/components/csp-action";
import IgtProgressBar from "@/components/util/igt-progress-bar"

export default{
    name: "combat-tab",
    components: {IgtFeature, CspAction, IgtProgressBar},
    data() {
        return {
        actionList: App.game.features.combatActions.actions,
        };
    },
}
</script>

<style scoped>
</style>