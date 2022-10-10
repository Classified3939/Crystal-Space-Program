import { ItemType } from "@/my-game/features/items/ItemType"
import { AbstractItem } from "incremental-game-template/ig-template/features/items/AbstractItem";
import { ItemId } from "./ItemId";

export class ItemWithIcon extends AbstractItem{
    hasIcon: boolean;
    iconPath: string;
    
    constructor(name: string, description: string, id: ItemId, type: ItemType, maxStack: number = Infinity, hasIcon: boolean, iconPath: string = ""){
        super(name,description,id,type,maxStack)
        this.hasIcon = hasIcon;
        this.iconPath = iconPath;
    }
}