import { Features } from "@/my-game/Features";
import { IgtFeature, SaveData } from "incremental-game-template";
import { SimpleEventDispatcher } from "strongly-typed-events";
import { Location } from "@/my-game/Features/Locations/Location"
import { EventAction } from "../Actions/ActionTypes/EventAction";
import { SkillActionFeature } from "../Actions/SkillActionFeature";
import { Inventory } from "../Inventory/Inventory";
import { CaveMoss } from "../Items/ItemTypes/CaveMoss";
import { AllLocations } from "../Locations/AllLocations";
import { LocationGroupName } from "../Locations/Base/LocationGroupName";
import { EventActionListener } from "./EventActionListener";
import { EventId } from "./EventId";
import { InventoryListener } from "./InventoryListener";
import { PlayerLocationFeature } from "../Locations/PlayerLocationFeature";
import { LocationId } from "../Locations/Base/LocationId";
import { InfraredCrystal } from "../Items/ItemTypes/InfraredCrystal";

export class AllListeners extends IgtFeature {
    actionListeners: EventActionListener[];
    inventoryListeners: InventoryListener[];
    allLocations = undefined as unknown as AllLocations;
    playerLocation = undefined as unknown as PlayerLocationFeature;
    foodInventory = undefined as unknown as Inventory;
    crystalInventory = undefined as unknown as Inventory;
    private _eventFired = new SimpleEventDispatcher<EventId>();

    constructor() {
        super("listeners")
        this.actionListeners = new Array<EventActionListener>();
        this.inventoryListeners = new Array<InventoryListener>();
    }

    initialize(features: Features): void {
        this.allLocations = features.allLocations;
        this.playerLocation = features.playerLocation;
        this.foodInventory = features.foodInventory;
        this.crystalInventory = features.crystalInventory;
    }

    setActionListeners(location: Location) {
        console.log("SETTING ACTION LISTENERS FOR", location.displayName);
        for (const listener of this.actionListeners) {
            listener.eventFired.unsub(e => {
                console.log(e.name, e.type);
                this._eventFired.dispatch(e);
            });
        }
        this.actionListeners.splice(0);
        function isEventAction(actionFeature: SkillActionFeature): boolean {
            return actionFeature.skillAction instanceof EventAction;
        }
        const eventActions = location.locationActions.filter(e => isEventAction(e.skillFeature));
        for (const eAction of eventActions) {
            this.actionListeners.push(new EventActionListener(eAction.skillFeature.skillAction as EventAction));
        }
        for (const listener of this.actionListeners) {
            listener.eventFired.one(e => {
                console.log(e.name, e.type);
                this._eventFired.dispatch(e);
            });
        }
        console.log("FINISHED SETTING LISTENERS");
    }

    setInventoryListeners(location: Location, name: string) {
        console.log("SETTING INVENTORY LISTENERS FOR")
        for (const listener of this.inventoryListeners) {
            listener.eventFired.unsub(e => {
                console.log(e.name, e.type);
                this._eventFired.dispatch(e);
            })
        }
        this.inventoryListeners.splice(0);
        if (name === "food-inventory") {
            console.log("FOOD INVENTORY")
            this.inventoryListeners.push(new InventoryListener(this.foodInventory, new CaveMoss(), 5, LocationId.Any));
        }
        else if (name === "crystal-inventory") {
            console.log("CRYSTAL INVENTORY");
            if (location.identifier.id === LocationId.MineshaftCrystalCave) {
                this.inventoryListeners.push(new InventoryListener(this.crystalInventory, new InfraredCrystal(), 1, LocationId.MineshaftCrystalCave))
            }
        }
        for (const listener of this.inventoryListeners) {
            listener.eventFired.one(e => {
                console.log(e.name, e.type);
                this._eventFired.dispatch(e);
            })
        }
    }

    public get eventFired() {
        return this._eventFired.asEvent();
    }

    load(data: SaveData): void {
        //Empty
    }
    save(): SaveData {
        return {};
    }
}