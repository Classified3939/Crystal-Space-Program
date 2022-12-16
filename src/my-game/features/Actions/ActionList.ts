import { Features } from "@/my-game/Features";
import { IgtFeature, SaveData } from "incremental-game-template";
import { LocationGroupName } from "../Locations/Base/LocationGroupName";
import { ActionListSaveData } from "./ActionListSaveData";
import { ActionSaveData } from "./ActionSaveData";
import { ActionId } from "./ActionTypes/ActionId";
import { AllActions } from "./ActionTypes/AllActions";
import { SkillActionFeature } from "./SkillActionFeature";
const rafLoop = require('raf-loop');

export class ActionList extends IgtFeature {
    features = undefined as unknown as Features;
    actionSave = undefined as unknown as ActionListSaveData;
    actions: SkillActionFeature[];
    engine: any = null;

    constructor(saveKey: string) {
        super(saveKey);
        this.actions = new Array<SkillActionFeature>();
        this.defaultActions();
    }

    getActions(): SkillActionFeature[] {
        return this.actions;
    }

    setActions(newActions: SkillActionFeature[]) {
        if (this.features) {
            for (const action of newActions) {
                action.initialize(this.features);
            }
        }
        this.actions.splice(0);
        this.actions.push(...newActions);
    }

    initialize(features: Features): void {
        this.features = features;
        this.actions.forEach(action => {
            action.initialize(features);
        });
        this.engine = rafLoop((dt: number) => {
            this.actionUpdate(dt / 1000);
        });
        this.engine.start();
    }

    actionUpdate(delta: number): void {
        for (const action of this.actions) {
            if (!action.skillAction.isStarted) {
                action.skillAction.skill.setReward();
                action.skillAction.tickDuration =
                    Math.ceil(action.skillAction.duration / action.skillAction.skill.reward / (1 / 60));
            }
            else {
                action.skillAction.run(delta, action.skillAction.tickDuration);
            }
        }
    }


    defaultActions(): void {
        this.setActions(new Array<SkillActionFeature>(
            this.makeActionFeature(ActionId.GatherFood, LocationGroupName.StartingMine),
        ));
    }

    makeActionFeature(id: ActionId, area: LocationGroupName): SkillActionFeature {
        const fullAction = AllActions.find(e => e.actionId === id && e.area === area)!;
        const skill = fullAction.actionDetails.skill;
        const action = fullAction.actionDetails.action;
        return new SkillActionFeature(skill, action);
    }

    load(data: ActionListSaveData): void {
        this.actionSave = data;
    }

    loadFromSave(): void {

        if (!this.actionSave.actions) {
            return
        }
        for (let i = 0; i < this.actionSave.actions.length; i++) {
            const actionData: ActionSaveData = this.actionSave.actions[i];
            if (this.actions[i]) {
                this.actions[i].load(actionData);
            }
        }
    }
    save(): ActionListSaveData {
        const actions = this.actions.map(action => {
            return action.save();
        });
        return {
            actions: actions
        }
    }

}