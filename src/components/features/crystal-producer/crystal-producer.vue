<template>
    <igt-feature>
        <igt-upgrade
            @click.native="crystalProducerFeature.buyUpgrade(workerUpgrade)"
            :upgrade="workerUpgrade"
            :can-buy="crystalProducerFeature.canAfford(workerUpgrade)">
        </igt-upgrade>
    </igt-feature>
</template>

<script>
import {IgtFeature} from "@/components/util/igt-feature";
import {RedCrystalProducer} from "@/my-game/features/crystal-producer/RedCrystalProducer";
import IgtUpgrade from "@/components/tools/upgrades/igt-descrete-upgrade";

export default{
    name: "crystal-producer",
    components: {IgtUpgrade, IgtFeature},
    props: {
        crystalProducerFeature: {
            type: RedCrystalProducer,
            required: true
        },
    },
    computed:{
        workerUpgrade(){
            return this.crystalProducerFeature.workerUpgrade();
        }
    },
}
</script>

<style scoped>

</style>