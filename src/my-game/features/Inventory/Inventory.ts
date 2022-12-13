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

    constructor(name: string){
        super(name+'-inventory');
        this.slots = new Array(1).fill(new InventorySlot(new EmptyItem(), 0));
    }

    initialize(features: Features): void {
        super.initialize(features);
        this._itemList = features.itemTypes;
    }

    indexOfItem(id: ItemId): number{
        for (const slot of this.slots){
            if (slot.item.id === id){
                return this.slots.indexOf(slot);
            }
        }

        return -1;
    }

    hasMaxOfItem(item: AbstractItem): boolean{
        if (this.indexOfItem(item.id) !== -1){
            return this.slots[this.indexOfItem(item.id)].amount >= item.maxStack;
        }
        else{
            return false;
        }
    }

    gainItem(item: AbstractItem, amount: number): boolean{
        const itemSlot = this.indexOfItem(item.id);
        if (itemSlot !== -1){
            if (this.slots[itemSlot].amount >= this.slots[itemSlot].item.maxStack){
                return false;
            }
            else{
                this.slots[itemSlot].gainItems(amount);
                this._onItemGain.dispatch(item,this.slots[itemSlot].amount);
                return true;
            }
        }
        else{
            if (this.slots[0].item.id === ItemId.Empty){
                this.slots.splice(0,1,new InventorySlot(item,0));
                this.slots[0].gainItems(amount);
                return true;
            }
            else{
                const newIndex = this.slots.push(new InventorySlot(item,0));
                this.slots[newIndex].gainItems(amount);
                this._onItemGain.dispatch(item,this.slots[itemSlot].amount);
                return true;
            }
        }
    }

    consumeItem(item: AbstractItem, amount: number): boolean{
        const itemSlot = this.indexOfItem(item.id);
        if (itemSlot === -1){
            return false;
        }
        else{
            if (this.slots[itemSlot].amount <= 0){
                return false;
            }
            else{
                this.slots[itemSlot].loseItems(amount);
                if (this.slots[itemSlot].isEmpty()){
                    this.slots.splice(itemSlot, 1);
                    if (this.slots.length === 0){
                        this.slots.splice(0,1,new InventorySlot(new EmptyItem(), 0));
                    }
                    return false;
                }
                else{
                    return true;
                }
            }
        }
    }

    getHeldItemTypes(): AbstractItem[]{
        const types = new Array<AbstractItem>()
        for (let i = 0; i < this.slots.length; i++ ){
            types.push(this.slots[i].item)
        }
        return types;
    }

    getItemAmount(item: AbstractItem): number{
        const index = this.indexOfItem(item.id);
        if (index === -1){
            return 0;
        }
        else{
            return this.slots[index].amount;
        }
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

    public get onItemGain(){
        return this._onItemGain.asEvent();
    }
}