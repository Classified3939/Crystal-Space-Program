import { SpellAction } from "@/my-game/features/actions/SpellAction";
import { Currency } from "incremental-game-template";
import {App} from "@/App"
import { AbstractResource } from "@/my-game/features/resources/AbstractResource";

export class DelayedGainAction extends SpellAction{
    resource: AbstractResource;
    rewardAmount: number;
    multFunc: (level: number) => number;
    isHolding: boolean;
    
    constructor(goal: number, resource: AbstractResource, rewardAmount: number, spellLevel: number, multFunc: (level: number) => number){
        super(0,goal, spellLevel, "");
        this.resource = resource;
        this.rewardAmount = rewardAmount;
        this.multFunc = multFunc;
        this.isHolding = false;
    }

    canStart(): boolean{
        const canGain = this.resource.getCurrent() < this.resource.getMax();
        return canGain && !this.isHolding;
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
        this.isHolding = false;
        this.complete();
    }

    getReward(){
        return this.rewardAmount * this.multFunc(this.spellLevel);
    }


    getDescription(){
        if (this.isHolding){
            return "Complete"
        }
        else{
            return this.description
        }
    }

    //Modified from Base Class
    start() {
        if (this.isCooldown || !this.canStart()) {
            console.warn("Cannot cast spell");
            return;
        }
        this.isCooldown = true;
        this.progress = 0;
    }

    //Modified from Base Class
    tick(delta: number){
        
        if (!this.isHolding) {
            this.progress = Math.min(this.goal, this.progress + delta);
        }

        if (this.isCompleted()){
            this.isHolding = true;
        }
    }

}