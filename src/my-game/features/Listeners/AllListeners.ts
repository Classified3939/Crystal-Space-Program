import { Features } from "@/my-game/Features";
import { IgtFeature, SaveData } from "incremental-game-template";
import { SimpleEventDispatcher } from "strongly-typed-events";
import {Location} from "@/my-game/Features/Locations/Location"
import { EventAction } from "../Actions/ActionTypes/EventAction";
import { SkillActionFeature } from "../Actions/SkillActionFeature";
import { Inventory } from "../Inventory/Inventory";
import { CaveMoss } from "../Items/ItemTypes/CaveMoss";
import { AllLocations } from "../Locations/AllLocations";
import { LocationGroupName } from "../Locations/Base/LocationGroupName";
import { EventActionListener } from "./EventActionListener";
import { EventId } from "./EventId";
import { InventoryListener } from "./InventoryListener";

export class AllListeners extends IgtFeature{
    actionListeners: EventActionListener[];
    inventoryListeners: InventoryListener[];
    allLocations = undefined as unknown as AllLocations;
    private _eventFired = new SimpleEventDispatcher<EventId>();

    constructor(){
        super("listeners")
        this.actionListeners = new Array<EventActionListener>();
        this.inventoryListeners = new Array<InventoryListener>();
    }

    initialize(features: Features): void {
        this.allLocations = features.allLocations;
        this.setActionListeners(this.allLocations.locationGroups.get(LocationGroupName.StartingMine)![0]!)
        this.setInventoryListeners(features.foodInventory,features.foodInventory.saveKey);
    }

    setActionListeners(location: Location){
        console.log("SETTING ACTION LISTENERS FOR",location.displayName);
        for (const listener of this.actionListeners){
            listener.eventFired.unsub(e=>{
                this._eventFired.dispatch(e);
            });
        }
        function isEventAction(actionFeature: SkillActionFeature): boolean {
            return actionFeature.skillAction instanceof EventAction;
        }
        const eventActions = location.locationActions.filter(e=>isEventAction(e.skillFeature));
        for (const eAction of eventActions){
            this.actionListeners.push(new EventActionListener(eAction.skillFeature.skillAction as EventAction));
        }
        for (const listener of this.actionListeners){
            listener.eventFired.one(e=>{
                this._eventFired.dispatch(e);
            });
        }
        console.log("FINISHED SETTING LISTENERS");
    }

    setInventoryListeners(inventory: Inventory, name: string){
        for (const listener of this.inventoryListeners){
            listener.eventFired.unsub(e=>{
                console.log(e.name,e.type);
                this._eventFired.dispatch(e);
            })
        }
        if (name === "food-inventory"){
            this.inventoryListeners.push(new InventoryListener(inventory,new CaveMoss(),5));
        }

        for (const listener of this.inventoryListeners){
            listener.eventFired.one(e=>{
                console.log(e.name,e.type);
                this._eventFired.dispatch(e);
            })
        }
    }

    public get eventFired(){
        return this._eventFired.asEvent();
    }

    load(data: SaveData): void {
     //Empty
    }
    save(): SaveData {
        return {};
    }
}