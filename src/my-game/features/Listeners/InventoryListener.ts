import { EventAction } from "@/my-game/features/Actions/ActionTypes/EventAction"
import { Inventory } from "../Inventory/Inventory";
import { AbstractItem } from "../Items/Base/AbstractItem";
import { LocationId } from "../Locations/Base/LocationId";
import { PlayerLocationFeature } from "../Locations/PlayerLocationFeature";
import { EventType } from "./EventId";
import { EventListener } from "./EventListener";

export class InventoryListener extends EventListener {

    inventory: Inventory;
    item: AbstractItem;
    amount: number

    constructor(inventory: Inventory, item: AbstractItem, amount: number, location: LocationId,) {
        super({ type: EventType.GainItem, name: inventory.saveKey, location: location });
        this.inventory = inventory;
        this.item = item;
        this.amount = amount;

        this.inventory.onItemGain.subscribe((i, a, ev) => {
            console.log("ITEM GAIN");
            if (a >= this.amount) {
                console.log(i, a);
                console.log("FIRED");
                this._eventFired.dispatch({ type: EventType.GainItem, name: i.id, location: location })
                ev.unsub();
            }
        });
    }
}