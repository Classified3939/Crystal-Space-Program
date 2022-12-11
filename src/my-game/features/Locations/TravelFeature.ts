import { IgtFeature, SaveData } from "incremental-game-template";
import { LocationIdentifier } from "./LocationIdentifier";

export class TravelFeature extends IgtFeature{

    playerLocation: LocationIdentifier;

    constructor(){
        super("travel-feature");
        this.playerLocation = new LocationIdentifier()
    }

    load(data: SaveData): void {
        //Empty
    }
        
        
        
    save(): SaveData {
        return {};
    }
}