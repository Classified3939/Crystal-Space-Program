import { IEventHandler } from "strongly-typed-events";
import { Inventory } from "../Inventory/Inventory";
import { AbstractItem } from "../Items/Base/AbstractItem";
import { LocationId } from "../Locations/Base/LocationId";
import { EventType } from "./EventId";
import { EventListener } from "./EventListener";

export class InventoryListener extends EventListener {

    inventory: Inventory;
    item: AbstractItem;
    amount: number;
    location: LocationId;
    handler: Function;

    constructor(inventory: Inventory, item: AbstractItem, amount: number, location: LocationId,) {
        super({ type: EventType.GainItem, name: inventory.saveKey, location: location });
        this.inventory = inventory;
        this.item = item;
        this.amount = amount;
        this.location = location;

        this.handler = this.inventory.onItemGain.subscribe((i, a, ev) => {
            if (a >= this.amount) {
                this._eventFired.dispatch({ type: EventType.GainItem, name: i.id, location: location })
                ev.unsub();
            }
        });
    }

    resetListener(): void {
        this.handler();
        this.handler = this.inventory.onItemGain.subscribe((i, a, ev) => {
            if (a >= this.amount) {
                this._eventFired.dispatch({ type: EventType.GainItem, name: i.id, location: this.location })
                ev.unsub();
            }
        });
    }
}