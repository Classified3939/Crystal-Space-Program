import { EventType } from "../../Listeners/EventId";
import { LocationId } from "../../Locations/Base/LocationId";
import { EventAction } from "./EventAction";

export class TravelAction extends EventAction{
    location: LocationId;

    constructor(description: string, duration: number, drain: number, location: LocationId){
        super(description,duration,drain,{type:EventType.Travel,name:"travel",location:location})
        this.location = location;
    }

    
}
