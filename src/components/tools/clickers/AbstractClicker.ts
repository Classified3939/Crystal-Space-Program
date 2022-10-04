import {Saveable, IgtWallet, Currency} from "incremental-game-template";
import {ClickBonusSaveData} from "@/components/tools/clickers/ClickBonusSaveData";

export abstract class AbstractClicker implements Saveable{
    id: string;
    displayName: string;
    amount: number;
    resource: string;

    protected constructor(id: string, displayName: string, resource: string){
        this.id = id;
        this.displayName = displayName;
        this.amount = 1;
        this.resource = resource;

        this.saveKey = this.id;
    }

    getAmount(): number{
        return this.amount;
    }

    abstract getCurrency(): Currency;

    click(wallet: IgtWallet): boolean{
        wallet.gainCurrency(this.getCurrency());
        return true;
    }

    setAmount(newAmount: number): void{
        this.amount = newAmount;
    }

    saveKey: string;

    load(data: ClickBonusSaveData): void{
        this.amount = 1 + data.bonus;
    }

    save(): ClickBonusSaveData {
        return {
            'id': this.id,
            'bonus': this.amount - 1,
        }
    }


}