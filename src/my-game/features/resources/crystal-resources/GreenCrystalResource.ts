import { CurrencyType } from "@/my-game/features/wallet/CurrencyType";
import { AbstractResource } from "@/my-game/features/resources/AbstractResource";
import { CrystalResource } from "@/my-game/features/resources/crystal-resources/CrystalResource";
import { AbstractSpell } from "../../spells/Templates/AbstractSpell";

export class GreenCrystalResource extends AbstractResource implements CrystalResource{

    progressImageString = "green";
    fullImageString = "green-filled";
    gainCooldown = 5;
    gainCost = 20;

    constructor(){
        super("green-crystal-resource",CurrencyType.greenCrystal,CurrencyType.maxGreen);
    }
}