import { Features } from "@/my-game/Features";
import { IgtFeature } from "incremental-game-template";
import { EventDispatcher } from "strongly-typed-events";
import { AbstractItem } from "../Items/Base/AbstractItem";
import { ItemId } from "../Items/Base/ItemId";
import { ItemList } from "../Items/ItemList";
import { EmptyItem } from "../Items/ItemTypes/EmptyItem";
import { InventorySaveData } from "./InventorySaveData";
import { InventorySlot } from "./InventorySlot";
import { InventorySlotSaveData } from "./InventorySlotSaveData";

export class Inventory extends IgtFeature{

    slots: InventorySlot[];

    _itemList: ItemList = undefined as unknown as ItemList

    private _onItemGain = new EventDispatcher<AbstractItem, number>();

    constructor(){
        super('inventory');
        this.slots = new Array(1).fill(new InventorySlot(new EmptyItem(), 0));
    }

    initialize(features: Features): void {
        super.initialize(features);
        this._itemList = features.itemTypes;
    }

    load(data: InventorySaveData): void {
        if(!data.slots){
            return
        }
        for (let i = 0; i < data.slots.length; i++){
            const slotData: InventorySlotSaveData = data.slots[i];
            if (slotData.id === ItemId.Empty){
                continue;
            }

            try {
                const item = this._itemList[slotData.id];
                item.load(slotData.data);
                this.slots[i] = new InventorySlot(item, slotData.amount);
            }
            catch(e){
                console.error(`Could not load item ${slotData.id}.`)
            }
        }
    }
    save(): InventorySaveData {
        const slots = this.slots.map(slot =>{
            return {
                id: slot.item.id,
                amount: slot.amount,
                data: slot.item.save(),
            };
        });
        return{
            slots: slots
        }
    }

}