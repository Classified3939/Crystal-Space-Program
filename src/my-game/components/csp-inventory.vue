<template>
    <igt-feature style="width:20rem" containerClass="bg-gray-200 dark:bg-gray-700">
            Inventory
            <igt-feature containerClass="bg-gray-200 dark:bg-gray-700 border-2">
                Food
                <div class="flex flex-col">
                    <div v-for="food in foods" :key="food.id">
                        <p v-if="food.item.name != 'Empty'">&emsp;{{food.amount | numberFormat}} / {{food.item.maxStack | numberFormat}}  {{food.item.name}}</p>
                        <p v-else>&emsp;None</p>
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
            food: App.game.features.foodInventory
        }
    },
    computed:{
        foods(){
            return this.food.slots;
        }
    },
}
</script>

<style scoped>
</style>