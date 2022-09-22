import {SingleLevelUpgrade, Currency, IgtFeature, SaveData} from "incremental-game-template";
import { CurrencyType } from "@/my-game/features/wallet/CurrencyType";
import { CspAddWallet } from "@/components/mixins/CspAddWallet";

export class KnowledgeResource extends CspAddWallet(IgtFeature){

    unlockCrystallizerUpgrade: SingleLevelUpgrade


    constructor(){
        super("knowledge-resource");
        this.unlockCrystallizerUpgrade = new SingleLevelUpgrade('unlockCrystallizer', 'unlock', "Unlock Crystallizer", 
            new Currency(2,CurrencyType.knowledge), 0)
    }

    getCurrentKnowledge(): number{
        return this._wallet.getAmount(CurrencyType.knowledge);
    }
    
    getMaxKnowledge(): number{
        return this._wallet.getAmount(CurrencyType.maxKnowledge);
    }

    load(data: SaveData): void {
        // Empty
    }
        
    save(): SaveData {
        return {};
    }
}