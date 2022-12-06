import { Food } from "../Base/Food";
import { ItemId } from "../Base/ItemId";
import { ItemType } from "../Base/ItemType";

export class CaveMoss extends Food{
    constructor(){
        super("Cave Moss","Barely Edible",ItemId.CaveMoss,ItemType.Food,5,1);
    }
}