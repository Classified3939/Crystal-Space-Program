import { CurrencyType } from "@/my-game/features/wallet/CurrencyType";
import { AbstractResource } from "@/my-game/features/resources/AbstractResource";
import { CrystalResource } from "@/my-game/features/resources/crystal-resources/CrystalResource";

export class InfraredCrystalResource extends AbstractResource implements CrystalResource{

    progressImageString = "infra";
    fullImageString = "infra-filled";
    gainCooldown = 4;
    gainCost = 50;

    constructor(){
        super("infrared-crystal-resource",CurrencyType.infraCrystal,CurrencyType.maxInfra);
    }
}