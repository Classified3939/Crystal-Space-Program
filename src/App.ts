import {MyGame} from "./my-game/MyGame";
import { IgtSettings, IgtWallet} from "incremental-game-template";
import { CurrencyType } from "./my-game/features/wallet/CurrencyType";
import { ItemList } from "./my-game/features/items/ItemList";
import { Inventory } from "./my-game/features/inventory/Inventory";

export class App {
    static inProduction: boolean = (process.env.NODE_ENV === "production");

    static game: MyGame;

    static start(): void {
        this.game = this.getDefaultGame();
        this.game.initialize();
        this.game.load();
        this.game.start();
    }

    public static getDefaultGame(): MyGame {
        return new MyGame(
            {
                settings: new IgtSettings(),
                // Add features here.
                wallet: new IgtWallet([CurrencyType.empty]),
                itemList: new ItemList(),
                mainInventory: new Inventory(27),
            }
        );
    }
}
