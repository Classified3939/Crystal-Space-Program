<template>
    <igt-feature :containerClass="'flex flex-auto bg-gray-200 dark:bg-gray-700 py-0'">
        <div class="flex-8/12 py-0">Knowledge: {{knowledgeResourceFeature.getCurrentKnowledge() | numberFormat}}/{{knowledgeResourceFeature.getMaxKnowledge() | numberFormat}}</div>
    </igt-feature>
</template>





<script>
    import {KnowledgeResource} from "@/my-game/features/resources/KnowledgeResource";
    import IgtFeature from "@/components/util/igt-feature";

    export default {
    name: "knowledge-bar",
    components: {IgtFeature},
    props:{
        knowledgeResourceFeature: {
            type: KnowledgeResource,
            required: true
        }
    },
}
</script>