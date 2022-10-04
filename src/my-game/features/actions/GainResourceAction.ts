import { SpellAction } from "@/my-game/features/actions/SpellAction";
import { Currency } from "incremental-game-template";
import {App} from "@/App"
import { AbstractResource } from "@/my-game/features/resources/AbstractResource";

export class GainResourceAction extends SpellAction{
    resource: AbstractResource;
    rewardAmount: number;
    multFunc: (level: number) => number;
    
    constructor(goal: number, resource: AbstractResource, rewardAmount: number, spellLevel: number, multFunc: (level: number) => number){
        super(0,goal, spellLevel, "");
        this.resource = resource;
        this.rewardAmount = rewardAmount;
        this.multFunc = multFunc;
        this.description = "Gain " + this.getReward().toFixed(2) + " " + this.resource.resourceType;
    }

    canStart(): boolean{
        return this.resource.getCurrent() < this.resource.getMax();
    }

    setResource(newResource: AbstractResource){
        this.resource = newResource;
    }

    gainReward(){
        let toGain = this.rewardAmount * this.multFunc(this.spellLevel);
        const owned = this.resource.getCurrent();
        const maxResource = this.resource.getMax();

        if (owned + toGain >= maxResource){
            toGain = maxResource - owned;
            if (toGain < 0.01) {return;}
        }

        App.game.features.wallet.gainCurrency(new Currency(toGain, this.resource.resourceType));
    }

    getReward(){
        return this.rewardAmount * this.multFunc(this.spellLevel);
    }
}