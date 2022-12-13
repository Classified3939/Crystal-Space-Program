import { IgtFeature, SaveData } from "incremental-game-template";
import { AllLocations } from "./AllLocations";
import { LocationType } from "./Base/LocationType";
import {Location} from "./Location";
import { Features } from "@/my-game/Features";
import { ActionList } from "../Actions/ActionList";
import { AllListeners } from "../Listeners/AllListeners";
import { LocationGroupName } from "./Base/LocationGroupName";
import { PlayerLocationSaveData } from "./PlayerLocationSaveData";
import { LocationIdentifier } from "./Base/LocationIdentifier";

export class PlayerLocationFeature extends IgtFeature{

    locations = undefined as unknown as AllLocations;
    locationGroupName: LocationGroupName;
    locationGroup: Location[] = [];
    playerLocation: Location | null = null;
    actionList = undefined as unknown as ActionList;
    listeners = undefined as unknown as AllListeners;

    constructor(){
        super("player-location-feature");
        this.locationGroupName = LocationGroupName.StartingMine
    }

    initialize(features: Features): void {
        this.locations = features.allLocations;
        this.locationGroup = this.locations.locationGroups.get(this.locationGroupName)!
        this.playerLocation = this.locationGroup.find(l => l.identifier.type === LocationType.StartArea)!;
        this.actionList = features.actionList;
        this.listeners = features.eventListeners;
        this.listeners.eventFired.subscribe(e =>{
            for (const location of this.locationGroup){
                location.checkRequirements(e);
                this.updateActions();
                this.updateActions();
            }
        })
        this.updateActions();
    }

    updateActions(): void{
        this.actionList.setActions(this.playerLocation!.getActions());
    }


    load(data: PlayerLocationSaveData): void {
        if (!data.locationGroupName){
            return
        }
        this.locationGroupName = data.locationGroupName;
        this.locationGroup = this.locations.locationGroups.get(this.locationGroupName)!;
        this.playerLocation = this.locationGroup.find(l => l.identifier === data.currentLocationIdentifier)!;
    }
        
    save(): PlayerLocationSaveData {
        return {locationGroupName: this.locationGroupName, currentLocationIdentifier:this.playerLocation!.identifier}
    }
}