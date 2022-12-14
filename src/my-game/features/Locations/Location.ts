import { NoRequirement, Requirement } from "incremental-game-template";
import { SkillActionFeature } from "../Actions/SkillActionFeature";
import { EventId, EventType } from "../Listeners/EventId";
import { LocationAction } from "./Base/LocationAction";
import { LocationIdentifier } from "./Base/LocationIdentifier";

export class Location{
    identifier: LocationIdentifier;
    displayName: string;
    requirement: Requirement;
    locationActions: LocationAction[];

    constructor(
            identifier: LocationIdentifier, 
            displayName: string, 
            requirement: Requirement = new NoRequirement(),
            locationActions: LocationAction[],
        ){

        this.identifier = identifier;
        this.displayName = displayName;
        this.requirement = requirement;
        this.locationActions = locationActions;
    }

    canTravel(): boolean{
        return this.requirement.isCompleted;
    }

    getActions(){
        return this.locationActions.filter((e)=>e.active)
    }

    checkRequirements(event: EventId){
        if (event.type !== EventType.Reset){
            for (const action of this.locationActions){
                for (const actionEvent of action.affectedBy){
                    if (actionEvent[0].name === event.name && actionEvent[0].type === event.type){
                        action.active = actionEvent[1];
                    }
                }
            }
        }
        else{
            for (const action of this.locationActions){
                for (const actionEvent of action.affectedBy){
                    if (actionEvent[0].type !== EventType.Nothing){
                        action.active = actionEvent[1];
                    }
                }
            }
        }
    }
}