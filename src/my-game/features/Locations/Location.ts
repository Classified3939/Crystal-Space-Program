import { NoRequirement, Requirement } from "incremental-game-template";
import { SkillActionFeature } from "../Actions/SkillActionFeature";
import { LocationIdentifier } from "./LocationIdentifier";

export class Location{
    identifier: LocationIdentifier;
    displayName: string;

    possibleActions: SkillActionFeature[];

    requirement: Requirement

    actionRequirements: Requirement[];

    constructor(
            identifier: LocationIdentifier, 
            displayName: string, 
            possibleActions: SkillActionFeature[] = [],
            requirement: Requirement = new NoRequirement(),
            actionRequirements: Requirement[] = []
        ){

        this.identifier = identifier;
        this.displayName = displayName;
        this.possibleActions = possibleActions;
        this.requirement = requirement;
        this.actionRequirements = actionRequirements
    }

    canTravel(): boolean{
        return this.requirement.isCompleted;
    }

    isActionUnlocked(element: SkillActionFeature, index: number, actionArray: SkillActionFeature[]): boolean{
        return this.actionRequirements[index].isCompleted;
    }

    getActions(){
        return this.possibleActions.filter(this.isActionUnlocked)
    }
}