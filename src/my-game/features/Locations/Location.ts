import { NoRequirement, Requirement } from "incremental-game-template";
import { SkillActionFeature } from "../Actions/SkillActionFeature";
import { EventId, EventType } from "../Listeners/EventId";
import { LocationIdentifier } from "./LocationIdentifier";

export class Location{
    identifier: LocationIdentifier;
    displayName: string;

    possibleActions: SkillActionFeature[];

    requirement: Requirement;

    actionRequirements: Map<EventId,boolean>;

    constructor(
            identifier: LocationIdentifier, 
            displayName: string, 
            possibleActions: SkillActionFeature[] = [],
            requirement: Requirement = new NoRequirement(),
            actionRequirements: Map<EventId,boolean>,
        ){

        this.identifier = identifier;
        this.displayName = displayName;
        this.possibleActions = possibleActions;
        this.requirement = requirement;
        this.actionRequirements = actionRequirements
    }

    canTravel(): boolean{
        return this.requirement.isCompleted;
    }

    isActionUnlocked(element: SkillActionFeature, index: number, array: SkillActionFeature[]): boolean{
        return Array.from(this.actionRequirements.values())[index];
    }

    getActions(){
        const values = Array.from(this.actionRequirements.values());
        return this.possibleActions.filter(function(element, index, array){
            return values[index];
        })
    }

    checkRequirements(event: EventId){
        if (event.type !== EventType.Reset){
            for (const condition of this.actionRequirements.keys()){
                if (condition.name === event.name && condition.type === event.type){
                    this.actionRequirements.set(condition,true);
                }
            }
        }
        else{
            for (const condition of this.actionRequirements.keys()){
                if (condition.type !== EventType.Nothing){
                    this.actionRequirements.set(condition,false);
                }
            }
        }
    }
}