import { Features } from "@/my-game/Features";
import { IgtAction } from "incremental-game-template";
import { Inventory } from "../../Inventory/Inventory";
import { Food } from "../../Items/Base/Food";
import { Skill } from "../../Skills/Skill";
import { SkillId } from "../../Skills/SkillId";
import { EventId } from "../../Listeners/EventId";

export class SkillAction extends IgtAction{

    skill: Skill;
    drain: number;
    _foodInventory: Inventory = undefined as unknown as Inventory;
    intervalId: NodeJS.Timeout | null = null;
    intervalNumber: number = 0;
    tickDuration: number = 0

    constructor(description: string, duration: number, drain: number){
        super(description,duration);
        this.skill = new Skill('Blank',SkillId.Blank,"None");
        this.drain = drain;
    }

    initialize(features: Features): void {
        this._foodInventory = features.foodInventory;
        this.tickDuration = Math.ceil(this.duration / this.skill.reward/(1/60))
    }

    gainReward(): boolean{
        this.currentProgress = 0;
        this.intervalNumber = 0;
        this.skill.setReward();
        this.tickDuration = Math.ceil(this.duration / this.skill.reward/(1/60));
        return false;
    }

    start(): boolean{
        if (!this.canPerform() || (this.drain > 0 && !this.canConsumeFood())){
            this.currentProgress=0;
            return false;
        }

        this.tickDuration = Math.ceil(this.duration / this.skill.reward/(1/60))
        this.isStarted = true;


        return true;
    }

    canConsumeFood(): boolean{
        if (this.drain <= 0){
            return true;
        }
        const foodTypes = this._foodInventory.getHeldItemTypes();
        if (foodTypes.length <= 0){
            return false
        }
        const firstFood = foodTypes[0];
        return firstFood instanceof(Food);
    }

    consumeFood(amount: number){
        if (this.drain > 0){
            const foodTypes = this._foodInventory.getHeldItemTypes();
            if (!this.canConsumeFood()){
                this.currentProgress = 0;
                this.intervalNumber = 0;
                this.stop();
            }
            const firstFood = foodTypes[0];            
            const toConsume = Math.round(amount*1e10)/1e10;
            this._foodInventory.consumeItem(firstFood,toConsume);
        }
    }

    run(amount: number,tickDuration: number){
        this.intervalNumber ++;

        if (this.intervalNumber > tickDuration){
            console.log("GHOST TICK");
            if (!this.isStarted && this.canPerform()){
                this.intervalNumber = 0;
                this.start();
            }
            else if (this.gainReward()){
                this.repeatAction();
            }
            else{
                this.stop();
            }
            return;
        }

        if (!this.canConsumeFood()){
            this.stop();
            this.currentProgress=0;
            this.intervalNumber=0;
            return;
        }

        this.perform(amount*this.skill.reward);
        this.skill.gainExperience((Math.round(amount*1e4)/1e4)*this.skill.reward);
        this.consumeFood(amount);
    }

    repeatAction(): void {
        this.stop();
        this.currentProgress=0;
        this.intervalNumber = 0;
        this.skill.setReward();
        this.repeat--;
        this.start();
    }
    
    stop(): void {
        if (this.intervalId){
            clearInterval(this.intervalId);
        }
        this.isStarted = false;
    }


}