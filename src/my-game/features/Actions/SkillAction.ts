import { IgtAction } from "incremental-game-template";
import { Skill } from "../Skills/Skill";
import { SkillId } from "../Skills/SkillId";

export class SkillAction extends IgtAction{

    skill: Skill;

    constructor(description: string, duration: number){
        super(description,duration);
        this.skill = new Skill('Blank',SkillId.Blank,"None");
    }

    gainReward(): boolean{
        console.log("TEST");
        return true;
    }
}