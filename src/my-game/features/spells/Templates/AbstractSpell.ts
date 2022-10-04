import { SpellId } from "@/my-game/features/spells/Templates/SpellId";
import { Currency, IgtWallet, Saveable } from "incremental-game-template";
import { SpellSaveData } from "@/my-game/features/spells/Templates/SpellSaveData";
import { SpellAction } from "@/my-game/features/actions/SpellAction";

export abstract class AbstractSpell implements Saveable{

    id: SpellId
    displayName: string
    level: number
    result: SpellAction
    unlocked: boolean;
    
    protected constructor(id: SpellId, displayName: string, result: SpellAction){
        this.id = id;
        this.displayName = displayName;
        this.level = 1;
        this.result = result;
        this.unlocked = true;

        this.saveKey = this.id;
    }

    abstract getCost(): Currency;

    canAfford(wallet: IgtWallet): boolean {
        return wallet.hasCurrency(this.getCost());
    }

    cast(wallet: IgtWallet): boolean {
        if (!this.canAfford(wallet) || !this.result.canStart) {
            return false;
        }

        wallet.loseCurrency(this.getCost());
        this.result.start();
        return true;
    }

    setResult(newResult: SpellAction){
       this.result = newResult;
    }


    levelUp(): void{
        this.level += 1;
        this.result.setSpellLevel(this.level);
    }

    saveKey: string;

    load(data: SpellSaveData): void{
        this.level = data.level;
        this.result.setSpellLevel(this.level);
    }

    save(): SpellSaveData{
        return{
            'id': this.id,
            'level': this.level
        }
    }

    abstract initialize(): void

    abstract unlock(): void
}