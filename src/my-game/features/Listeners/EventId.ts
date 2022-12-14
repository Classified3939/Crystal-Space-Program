import { LocationId } from "../Locations/Base/LocationId";

export enum EventType{
    Nothing,
    Reset,
    RevealArea,
    GainItem,
    Travel,
}

export interface EventId{
    type: EventType;
    name: string;
    location: LocationId;
}