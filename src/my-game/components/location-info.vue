<template>
    <igt-feature style="height:26.8rem;position:relative;top:-4.5rem">
        <div>
            Location
        </div>
        <div style="width:100%;" class="flex flex-col border-2 p-2">
            <div class="flex text-lg" v-if="getLocation().planet !== '???'">Planet: {{getLocation().planet}}</div>
            <div class="flex text-lg" v-if="getLocation().area !== '???'">Area: {{getLocation().area}}</div>
            <div class="flex text-lg" >{{getLocation().desc}}</div>
            <div class="flex text-lg" >{{getLocation().subtitle}}</div>
            <div class="flex text-lg" >Contains: {{getLocation().contains}}</div>
        </div>
    </igt-feature>
</template>

<script>
import {App} from "@/App.ts";
import {LocationDisplayArray} from "@/my-game/features/Locations/LocationDisplays"
import IgtFeature from "@/components/util/igt-feature"

export default{
    name: "location-info",
    components: {IgtFeature},
    methods:{
        getPlayerLoc(){
            return App.game.features.playerLocation.playerLocation
        },
        getLocation(){
            if (this.getPlayerLoc() != null){
                return LocationDisplayArray.find(e=>this.getPlayerLoc().identifier.id === e.id);
            }
        }
    }
}
</script>

<style scoped>
</style>