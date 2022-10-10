import { IgtAbstractUpgrade, IgtUpgradesFeature, UpgradesFeatureSaveData} from "incremental-game-template";
import { CurrencyType } from "@/my-game/features/wallet/CurrencyType";
import { UnlockableUpgrade } from "../upgrades/UnlockableUpgrade";

export abstract class AbstractResource extends IgtUpgradesFeature{

    resourceType: CurrencyType
    resourceMax: CurrencyType

    constructor(saveKey: string, type: CurrencyType, max: CurrencyType, upgrades: IgtAbstractUpgrade[] = []){
        super(saveKey, upgrades);
        this.resourceType = type;
        this.resourceMax = max;
    }

    getCurrent(): number{
        return parseFloat(this._wallet.getAmount(this.resourceType).toFixed(2));
    }
    
    getMax(): number{
        return  parseFloat(this._wallet.getAmount(this.resourceMax).toFixed(2));
    }

    load(data: UpgradesFeatureSaveData): void {
        super.load(data);
    }

    isUpgradeUnlockable(arg: any): arg is UnlockableUpgrade{
        return arg.unlocked !== undefined;
    }

    update(delta: number): void {
        this.upgrades.forEach(upgrade => {
            if (this.isUpgradeUnlockable(upgrade)){
                upgrade.unlocked = upgrade.unlock();
            }
        });
    }

}