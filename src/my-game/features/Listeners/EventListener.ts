import { ISimpleEvent, SimpleEventDispatcher } from "strongly-typed-events";
import { EventId } from "./EventId";

export abstract class EventListener{
    event: EventId
    protected _eventFired = new SimpleEventDispatcher<EventId>();

    constructor(event: EventId){
        this.event = event;
    }

    public get eventFired(): ISimpleEvent<EventId>{
        return this._eventFired.asEvent();
    }
}