import { Currency, IgtFeature, SaveData} from "incremental-game-template";
import { CurrencyType } from "@/my-game/features/wallet/CurrencyType";
import { CspAddWallet } from "@/components/mixins/CspAddWallet";
import { MyFeatures } from "@/my-game/Features";
import { ManaResource } from "@/my-game/features/resources/ManaResource";
import { AbstractResource } from "@/my-game/features/resources/AbstractResource";
import { BlankResource } from "@/my-game/features/resources/BlankResource";

export class CrystallizerMachine extends CspAddWallet(IgtFeature){

    manaResource: AbstractResource;

    constructor(){
        super('crystallizer_machine')
        this.manaResource = new BlankResource;
    }

    initialize(features: MyFeatures): void {
        this._wallet = features.wallet;
        this.manaResource = features.manaResource;
    }

    update(delta: number){

    }

    load(data: SaveData): void {
        // Empty
    }
        
    save(): SaveData {
        return {};
    }
}