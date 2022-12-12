import { SkillAction } from "./ActionTypes/SkillAction";
import { IgtFeature } from "incremental-game-template";
import { Features } from "@/my-game/Features";
import { SkillId } from "../Skills/SkillId";
import { ActionSaveData } from "./ActionSaveData";
import { Inventory } from "../Inventory/Inventory";

export class SkillActionFeature extends IgtFeature{
    skillAction: SkillAction;
    skillId: SkillId;
    _inventory: Inventory = undefined as unknown as Inventory

    constructor(skill: SkillId, action: SkillAction){
    super(action.description + '-action-feature');
    this.skillAction = action;
    this.skillId = skill;
    }

    /*gainExpFromAction(amount: number): void{
        this.skillAction.perform(amount*this.skillAction.skill.reward);
        if (this.skillAction.isStarted){
            const tickDuration = Math.ceil(this.skillAction.duration / this.skillAction.skill.reward /
            0.05)
            console.log("tickduration",tickDuration);
            this.skillAction.skill.gainExperience(this.skillAction.duration/tickDuration);
        }
        this.skillAction.skill.onLevelUp.subscribe(() => 
            this.skillAction.skill.setReward());
    }*/

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