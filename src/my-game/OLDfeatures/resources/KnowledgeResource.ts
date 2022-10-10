import {SingleLevelUpgrade, Currency, IgtAbstractUpgrade} from "incremental-game-template";
import { CurrencyType } from "@/my-game/features/wallet/CurrencyType";
import { AbstractResource } from "@/my-game/features/resources/AbstractResource";
import { UnlockableSingleLevelUpgrade, UnlockableUpgrade } from "../upgrades/UnlockableUpgrade";
import { App } from "@/App";
import { truncate } from "fs";

export class KnowledgeResource extends AbstractResource{

    unlockCrystallizerUpgrade: UnlockableSingleLevelUpgrade
    unlockInfraAbsorbUpgrade: UnlockableSingleLevelUpgrade
    unlockRedAbsorbUpgrade: UnlockableSingleLevelUpgrade


    constructor(){
        super("knowledge-resource",CurrencyType.knowledge,CurrencyType.maxKnowledge);

        this.unlockCrystallizerUpgrade = new SingleLevelUpgrade('unlockCrystallizer', 'tabUnlock', "Unlock Crystallizer Tab", 
            new Currency(3,CurrencyType.knowledge), 0) as UnlockableSingleLevelUpgrade;

        //Upgrade unlock logic is gonna be weird until igt updates.
        this.unlockCrystallizerUpgrade.unlocked = false;
        this.unlockCrystallizerUpgrade.unlock = function(): boolean{
            return App.game.features.manaResource.realignUpgrade.level >= 2;
        }

        this.unlockInfraAbsorbUpgrade = new SingleLevelUpgrade('unlockInfraAbsorb','spellUnlock', "Unlock Absorb Infrared",
            new Currency(1,CurrencyType.infraCrystal), 0) as UnlockableSingleLevelUpgrade;
        this.unlockInfraAbsorbUpgrade.unlocked = false;
        this.unlockInfraAbsorbUpgrade.unlock = function(): boolean{
            return App.game.features.knowledgeResource.unlockCrystallizerUpgrade.isBought();
        }

        this.unlockRedAbsorbUpgrade = new SingleLevelUpgrade('unlockRedAbsorb','spellUnlock', "Unlock Absorb Red",
            new Currency(2,CurrencyType.redCrystal), 0) as UnlockableSingleLevelUpgrade;
        this.unlockRedAbsorbUpgrade.unlocked = false;
        this.unlockRedAbsorbUpgrade.unlock = function(): boolean{
            return App.game.features.knowledgeResource.unlockInfraAbsorbUpgrade.isBought();
        }


        this.upgrades.push(this.unlockCrystallizerUpgrade);
        this.upgrades.push(this.unlockInfraAbsorbUpgrade);
        this.upgrades.push(this.unlockRedAbsorbUpgrade);
    }
}