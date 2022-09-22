import {Currency, IgtGame} from "incremental-game-template";
import {MyFeatures} from "@/my-game/MyFeatures";
import { CurrencyType } from "./features/wallet/CurrencyType";
import { Console } from "console";

export class MyGame extends IgtGame {
[x: string]: any;
    protected readonly SAVE_KEY: string = 'Crystal-Space-Program';
    // @TODO Update TICK_DURATION to an appropriate value
    protected readonly TICK_DURATION: number = 0.05;

    SAVE_INTERVAL: number = 10;

    features: MyFeatures;

    constructor(features: MyFeatures) {
        super();
        this.features = features;
        this.features.wallet.gainCurrency(new Currency(100, CurrencyType.maxMana));
        this.features.wallet.gainCurrency(new Currency(10, CurrencyType.maxKnowledge));
    }
}
