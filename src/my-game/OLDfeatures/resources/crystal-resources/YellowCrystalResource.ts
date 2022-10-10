import { CurrencyType } from "@/my-game/features/wallet/CurrencyType";
import { AbstractResource } from "@/my-game/features/resources/AbstractResource";
import { CrystalResource } from "@/my-game/features/resources/crystal-resources/CrystalResource";

export class YellowCrystalResource extends AbstractResource implements CrystalResource{

    progressImageString = "yellow";
    fullImageString = "yellow-filled";
    gainCooldown = 45;
    gainCost = 500;

    constructor(){
        super("yellow-crystal-resource",CurrencyType.yellowCrystal,CurrencyType.maxYellow);
    }
}