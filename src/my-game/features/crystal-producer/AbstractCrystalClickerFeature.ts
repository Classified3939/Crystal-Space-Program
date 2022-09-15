import {AbstractClicker} from "@/components/tools/clickers/AbstractClicker";
import {IgtWallet, IgtFeature, IgtFeatures} from "incremental-game-template";
import {ClickFeatureSaveData} from "@/components/tools/saving/ClickerFeatureSaveData";

export abstract class AbstractCrystalClickerFeature extends IgtFeature{
    _wallet: IgtWallet = null as unknown as IgtWallet;
    clickers: AbstractClicker[];

    protected constructor(saveKey: string, clickers: AbstractClicker[] = []){
        super(saveKey);
        this.clickers = clickers;
    }

    initialize(features: IgtFeatures): void {
        if (!features.wallet) {
            throw new Error("The AbstractCrystalClickerFeature (or subclasses), make sure it's instantiated and added to IgtFeatures")
        }
        this._wallet = features.wallet;
    }

    getClicker(id: string): AbstractClicker | undefined {
        return this.clickers.find(clicker => {
            return clicker.id === id;
        });
    }

    click(clicker: AbstractClicker): boolean{
        if (!this._wallet){
            console.warn("Wallet not found!")
            return false;
        }
        return clicker.click(this._wallet);
    }

    load(data: ClickFeatureSaveData): void{
        data.clickers?.forEach(clickBonusSaveData =>{
            this.getClicker(clickBonusSaveData.id)?.load
        });
    }

    save(): ClickFeatureSaveData{
        return{
            clickers: this.clickers.map(clicker => {
                return clicker.save();
            })
        }
    }
}