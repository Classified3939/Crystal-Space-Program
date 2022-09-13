import {AddWallet, ContinuousUpgrade, Currency, IgtFeature, IgtWallet} from "incremental-game-template";
import {CurrencyType} from "@/my-game/features/wallet/CurrencyType";
import {MyFeatures} from "@/my-game/MyFeatures";
import {CrystalProducerSaveData} from "@/my-game/features/crystal-producer/CrystalProducerSaveData"

export class RedCrystalProducer extends AddWallet(IgtFeature){

    workerUpgrade: ContinuousUpgrade;

    constructor() {
        super('redCrystal');
        this.workerUpgrade = new ContinuousUpgrade('worker','redCrystal',"Workers",100,
            level => {
                return level + 1;
            },
            level => {
                return new Currency(20 * Math.pow(level + 1, 1.4), CurrencyType.redCrystal);
            },
        )
    }

    initialize(features: MyFeatures){
        this._wallet = features.wallet;
    }

    update(delta: number){
        const crystalsToGain = this.workerUpgrade.getBonus();
        const currency = new Currency(crystalsToGain * delta, CurrencyType.redCrystal);
        this._wallet.gainCurrency(currency);
    }

    load(data: CrystalProducerSaveData): void{
        this.workerUpgrade.level = data.redLevel ?? 0;
    }

    save(): CrystalProducerSaveData{
        return {
            redLevel: this.workerUpgrade.level,
        };
    }
}