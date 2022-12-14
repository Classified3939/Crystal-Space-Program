import {EventAction} from "@/my-game/features/Actions/ActionTypes/EventAction"
import { Inventory } from "../Inventory/Inventory";
import { AbstractItem } from "../Items/Base/AbstractItem";
import { LocationId } from "../Locations/Base/LocationId";
import { EventType } from "./EventId";
import { EventListener } from "./EventListener";

export class InventoryListener extends EventListener{

    inventory: Inventory;
    item: AbstractItem;
    amount: number

    constructor(inventory: Inventory,item: AbstractItem, amount: number){
        super({type:EventType.GainItem,name:inventory.saveKey,location:LocationId.Any});
        this.inventory = inventory;
        this.item = item;
        this.amount = amount;
        
        this.inventory.onItemGain.subscribe((i,a) =>{
            if(a >= this.amount){
                this._eventFired.dispatch({type:EventType.GainItem,name:i.id,location:LocationId.Any})
            }
        });
    }
}