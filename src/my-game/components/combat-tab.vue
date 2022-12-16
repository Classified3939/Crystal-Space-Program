<template>
    <igt-feature>
        Combat
        <igt-feature style="width:100%;height:6rem;" class="grid grid-cols-20 grid-rows-20">
            <pre class="row-span-1 col-span-1">Enemy: Infrared-infused Cave Rat Lv5 Health:22/25</pre>

            <div style="height:14rem" class="grid grid-rows-2 grid-cols-3 col-span-19 row-span-20">

                <div class="row-span-1 col-span-1"
                    v-for="actionFeature in actionList"
                    :key="actionFeature.skillAction.description">
                    <csp-action :actionFeature="actionFeature"></csp-action>
                </div>
                <div class="row-span-1 col-span-1"
                    v-for="actionFeature in actionList"
                    :key="actionFeature.skillAction.description">
                    <csp-action :actionFeature="actionFeature"></csp-action>
                </div>
                <div class="row-span-1 col-span-1"
                    v-for="actionFeature in actionList"
                    :key="actionFeature.skillAction.description">
                    <csp-action :actionFeature="actionFeature"></csp-action>
                </div>
            </div>
        </igt-feature>
    </igt-feature>
</template>

<script>
import {App} from "@/App.ts";
import IgtFeature from "@/components/util/igt-feature";
import CspAction from "@/my-game/components/csp-action";

export default{
    name: "combat-tab",
    components: {IgtFeature, CspAction},
    data() {
        return {
        actionList: App.game.features.actionList.actions,
        };
    },
}
</script>

<style scoped>
</style>