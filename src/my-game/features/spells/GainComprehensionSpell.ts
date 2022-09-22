import { AbstractSpell } from "@/my-game/features/spells/Templates/AbstractSpell";
import { GainResourceAction } from "@/my-game/features/actions/GainResourceAction";
import { CurrencyType } from "@/my-game/features/wallet/CurrencyType";
import { Currency } from "incremental-game-template";
import { BlankSpellAction } from "@/my-game/features/actions/BlankSpellAction";
import { App } from "@/App";

export class GainComprehensionSpell extends AbstractSpell{

    constructor(){
        super("gainCompSpell","Gain Comprehension",new BlankSpellAction);
        const knowledgeGain = new 
            GainResourceAction(5,CurrencyType.knowledge,1,this.level, 10,
            level => {
                return 1 + (level - 1) * 1.1;
            })
        this.setResult(knowledgeGain);
    }

    getCost(): Currency {
        return new Currency(80,CurrencyType.mana);
    }
}