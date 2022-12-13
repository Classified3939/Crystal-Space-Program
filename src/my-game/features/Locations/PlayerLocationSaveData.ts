import { SaveData } from "incremental-game-template";
import { LocationGroupName } from "./Base/LocationGroupName";
import { LocationId } from "./Base/LocationId";
import { LocationIdentifier } from "./Base/LocationIdentifier";

export interface PlayerLocationSaveData extends SaveData{
    locationGroupName: LocationGroupName;
    currentLocationIdentifier: LocationIdentifier;
}