import { Features } from "@/my-game/Features";
import { IgtAction } from "incremental-game-template";
import { Inventory } from "../../Inventory/Inventory";
import { Skill } from "../../Skills/Skill";
import { SkillId } from "../../Skills/SkillId";

export class SkillAction extends IgtAction {

    skill: Skill;
    drain: number;
    repeatIfPaused: boolean = false;
    _foodInventory: Inventory = undefined as unknown as Inventory;
    intervalId: NodeJS.Timeout | null = null;
    intervalNumber: number = 0;
    tickDuration: number = 0

    constructor(description: string, duration: number, drain: number) {
        super(description, duration);
        this.skill = new Skill('Blank', SkillId.Blank, "None");
        this.drain = drain;
    }

    initialize(features: Features): void {
        this._foodInventory = features.foodInventory;
        this.tickDuration = Math.ceil(this.duration / this.skill.reward / (1 / 60))
    }

    gainReward(): boolean {
        this.currentProgress = 0;
        this.intervalNumber = 0;
        this.skill.setReward();
        this.tickDuration = Math.ceil(this.duration / this.skill.reward / (1 / 60));
        return false;
    }

    start(): boolean {
        if (!this.canPerform() || (this.drain > 0 && this.adjustAmountWithFood(1e-6) === 0)) {
            this.currentProgress = 0;
            return false;
        }

        this.tickDuration = Math.ceil(this.duration / this.skill.reward / (1 / 60))
        this.isStarted = true;


        return true;
    }

    adjustAmountWithFood(amount: number): number {
        amount = Math.round(amount * 1e7) / 1e7
        if (this.drain <= 0) {
            return amount;
        }
        const foodTypes = this._foodInventory.getHeldItemTypes();
        if (foodTypes.length <= 0) {
            return 0;
        }
        let foodAmount = 0;
        for (let i = 0; i < foodTypes.length; i++) {
            foodAmount += this._foodInventory.slots[i].amount;
        }
        foodAmount = Math.round(foodAmount * 1e6) / 1e6;
        return Math.min(amount, foodAmount);
    }

    consumeFood(amount: number) {
        if (this.drain > 0) {
            const foodTypes = this._foodInventory.getHeldItemTypes();
            for (const food of foodTypes) {
                const initialAmount = this._foodInventory.getItemAmount(food);
                this._foodInventory.consumeItem(food, amount);
                amount -= initialAmount
                if (amount <= 0) {
                    return;
                }
            }

        }
    }

    run(amount: number, tickDuration: number) {
        this.intervalNumber++;
        if (this.intervalNumber > tickDuration) {
            console.log("GHOST TICK");
            if (!this.isStarted && this.canPerform()) {
                this.intervalNumber = 0;
                this.start();
            }
            else if (this.gainReward()) {
                this.repeatAction();
            }
            else {
                this.stop();
            }
            return;
        }
        let foodAmount = this.adjustAmountWithFood(amount);
        if (foodAmount === 0) {
            this.stop();
            this.currentProgress = 0;
            this.intervalNumber = 0;
            return;
        }
        if (foodAmount > this.duration) {
            while (foodAmount > this.duration) {
                console.log(foodAmount);
                this.run(this.duration - this.getProgress().actual, tickDuration)
                foodAmount = foodAmount - this.duration;
                if (!this.canPerform() || !this.repeatIfPaused) {
                    this.stop()
                    return;
                }
            }
            return;
        }

        this.perform(foodAmount * this.skill.reward);
        this.consumeFood(foodAmount);
        this.skill.gainExperience((Math.round(foodAmount * 1e4) / 1e4) * this.skill.reward);
    }

    repeatAction(): void {
        this.stop();
        this.currentProgress = 0;
        this.intervalNumber = 0;
        this.skill.setReward();
        this.repeat--;
        this.start();
    }

    stop(): void {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
        this.isStarted = false;
    }


}