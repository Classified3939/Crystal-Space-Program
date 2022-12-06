import { AbstractItem } from "../Base/AbstractItem";
import { ItemId } from "../Base/ItemId";
import { ItemType } from "../Base/ItemType";

export class EmptyItem extends AbstractItem{

    constructor(){
        super("Empty",'', ItemId.Empty, ItemType.Empty, 0);
    }
}