import { Saveable } from "incremental-game-template";
import { ItemId } from "./ItemId";
import { ItemType } from "./ItemType";
import { ItemSaveData } from "./ItemSaveData";

export abstract class AbstractItem implements Saveable {
    name: string;
    id: ItemId;
    type: ItemType;
    description: string;
    maxStack: number;
    saveKey: string

    protected constructor(name: string, description: string, id: ItemId, type: ItemType,
        maxStack: number = Infinity) {
        this.name = name;
        this.description = description;
        this.id = id;
        this.type = type;
        this.maxStack = maxStack;
        this.saveKey = this.id;
    }



    save(): ItemSaveData {
        return { maxStack: this.maxStack };
    }
    load(data: ItemSaveData): void {
        if (data.maxStack){
            this.maxStack = data.maxStack;  
        }

    }

}