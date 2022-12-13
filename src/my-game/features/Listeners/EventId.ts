export enum EventType{
    Nothing,
    Reset,
    RevealArea,
    GainItem,
}

export interface EventId{
    type: EventType;
    name: string;
}

export function equals(event1: EventId, event2: EventId): boolean{
    return (event1.name === event2.name && event1.type === event2.type);
}