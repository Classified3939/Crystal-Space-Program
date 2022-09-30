import { CurrencyType } from "@/my-game/features/wallet/CurrencyType";
import { AbstractResource } from "@/my-game/features/resources/AbstractResource";
import { CrystalResource } from "@/my-game/features/resources/crystal-resources/CrystalResource";

export class BlankCrystalResource extends AbstractResource implements CrystalResource{

    progressImageString = "empty";
    fullImageString = "empty";

    constructor(){
        super("blank-crystal-resource",CurrencyType.blank,CurrencyType.blank);
    }
}