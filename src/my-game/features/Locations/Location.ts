import { NoRequirement, Requirement } from "incremental-game-template";
import { SkillActionFeature } from "../Actions/SkillActionFeature";
import { EventId, EventType } from "../Listeners/EventId";
import { LocationAction } from "./Base/LocationAction";
import { LocationId } from "./Base/LocationId";
import { LocationIdentifier } from "./Base/LocationIdentifier";

export class Location{
    identifier: LocationIdentifier;
    displayName: string;
    locationActions: LocationAction[];

    constructor(
            identifier: LocationIdentifier, 
            displayName: string, 
            locationActions: LocationAction[],
        ){

        this.identifier = identifier;
        this.displayName = displayName;
        this.locationActions = locationActions;
    }

    getActions(){
        return this.locationActions.filter((e)=>e.active && !e.locked)
    }

    checkRequirements(event: EventId){
        if (event.type === EventType.Reset){
            for (const action of this.locationActions){
                for (const actionEvent of action.affectedBy){
                    if (actionEvent[0].type !== EventType.Nothing){
                        action.active = false;
                        action.locked = false;
                    }
                }
            }
        }
        else if (event.type === EventType.Travel){
            return
        }
        else{
            for (const action of this.locationActions){
                for (const actionEvent of action.affectedBy){
                    if (actionEvent[0].name === event.name && actionEvent[0].type === event.type && (actionEvent[0].location === event.location || event.location === LocationId.Any)){
                        if (actionEvent[1]){
                            action.active = true;
                        }
                        else{
                            action.locked = true;
                        }
                    }
                }
            }
        }
    }
}