import { Features } from "@/my-game/Features";
import { ISimpleEvent, SimpleEventDispatcher } from "strongly-typed-events";
import { EventId } from "../../Listeners/EventId";
import { SkillAction } from "./SkillAction";

export class EventAction extends SkillAction{

    event: EventId
    protected _onActionFinish = new SimpleEventDispatcher<EventId>();

    constructor(description: string, duration: number, drain: number, event: EventId){
        super(description, duration, drain);
        this.event = event;
    }

    
    initialize(features: Features): void {
        this.tickDuration =  Math.ceil(this.duration / this.skill.reward/(1/60))
        this._foodInventory = features.foodInventory;
    }

    gainReward(): boolean {
        this.currentProgress = 0;
        this.intervalNumber = 0;
        this.tickDuration = Math.ceil(this.duration / this.skill.reward/(1/60));
        this._onActionFinish.dispatch(this.event);
        return false;
    }

    public get onActionFinish(): ISimpleEvent<EventId>{
        return this._onActionFinish.asEvent();
    }
}