import { SaveData } from "incremental-game-template";
import { ActionSaveData } from "./ActionSaveData";

export interface ActionListSaveData extends SaveData{
    actions: ActionSaveData[];
}