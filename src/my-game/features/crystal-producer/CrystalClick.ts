import { AbstractCrystalClickerFeature} from "@/my-game/features/crystal-producer/AbstractCrystalClickerFeature";
import {IgtWallet, IgtFeature, IgtFeatures, Currency} from "incremental-game-template";
import { CurrencyType } from "@/my-game/features/wallet/CurrencyType";
import { AbstractClicker } from "@/components/tools/clickers/AbstractClicker";

export class CrystalClicker extends AbstractClicker{
    
    crystalType: string;

    constructor(id: string, displayName: string, resource: string, crystalType: string){
        super(id,displayName,resource);
        this.crystalType = crystalType;
    }

    getCurrency(): Currency{
        return new Currency(this.amount, this.crystalType as CurrencyType);
    }

}

