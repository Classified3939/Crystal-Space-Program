import { AbstractSpell } from "@/my-game/features/spells/Templates/AbstractSpell";
import { CurrencyType } from "@/my-game/features/wallet/CurrencyType";
import { Currency } from "incremental-game-template";
import { BlankSpellAction } from "@/my-game/features/actions/BlankSpellAction";
import { App } from "@/App";
import { GainPastMaxAction } from "../actions/GainPastMaxAction";

export class AbsorbInfraredSpell extends AbstractSpell{

    constructor(){
        super("infraAbsorbSpell","Infrared Absorption",new BlankSpellAction);
    }

    initialize(){
        const manaGain = new 
            GainPastMaxAction(1.5,App.game.features.manaResource,25,this.level,
            (level: number) => {
                return 1 + (level - 1) * 1.5;
            })
        this.setResult(manaGain);
        this.unlocked = false;
    }

    getCost(): Currency {
        return new Currency(1,CurrencyType.infraCrystal);
    }

    unlock(){
        if (App.game.features.knowledgeResource.unlockInfraAbsorbUpgrade.isBought()){
            this.unlocked = true;
        }
    }
}