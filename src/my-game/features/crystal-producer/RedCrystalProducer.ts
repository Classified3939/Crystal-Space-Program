import {AddWallet, ContinuousUpgrade, Currency, IgtFeature, IgtWallet, SaveData} from "incremental-game-template";
import {CurrencyType} from "@/my-game/features/wallet/CurrencyType";
import {MyFeatures} from "@/my-game/MyFeatures";
import { CrystalClicker} from "@/my-game/features/crystal-producer/CrystalClick";
import { ClickBonusSaveData } from "@/components/tools/clickers/ClickBonusSaveData";
import { AbstractCrystalClickerFeature } from "./AbstractCrystalClickerFeature";
import { CspAddWallet } from "@/components/mixins/CspAddWallet";

export class RedCrystalProducer extends CspAddWallet(IgtFeature){

    clicker: CrystalClicker;

    constructor() {
        super('redCrystal');
        this.clicker = new CrystalClicker('redMine', "Mine", "Red Crystals", CurrencyType.redCrystal)
    }

    initialize(features: MyFeatures){
        this._wallet = features.wallet;
    }

    load(data: SaveData): void{
        //empty
    }

    save(): SaveData{
        return {};
    }
}