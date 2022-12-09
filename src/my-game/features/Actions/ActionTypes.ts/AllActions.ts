import { CaveMoss } from "../../Items/ItemTypes/CaveMoss";
import { SkillId } from "../../Skills/SkillId";
import { ActionId } from "./ActionId";
import { ItemGainAction } from "./ItemGainAction";
import { SkillAction } from "./SkillAction";

interface SkillActionDetails{
    skill: SkillId;
    action: SkillAction; 
}

export const AllActions: Record<ActionId,SkillActionDetails> = {
    [ActionId.GatherMoss]: {skill: SkillId.Gathering, action: new ItemGainAction("Gather Moss",3,0,new CaveMoss(),1)},
    [ActionId.ExploreCave]: {skill: SkillId.Exploration, action: new SkillAction("Explore Cave",5,1)},
}