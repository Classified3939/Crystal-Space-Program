import {Currency, SaveData, ContinuousUpgrade} from "incremental-game-template";
import { CurrencyType } from "@/my-game/features/wallet/CurrencyType";
import { AbstractResource } from "@/my-game/features/resources/AbstractResource";

export class ManaResource extends AbstractResource{

    realignUpgrade: ContinuousUpgrade;

    constructor(){
        super("mana-resource",CurrencyType.mana,CurrencyType.maxMana);
        this.realignUpgrade = new ContinuousUpgrade('realignUpgrade','mana',"Realign Mana Flows \n Plus 4 mana/sec",5,
            level =>{
                return level * 4;
            },
            level => {
                return new Currency(20 * Math.pow(level + 1, 1.45), CurrencyType.mana);
            }
        )
        this.upgrades.push(this.realignUpgrade)
    }
}