import { Features } from "@/my-game/Features";
import {EmptyItem, IgtFeature, SaveData, } from "incremental-game-template";
import { CaveMoss } from "./ItemTypes/CaveMoss";

export class ItemList extends IgtFeature{

    _features = undefined as unknown as Features;

    constructor(){
        super('item-list');
    }

    initialize(features: Features){
        super.initialize(features);
        this._features = features;
    }

    get empty(): EmptyItem{
        return new EmptyItem();
    } 

    get caveMoss(): CaveMoss{
        return new CaveMoss();
    }

    load(data: SaveData): void {
    //Empty
    }
    save(): SaveData {
    return {};
    }
    

}