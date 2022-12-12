import { IgtFeatures} from "incremental-game-template";
import { ActionList } from "./features/Actions/ActionList";
import { Inventory } from "./features/Inventory/Inventory";
import { ItemList } from "./features/Items/ItemList";
import { AllListeners } from "./features/Listeners/AllListeners";
import { AllSkills } from "./features/Skills/AllSkills";

export interface Features extends IgtFeatures {
    skills: AllSkills,
    actionList: ActionList,
    itemTypes: ItemList,
    foodInventory: Inventory,
    eventListeners: AllListeners,
}