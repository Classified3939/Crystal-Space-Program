import { CaveMoss } from "../../Items/ItemTypes/CaveMoss";
import { SkillId } from "../../Skills/SkillId";
import { ActionId } from "./ActionId";
import { EventAction } from "./EventAction";
import { EventId, EventType } from "../../Listeners/EventId";
import { ItemGainAction } from "./ItemGainAction";
import { SkillAction } from "./SkillAction";

interface SkillActionDetails{
    skill: SkillId;
    action: SkillAction; 
}

export const AllActions: Record<ActionId,SkillActionDetails> = {
    [ActionId.GatherMoss]: {
        skill: SkillId.Gathering, 
        action: new ItemGainAction("Gather Moss",3,0,new CaveMoss(),1)
    },
    [ActionId.LookForExits]: {
        skill: SkillId.Exploration,
        action: new EventAction("Look for Exits",5,1,{type:EventType.RevealArea,name:"beginning"})
    },
}