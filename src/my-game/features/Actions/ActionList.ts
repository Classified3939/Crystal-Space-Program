import { Features } from "@/my-game/Features";
import { IgtFeature, SaveData } from "incremental-game-template";
import { SkillId } from "../Skills/SkillId";
import { SkillActionFeature } from "./SkillActionFeature";

export class ActionList extends IgtFeature{
    actions: SkillActionFeature[];

    constructor(){
        super("action-list");
        this.actions = new Array<SkillActionFeature>();
        this.actions.push(new SkillActionFeature("Gather Moss",3, SkillId.Gathering));
        this.actions.push(new SkillActionFeature("Explore Cave",5, SkillId.Exploration));
    }


    initialize(features: Features): void {
        this.actions.forEach(action => {
            action.initialize(features);
        });
    }

    update(delta: number): void {
        this.actions.forEach(action => {
            action.update(delta);
        });
    }


    load(data: SaveData): void {
        //Empty
    }
    save(): SaveData {
        return {};
    }
    
}