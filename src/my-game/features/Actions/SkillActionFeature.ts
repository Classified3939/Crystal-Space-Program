import { SkillAction } from "./SkillAction";
import { IgtFeature, SaveData } from "incremental-game-template";
import { Features } from "@/my-game/Features";
import { SkillId } from "../Skills/SkillId";

export class SkillActionFeature extends IgtFeature{
    skillAction: SkillAction;
    skillId: SkillId;

    constructor(description: string, duration: number, skill: SkillId){
    super('skill-action-feature');
    this.skillAction = new SkillAction(description,duration);
    this.skillId = skill;
}

    update(delta: number){
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
    }

    load(data: SaveData): void {
        this.skillAction.skill.setReward();
    }
    save(): SaveData {
        return {};
    }
    
}