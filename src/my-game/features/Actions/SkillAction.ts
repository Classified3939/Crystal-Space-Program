import { Features } from "@/my-game/Features";
import { IgtAction } from "incremental-game-template";
import { Skill } from "../Skills/Skill";
import { SkillId } from "../Skills/SkillId";

export class SkillAction extends IgtAction{

    skill: Skill;
    drain: number

    constructor(description: string, duration: number, drain: number){
        super(description,duration);
        this.skill = new Skill('Blank',SkillId.Blank,"None");
        this.drain = drain;
    }

    initialize(features: Features): void {
        return undefined;
    }

    gainReward(): boolean{
        console.log("TEST");
        return true;
    }
    
    stop(): void {
        this.isStarted = false;
    }
}