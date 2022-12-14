import { SkillActionFeature } from "../../Actions/SkillActionFeature";
import { EventId } from "../../Listeners/EventId";

export class LocationAction{
    skillFeature: SkillActionFeature
    affectedBy: Map<EventId,boolean>
    active: boolean

    constructor(skillFeature: SkillActionFeature, affectedBy: Map<EventId,boolean>,active: boolean){
        this.skillFeature = skillFeature;
        this.affectedBy = affectedBy;
        this.active = active;
    }
}