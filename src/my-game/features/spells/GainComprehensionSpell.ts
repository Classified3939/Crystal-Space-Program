import { AbstractSpell } from "@/my-game/features/spells/Templates/AbstractSpell";
import { GainResourceAction } from "@/my-game/features/actions/GainResourceAction";
import { CurrencyType } from "@/my-game/features/wallet/CurrencyType";
import { Currency } from "incremental-game-template";
import { BlankSpellAction } from "@/my-game/features/actions/BlankSpellAction";
import { App } from "@/App";

export class GainComprehensionSpell extends AbstractSpell{

    constructor(){
        super("gainCompSpell","Gain Comprehension",new BlankSpellAction);
    }

    initialize(){
        const knowledgeGain = new 
            GainResourceAction(5,App.game.features.knowledgeResource,1,this.level,
(            level: number) => {
                return 1 + (level - 1) * 1.1;
            })
        this.setResult(knowledgeGain);
        this.unlocked = false;
    }

    getCost(): Currency {
        return new Currency(80,CurrencyType.mana);
    }

    unlock(){
        if (App.game.features.manaResource.realignUpgrade.level >= 2){
            this.unlocked = true;
        }
    }
}