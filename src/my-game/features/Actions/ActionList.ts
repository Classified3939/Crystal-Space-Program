import { App } from "@/App";
import { Features } from "@/my-game/Features";
import { IgtFeature } from "incremental-game-template";
import { Inventory } from "../Inventory/Inventory";
import { ActionListSaveData } from "./ActionListSaveData";
import { ActionSaveData } from "./ActionSaveData";
import { ActionId } from "./ActionTypes/ActionId";
import { AllActions } from "./ActionTypes/AllActions";
import { SkillActionFeature } from "./SkillActionFeature";
const rafLoop = require('raf-loop');

export class ActionList extends IgtFeature{
    features = undefined as unknown as Features;
    actions: SkillActionFeature[];
    engine: any = null;

    constructor(){
        super("action-list");
        this.actions = new Array<SkillActionFeature>();
        this.defaultActions();
    }

    getActions(): SkillActionFeature[]{
        return this.actions;
    }

    setActions(newActions: SkillActionFeature[]){
        if (this.features){
            for (const action of newActions){
                action.initialize(this.features);
            }
        }
        console.log("newactions",newActions);
        this.actions.splice(0);
        this.actions.push(...newActions);
    }

    initialize(features: Features): void {
        this.features = features;
        this.actions.forEach(action => {
            action.initialize(features);
        });
        this.engine = rafLoop((dt: number) =>{
            this.actionUpdate(dt/1000);
        });
        this.engine.start();
    }

    actionUpdate(delta: number): void {
        for (const action of this.actions){
            if (!action.skillAction.isStarted){
                action.skillAction.skill.setReward();
                action.skillAction.tickDuration = 
                    Math.ceil(action.skillAction.duration / action.skillAction.skill.reward/(1/60));
            }
            else{
                action.skillAction.run(delta,action.skillAction.tickDuration);
            }
        }
    }


    defaultActions(): void{
        this.setActions(new Array<SkillActionFeature>(
            this.makeActionFeature(ActionId.GatherMoss),
            ));
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
            if (this.actions[i]){
                this.actions[i].load(actionData);
            }
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