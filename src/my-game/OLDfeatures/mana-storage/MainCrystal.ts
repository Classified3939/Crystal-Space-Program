import { Currency, IgtFeature, SaveData} from "incremental-game-template";
import { CurrencyType } from "@/my-game/features/wallet/CurrencyType";
import { CspAddWallet } from "@/components/mixins/CspAddWallet";
import { AbstractResource } from "@/my-game/features/resources/AbstractResource";
import { BlankResource } from "@/my-game/features/resources/BlankResource";
import { MyFeatures } from "@/my-game/Features";

export class MainCrystal extends CspAddWallet(IgtFeature){

    manaPerSecond: number;
    percentFull: number;
    manaResource: AbstractResource

    constructor(){
        super('main-crystal')
        this.manaPerSecond = 10;
        this.percentFull = (this.manaPerSecond / 100) * 100;
        this.manaResource = new BlankResource();

    }

    initialize(features: MyFeatures): void {
        this.manaResource = features.manaResource;
        this._wallet = features.wallet;
    }

    update(delta: number){
        let manaToGain = this.manaPerSecond;
        if (this.manaResource.getUpgrade("realignUpgrade")){
            manaToGain += this.manaResource.getUpgrade("realignUpgrade")!.getBonus();
        }
        const maximumMana = this.manaResource.getMax();
        if (this.getAmount(CurrencyType.mana) >= maximumMana){
            this.percentFull = 100;
        }
        else if (this.getAmount(CurrencyType.mana) + (manaToGain * delta) >= maximumMana){
            const remainingCurrency = new Currency
                (maximumMana - this.getAmount(CurrencyType.mana), CurrencyType.mana);
            this._wallet.gainCurrency(remainingCurrency);
            this.percentFull = 100;
        }
        else{
            const currency = new Currency(manaToGain * delta, CurrencyType.mana);
            this._wallet.gainCurrency(currency);
            this.percentFull = (this.getAmount(CurrencyType.mana) / maximumMana) * 100;
        }
    }

    load(data: SaveData): void {
        // Empty
    }
        
    save(): SaveData {
        return {};
    }
}