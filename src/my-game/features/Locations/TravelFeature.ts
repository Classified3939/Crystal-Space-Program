import { IgtFeature, SaveData } from "incremental-game-template";

export class TravelFeature extends IgtFeature{

    

    load(data: SaveData): void {
        //Empty
    }
        
        
        
    save(): SaveData {
        return {};
    }
}