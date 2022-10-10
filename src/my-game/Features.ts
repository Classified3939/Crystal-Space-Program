import { IgtFeatures, IgtSettings, IgtWallet} from "incremental-game-template";
import { ItemList } from "@/my-game/features/items/ItemList";
import { Inventory } from "./features/Inventory/Inventory";


export interface Features extends IgtFeatures{
    settings: IgtSettings;
    wallet: IgtWallet;
    itemList: ItemList;
    mainInventory: Inventory;
}
