import { SpellAction } from "@/my-game/features/actions/SpellAction";
import { CurrencyType } from "@/my-game/features/wallet/CurrencyType";
import { Currency } from "incremental-game-template";
import {App} from "@/App"

export class GainResourceAction extends SpellAction{
    rewardType: CurrencyType;
    rewardAmount: number;
    multFunc: (level: number) => number;
    maxResource: number;
    
    constructor(goal: number, rewardType: CurrencyType, rewardAmount: number, spellLevel: number, maxResource: number, multFunc: (level: number) => number){
        super(0,goal, spellLevel, "");
        this.rewardType = rewardType;
        this.rewardAmount = rewardAmount;
        this.multFunc = multFunc;
        this.maxResource = maxResource;
        this.description = "Gain " + this.getReward().toFixed(2) + " " + this.rewardType;
    }

    gainReward(){
        let toGain = this.rewardAmount * this.multFunc(this.spellLevel);
        const owned = App.game.features.wallet.getAmount(this.rewardType);

        if (owned >= this.maxResource){return}

        if (owned + toGain >= this.maxResource){
            toGain = this.maxResource - owned;
        }
        App.game.features.wallet.gainCurrency(new Currency(toGain, this.rewardType));
    }

    getReward(){
        return this.rewardAmount * this.multFunc(this.spellLevel);
    }
}