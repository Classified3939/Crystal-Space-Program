import { IgtFeature } from "incremental-game-template";
import { AllLocations } from "./AllLocations";
import { LocationType } from "./Base/LocationType";
import {Location} from "./Location";
import { Features } from "@/my-game/Features";
import { ActionList } from "../Actions/ActionList";
import { AllListeners } from "../Listeners/AllListeners";
import { LocationGroupName } from "./Base/LocationGroupName";
import { PlayerLocationSaveData } from "./PlayerLocationSaveData";
import { SkillActionFeature } from "../Actions/SkillActionFeature";
import { Skill } from "../Skills/Skill";

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
        this.updateActions();
    }

    updateActions(): void{
        this.listeners.eventFired.unsub(e =>{
            for (const location of this.locationGroup){
                location.checkRequirements(e);
            }
            this.updateActions();
        })
        const actions = new Array<SkillActionFeature>()
        for (const i of this.playerLocation!.getActions()){
            actions.push(i.skillFeature);
        }
        this.actionList.setActions(actions);
        this.listeners.setActionListeners(this.actionList);
        this.listeners.eventFired.one(e =>{
            for (const location of this.locationGroup){
                location.checkRequirements(e);
            }
            this.updateActions();
        })
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