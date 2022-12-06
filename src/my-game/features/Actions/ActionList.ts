import { Features } from "@/my-game/Features";
import { IgtFeature, SaveData } from "incremental-game-template";
import { ItemList } from "../Items/ItemList";
import { CaveMoss } from "../Items/ItemTypes/CaveMoss";
import { SkillId } from "../Skills/SkillId";
import { ActionListSaveData } from "./ActionListSaveData";
import { ActionSaveData } from "./ActionSaveData";
import { ItemGainAction } from "./ItemGainAction";
import { SkillAction } from "./SkillAction";
import { SkillActionFeature } from "./SkillActionFeature";

export class ActionList extends IgtFeature{
    actions: SkillActionFeature[];

    constructor(){
        super("action-list");
        this.actions = new Array<SkillActionFeature>();
        this.actions.push(new SkillActionFeature(SkillId.Dexterity,new ItemGainAction("Gather Moss",3, new CaveMoss(), 1, 0)));
        this.actions.push(new SkillActionFeature(SkillId.Speed,new SkillAction("Explore Cave", 5, 1)));
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


    load(data: ActionListSaveData): void {
        if(!data.actions){
            return
        }
        for (let i = 0; i < data.actions.length; i++){
            const actionData: ActionSaveData = data.actions[i];

            this.actions[i].load(actionData);
        }
    }
    save(): ActionListSaveData {
        const actions = this.actions.map(action =>{
            return action.save();
        });
        return{
            actions: actions
        }
    }
    
}