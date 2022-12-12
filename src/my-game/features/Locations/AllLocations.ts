import { IgtFeature, NoRequirement, Requirement, SaveData } from "incremental-game-template";
import { ActionId } from "../Actions/ActionTypes/ActionId";
import { AllActions } from "../Actions/ActionTypes/AllActions";
import { SkillActionFeature } from "../Actions/SkillActionFeature";
import {Location} from "./Location";
import { LocationId } from "./LocationId";
import { LocationIdentifier } from "./LocationIdentifier";
import { LocationType } from "./LocationType";

export class AllLocations extends IgtFeature{

    locations: Location[] = [];

    constructor(){
        super("all-locations");
    }

    static createWorld(): Location[]{
        const locations = [
            new Location(
                new LocationIdentifier(LocationType.StartArea,LocationId.MineshaftStartCave),
                "The Beginning",
                new Array<SkillActionFeature>(
                    this.makeActionFeature(ActionId.GatherMoss),
                    this.makeActionFeature(ActionId.LookForExits),
                ),
                new NoRequirement(),
                new Array<Requirement>(
                    new NoRequirement
                )
            )
        ]
        return locations;
    }

    static makeActionFeature(id: ActionId): SkillActionFeature{
        const skill = AllActions[id].skill;
        const action = AllActions[id].action;
        return new SkillActionFeature(skill,action);
    }


    load(data: SaveData): void {
        //Empty
    }
    save(): SaveData {
        return {};
    }

}