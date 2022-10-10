import { Features } from "@/my-game/Features";
import { EmptyItem, IgtFeature, InventorySlot } from "incremental-game-template";
import { ItemList } from "../items/ItemList";

export class CraftingGrid extends IgtFeature{
    slotCount: number;
    slots: InventorySlot[];

    _itemList: ItemList = undefined as unknown as ItemList;
    
    constructor(slots: number = 9) {
        super('crafting-grid');
        this.slotCount = slots;
        this.slots = new Array(this.slotCount).fill(new InventorySlot(new EmptyItem(), 0));
    }

    initialize(features: Features) {
        super.initialize(features);
        this._itemList = features.itemList;
    }

    interactIndices(indexFrom: number, indexTo: number) {
        if (indexFrom === indexTo) {
            return;
        }

        const itemFrom = this.slots[indexFrom];

        if (itemFrom.isEmpty()) {
            console.warn("Cannot interact with empty item");
            return;
        }
        const itemTo = this.slots[indexTo];

        if (itemFrom.item.id === itemTo.item.id) {
            this.mergeItems(itemFrom, itemTo);
            return;
        }

        this.swapItems(indexFrom, indexTo);
        return;
    }

    swapItems(indexFrom: number, indexTo: number) {
        const temp = this.slots[indexFrom];
        this.slots.splice(indexFrom, 1, this.slots[indexTo]);
        this.slots.splice(indexTo, 1, temp);

    }

    mergeItems(itemFrom: InventorySlot, itemTo: InventorySlot) {

        if (itemFrom.item.id !== itemTo.item.id) {
            throw new Error(`Cannot merge items of types ${itemFrom.item.id} and ${itemTo.item.id}`);
        }

        const amount = Math.min(itemFrom.amount, itemTo.spaceLeft());
        itemFrom.loseItems(amount);
        itemTo.gainItems(amount);
    }

    splitItems(itemFrom: InventorySlot, itemTo: InventorySlot) {
        if (itemFrom.item.id !== itemTo.item.id && !itemTo.isEmpty()) {
            throw new Error(`Slot not available to split stack of ${itemFrom.item.id}`);
        }

        if (itemFrom.amount % 2 == 0){
            const halfAmount = itemFrom.amount / 2;
            itemFrom.loseItems(halfAmount);
            itemTo.gainItems(halfAmount);
        }
        else{
            const splitAmount = (itemFrom.amount - 1) / 2;
            itemFrom.loseItems(splitAmount);
            itemTo.gainItems(splitAmount);
        }
    }
}