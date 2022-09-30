import { AbstractSpell } from "@/my-game/features/spells/Templates/AbstractSpell";
import { CurrencyType } from "@/my-game/features/wallet/CurrencyType";
import { Currency, IgtWallet } from "incremental-game-template";
import { BlankSpellAction } from "@/my-game/features/actions/BlankSpellAction";
import { CrystalResource } from "../resources/crystal-resources/CrystalResource";
import { DelayedGainAction } from "../actions/DelayedGainAction";

export class GainCrystalSpell extends AbstractSpell{

    crystal: CrystalResource;

    constructor(crystal: CrystalResource,){
        const crystalName = crystal.resourceType;
        super("gainCrystalSpell-"+crystalName,"Form "+crystalName,new BlankSpellAction);
        this.crystal = crystal;
    }

    initialize(){
        const crystalGain = new 
            DelayedGainAction(this.crystal.gainCooldown,this.crystal,1,this.level,
(            level: number) => {
                return Math.pow(level,1.2);
            })
        this.setResult(crystalGain);
    }

    getCost(): Currency {
        return new Currency(this.crystal.gainCost,CurrencyType.mana);
    }

    cast(wallet: IgtWallet): boolean {
        if (!this.canAfford(wallet) || !this.result.canStart || !(this.result instanceof DelayedGainAction)) {
            return false;
        }

        if (this.result.isHolding){
            this.result.gainReward();
            return true;
        }
        else{
            wallet.loseCurrency(this.getCost());
            this.result.start();
            return true;
        }
    }
}