import {SingleLevelUpgrade, Currency, IgtFeature, SaveData} from "incremental-game-template";
import { CurrencyType } from "@/my-game/features/wallet/CurrencyType";
import { AbstractResource } from "@/my-game/features/resources/AbstractResource";

export class KnowledgeResource extends AbstractResource{

    unlockCrystallizerUpgrade: SingleLevelUpgrade


    constructor(){
        super("knowledge-resource",CurrencyType.knowledge,CurrencyType.maxKnowledge);
        this.unlockCrystallizerUpgrade = new SingleLevelUpgrade('unlockCrystallizer', 'unlock', "Unlock Crystallizer", 
            new Currency(2,CurrencyType.knowledge), 0)
        this.upgrades.push(this.unlockCrystallizerUpgrade);
    }
}