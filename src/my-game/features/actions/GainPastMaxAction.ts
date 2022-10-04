import { App } from "@/App";
import { Currency } from "incremental-game-template";
import { AbstractResource } from "../resources/AbstractResource";
import { GainResourceAction } from "./GainResourceAction";

export class GainPastMaxAction extends GainResourceAction{

    constructor(goal: number, resource: AbstractResource, rewardAmount: number, spellLevel: number, multFunc: (level: number) => number){
        super(goal, resource, rewardAmount,spellLevel,multFunc);
        this.description = "Gain " + this.getReward().toFixed(2) + " " + this.resource.resourceType + "\nCan go past Max";
    }

    canStart(): boolean{
        return true;
    }

    gainReward(){
        const toGain = this.rewardAmount * this.multFunc(this.spellLevel);

        App.game.features.wallet.gainCurrency(new Currency(toGain, this.resource.resourceType));
    }
}