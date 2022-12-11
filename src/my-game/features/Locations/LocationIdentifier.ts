import { LocationId } from "./LocationId";
import { LocationType } from "./LocationType";

export class LocationIdentifier{
    type: LocationType
    id: LocationId

    constructor(type: LocationType, id: LocationId){
        this.type = type;
        this.id = id;
    }

    public toString(): string{
        return `${LocationType[this.type]}: ${this.id}`
    }
}