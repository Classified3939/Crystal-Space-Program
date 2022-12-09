import { SkillAction } from "./ActionTypes.ts/SkillAction";
import { IgtFeature } from "incremental-game-template";
import { Features } from "@/my-game/Features";
import { SkillId } from "../Skills/SkillId";
import { ActionSaveData } from "./ActionSaveData";
import { Inventory } from "../Inventory/Inventory";
import { Food } from "../Items/Base/Food";

export class SkillActionFeature extends IgtFeature{
    skillAction: SkillAction;
    skillId: SkillId;
    _inventory: Inventory = undefined as unknown as Inventory

    constructor(skill: SkillId, action: SkillAction){
    super(action.description + '-action-feature');
    this.skillAction = action;
    this.skillId = skill;
}

    update(delta: number){
        if (this.skillAction.drain > 0 && this.skillAction.isStarted){
            const foodTypes = this._inventory.getHeldItemTypes();
            if (foodTypes.length <= 0){
                this.skillAction.isStarted = false;
                return;
            }
            const firstFood = foodTypes[0];
            if (firstFood instanceof(Food)){
                this._inventory.consumeItem(firstFood,(delta / firstFood.foodValue * this.skillAction.drain));
            }
            else{
                this.skillAction.isStarted = false;
                return;
            }
        }

        delta = delta * this.skillAction.skill.reward;
        this.skillAction.perform(delta);
        if (this.skillAction.isStarted){
            this.skillAction.skill.gainExperience(delta);
        }
        this.skillAction.skill.onLevelUp.subscribe(() => 
            this.skillAction.skill.setReward());
    }

    initialize(features: Features): void {
        this.skillAction.skill = features.skills.getSkill(this.skillId);
        this.skillAction.initialize(features);
        this._inventory = features.foodInventory;
    }

    load(data: ActionSaveData): void {
        this.skillAction.skill.setReward();
        this.skillAction.currentProgress = data.progress;
    }
    save(): ActionSaveData {
        return {
            description: this.skillAction.description,
            progress: this.skillAction.currentProgress,
        }
    }
    
}