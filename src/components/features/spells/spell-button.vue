<template>
    <button class="btn btn-purple" :disabled="!spellFeature.canAfford(walletFeature)"
        v-on:click="spellFeature.cast(walletFeature)">
        <span class="flex flex-col">
            <span>{{spellFeature.displayName}}</span>
            <span>{{"Level " + spellFeature.level}}</span>
            <span>{{"Costs " + spellFeature.getCost().amount + " " + spellFeature.getCost().type}}</span>
            <span>{{spellFeature.result.description}}</span>
        </span>
    </button>
</template>

<script>
    import {AbstractSpell} from "@/my-game/features/spells/Templates/AbstractSpell"
    import {IgtWallet} from "incremental-game-template"


    export default{
        name: "spell-button",
        props:{
            spellFeature: {
                type: AbstractSpell,
                required: true,
            },
            walletFeature: {
                type: IgtWallet,
                required: true,
            },
        }
    }
</script>