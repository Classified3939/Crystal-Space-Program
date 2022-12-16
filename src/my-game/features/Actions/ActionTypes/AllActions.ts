import { CaveMoss } from "../../Items/ItemTypes/CaveMoss";
import { SkillId } from "../../Skills/SkillId";
import { ActionId } from "./ActionId";
import { EventAction } from "./EventAction";
import { EventType } from "../../Listeners/EventId";
import { ItemGainAction } from "./ItemGainAction";
import { SkillAction } from "./SkillAction";
import { LocationGroupName } from "../../Locations/Base/LocationGroupName";
import { LocationId } from "../../Locations/Base/LocationId";
import { TravelAction } from "./TravelAction";
import { CrystalAction } from "./CrystalAction";
import { InfraredCrystal } from "../../Items/ItemTypes/InfraredCrystal";

interface SkillActionDetails {
    skill: SkillId;
    action: SkillAction;
}

export class FullAction {
    actionDetails: SkillActionDetails
    actionId: ActionId
    area: LocationGroupName

    constructor(action: SkillActionDetails, actionId: ActionId, area: LocationGroupName) {
        this.actionDetails = action;
        this.actionId = actionId;
        this.area = area;
    }
}

export const AllActions = new Array<FullAction>(
    new FullAction(
        {
            skill: SkillId.Gathering,
            action: new ItemGainAction("Gather Moss", 1, 0, new CaveMoss(), 1)
        },
        ActionId.GatherFood,
        LocationGroupName.StartingMine
    ),
    new FullAction(
        {
            skill: SkillId.Perception,
            action: new EventAction("Look for Exits", 5, 1, { type: EventType.RevealArea, name: "exits", location: LocationId.Any }),
        },
        ActionId.LookForExits,
        LocationGroupName.StartingMine
    ),
    new FullAction(
        {
            skill: SkillId.Exploration,
            action: new TravelAction("Leave Cave", 2, 1, LocationId.MineshaftCrystalCave),
        },
        ActionId.LeaveArea,
        LocationGroupName.StartingMine
    ),
    new FullAction(
        {
            skill: SkillId.Gathering,
            action: new CrystalAction("Gather Infrared Crystal", 5, 1, new InfraredCrystal()),
        },
        ActionId.GatherCrystal,
        LocationGroupName.StartingMine,
    ),
    new FullAction(
        {
            skill: SkillId.CloseCombat,
            action: new SkillAction("Basic Punch", 2, 1)
        },
        ActionId.BasicCloseAttack,
        LocationGroupName.StartingMine,
    ),
    new FullAction(
        {
            skill: SkillId.Blank,
            action: new SkillAction("[Locked]", 0, 0)
        },
        ActionId.LockedAttack,
        LocationGroupName.StartingMine,
    )
)