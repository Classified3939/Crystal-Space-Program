import { Features } from "@/my-game/Features";
import { IgtFeature, SaveData } from "incremental-game-template";
import { SimpleEventDispatcher } from "strongly-typed-events";
import { ActionList } from "../Actions/ActionList";
import { EventAction } from "../Actions/ActionTypes/EventAction";
import { SkillActionFeature } from "../Actions/SkillActionFeature";
import { Inventory } from "../Inventory/Inventory";
import { CaveMoss } from "../Items/ItemTypes/CaveMoss";
import { EventActionListener } from "./EventActionListener";
import { EventId } from "./EventId";
import { InventoryListener } from "./InventoryListener";

export class AllListeners extends IgtFeature{
    actionListeners: EventActionListener[];
    inventoryListeners: InventoryListener[];
    private _eventFired = new SimpleEventDispatcher<EventId>();

    constructor(){
        super("listeners")
        this.actionListeners = new Array<EventActionListener>();
        this.inventoryListeners = new Array<InventoryListener>();
    }

    initialize(features: Features): void {
        this.setActionListeners(features.actionList)
        this.setInventoryListeners(features.foodInventory,features.foodInventory.saveKey);
    }

    setActionListeners(actionList: ActionList){
        function isEventAction(actionFeature: SkillActionFeature): boolean {
            return actionFeature.skillAction instanceof EventAction;
        }
        const eventActions = actionList.actions.filter(isEventAction);
        for (const eAction of eventActions){
            this.actionListeners.push(new EventActionListener(eAction.skillAction as EventAction));
        }
        for (const listener of this.actionListeners){
            listener.eventFired.sub(e=>{
                console.log(e.name,e.type)
                this._eventFired.dispatch(e);
            });
        }
    }

    setInventoryListeners(inventory: Inventory, name: string){
        if (name === "food-inventory"){
            this.inventoryListeners.push(new InventoryListener(inventory,new CaveMoss(),5));
        }
        
        for (const listener of this.inventoryListeners){
            listener.eventFired.sub(e=>{
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