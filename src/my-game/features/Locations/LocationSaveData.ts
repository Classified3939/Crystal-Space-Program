import { SaveData } from "incremental-game-template";
import { EventId } from "../Listeners/EventId";
import { LocationGroupName } from "./Base/LocationGroupName";
import { LocationIdentifier } from "./Base/LocationIdentifier";

export interface LocationSaveData{
    identifier: LocationIdentifier;
    unlocked: boolean[]
    locked: boolean[]
}

export interface LocationGroupSaveData{
    locationGroupName: LocationGroupName;
    locations: LocationSaveData[];
}

export interface AllLocationSaveData extends SaveData{
    locationGroups: LocationGroupSaveData[];
}