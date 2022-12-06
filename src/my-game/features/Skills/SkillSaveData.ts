
import { SaveData } from "incremental-game-template";
import { SkillId } from "./SkillId"

export interface SkillSaveData extends SaveData{
    skills:{
        id: SkillId;
        exp: number;
    }[];
}