<template>
    <igt-feature style="width:105.5%;height:47rem;position:relative;left:-1rem">
        <div>
            Info
        </div>
        <igt-feature style="height:44rem;overflow-y:scroll;padding:0%" containerClass="bg-gray-200 dark:bg-gray-700 p-0 overflow-ellipsis border-2">
            <igt-feature v-for="info in reverseArray()" :key="info.id" style="width:19rem;font-size:.97rem;line-height:1.16rem" containerClass="bg-gray-200 dark:bg-gray-700 p-2">
                <div style="width:97.5%" class="border-2 overflow-ellipsis p-1" :class="getBorderType(info)">{{info.desc}}</div>
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