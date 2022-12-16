import { Features } from "@/my-game/Features";
import { ActionList } from "../Actions/ActionList";
import { ActionId } from "../Actions/ActionTypes/ActionId";
import { SkillActionFeature } from "../Actions/SkillActionFeature";
import { LocationGroupName } from "../Locations/Base/LocationGroupName";

export class CombatActionList extends ActionList {

    constructor() {
        super("combat-action-list");
    }

    initialize(features: Features): void {
        super.initialize(features);
        this.defaultActions();
    }

    defaultActions(): void {
        this.setAttack(
            this.makeActionFeature(ActionId.BasicCloseAttack, LocationGroupName.StartingMine),
            ActionId.BasicCloseAttack);
        this.setAttack(
            this.makeActionFeature(ActionId.LockedAttack, LocationGroupName.StartingMine),
            ActionId.BasicRangedAttack
        )
        this.setAttack(
            this.makeActionFeature(ActionId.LockedAttack, LocationGroupName.StartingMine),
            ActionId.BasicMagicAttack
        )
        this.setAttack(
            this.makeActionFeature(ActionId.LockedAttack, LocationGroupName.StartingMine),
            ActionId.AdvancedCloseAttack
        )
        this.setAttack(
            this.makeActionFeature(ActionId.LockedAttack, LocationGroupName.StartingMine),
            ActionId.AdvancedRangedAttack
        )
        this.setAttack(
            this.makeActionFeature(ActionId.LockedAttack, LocationGroupName.StartingMine),
            ActionId.AdvancedMagicAttack
        )

    }

    setAttack(newAttack: SkillActionFeature, id: ActionId) {
        if (id === ActionId.BasicCloseAttack) {
            this.actions.splice(0, 1, newAttack);
        }
        else if (id === ActionId.BasicRangedAttack) {
            this.actions.splice(1, 1, newAttack);
        }
        else if (id === ActionId.BasicMagicAttack) {
            this.actions.splice(2, 1, newAttack);
        }
        if (id === ActionId.AdvancedCloseAttack) {
            this.actions.splice(3, 1, newAttack);
        }
        else if (id === ActionId.AdvancedRangedAttack) {
            this.actions.splice(4, 1, newAttack);
        }
        else if (id === ActionId.AdvancedMagicAttack) {
            this.actions.splice(5, 1, newAttack);
        }
    }
}