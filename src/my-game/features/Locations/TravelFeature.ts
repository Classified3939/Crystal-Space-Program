import { IgtFeature, SaveData } from "incremental-game-template";
import { LocationId } from "./LocationId";
import { LocationIdentifier } from "./LocationIdentifier";
import { LocationType } from "./LocationType";

export class TravelFeature extends IgtFeature{

    playerLocation: LocationIdentifier;

    constructor(){
        super("travel-feature");
        this.playerLocation = new LocationIdentifier(LocationType.StartArea,LocationId.MineshaftStartCave)
    }

    load(data: SaveData): void {
        //Empty
    }
        
        
        
    save(): SaveData {
        return {};
    }
}