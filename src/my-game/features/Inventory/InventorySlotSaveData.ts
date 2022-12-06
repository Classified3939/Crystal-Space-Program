import { ItemId } from "../Items/Base/ItemId";

export interface InventorySlotSaveData{
    id: ItemId;
    amount: number;
    data: object;
}