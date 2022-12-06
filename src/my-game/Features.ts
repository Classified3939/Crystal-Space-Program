import { IgtFeatures} from "incremental-game-template";
import { ActionList } from "./features/Actions/ActionList";
import { Inventory } from "./features/Inventory/Inventory";
import { ItemList } from "./features/Items/ItemList";
import { SkillList } from "./features/Skills/SkillList";

export interface Features extends IgtFeatures {
    skills: SkillList,
    actionList: ActionList,
    itemTypes: ItemList,
    foodInventory: Inventory,
}