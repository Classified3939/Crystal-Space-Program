import { IgtFeature } from "incremental-game-template";
import { AllLocations } from "./AllLocations";
import { LocationType } from "./Base/LocationType";
import { Location } from "./Location";
import { Features } from "@/my-game/Features";
import { ActionList } from "../Actions/ActionList";
import { AllListeners } from "../Listeners/AllListeners";
import { LocationGroupName } from "./Base/LocationGroupName";
import { PlayerLocationSaveData } from "./PlayerLocationSaveData";
import { SkillActionFeature } from "../Actions/SkillActionFeature";
import { EventId, EventType } from "../Listeners/EventId";
import { LocationId } from "./Base/LocationId";

export class PlayerLocationFeature extends IgtFeature {

    locations = undefined as unknown as AllLocations;
    locationGroupName: LocationGroupName;
    locationGroup: Location[] = [];
    playerLocation: Location | null = null;
    actionList = undefined as unknown as ActionList;
    listeners = undefined as unknown as AllListeners;

    constructor() {
        super("player-location-feature");
        this.locationGroupName = LocationGroupName.StartingMine
    }

    initialize(features: Features): void {
        this.locations = features.allLocations;
        this.locationGroup = this.locations.locationGroups.get(this.locationGroupName)!
        this.playerLocation = this.locationGroup.find(l => l.identifier.type === LocationType.StartArea)!;
        this.actionList = features.actionList;
        this.listeners = features.eventListeners;
        this.listeners.setActionListeners(this.playerLocation!);
        this.listeners.setInventoryListeners(this.playerLocation!, this.listeners.foodInventory.saveKey)
        this.listeners.setInventoryListeners(this.playerLocation!, this.listeners.crystalInventory.saveKey)
        this.updateActions();
    }

    travel(location: LocationId): void {
        for (const action of this.actionList.actions) {
            action.stop();
            action.skillAction.currentProgress = 0;
            action.skillAction.isStarted = false;
            action.skillAction.intervalNumber = 0;
        }
        this.playerLocation = this.locationGroup.find(l => l.identifier.id === location)!;
        this.listeners.setActionListeners(this.playerLocation!);
        this.listeners.setInventoryListeners(this.playerLocation!, this.listeners.foodInventory.saveKey)
        this.listeners.setInventoryListeners(this.playerLocation!, this.listeners.crystalInventory.saveKey)
        this.updateActions();
    }

    updateActions(): void {
        console.log("UPDATING ACTIONS")
        this.listeners.eventFired.unsub(e => {
            console.log("EVENT", e)
            this.checkEvent(e);
            console.log("RECURSION?")
            this.updateActions();
        })
        const actions = new Array<SkillActionFeature>()
        for (const i of this.playerLocation!.getActions()) {
            actions.push(i.skillFeature);
        }
        this.actionList.setActions(actions);
        this.listeners.eventFired.one(e => {
            console.log("EVENT", e)
            this.checkEvent(e);
            console.log("RECURSION?")
            this.updateActions();
        })
    }

    checkEvent(event: EventId) {
        if (event.type === EventType.Travel) {
            this.travel(event.location)
        }
        else {
            for (const location of this.locationGroup) {
                location.checkRequirements(event);
            }
        }
    }


    load(data: PlayerLocationSaveData): void {
        if (data.locationGroupName === null) {
            return
        }
        this.locationGroupName = data.locationGroupName;
        this.locationGroup = this.locations.locationGroups.get(this.locationGroupName)!;
        console.log(this.locationGroup.find(l => data.currentLocationIdentifier.id === l.identifier.id)!.identifier.id);
        this.travel(this.locationGroup.find(l => data.currentLocationIdentifier.id === l.identifier.id)!.identifier.id);
    }

    save(): PlayerLocationSaveData {
        console.log(this.locationGroupName);
        return { locationGroupName: this.locationGroupName, currentLocationIdentifier: this.playerLocation!.identifier }
    }
}