import {MyGame} from "./my-game/MyGame";
import {IgtSettings, IgtWallet} from "incremental-game-template";
import {CurrencyType} from "@/my-game/features/wallet/CurrencyType"
import {RedCrystalProducer} from "@/my-game/features/crystal-producer/RedCrystalProducer";

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
                wallet : new IgtWallet([CurrencyType.redCrystal]),
                redCrystalProducer: new RedCrystalProducer(),
            }
        );
    }
}
