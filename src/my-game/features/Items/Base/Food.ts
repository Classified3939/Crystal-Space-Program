
import { ItemId } from "./ItemId";
import { AbstractItem } from "./AbstractItem";
import { ItemType } from "./ItemType";

export abstract class Food extends AbstractItem{

    foodValue: number;

    protected constructor(name: string, description: string, id: ItemId, type: ItemType,
         maxStack: number = Infinity, foodValue: number){
            super(name,description,id,type,maxStack);
            this.foodValue = foodValue;
         }
}