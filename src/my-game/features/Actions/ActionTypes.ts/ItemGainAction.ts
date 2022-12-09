import { Features } from "@/my-game/Features";
import { Inventory } from "../../Inventory/Inventory";
import { AbstractItem } from "../../Items/Base/AbstractItem";
import { ItemType } from "../../Items/Base/ItemType";
import { SkillAction } from "./SkillAction";

export class ItemGainAction extends SkillAction{
    item: AbstractItem
    amount: number
    _inventory: Inventory = undefined as unknown as Inventory

    constructor(description: string, duration: number, drain: number, item: AbstractItem, amount: number){
        super(description, duration, drain);
        this.item = item;
        this.amount = amount;
    }

    initialize(features: Features): void {
        if (this.item.type == ItemType.Food){
            this._inventory = features.foodInventory;
        }
    }

    canPerform(): boolean {
        return !this._inventory.hasMaxOfItem(this.item);
    }

    gainReward(): boolean {
        this._inventory.gainItem(this.item,this.amount);
        this.currentProgress = 0;
        return !(this._inventory.hasMaxOfItem(this.item));
    }
}