import { LocationId } from "./LocationId";
import { LocationType } from "./LocationType";

export abstract class LocationIdentifier{
    type: LocationType
    id: LocationId

    protected constructor(type: LocationType, id: LocationId){
        this.type = type;
        this.id = id;
    }

    public toString(): string{
        return `${LocationType[this.type]}: ${this.id}`
    }
}