<template>
    <igt-feature :containerClass="'w-1/3 bg-gray-200 dark:bg-gray-700'">
        <h1 class="text-2xl ml-10">Upgrades</h1>
        <br>
        <igt-upgrade
            @click.native="manaResourceFeature.buyUpgrade(realignUpgrade)"
            :upgrade="realignUpgrade"
            :can-buy="manaResourceFeature.canAfford(realignUpgrade)">
        </igt-upgrade>
        <igt-upgrade
            @click.native="knowledgeResourceFeature.buyUpgrade(crystallizerUpgrade)"
            :upgrade="crystallizerUpgrade"
            :can-buy="knowledgeResourceFeature.canAfford(crystallizerUpgrade)">
        </igt-upgrade>
    </igt-feature>
</template>

<script>
import IgtFeature from "@/components/util/igt-feature";
import IgtUpgrade from "@/components/tools/upgrades/igt-discrete-upgrade";
import {ManaResource} from "@/my-game/features/resources/ManaResource";
import {KnowledgeResource} from "@/my-game/features/resources/KnowledgeResource";

export default {
    name: "mana-upgrades",
    components: {IgtFeature, IgtUpgrade},
    props:{
        manaResourceFeature: {
            type: ManaResource,
            required: true,
        },
        knowledgeResourceFeature:{
            type: KnowledgeResource,
            required: true,
        }
    },
    computed: {
        realignUpgrade(){
            return this.manaResourceFeature.getUpgrade("realignUpgrade");
        },
        crystallizerUpgrade(){
            return this.knowledgeResourceFeature.getUpgrade("unlockCrystallizer")
        }
    }
}
</script>

<style scoped>

</style>