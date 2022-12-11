import { EmptyItem } from "incremental-game-template";
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
    [ActionId.GatherMoss]: {skill: SkillId.Gathering, action: new ItemGainAction("Gather Moss",1,0,new CaveMoss(),1)},
    [ActionId.LookForExits]: {skill: SkillId.Gathering, action: new SkillAction("Look for Exits",10,1)},
}