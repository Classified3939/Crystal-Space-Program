<template>
    <igt-feature :containerClass="'w-1/3 bg-gray-200 dark:bg-gray-700'">
        <csp-progress-bar :percentage="mainCrystalFeature.percentFull">
        </csp-progress-bar>
        <resource-bars>
            <slot></slot>
        </resource-bars>
    </igt-feature>
</template>

<script>
import IgtFeature from "@/components/util/igt-feature";
import CspProgressBar from "@/components/util/csp-progress-bar";
import IgtUpgrade from "@/components/tools/upgrades/igt-discrete-upgrade";
import ResourceBars from "@/components/features/resource-storage/resource-bars"
import {MainCrystal} from "@/my-game/features/mana-storage/MainCrystal";

export default {
    name: "main-crystal",
    components: {IgtFeature, CspProgressBar, ResourceBars},
    props:{
        mainCrystalFeature: {
            type: MainCrystal,
            required: true
        }
    },
}

</script>

<style scoped>

</style>