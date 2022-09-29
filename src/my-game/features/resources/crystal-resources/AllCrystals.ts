import { IgtFeature, IgtFeatures, SaveData } from "incremental-game-template";
import { InfraredCrystalResource } from "@/my-game/features/resources/crystal-resources/InfraredCrystalResource";
import { RedCrystalResource } from "@/my-game/features/resources/crystal-resources/RedCrystalResource";
import { CrystalResource } from "./CrystalResource";

export class AllCrystals extends IgtFeature{

    crystalArray: Array<CrystalResource>;
    saveKey: string;
    id: string;

    constructor(id: string){
        super(id);
        this.id = id;
        this.saveKey = id;
        this.crystalArray = new Array<CrystalResource>();
        this.pushCrystals();
    }

    initialize(features: IgtFeatures): void {
        this.crystalArray.forEach(element => {
            console.warn(element)
            super.initialize(features);
            element.initialize(features);
        });
    }

    pushCrystals(){
        this.crystalArray.push(new InfraredCrystalResource);
        this.crystalArray.push(new RedCrystalResource);
        this.crystalArray.push(new InfraredCrystalResource);
        this.crystalArray.push(new InfraredCrystalResource);
        this.crystalArray.push(new RedCrystalResource);
    }

    save(): SaveData {
        return {};
    }

    load(data: SaveData): void {
        //Empty
    }
}