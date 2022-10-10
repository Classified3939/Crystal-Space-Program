import { AbstractSpell } from "@/my-game/features/spells/Templates/AbstractSpell";
import { AbstractResource } from "@/my-game/features/resources/AbstractResource";

export interface CrystalResource extends AbstractResource{
    progressImageString: string;
    fullImageString: string;
    gainCooldown: number;
    gainCost: number;
}