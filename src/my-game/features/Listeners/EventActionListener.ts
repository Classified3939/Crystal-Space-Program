import { EventId } from "./EventId";
import {EventAction} from "@/my-game/features/Actions/ActionTypes/EventAction"
import { ISimpleEvent, SimpleEventDispatcher } from "strongly-typed-events";
import { EventListener } from "./EventListener";

export class EventActionListener extends EventListener{

    action: EventAction

    constructor(action: EventAction){
        super(action.event);
        this.action = action;
        this.action.onActionFinish.subscribe(e => 
            this._eventFired.dispatch(e));
    }

}