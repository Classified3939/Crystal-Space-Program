<template>
    <igt-feature :containerClass="'w-1/4 bg-gray-200 dark:bg-gray-700'">
        <mana-progress-bar :percentage="mainCrystalFeature.percentFull">
        </mana-progress-bar>
        <resource-bars>
            <slot></slot>
        </resource-bars>
    </igt-feature>
</template>

<script>
import IgtFeature from "@/components/util/igt-feature";
import ManaProgressBar from "@/components/features/mana-storage/mana-progress-bar";
import IgtUpgrade from "@/components/tools/upgrades/igt-discrete-upgrade";
import ResourceBars from "@/components/features/resource-storage/resource-bars"
import {MainCrystal} from "@/my-game/features/mana-storage/MainCrystal";

export default {
    name: "main-crystal",
    components: {IgtFeature, ManaProgressBar, ResourceBars},
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