import { ItemId } from "./ItemId";
import { ItemType } from "./ItemType";
import { ItemWithIcon } from "./ItemWithIcon";

export class InfraredCrystal extends ItemWithIcon{
    constructor(){
        super("Infrared Crystal","",ItemId.InfraredCrystal,ItemType.Crystal,10, true, "crystals/InfraredCrystal.png")
    }
}

export class RedCrystal extends ItemWithIcon{
    constructor(){
        super("Red Crystal","",ItemId.RedCrystal,ItemType.Crystal,10, true, "crystals/RedCrystal.png")
    }
}

export class OrangeCrystal extends ItemWithIcon{
    constructor(){
        super("Orange Crystal","",ItemId.OrangeCrystal,ItemType.Crystal,10, true, "crystals/OrangeCrystal.png")
    }
}