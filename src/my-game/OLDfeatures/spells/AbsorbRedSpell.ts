import { AbstractSpell } from "@/my-game/features/spells/Templates/AbstractSpell";
import { CurrencyType } from "@/my-game/features/wallet/CurrencyType";
import { Currency } from "incremental-game-template";
import { BlankSpellAction } from "@/my-game/features/actions/BlankSpellAction";
import { App } from "@/App";
import { IncreaseMaxAction } from "../actions/IncreaseMaxAction";

export class AbsorbRedSpell extends AbstractSpell{

    constructor(){
        super("redAbsorbSpell","Red Absorption",new BlankSpellAction);
    }

    initialize(){
        const maxManaGain = new 
            IncreaseMaxAction(3,App.game.features.manaResource,10,this.level,
            (level: number) => {
                return 1 + (level - 1) * 1.5;
            })
        this.setResult(maxManaGain);
        this.unlocked = false;
    }

    getCost(): Currency {
        return new Currency(1,CurrencyType.redCrystal);
    }

    unlock(){
        if (App.game.features.knowledgeResource.unlockRedAbsorbUpgrade.isBought()){
            this.unlocked = true;
        }
    }
}