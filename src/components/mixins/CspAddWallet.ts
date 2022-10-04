import {CurrencyType} from "@/my-game/features/wallet/CurrencyType";
import {IgtWallet, IgtAbstractUpgrade, IgtFeatures} from "incremental-game-template";
import {FeatureConstructor} from "incremental-game-template/ig-template/mixins/Mixins";

export function CspAddWallet<TBase extends FeatureConstructor>(Base: TBase){
    abstract class CspAddWallet extends Base{
        _wallet: IgtWallet = undefined as unknown as IgtWallet;

        /*click(clicker: AbstractClicker): boolean{
            if (!this._wallet) {
                console.warn("Wallet not found, are you sure it is initialized?")
                return false;
            }
            return clicker.click(this._wallet)
        }*/

        getAmount(currency: CurrencyType): number{
            if (!this._wallet) {
                console.warn("Wallet not found, are you sure it is initialized?")
                return -1
            }
            else{
                return this._wallet.getAmount(currency);
            }
        }

        buyUpgrade(upgrade: IgtAbstractUpgrade): boolean {
            if (!this._wallet) {
                console.warn("Wallet not found, are you sure it is initialized?")
                return false;
            }
            if (!upgrade.canBuy(this._wallet)) {
                return false;
            }
            return upgrade.buy(this._wallet);
        }

        canAfford(upgrade: IgtAbstractUpgrade): boolean {
            return upgrade.canAfford(this._wallet);
        }

        initialize(features: IgtFeatures): void {
            this._wallet = features.wallet!;
        }
    }
    return CspAddWallet;
}
