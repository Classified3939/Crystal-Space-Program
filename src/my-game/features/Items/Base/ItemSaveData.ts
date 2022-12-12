import { SaveData } from "incremental-game-template";

export interface ItemSaveData extends SaveData{
    maxStack: number;
}