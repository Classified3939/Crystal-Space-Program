export enum EventType{
    Nothing,
    RevealArea,
}

export interface EventId{
    type: EventType;
    name: string;
}