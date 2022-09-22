import {ContinuousUpgrade, Currency, IgtFeature, SaveData} from "incremental-game-template";
import { CurrencyType } from "@/my-game/features/wallet/CurrencyType";
import { CspAddWallet } from "@/components/mixins/CspAddWallet";

export class MainCrystal extends CspAddWallet(IgtFeature){

    realignUpgrade: ContinuousUpgrade;
    manaPerSecond: number;
    percentFull: number;

    constructor(){
        super('main-crystal')
        this.manaPerSecond = 10;
        this.percentFull = (this.manaPerSecond / 100) * 100;
        this.realignUpgrade = new ContinuousUpgrade('realign','mana',"Realign Mana Flows",5,
            level =>{
                return level * 4;
            },
            level => {
                return new Currency(20 * Math.pow(level + 1, 1.45), CurrencyType.mana);
            }
        )
    }

    update(delta: number){
        const manaToGain = this.manaPerSecond + this.realignUpgrade.getBonus();
        const maximumMana = this.getMaxMana();
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

    getCurrentMana(): number{
        return this._wallet.getAmount(CurrencyType.mana);
    }

    getMaxMana(): number{
        return this._wallet.getAmount(CurrencyType.maxMana);
    }

    load(data: SaveData): void {
        // Empty
    }
        
    save(): SaveData {
        return {};
    }
}