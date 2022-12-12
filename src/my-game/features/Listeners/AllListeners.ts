import { Features } from "@/my-game/Features";
import { IgtFeature, SaveData } from "incremental-game-template";
import { SimpleEventDispatcher } from "strongly-typed-events";
import { ActionList } from "../Actions/ActionList";
import { EventAction } from "../Actions/ActionTypes/EventAction";
import { SkillActionFeature } from "../Actions/SkillActionFeature";
import { EventActionListener } from "./EventActionListener";
import { EventId } from "./EventId";

export class AllListeners extends IgtFeature{
    actionListeners: EventActionListener[];
    private _eventFired = new SimpleEventDispatcher<EventId>();

    constructor(){
        super("listeners")
        this.actionListeners = new Array<EventActionListener>();
    }

    initialize(features: Features): void {
        this.setActionListeners(features.actionList)
    }

    setActionListeners(actionList: ActionList){
        function isEventAction(actionFeature: SkillActionFeature): boolean {
            return actionFeature.skillAction instanceof EventAction;
        }
        const eventActions = actionList.actions.filter(isEventAction);
        for (const eAction of eventActions){
            this.actionListeners.push(new EventActionListener(eAction.skillAction as EventAction));
        }
        for (const listener of this.actionListeners){
            listener.eventFired.one(e=>{
                console.log(e.name,e.type)
                this._eventFired.dispatch(e);
            });
        }
    }

    public get eventFired(){
        return this._eventFired.asEvent();
    }

    load(data: SaveData): void {
     //Empty
    }
    save(): SaveData {
        return {};
    }
}