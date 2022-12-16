<template>
    <igt-feature style=height:48.5rem>
        <div>
            Info
        </div>
        <igt-feature style="height:45rem;overflow-y:scroll;padding:0%" containerClass="bg-gray-200 dark:bg-gray-700 p-0 overflow-ellipsis">
            <igt-feature v-for="info in reverseArray()" :key="info.id" style="width:20rem;" containerClass="bg-gray-200 dark:bg-gray-700 text-sm p-0">
                <div style="width:93%" class="border-2 overflow-ellipsis p-1" :class="getBorderType(info)">{{info.desc}}</div>
            </igt-feature>
        </igt-feature>
    </igt-feature>
</template>

<script>
import {App} from "@/App.ts";
import {InfoType} from "@/my-game/features/InfoBox/InfoType"
import IgtFeature from "@/components/util/igt-feature"

export default{
    name: "info-box",
    components: {IgtFeature},
    data(){
        return{
            infoBox: App.game.features.infoBox
        }
    },
    methods:{
        getBorderType(info){
            if (info.type === InfoType.Info){
                return "border-blue-500";
            }
            else if (info.type === InfoType.Lore){
                return "border-green-500";
            }
            else{
                return "border-white";
            }
        },
        reverseArray(){
            return [...this.infoBox.showInfo()].reverse()
        }
    }
}
</script>

<style scoped>
</style>