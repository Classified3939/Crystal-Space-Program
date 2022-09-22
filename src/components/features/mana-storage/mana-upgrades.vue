<template>
    <igt-feature :containerClass="'w-1/3 bg-gray-200 dark:bg-gray-700'">
        <h1 class="text-2xl ml-10">Upgrades</h1>
        <br>
        <igt-upgrade
            @click.native="mainCrystalFeature.buyUpgrade(realignUpgrade)"
            :upgrade="realignUpgrade"
            :can-buy="mainCrystalFeature.canAfford(realignUpgrade)">
        </igt-upgrade>
    </igt-feature>
</template>

<script>
import IgtFeature from "@/components/util/igt-feature";
import IgtUpgrade from "@/components/tools/upgrades/igt-discrete-upgrade";
import {MainCrystal} from "@/my-game/features/mana-storage/MainCrystal";

export default {
    name: "main-crystal",
    components: {IgtFeature, IgtUpgrade},
    props:{
        mainCrystalFeature: {
            type: MainCrystal,
            required: true
        }
    },
    computed: {
        realignUpgrade(){
            return this.mainCrystalFeature.realignUpgrade;
        }
    }
}
</script>

<style scoped>

</style>