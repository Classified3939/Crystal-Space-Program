import {IgtWallet, IgtAbstractUpgrade} from "incremental-game-template";
import { FeatureConstructor } from "incremental-game-template/ig-template/mixins/Mixins";
import { AbstractClicker } from "../tools/clickers/AbstractClicker";

export function CspAddWallet<TBase extends FeatureConstructor>(Base: TBase){
    abstract class CspAddWallet extends Base{
        _wallet: IgtWallet = undefined as unknown as IgtWallet;

        click(clicker: AbstractClicker): boolean{
            if (!this._wallet) {
                console.warn("Wallet not found, are you sure it is initialized?")
                return false;
            }
            return clicker.click(this._wallet)
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
    }
    return CspAddWallet;
}
