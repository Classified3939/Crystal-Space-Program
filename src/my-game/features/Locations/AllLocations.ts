import { IgtFeature, NoRequirement } from "incremental-game-template";
import { ActionId } from "../Actions/ActionTypes/ActionId";
import { AllActions } from "../Actions/ActionTypes/AllActions";
import { SkillActionFeature } from "../Actions/SkillActionFeature";
import { EventId, EventType } from "../Listeners/EventId";
import { Location } from "./Location";
import { LocationGroupName } from "./Base/LocationGroupName";
import { LocationId } from "./Base/LocationId";
import { LocationIdentifier } from "./Base/LocationIdentifier";
import { AllLocationSaveData, LocationGroupSaveData, LocationSaveData } from "./LocationSaveData";
import { LocationType } from "./Base/LocationType"
import { Features } from "@/my-game/Features";
import { PlayerLocationFeature } from "./PlayerLocationFeature";
import { LocationAction } from "./Base/LocationAction";
import { EventAction } from "../Actions/ActionTypes/EventAction";

export class AllLocations extends IgtFeature {

    locationGroups: Map<LocationGroupName, Location[]> = new Map<LocationGroupName, Location[]>();
    locationGroupNames: Array<LocationGroupName> = [LocationGroupName.StartingMine];
    playerLocation = undefined as unknown as PlayerLocationFeature

    constructor() {
        super("all-locations");
        console.log(this.locationGroupNames);
        this.makeGroups();
    }

    initialize(features: Features): void {
        this.playerLocation = features.playerLocation;
    }

    createLocationGroup(name: LocationGroupName) {
        let locations = new Array<Location>();
        if (name === LocationGroupName.StartingMine) {
            locations = [
                new Location(
                    new LocationIdentifier(LocationType.StartArea, LocationId.MineshaftStartCave),
                    "The Beginning",
                    new Array<LocationAction>(
                        new LocationAction(
                            this.makeActionFeature(ActionId.GatherFood, name),
                            new Map<EventId, boolean>([
                                [{ type: EventType.Nothing, name: "", location: LocationId.Any }, true]
                            ]),
                            true,
                            false,
                        ),
                        new LocationAction(
                            this.makeActionFeature(ActionId.LookForExits, name, LocationId.MineshaftStartCave),
                            new Map<EventId, boolean>([
                                [{ type: EventType.GainItem, name: "caveMoss", location: LocationId.Any }, true],
                                [{ type: EventType.RevealArea, name: "exits", location: LocationId.MineshaftStartCave }, false]
                            ]),
                            false, false,
                        ),
                        new LocationAction(
                            this.makeActionFeature(ActionId.LeaveArea, name),
                            new Map<EventId, boolean>([
                                [{ type: EventType.RevealArea, name: "exits", location: LocationId.MineshaftStartCave }, true],
                            ]),
                            false, false,
                        )
                    )
                ),
                new Location(
                    new LocationIdentifier(LocationType.CrystalArea, LocationId.MineshaftCrystalCave),
                    "Cave with a strange crystal...",
                    new Array<LocationAction>(
                        new LocationAction(
                            this.makeActionFeature(ActionId.GatherFood, name),
                            new Map<EventId, boolean>([
                                [{ type: EventType.Nothing, name: "", location: LocationId.Any }, true]
                            ]),
                            true,
                            false,
                        ),
                        new LocationAction(
                            this.makeActionFeature(ActionId.GatherCrystal, name),
                            new Map<EventId, boolean>([
                                [{ type: EventType.Nothing, name: "", location: LocationId.Any }, true],
                                [{ type: EventType.GainItem, name: "infraredCrystal", location: LocationId.MineshaftCrystalCave }, false],
                            ]),
                            true,
                            false,
                        ),
                    )
                )
            ]
        }
        this.locationGroups.set(name, locations);
    }

    makeGroups() {
        for (const name of this.locationGroupNames) {
            this.createLocationGroup(name);
        }
    }

    makeActionFeature(id: ActionId, area: LocationGroupName, loc: LocationId | null = null): SkillActionFeature {
        const fullAction = AllActions.find(e => e.actionId === id && e.area === area)!;
        const skill = fullAction.actionDetails.skill;
        const action = fullAction.actionDetails.action;
        if (action instanceof EventAction && loc) {
            action.setLocation(loc);
        }
        return new SkillActionFeature(skill, action);
    }


    load(data: AllLocationSaveData): void {
        if (!data.locationGroups) {
            return;
        }
        for (const groupName of this.locationGroupNames) {
            const group = this.locationGroups.get(groupName)!
            const groupData = data.locationGroups.find(l => l.locationGroupName === groupName)!;
            console.log(groupData);
            for (const loc of group) {
                console.log(groupData.locations);
                const locData = groupData.locations.find(l => loc.identifier.equals(l.identifier))!;
                for (const action of loc.locationActions) {
                    action.active = locData.unlocked[loc.locationActions.indexOf(action)];
                    action.locked = locData.locked[loc.locationActions.indexOf(action)];
                }
            }
        }
        this.playerLocation.updateActions();
        this.playerLocation.actionList.loadFromSave();
    }
    save(): AllLocationSaveData {
        const allSave = new Array<LocationGroupSaveData>();
        for (const groupName of this.locationGroupNames) {
            const groupSave = new Array<LocationSaveData>()
            for (const loc of this.locationGroups.get(groupName)!) {
                const locSave = { identifier: loc.identifier, unlocked: new Array<boolean>(), locked: new Array<boolean>() }
                for (const action of loc.locationActions) {
                    locSave.unlocked.push(action.active);
                    locSave.locked.push(action.locked);
                }
                console.log(locSave);
                groupSave.push(locSave);
            }
            allSave.push({ locationGroupName: groupName, locations: groupSave });
        }

        console.log({ locationGroups: allSave });
        return { locationGroups: allSave };
    }

}