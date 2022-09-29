<template>
    <igt-feature :containerClass="'flex flex-row w-full bg-gray-200 dark:bg-gray-700'">
        <div class="mx-3" v-for="crystal in crystalListFeature.crystalArray" :key="crystal.saveKey">
            <crystal-progress :percentage="getPercent(crystal)" :filledPath="crystal.fullImageString" :progressPath="crystal.progressImageString" ></crystal-progress>
        </div>
    </igt-feature>
</template>





<script>
    import {AllCrystals} from "@/my-game/features/resources/crystal-resources/AllCrystals"
    import {CrystalResource} from "@/my-game/features/resources/crystal-resources/CrystalResource"
    import CrystalProgress from "@/components/features/crystallizer/crystal-progress"
    import IgtFeature from "@/components/util/igt-feature";

    export default{
        name: "crystallizer-list",
        components:{IgtFeature,CrystalProgress},
        props:{
            crystalListFeature: {
                type: AllCrystals,
                required: true,
            },
        },
        methods:{
            getPercent: function(crystal){
                return crystal.getCurrent() > 0 ? crystal.getCurrent() / crystal.getMax() * 100 : 47;
            }
        }
    }
</script>