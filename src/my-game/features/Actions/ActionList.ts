import { Features } from "@/my-game/Features";
import { IgtFeature } from "incremental-game-template";
import { ActionListSaveData } from "./ActionListSaveData";
import { ActionSaveData } from "./ActionSaveData";
import { ActionId } from "./ActionTypes.ts/ActionId";
import { AllActions } from "./ActionTypes.ts/AllActions";
import { SkillActionFeature } from "./SkillActionFeature";

export class ActionList extends IgtFeature{
    private actions: SkillActionFeature[];

    constructor(){
        super("action-list");
        this.actions = new Array<SkillActionFeature>();
        this.defaultActions();
    }

    getActions(): SkillActionFeature[]{
        return this.actions;
    }

    setActions(newActions: ActionId[]){
        this.actions.splice(0);
        for(let i = 0; i < newActions.length; i++){
            this.actions.push(this.makeActionFeature(newActions[i]));
        }
    }

    initialize(features: Features): void {
        this.actions.forEach(action => {
            action.initialize(features);
        });
    }

    update(delta: number): void {
        this.actions.forEach(action => {
            if (!action.skillAction.isStarted){
                //console.log(action.skillAction.tickDuration);
                action.skillAction.tickDuration = 
                    Math.ceil(action.skillAction.duration / action.skillAction.skill.reward/0.05);
            }
        })
    }


    defaultActions(): void{
        this.setActions(new Array<ActionId>(ActionId.GatherMoss,ActionId.LookForExits));
    }

    makeActionFeature(id: ActionId): SkillActionFeature{
        const skill = AllActions[id].skill;
        const action = AllActions[id].action;
        return new SkillActionFeature(skill,action);
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