import { IgtFeatures} from "incremental-game-template";
import { ActionList } from "./features/Actions/ActionList";
import { Inventory } from "./features/Inventory/Inventory";
import { ItemList } from "./features/Items/ItemList";
import { AllListeners } from "./features/Listeners/AllListeners";
import { AllLocations } from "./features/Locations/AllLocations";
import { PlayerLocationFeature } from "./features/Locations/PlayerLocationFeature";
import { AllSkills } from "./features/Skills/AllSkills";

export interface Features extends IgtFeatures {
    skills: AllSkills,
    actionList: ActionList,
    itemTypes: ItemList,
    foodInventory: Inventory,
    eventListeners: AllListeners,
    allLocations: AllLocations,
    playerLocation: PlayerLocationFeature,
}