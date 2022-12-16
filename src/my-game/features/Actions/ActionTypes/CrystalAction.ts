import { AbstractItem } from "../../Items/Base/AbstractItem";
import { ItemGainAction } from "./ItemGainAction";

export class CrystalAction extends ItemGainAction {

    constructor(description: string, duration: number, drain: number, item: AbstractItem) {
        super(description, duration, drain, item, 1)
    }
}
