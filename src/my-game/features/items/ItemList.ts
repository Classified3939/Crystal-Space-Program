import { Features } from "@/my-game/Features";
import { EmptyItem, IgtFeature, SaveData } from "incremental-game-template";
import { InfraredCrystal, OrangeCrystal, RedCrystal } from "./CrystalItems";

export class ItemList extends IgtFeature {

    _features = undefined as unknown as Features;

    constructor() {
        super('item-list');
    }


    initialize(features: Features) {
        super.initialize(features);
        this._features = features;
    }

    get empty(): EmptyItem {
        return new EmptyItem();
    }

    get infraredCrystal(): InfraredCrystal{
        return new InfraredCrystal();
    }

    get redCrystal(): RedCrystal{
        return new RedCrystal();
    }

    get orangeCrystal(): OrangeCrystal{
        return new OrangeCrystal();
    }

    
    load(): void {
        // Empty
    }

    save(): SaveData {
        return {}
    }

    getItem(){
        return new EmptyItem();
    }
}