import { IgtFeature, NoRequirement } from "incremental-game-template";
import { ActionId } from "../Actions/ActionTypes/ActionId";
import { AllActions } from "../Actions/ActionTypes/AllActions";
import { SkillActionFeature } from "../Actions/SkillActionFeature";
import { EventId, EventType } from "../Listeners/EventId";
import {Location} from "./Location";
import { LocationGroupName } from "./Base/LocationGroupName";
import { LocationId } from "./Base/LocationId";
import { LocationIdentifier } from "./Base/LocationIdentifier";
import { AllLocationSaveData, LocationGroupSaveData, LocationSaveData } from "./LocationSaveData";
import { LocationType } from "./Base/LocationType"
import { Features } from "@/my-game/Features";
import { PlayerLocationFeature } from "./PlayerLocationFeature";

export class AllLocations extends IgtFeature{

locationGroups: Map<LocationGroupName,Location[]> = new Map<LocationGroupName,Location[]>();
locationGroupNames: Array<LocationGroupName> = [LocationGroupName.StartingMine];
playerLocation = undefined as unknown as PlayerLocationFeature

    constructor(){
        super("all-locations");
        console.log(this.locationGroupNames);
        this.makeGroups();
    }

    initialize(features: Features): void {
        this.playerLocation = features.playerLocation;
    }

    createLocationGroup(name: LocationGroupName){
        let locations = new Array<Location>();
        if (name === LocationGroupName.StartingMine){
            locations = [
                new Location(
                    new LocationIdentifier(LocationType.StartArea,LocationId.MineshaftStartCave),
                    "The Beginning",
                    new Array<SkillActionFeature>(
                        this.makeActionFeature(ActionId.GatherFood,name),
                        this.makeActionFeature(ActionId.LookForExits,name),
                        this.makeActionFeature(ActionId.LeaveArea,name),
                    ),
                    new NoRequirement(),
                    new Map<EventId, boolean>([
                        [
                            {type:EventType.Nothing, name:""},
                            true,
                        ],
                        [
                            {type:EventType.GainItem, name:"caveMoss"},
                            false,
                        ],
                        [
                            {type:EventType.RevealArea, name:"exits"},
                            false,
                        ],
                    ]),
                )
            ]
        }
        this.locationGroups.set(name,locations);
    }

    makeGroups(){
        for (const name  of this.locationGroupNames){
            this.createLocationGroup(name);
        }
    }

    makeActionFeature(id: ActionId, area: LocationGroupName): SkillActionFeature{
        const fullAction = AllActions.find(e=>e.actionId===id&&e.area===area)!;
        const skill = fullAction.actionDetails.skill;
        const action = fullAction.actionDetails.action;
        return new SkillActionFeature(skill,action);
    }


    load(data: AllLocationSaveData): void {
        if (!data.locationGroups){
            return;
        }
        for (const groupName of this.locationGroupNames){
            const group = this.locationGroups.get(groupName)!
            const groupData = data.locationGroups.find(l => l.locationGroupName === groupName)!;
            console.log(groupData);
            for (const loc of group){
                const locData = groupData.locations.find(l => loc.identifier.equals(l.identifier))!
                console.log("locData",locData);
                for (const event of locData.events){
                    const key = Array.from(loc.actionRequirements.keys()).find(k => k.name === event.name && k.type === event.type)!;
                    loc.actionRequirements.set(key,locData.unlocked[locData.events.indexOf(event)]);
                }
            }
        }
        this.playerLocation.updateActions();
        this.playerLocation.actionList.loadFromSave();
    }
    save(): AllLocationSaveData {
        const allSave = new Array<LocationGroupSaveData>();
        for (const groupName of this.locationGroupNames){
            const groupSave = new Array<LocationSaveData>()
            for (const loc of this.locationGroups.get(groupName)!){
                const events = Array.from(loc.actionRequirements.keys());
                const unlocked = Array.from(loc.actionRequirements.values());
                const locSave = {identifier: loc.identifier, events:events, unlocked: unlocked};
                groupSave.push(locSave);
            }
            allSave.push({locationGroupName:groupName,locations:groupSave});
        }

        console.log({locationGroups:allSave});
        return {locationGroups:allSave};
    }

}