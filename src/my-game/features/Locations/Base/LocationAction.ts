import { SkillActionFeature } from "../../Actions/SkillActionFeature";
import { EventId } from "../../Listeners/EventId";
import { LocationId } from "./LocationId";

export class LocationAction{
    skillFeature: SkillActionFeature
    affectedBy: Map<EventId,boolean>
    active: boolean
    locked: boolean

    constructor(skillFeature: SkillActionFeature, affectedBy: Map<EventId,boolean>,active: boolean, locked: boolean){
        this.skillFeature = skillFeature;
        this.affectedBy = affectedBy;
        this.active = active;
        this.locked = locked;
    }
}