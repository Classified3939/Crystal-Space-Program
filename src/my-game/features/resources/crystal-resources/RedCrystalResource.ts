import { CurrencyType } from "@/my-game/features/wallet/CurrencyType";
import { AbstractResource } from "@/my-game/features/resources/AbstractResource";
import { CrystalResource } from "@/my-game/features/resources/crystal-resources/CrystalResource";

export class RedCrystalResource extends AbstractResource implements CrystalResource{

    progressImageString = "red";
    fullImageString = "red-filled";

    constructor(){
        super("red-crystal-resource",CurrencyType.redCrystal,CurrencyType.maxRed);
    }
    
}