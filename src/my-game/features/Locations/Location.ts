import { NoRequirement, Requirement } from "incremental-game-template";
import { SkillActionFeature } from "../Actions/SkillActionFeature";
import { LocationIdentifier } from "./LocationIdentifier";

export abstract class Location{
    identifier: LocationIdentifier;
    displayName: string;

    possibleActions: SkillActionFeature[];

    requirement: Requirement

    skillRequirements: Requirement[];

    protected constructor(
            identifier: LocationIdentifier, 
            displayName: string, 
            possibleActions: SkillActionFeature[] = [],
            requirement: Requirement = new NoRequirement(),
            skillRequirements: Requirement[] = []
        ){

        this.identifier = identifier;
        this.displayName = displayName;
        this.possibleActions = possibleActions;
        this.requirement = requirement;
        this.skillRequirements = skillRequirements
    }

    canTravel(): boolean{
        return this.requirement.isCompleted;
    }
}