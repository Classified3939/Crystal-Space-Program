<template>
    <button v-if="unlocked" class="btn btn-purple has-tooltip w-5/12" :disabled="!spellFeature.canAfford(walletFeature) || spellFeature.result.isCooldown || !spellFeature.result.canStart()"
        v-on:click="spellFeature.cast(walletFeature)">
        <span class="flex flex-col">
            <span>{{spellFeature.displayName}}</span>
            <span style="white-space: pre-line">{{spellFeature.result.description}}</span>
        </span>
        <div class="tooltip flex flex-col">
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
            unlocked: {default: true},
        }
    }
</script>