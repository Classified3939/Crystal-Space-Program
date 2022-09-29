import { IgtAbstractUpgrade, IgtUpgradesFeature, UpgradesFeatureSaveData} from "incremental-game-template";
import { CurrencyType } from "@/my-game/features/wallet/CurrencyType";

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
}