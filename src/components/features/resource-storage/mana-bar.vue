<template>
    <igt-feature :containerClass="'flex flex-auto bg-gray-200 dark:bg-gray-700 py-1'">
        <div class="flex-8/12">Mana: {{manaResourceFeature.getCurrent() | numberFormat}}/{{manaResourceFeature.getMax() | numberFormat}}</div>
    </igt-feature>
</template>

<script>
    import {ManaResource} from "@/my-game/features/resources/ManaResource";
    import IgtFeature from "@/components/util/igt-feature";

    export default {
    name: "mana-bar",
    components: {IgtFeature},
    props:{
        manaResourceFeature: {
            type: ManaResource,
            required: true
        }
    },
}
</script>