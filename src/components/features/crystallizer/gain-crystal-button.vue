<template>
    <button style="!margin:0" class="btn btn-purple has-tooltip w-full h-24" :disabled="!spellFeature.result.isHolding && (!spellFeature.canAfford(walletFeature) || spellFeature.result.isCooldown || !spellFeature.result.canStart())"
        v-on:click="spellFeature.cast(walletFeature)">
        <span class="flex flex-col">
            <span class="text-center">{{spellFeature.displayName}}</span>
            <span class="text-center">{{spellFeature.result.getDescription()}}</span>
        </span>
        <div v-if="!spellFeature.result.isHolding" class="tooltip flex flex-col">
            <span>{{"Level " + spellFeature.level}}</span>
            <br>
            <span>{{"Costs " + spellFeature.getCost().amount + " " + spellFeature.getCost().type}}</span>
            <br>
            <span v-if="!spellFeature.result.isCooldown">{{"Cooldown "+spellFeature.result.goal + " seconds"}}</span>
            <span v-else>{{spellFeature.result.getTimeLeft()+" seconds"}}</span>
        </div>
    </button>
</template>

<script>
    import {GainCrystalSpell} from "@/my-game/features/spells/GainCrystalSpell"
    import {IgtWallet} from "incremental-game-template"


    export default{
        name: "gain-crystal-button",
        props:{
            spellFeature: {
                type: GainCrystalSpell,
                required: true,
            },
            walletFeature: {
                type: IgtWallet,
                required: true,
            },
        }
    }
</script>