<template>
    <igt-feature :containerClass="'flex flex-auto bg-gray-200 dark:bg-gray-700 py-1'">
        <div class="flex-8/12">Mana: {{manaResourceFeature.getCurrentMana() | numberFormat}}/{{manaResourceFeature.getMaxMana() | numberFormat}}</div>
    </igt-feature>
</template>

<script>
    import {MainCrystal} from "@/my-game/features/mana-storage/MainCrystal";
    import IgtFeature from "@/components/util/igt-feature";

    export default {
    name: "mana-bar",
    components: {IgtFeature},
    props:{
        manaResourceFeature: {
            type: MainCrystal,
            required: true
        }
    },
}
</script>