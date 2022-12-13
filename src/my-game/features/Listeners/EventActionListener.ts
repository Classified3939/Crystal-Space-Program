import {EventAction} from "@/my-game/features/Actions/ActionTypes/EventAction"
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