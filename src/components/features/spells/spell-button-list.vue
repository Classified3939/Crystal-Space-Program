<template>
    <igt-feature :containerClass="'w-1/2 bg-gray-200 dark:bg-gray-700'">
        <h1 class="text-2xl ml-5">Available Spells</h1>
        <br>
        <div v-for="spell in spellListFeature.spellArray" :key="spell.id">
            <spell-button :spellFeature="spell" :walletFeature="walletFeature"></spell-button>
        </div>
    </igt-feature>
</template>





<script>
    import {AllSpells} from "@/my-game/features/spells/AllSpells"
    import {IgtWallet} from "incremental-game-template"
    import SpellButton from "@/components/features/spells/spell-button"
    import IgtFeature from "@/components/util/igt-feature";

    export default{
        name: "spell-button-list",
        components:{IgtFeature,SpellButton},
        props:{
            spellListFeature: {
                type: AllSpells,
                required: true,
            },
            walletFeature: {
                type: IgtWallet,
                required: true,
            },
        }
    }
</script>