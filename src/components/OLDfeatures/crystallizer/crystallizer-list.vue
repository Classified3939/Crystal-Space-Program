<template>
    <igt-feature :containerClass="'flex flex-row w-full bg-gray-200 dark:bg-gray-700'">
        <div class="mx-1 w-1/5" v-for="(crystal, index) in crystalListFeature.crystalArray" :key="crystal.saveKey">
            <crystal-progress
            :percentage="getPercent(spellListFeature.crystalSpellArray[index])" :filledPath="crystal.fullImageString" 
            :progressPath="crystal.progressImageString" :crystalName="crystal.resourceType">
            </crystal-progress>
            <gain-crystal-button :spellFeature="spellListFeature.crystalSpellArray[index]" :walletFeature="walletFeature"></gain-crystal-button>
            <div class="w-full text-center">Amount: {{crystal.getCurrent() | numberFormat}}/{{crystal.getMax() | numberFormat}}</div>
        </div>
    </igt-feature>
</template>





<script>
    import {IgtWallet} from "incremental-game-template"
    import {AllCrystals} from "@/my-game/features/resources/crystal-resources/AllCrystals"
    import {CrystalResource} from "@/my-game/features/resources/crystal-resources/CrystalResource"
    import {AllSpells} from "@/my-game/features/spells/AllSpells"
    import CrystalProgress from "@/components/features/crystallizer/crystal-progress"
    import GainCrystalButton from "@/components/features/crystallizer/gain-crystal-button"
    import IgtFeature from "@/components/util/igt-feature"

    export default{
        name: "crystallizer-list",
        components:{IgtFeature,CrystalProgress, GainCrystalButton},
        props:{
            crystalListFeature: {
                type: AllCrystals,
                required: true,
            },
            spellListFeature: {
                type: AllSpells,
                required: true,
            },
            walletFeature:{
                type: IgtWallet,
                required: true,
            },
        },
        methods:{
            getPercent: function(crystal){
                return 100 - (crystal.result.getTimeLeft() / crystal.result.goal * 100)
            }
        }
    }
</script>