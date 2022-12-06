import { SaveData } from "incremental-game-template";
import { InventorySlotSaveData } from "./InventorySlotSaveData";

export interface InventorySaveData extends SaveData{
    slots: InventorySlotSaveData[];
}