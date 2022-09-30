import { CurrencyType } from "@/my-game/features/wallet/CurrencyType";
import { AbstractResource } from "@/my-game/features/resources/AbstractResource";
import { CrystalResource } from "@/my-game/features/resources/crystal-resources/CrystalResource";

export class OrangeCrystalResource extends AbstractResource implements CrystalResource{

    progressImageString = "orange";
    fullImageString = "orange-filled";
    gainCooldown = 3;
    gainCost = 20;

    constructor(){
        super("orange-crystal-resource",CurrencyType.orangeCrystal,CurrencyType.maxOrange);
    }
}