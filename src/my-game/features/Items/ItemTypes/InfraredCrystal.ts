import { AbstractItem } from "../Base/AbstractItem"
import { ItemId } from "../Base/ItemId";
import { ItemType } from "../Base/ItemType";

export class InfraredCrystal extends AbstractItem {

    constructor() {
        super("Infrared Crystal", "", ItemId.InfraredCrystal, ItemType.Crystal, 5);
    }
}