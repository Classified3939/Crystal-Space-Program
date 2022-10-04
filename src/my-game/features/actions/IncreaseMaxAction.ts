import { Currency } from "incremental-game-template";
import {App} from "@/App"
import { AbstractResource } from "@/my-game/features/resources/AbstractResource";
import { GainResourceAction } from "./GainResourceAction";

export class IncreaseMaxAction extends GainResourceAction{
    
    constructor(goal: number, resource: AbstractResource, rewardAmount: number, spellLevel: number, multFunc: (level: number) => number){
        super(goal, resource, rewardAmount, spellLevel, multFunc);
        this.description = "Gain " + this.getReward().toFixed(2) + " Max " + this.resource.resourceType;
    }

    canStart(): boolean{
        return true
    }

    setResource(newResource: AbstractResource){
        this.resource = newResource;
    }

    gainReward(){
        const toGain = this.rewardAmount * this.multFunc(this.spellLevel);

        App.game.features.wallet.gainCurrency(new Currency(toGain, this.resource.resourceMax));
    }

    getReward(){
        return this.rewardAmount * this.multFunc(this.spellLevel);
    }
}