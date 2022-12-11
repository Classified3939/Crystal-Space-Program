import { AbstractItem } from "../Items/Base/AbstractItem";

export class InventorySlot{
    item: AbstractItem;
    amount: number;

    constructor(item: AbstractItem, amount: number){
        this.item = item;
        this.amount = amount;
    }

    isEmpty(): boolean{
        return this.amount === 0;
    }

    isFull(): boolean{
        return this.amount >= this.item.maxStack;
    }

    spaceLeft(): number{
        return this.item.maxStack - this.amount;
    }

    gainItems(amount: number){
        this.amount += amount;
        if (this.amount > this.item.maxStack){
            this.amount = this.item.maxStack;
        }
    }

    loseItems(amount: number){
        //console.log("Losing",amount);
        this.amount = (this.amount * 1e4) - (amount*1e4);
        this.amount = Math.round(this.amount) / 1e4;
        if (this.amount < 0){
            this.amount = 0;
        }
    }
}