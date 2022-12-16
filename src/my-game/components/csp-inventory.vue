<template>
    <igt-feature style="height:29rem;position:relative;top:-5rem" containerClass="bg-gray-200 dark:bg-gray-700">
            Inventory
            <igt-feature containerClass="bg-gray-200 dark:bg-gray-700 border-2">
                Food
                <div class="flex flex-col">
                    <div v-for="food in foods" :key="food.id">
                        <div v-if="food.item.name != 'Empty'">&nbsp;{{food.amount | numberFormat}} / {{food.item.maxStack | numberFormat}}  {{food.item.name}}
                            &nbsp;<span class="fas fa-apple-alt"/>{{food.item.foodValue}}</div>
                        <div v-else>&emsp;None</div>
                    </div>
                </div>
            </igt-feature>
            <igt-feature containerClass="bg-gray-200 dark:bg-gray-700 border-2">
                Crystals
                <div class="flex flex-col">
                    <div v-for="crystal in crystals" :key="crystal.id">
                        <div v-if="crystal.item.name != 'Empty'">&nbsp;{{crystal.amount | numberFormat}} / {{crystal.item.maxStack | numberFormat}}  {{crystal.item.name}}</div>
                        <div v-else>&emsp;None</div>
                    </div>
                </div>
            </igt-feature>
    </igt-feature>
</template>


<script>
import {App} from "@/App.ts";
import IgtFeature from "@/components/util/igt-feature"

export default{
    name: "skills",
    components: {IgtFeature},
    data(){
        return{
            food: App.game.features.foodInventory,
            crystal: App.game.features.crystalInventory
        }
    },
    computed:{
        foods(){
            return this.food.slots;
        },
        crystals(){
            return this.crystal.slots;
        }
    },
}
</script>

<style scoped>
</style>